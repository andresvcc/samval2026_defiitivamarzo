import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { abbreviatedName, documentFingerprint, documentRows, maskedIdentity, parseFragment, verifyDocument } from '../src/utils/document-verification.mjs';
import { createBusRequester, createDocumentVerifier, createRateLimiter, createVerifyRoute, SUBJECTS } from '../server/document-verifier.mjs';

// Vector público v1 del agente escolar (apps/school-agent-actix/docs/contracts/issued-document-v1.vector.json).
const VECTOR = {
  kid: '_oEsEvOrTOY',
  publicKey: '6kpsY-KcUgq-9VB7Ey7F-ZVHdq6-vnuSQh7qaRRG0iw',
  canonical: 'eyJjIjoiQ29sZWdpbyBkZSBQcnVlYmEiLCJkIjoiMTIzNDU2Nzg5MDEyIiwiZyI6IlNleHRvIiwiaCI6IkEiLCJpIjoiX29Fc0V2T3JUT1kiLCJrIjoiQ0VSIiwibiI6IkNFUi0yMDI2LTAwMDEiLCJwIjoiQW5hIE1hcsOtYSBOw7rDsWV6IFBlw7FhIiwiciI6MSwicyI6InNjaG9vbC0wMSIsInQiOiIyMDI2LTExLTI1IiwidiI6MSwieCI6IlRJIDA3MDQiLCJ5IjoyMDI2fQ',
  tamperedCanonical: 'eyJjIjoiQ29sZWdpbyBkZSBQcnVlYmEiLCJkIjoiMTIzNDU2Nzg5MDEyIiwiZyI6IlNleHRvIiwiaCI6IkEiLCJpIjoiX29Fc0V2T3JUT1kiLCJrIjoiQ0VSIiwibiI6IkNFUi0yMDI2LTAwMDEiLCJwIjoiQW5hIE1hcsOtYSBOw7puZXogUGXDsWEiLCJyIjoxLCJzIjoic2Nob29sLTAxIiwidCI6IjIwMjYtMTEtMjUiLCJ2IjoxLCJ4IjoiVEkgMDcwNCIsInkiOjIwMjZ9',
  signature: 'TeA6NV9YL8B_MBds_RKBBAy1M5yG1z3E11-dxSlIxNZ3ou9KDMel0OPIXFkDG-0YqeVxR4cHSV81tQ3Wi4hlBA',
  fingerprint: 'fKd5dfaXrdP1Re8nV_Fo_w',
};
const url = `https://samval.org/v#${VECTOR.canonical}.${VECTOR.signature}`;
const hash = new URL(url).hash;
// Lo que contestaría el verificador: la llave si el colegio y el kid coinciden, y `state` para esa huella.
const answer = (state = null, version) => async ({ school, kid, fingerprint }) => {
  assert.equal(fingerprint, VECTOR.fingerprint);
  return school === 'school-01' && kid === VECTOR.kid
    ? { publicKey: VECTOR.publicKey, state, ...(version ? { version } : {}) } : { publicKey: null, state: null };
};
const knownKey = answer();

test('the v1 vector verifies and shows only the signed facts, abbreviated', async () => {
  const result = await verifyDocument(hash, knownKey);
  assert.equal(result.status, 'valid');
  assert.deepEqual(documentRows(result.summary), [
    ['Colegio', 'Colegio de Prueba (DANE 123456789012)'],
    ['Documento', 'Certificado de estudio'],
    ['Número', 'CER-2026-0001'],
    ['Expedido', '2026-11-25'],
    ['Estudiante', 'Ana M. N. P.'],
    ['Identificación', 'TI ••••0704'],
    ['Grado y grupo', 'Sexto A'],
    ['Año escolar', '2026'],
  ]);
  const { canonical, signature } = parseFragment(hash);
  assert.equal(await documentFingerprint(canonical, signature), VECTOR.fingerprint, 'same print as the agent');
});

test('tampered, unknown, foreign-key and malformed codes are not valid', async () => {
  const any = async () => ({ publicKey: VECTOR.publicKey, state: null });
  assert.deepEqual(await verifyDocument(`#${VECTOR.tamperedCanonical}.${VECTOR.signature}`, any), { status: 'invalid' });
  assert.deepEqual(await verifyDocument(hash, async () => ({ publicKey: null, state: null })), { status: 'invalid' });
  assert.deepEqual(await verifyDocument(hash, async () => ({ publicKey: 'A'.repeat(43), state: null })), { status: 'invalid' });
  let asked = 0;
  for (const bad of ['', '#', '#abc', `#${VECTOR.canonical}`, `#${VECTOR.canonical}.${VECTOR.signature}.x`, `#${VECTOR.canonical}.AAAA`, '#e30.' + VECTOR.signature])
    assert.deepEqual(await verifyDocument(bad, async () => { asked++; return {}; }), { status: 'invalid' }, bad);
  assert.equal(asked, 0, 'a malformed code never reaches the verifier');
  assert.deepEqual(await verifyDocument(hash, async () => { throw new Error('down'); }), { status: 'unavailable' });
  assert.equal(parseFragment(hash).summary.n, 'CER-2026-0001');
});

