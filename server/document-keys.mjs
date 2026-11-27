// GET /api/document-keys/:school/:kid → {publicKey} desde el registro de Admin
// (SAMVAL_DOCUMENT_KEYS_URL, p. ej. https://<admin>/api/document-keys). Sólo viajan el id del colegio
// y el de la llave: la página verifica la firma en el navegador y nunca envía el documento.
const PATH = /^\/api\/document-keys\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/([A-Za-z0-9_-]{11})$/;
const PUBLIC_KEY = /^[A-Za-z0-9_-]{43}$/;
const CACHE_LIMIT = 1000;

export const isDocumentKeyPath = pathname => pathname.startsWith('/api/document-keys/');

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
      response = await fetchImpl(`${base}/${school}/${kid}`, { signal: AbortSignal.timeout(timeoutMs), headers: { accept: 'application/json' } });
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
