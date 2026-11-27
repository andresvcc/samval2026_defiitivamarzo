// Verificador de la página /v. Sin estado y sin copia de nada: tras validar Turnstile pregunta a Admin
// por el NATS de gestión (petición-respuesta) la llave pública del colegio (s + kid) y el estado de la
// versión firmada por su huella. La credencial `document-verifier` sólo puede publicar esos dos temas y
// leer su propio buzón. El navegador verifica la firma: aquí nunca llega el documento.
import crypto from 'node:crypto';

export const SUBJECTS = { key: 'samval.document.verification.v1.key', status: 'samval.document.verification.v1.status' };
export const VERIFIER_USER = 'document-verifier';
export const VERIFIER_INBOX = '_INBOX.document-verifier';
export const PUBLIC_ORIGINS = ['https://samval.org', 'https://www.samval.org'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const KID = /^[A-Za-z0-9_-]{11}$/;
const FINGERPRINT = /^[A-Za-z0-9_-]{22}$/;
const PUBLIC_KEY = /^[A-Za-z0-9_-]{43}$/;
const MAX_BODY_BYTES = 4096;
const BUS_TIMEOUT_MS = 2000;
// Por IP (con sal, nunca en claro): 20 consultas cada 10 minutos. Quien verifica papeles verifica pocos.
const RATE = { limit: 20, windowMs: 10 * 60 * 1000, maxTracked: 50000 };

const failure = (status, error) => ({ status, body: { ok: false, error } });
const UNAVAILABLE = failure(503, 'unavailable');

/** Ventana fija por clave; el mapa se vacía si crece demasiado (peor caso: se perdona una ventana). */
export function createRateLimiter({ limit, windowMs, maxTracked } = RATE, now = Date.now) {
  const buckets = new Map();
  return key => {
    const at = now();
    let bucket = buckets.get(key);
    if (!bucket || bucket.reset <= at) {
      if (buckets.size >= maxTracked) buckets.clear();
      bucket = { count: 0, reset: at + windowMs };
      buckets.set(key, bucket);
    }
    return ++bucket.count <= limit;
  };
}

/**
 * Cliente del bus, perezoso: conecta en la primera consulta y reconecta solo. Sin URL o contraseña
 * cada consulta falla y la página dice «No se pudo comprobar ahora».
 */
export function createBusRequester({ url, password, caPem, connectImpl } = {}) {
  // Una sola conexión compartida: las dos preguntas simultáneas esperan la misma promesa.
  let connecting;
  const open = () => {
    connecting ??= (async () => {
      const connect = connectImpl ?? (await import('@nats-io/transport-node')).connect;
      return connect({ servers: url, user: VERIFIER_USER, pass: password, inboxPrefix: VERIFIER_INBOX,
        name: 'samval-org-document-verifier', tls: caPem ? { ca: caPem } : {}, timeout: BUS_TIMEOUT_MS,
        reconnect: true, maxReconnectAttempts: -1 });
    })().catch(error => { connecting = undefined; throw error; });
    return connecting.then(connection => {
      if (!connection.isClosed()) return connection;
      connecting = undefined;
      return open();
    });
  };
  return async (subject, body) => {
    if (!url || !password) throw new Error('bus_not_configured');
    const answer = await (await open()).request(subject, JSON.stringify(body), { timeout: BUS_TIMEOUT_MS });
    return answer.json();
  };
}

/**
 * `request(subject, body)` pregunta al bus; `validateToken({ token, remoteip, action })` comprueba
 * Turnstile. Devuelve `{status, body}` para `POST /api/verify` con `{school, kid, fingerprint, token}`.
 */
export function createDocumentVerifier({ request, validateToken, requireChallenge = true, origins = PUBLIC_ORIGINS,
  allow = createRateLimiter(), salt = '' }) {
  const ipKey = ip => crypto.createHash('sha256').update(`${salt}:verify:${ip}`).digest('hex');
  return async function verify({ origin, ip, body }) {
    if (!origins.includes(origin)) return failure(403, 'forbidden');
    if (!allow(ipKey(ip))) return failure(429, 'rate_limited');
    const { school, kid, fingerprint, token } = body ?? {};
    if (!UUID.test(school ?? '') || !KID.test(kid ?? '') || !FINGERPRINT.test(fingerprint ?? '')
      || typeof token !== 'string' || token.length > 2048) return failure(400, 'invalid');
    const challenge = await validateToken({ token, remoteip: ip, action: 'verify' });
    if (challenge.skipped && requireChallenge) return UNAVAILABLE;
    if (!challenge.success) return failure(403, 'challenge');
    let key, status;
    try {
      [key, status] = await Promise.all([request(SUBJECTS.key, { school, kid }), request(SUBJECTS.status, { school, fingerprint })]);
    } catch (error) {
      console.error('document_verifier_unavailable', error?.code ?? error?.name ?? 'error');
      return UNAVAILABLE;
    }
    const publicKey = key?.publicKey === null || PUBLIC_KEY.test(key?.publicKey ?? '') ? key.publicKey : undefined;
    const known = status?.state === null || status?.state === 'annulled'
      || (status?.state === 'replaced' && Number.isInteger(status.version) && status.version > 1);
    if (publicKey === undefined || !known) return UNAVAILABLE;
    // Sin llave no hay documento que describir: la respuesta no dice nada más del colegio.
    if (!publicKey) return { status: 200, body: { ok: true, publicKey: null, state: null } };
    return { status: 200, body: { ok: true, publicKey, state: status.state,
      ...(status.state === 'replaced' ? { version: status.version } : {}) } };
  };
}

const SECURITY_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
  'content-security-policy': "default-src 'none'; frame-ancestors 'none'",
  'cross-origin-resource-policy': 'same-origin',
};

const readBody = req => new Promise((resolve, reject) => {
  const chunks = [];
  let size = 0;
  req.on('data', chunk => {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) { req.pause(); reject(new Error('too_large')); return; }
    chunks.push(chunk);
  });
  req.on('error', reject);
  req.on('end', () => {
    try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { resolve(null); }
  });
});

/** HTTP de `/api/verify`: sólo POST (y su preflight), JSON de 4 KiB como mucho, CORS sólo para `origins`. */
export function createVerifyRoute(verify, { origins = PUBLIC_ORIGINS, clientIp }) {
  return async (req, res) => {
    const origin = req.headers.origin ?? '';
    const headers = { ...SECURITY_HEADERS, vary: 'Origin' };
    if (origins.includes(origin)) Object.assign(headers, { 'access-control-allow-origin': origin,
      'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '600' });
    for (const name of ['access-control-allow-origin', 'access-control-allow-methods', 'access-control-allow-headers']) res.removeHeader(name);
    const send = ({ status, body }) => { res.writeHead(status, headers); res.end(body === undefined ? undefined : JSON.stringify(body)); };
    if (req.method === 'OPTIONS') return send({ status: origins.includes(origin) ? 204 : 403 });
    if (req.method !== 'POST') return send(failure(405, 'method_not_allowed'));
    if (!String(req.headers['content-type'] ?? '').startsWith('application/json')) return send(failure(415, 'json_required'));
    let body;
    try { body = await readBody(req); } catch {
      // Se contesta y se corta la conexión: el resto del cuerpo no se lee.
      headers.connection = 'close';
      res.once('finish', () => req.destroy());
      return send(failure(413, 'too_large'));
    }
    return send(await verify({ origin, ip: clientIp(req), body }));
  };
}