test('bulletins show period and average; names and documents are masked', () => {
  const rows = documentRows({ c: 'C', k: 'BOL', n: 'BOL-2026-0003', r: 2, t: '2026-11-27', p: 'José', g: 'Once', h: 'B', y: 2026, e: 'Periodo 2', a: '4,25' });
  assert.deepEqual(rows.slice(2, 3), [['Número', 'BOL-2026-0003 (versión 2)']]);
  assert.deepEqual(rows.slice(-2), [['Periodo', 'Periodo 2'], ['Promedio', '4,25']]);
  assert.equal(abbreviatedName('  María  de los Ángeles Ñuñez '), 'María D. L. Á. Ñ.');
  assert.equal(maskedIdentity('CC 2849'), 'CC ••••2849');
  assert.equal(maskedIdentity(undefined), '');
});

test('a valid signature then says annulled or replaced; a forged one ignores the state', async () => {
  assert.deepEqual(await verifyDocument(hash, answer('annulled')), { status: 'annulled', summary: parseFragment(hash).summary });
  assert.equal((await verifyDocument(hash, answer('replaced', 3))).replacedBy, 3);
  assert.equal((await verifyDocument(hash, answer('replaced', 1))).replacedBy, undefined, 'never an older version');
  const forged = async () => ({ publicKey: VECTOR.publicKey, state: 'annulled' });
  assert.deepEqual(await verifyDocument(`#${VECTOR.tamperedCanonical}.${VECTOR.signature}`, forged), { status: 'invalid' });
});

const SCHOOL = '0b6f6f4e-1d2c-4a5b-8c9d-0e1f2a3b4c5d';
const QUERY = { school: SCHOOL, kid: VECTOR.kid, fingerprint: VECTOR.fingerprint, token: 'tok' };
// Doble del bus: contesta como Admin y apunta cada pregunta.
const busDouble = (answers = {}) => {
  const asked = [];
  const request = async (subject, body) => {
    asked.push([subject, body]);
    if (answers.fail) throw Object.assign(new Error('timeout'), { code: 'TIMEOUT' });
    return subject === SUBJECTS.key ? answers.key ?? { publicKey: VECTOR.publicKey } : answers.status ?? { state: null };
  };
  return { asked, request };
};
const passed = async () => ({ success: true });
const verifier = (bus, options = {}) => createDocumentVerifier({ request: bus.request, validateToken: passed, salt: 's', ...options });
const ask = (verify, body = QUERY, extra = {}) => verify({ origin: 'https://samval.org', ip: '203.0.113.7', body, ...extra });

test('the verifier asks the bus only the two questions, with the fingerprint, after the challenge', async () => {
  const bus = busDouble({ status: { state: 'replaced', version: 2 } });
  assert.deepEqual(await ask(verifier(bus)), { status: 200, body: { ok: true, publicKey: VECTOR.publicKey, state: 'replaced', version: 2 } });
  assert.deepEqual(bus.asked, [[SUBJECTS.key, { school: SCHOOL, kid: VECTOR.kid }], [SUBJECTS.status, { school: SCHOOL, fingerprint: VECTOR.fingerprint }]]);
  const unknown = busDouble({ key: { publicKey: null }, status: { state: 'annulled' } });
  assert.deepEqual((await ask(verifier(unknown))).body, { ok: true, publicKey: null, state: null }, 'an unknown school says nothing more');
  let tokens = [];
  const failed = verifier(bus, { validateToken: async input => { tokens.push(input); return { success: false }; } });
  bus.asked.length = 0;
  assert.deepEqual(await ask(failed), { status: 403, body: { ok: false, error: 'challenge' } });
  assert.deepEqual(tokens, [{ token: 'tok', remoteip: '203.0.113.7', action: 'verify' }]);
  assert.equal(bus.asked.length, 0, 'no bus question without a passed challenge');
  const skipped = async () => ({ success: true, skipped: true });
  assert.equal((await ask(verifier(bus, { validateToken: skipped }))).status, 503, 'production never runs without Turnstile');
  assert.equal((await ask(verifier(bus, { validateToken: skipped, requireChallenge: false }))).status, 200);
});

