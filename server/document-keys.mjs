// Consultas públicas a Admin (SAMVAL_ADMIN_URL, p. ej. https://<admin>) para la página /v:
// GET /api/document-keys/:school/:kid → {publicKey} y GET /api/document-status/:school/:number →
// {version, annulled}. Sólo viajan el id del colegio, el de la llave y el número: la página verifica
// la firma en el navegador y nunca envía el documento.
const PATH = /^\/api\/document-keys\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/([A-Za-z0-9_-]{11})$/;
const PUBLIC_KEY = /^[A-Za-z0-9_-]{43}$/;
const STATUS_PATH = /^\/api\/document-status\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/((?:CER|CON|BOL)-[0-9]{4}-[0-9]{4,6})$/;
const CACHE_LIMIT = 1000;
const UNAVAILABLE = { status: 503, body: { ok: false, error: 'unavailable' } };
const NOT_FOUND = { status: 404, body: { ok: false, error: 'not_found' } };

export const isDocumentKeyPath = pathname => pathname.startsWith('/api/document-keys/');
export const isDocumentStatusPath = pathname => pathname.startsWith('/api/document-status/');

export function createDocumentKeyLookup({ adminUrl, fetchImpl = fetch, timeoutMs = 5000 } = {}) {
  // Una llave registrada no cambia nunca (el kid es su huella): se puede guardar sin caducidad.
  const cache = new Map();
  const base = String(adminUrl ?? '').replace(/\/$/, '');
  return async function lookup(requestUrl) {
    const match = PATH.exec(requestUrl.pathname);
    if (!match) return { status: 404, body: { ok: false, error: 'not_found' } };
    const [, school, kid] = match, id = `${school}/${kid}`;
    const cached = cache.get(id);
    if (cached) return { status: 200, body: { publicKey: cached } };
    if (!base) return { status: 503, body: { ok: false, error: 'unavailable' } };
    let response;
    try {
      response = await fetchImpl(`${base}/api/document-keys/${school}/${kid}`, { signal: AbortSignal.timeout(timeoutMs), headers: { accept: 'application/json' } });
    } catch {
      return { status: 503, body: { ok: false, error: 'unavailable' } };
    }
    if (response.status === 404) return { status: 404, body: { ok: false, error: 'not_found' } };
    const found = response.ok ? await response.json().catch(() => null) : null;
    if (found?.kid !== kid || !PUBLIC_KEY.test(found?.publicKey ?? '')) return { status: 503, body: { ok: false, error: 'unavailable' } };
    if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value);
    cache.set(id, found.publicKey);
    return { status: 200, body: { publicKey: found.publicKey } };
  };
}

/** El estado no se guarda: un documento puede anularse en cualquier momento. 404 = sin novedad. */
export function createDocumentStatusLookup({ adminUrl, fetchImpl = fetch, timeoutMs = 5000 } = {}) {
  const base = String(adminUrl ?? '').replace(/\/$/, '');
  return async function lookup(requestUrl) {
    const match = STATUS_PATH.exec(requestUrl.pathname);
    if (!match) return NOT_FOUND;
    if (!base) return UNAVAILABLE;
    const [, school, number] = match;
    let response;
    try {
      response = await fetchImpl(`${base}/api/document-status/${school}/${number}`, { signal: AbortSignal.timeout(timeoutMs), headers: { accept: 'application/json' } });
    } catch {
      return UNAVAILABLE;
    }
    if (response.status === 404) return NOT_FOUND;
    const found = response.ok ? await response.json().catch(() => null) : null;
    if (found?.number !== number || !Number.isInteger(found?.version) || found.version < 1 || typeof found?.annulled !== 'boolean') return UNAVAILABLE;
    return { status: 200, body: { version: found.version, annulled: found.annulled } };
  };
}