test('the verifier refuses foreign origins, bad input and floods, and fails closed on the bus', async () => {
  const bus = busDouble(), verify = verifier(bus);
  for (const origin of ['https://evil.example', 'http://samval.org', '', 'https://samval.org.evil.example'])
    assert.equal((await ask(verify, QUERY, { origin })).status, 403, origin);
  for (const body of [null, {}, { ...QUERY, school: 'school-01' }, { ...QUERY, kid: '../x' }, { ...QUERY, fingerprint: 'CER-2026-0001' },
    { ...QUERY, number: 'CER-2026-0001', fingerprint: undefined }, { ...QUERY, token: 7 }, { ...QUERY, token: 'x'.repeat(2049) }])
    assert.deepEqual(await ask(verify, body), { status: 400, body: { ok: false, error: 'invalid' } }, JSON.stringify(body));
  assert.equal(bus.asked.length, 0);
  const limited = verifier(bus, { allow: createRateLimiter({ limit: 2, windowMs: 60000, maxTracked: 10 }) });
  assert.deepEqual([(await ask(limited)).status, (await ask(limited)).status, (await ask(limited)).status], [200, 200, 429]);
  assert.equal((await ask(limited, QUERY, { ip: '198.51.100.1' })).status, 200, 'the limit is per IP');
  for (const answers of [{ fail: true }, { key: { publicKey: 'short' } }, { status: { state: 'replaced', version: 1 } }, { status: { state: 'weird' } }, { key: {} }])
    assert.deepEqual(await ask(verifier(busDouble(answers))), { status: 503, body: { ok: false, error: 'unavailable' } }, JSON.stringify(answers));
  await assert.rejects(createBusRequester({})(SUBJECTS.key, {}), /bus_not_configured/);
});

test('the bus requester connects once as document-verifier with its own inbox and a two-second timeout', async () => {
  const connects = [], requests = [];
  const connection = { isClosed: () => false, request: async (subject, data, options) => {
    requests.push([subject, JSON.parse(data), options]); return { json: () => ({ publicKey: null }) }; } };
  const request = createBusRequester({ url: 'tls://agentes.example.test:4222', password: 'p', caPem: 'PEM',
    connectImpl: async options => { connects.push(options); return connection; } });
  await Promise.all([request(SUBJECTS.key, { school: SCHOOL, kid: VECTOR.kid }), request(SUBJECTS.status, { school: SCHOOL, fingerprint: VECTOR.fingerprint })]);
  await request(SUBJECTS.key, { school: SCHOOL, kid: VECTOR.kid });
  assert.equal(connects.length, 1, 'simultaneous questions share one connection');
  assert.deepEqual({ ...connects[0], pass: undefined }, { servers: 'tls://agentes.example.test:4222', user: 'document-verifier', pass: undefined,
    inboxPrefix: '_INBOX.document-verifier', name: 'samval-org-document-verifier', tls: { ca: 'PEM' }, timeout: 2000,
    reconnect: true, maxReconnectAttempts: -1 });
  assert.deepEqual(requests.map(([subject, , options]) => [subject, options.timeout]), [[SUBJECTS.key, 2000], [SUBJECTS.status, 2000], [SUBJECTS.key, 2000]]);
});

test('POST /api/verify: CORS only for samval.org, no other methods, small JSON, security headers', async t => {
  const bus = busDouble();
  const route = createVerifyRoute(verifier(bus), { clientIp: () => '203.0.113.9' });
  const server = http.createServer((req, res) => void route(req, res));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => server.close());
  const url = `http://127.0.0.1:${server.address().port}/api/verify`;
  const post = (body, headers = {}) => fetch(url, { method: 'POST', headers: { origin: 'https://www.samval.org', 'content-type': 'application/json', ...headers }, body });
  const ok = await post(JSON.stringify(QUERY));
  assert.equal(ok.status, 200);
  assert.equal(ok.headers.get('access-control-allow-origin'), 'https://www.samval.org');
  for (const [name, value] of [['cache-control', 'no-store'], ['x-content-type-options', 'nosniff'], ['referrer-policy', 'no-referrer'],
    ['content-security-policy', "default-src 'none'; frame-ancestors 'none'"], ['access-control-allow-methods', 'POST']])
    assert.equal(ok.headers.get(name), value, name);
  const foreign = await post(JSON.stringify(QUERY), { origin: 'https://evil.example' });
  assert.equal(foreign.status, 403);
  assert.equal(foreign.headers.get('access-control-allow-origin'), null);
  assert.equal((await fetch(url, { method: 'OPTIONS', headers: { origin: 'https://evil.example' } })).status, 403);
  assert.equal((await fetch(url, { method: 'OPTIONS', headers: { origin: 'https://samval.org' } })).status, 204);
  assert.equal((await fetch(url)).status, 405);
  assert.equal((await fetch(url, { method: 'PUT', headers: { origin: 'https://samval.org' } })).status, 405);
  assert.equal((await post(JSON.stringify(QUERY), { 'content-type': 'text/plain' })).status, 415);
  assert.equal((await post(JSON.stringify({ ...QUERY, pad: 'x'.repeat(5000) }))).status, 413);
  assert.equal((await post('{nope')).status, 400);
});
