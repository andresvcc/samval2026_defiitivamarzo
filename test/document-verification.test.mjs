import test from 'node:test';
import assert from 'node:assert/strict';
import { abbreviatedName, documentRows, maskedIdentity, parseFragment, verifyDocument } from '../src/utils/document-verification.mjs';
import { createDocumentKeyLookup, createDocumentStatusLookup } from '../server/document-keys.mjs';

// Vector público v1 del agente escolar (apps/school-agent-actix/docs/contracts/issued-document-v1.vector.json).
const VECTOR = {
  kid: '_oEsEvOrTOY',
  publicKey: '6kpsY-KcUgq-9VB7Ey7F-ZVHdq6-vnuSQh7qaRRG0iw',
  canonical: 'eyJjIjoiQ29sZWdpbyBkZSBQcnVlYmEiLCJkIjoiMTIzNDU2Nzg5MDEyIiwiZyI6IlNleHRvIiwiaCI6IkEiLCJpIjoiX29Fc0V2T3JUT1kiLCJrIjoiQ0VSIiwibiI6IkNFUi0yMDI2LTAwMDEiLCJwIjoiQW5hIE1hcsOtYSBOw7rDsWV6IFBlw7FhIiwiciI6MSwicyI6InNjaG9vbC0wMSIsInQiOiIyMDI2LTExLTI1IiwidiI6MSwieCI6IlRJIDA3MDQiLCJ5IjoyMDI2fQ',
  tamperedCanonical: 'eyJjIjoiQ29sZWdpbyBkZSBQcnVlYmEiLCJkIjoiMTIzNDU2Nzg5MDEyIiwiZyI6IlNleHRvIiwiaCI6IkEiLCJpIjoiX29Fc0V2T3JUT1kiLCJrIjoiQ0VSIiwibiI6IkNFUi0yMDI2LTAwMDEiLCJwIjoiQW5hIE1hcsOtYSBOw7puZXogUGXDsWEiLCJyIjoxLCJzIjoic2Nob29sLTAxIiwidCI6IjIwMjYtMTEtMjUiLCJ2IjoxLCJ4IjoiVEkgMDcwNCIsInkiOjIwMjZ9',
  signature: 'TeA6NV9YL8B_MBds_RKBBAy1M5yG1z3E11-dxSlIxNZ3ou9KDMel0OPIXFkDG-0YqeVxR4cHSV81tQ3Wi4hlBA',
};
const url = `https://samval.org/v#${VECTOR.canonical}.${VECTOR.signature}`;
const hash = new URL(url).hash;
const knownKey = async (school, kid) => (school === 'school-01' && kid === VECTOR.kid ? VECTOR.publicKey : null);

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
});

test('tampered, unknown, foreign-key and malformed codes are not valid', async () => {
  assert.deepEqual(await verifyDocument(`#${VECTOR.tamperedCanonical}.${VECTOR.signature}`, knownKey), { status: 'invalid' });
  assert.deepEqual(await verifyDocument(hash, async () => null), { status: 'invalid' });
  const otherKey = 'A'.repeat(42) + 'A';
  assert.deepEqual(await verifyDocument(hash, async () => otherKey), { status: 'invalid' });
  for (const bad of ['', '#', '#abc', `#${VECTOR.canonical}`, `#${VECTOR.canonical}.${VECTOR.signature}.x`, `#${VECTOR.canonical}.AAAA`, '#e30.' + VECTOR.signature])
    assert.deepEqual(await verifyDocument(bad, knownKey), { status: 'invalid' }, bad);
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

test('the key lookup proxies only well-formed ids to Admin and caches found keys', async () => {
  const school = '0b6f6f4e-1d2c-4a5b-8c9d-0e1f2a3b4c5d', calls = [];
  const fetchImpl = async target => {
    calls.push(target);
    if (target.endsWith(`/${VECTOR.kid}`)) return new Response(JSON.stringify({ kid: VECTOR.kid, publicKey: VECTOR.publicKey, validFrom: 1 }));
    return new Response('{"code":"not_found"}', { status: 404 });
  };
  const lookup = createDocumentKeyLookup({ adminUrl: 'https://admin.example.test/', fetchImpl });
  const at = path => new URL(path, 'https://samval.org');
  assert.deepEqual(await lookup(at(`/api/document-keys/${school}/${VECTOR.kid}`)), { status: 200, body: { publicKey: VECTOR.publicKey } });
  assert.deepEqual(await lookup(at(`/api/document-keys/${school}/${VECTOR.kid}`)), { status: 200, body: { publicKey: VECTOR.publicKey } });
  assert.deepEqual(calls, [`https://admin.example.test/api/document-keys/${school}/${VECTOR.kid}`]);
  assert.equal((await lookup(at(`/api/document-keys/${school}/AAAAAAAAAAA`))).status, 404);
  for (const path of [`/api/document-keys/school-01/${VECTOR.kid}`, `/api/document-keys/${school}/..%2Fx`, `/api/document-keys/${school}`])
    assert.equal((await lookup(at(path))).status, 404, path);
  assert.equal(calls.length, 2, 'malformed ids never reach Admin');
  assert.equal((await createDocumentKeyLookup({})(at(`/api/document-keys/${school}/${VECTOR.kid}`))).status, 503);
  const down = createDocumentKeyLookup({ adminUrl: 'https://admin.example.test', fetchImpl: async () => { throw new Error('down'); } });
  assert.equal((await down(at(`/api/document-keys/${school}/${VECTOR.kid}`))).status, 503);
});

test('a valid signature then says annulled or replaced by the current version, asking only after it verifies', async () => {
  const asked = [];
  const status = current => async (school, number) => { asked.push(`${school}/${number}`); return current; };
  assert.deepEqual(await verifyDocument(hash, knownKey, status({ version: 1, annulled: true })),
    { status: 'annulled', summary: parseFragment(hash).summary });
  assert.equal((await verifyDocument(hash, knownKey, status({ version: 3, annulled: false }))).replacedBy, 3);
  const same = await verifyDocument(hash, knownKey, status(null));
  assert.equal(same.status, 'valid');
  assert.equal(same.replacedBy, undefined);
  assert.equal((await verifyDocument(hash, knownKey, async () => { throw new Error('down'); })).statusUnknown, true);
  assert.deepEqual(asked, ['school-01/CER-2026-0001', 'school-01/CER-2026-0001', 'school-01/CER-2026-0001']);
  await verifyDocument(`#${VECTOR.tamperedCanonical}.${VECTOR.signature}`, knownKey, status({ version: 1, annulled: true }));
  assert.equal(asked.length, 3, 'a forged code never queries the status');
});

test('the status lookup proxies only well-formed numbers to Admin and never caches', async () => {
  const school = '0b6f6f4e-1d2c-4a5b-8c9d-0e1f2a3b4c5d', calls = [];
  const fetchImpl = async target => {
    calls.push(target);
    if (target.endsWith('/BOL-2026-0003')) return new Response(JSON.stringify({ number: 'BOL-2026-0003', version: 2, annulled: true }));
    return new Response('{"code":"not_found"}', { status: 404 });
  };
  const lookup = createDocumentStatusLookup({ adminUrl: 'https://admin.example.test/', fetchImpl });
  const at = path => new URL(path, 'https://samval.org');
  for (let i = 0; i < 2; i++)
    assert.deepEqual(await lookup(at(`/api/document-status/${school}/BOL-2026-0003`)), { status: 200, body: { version: 2, annulled: true } });
  assert.deepEqual(calls, Array(2).fill(`https://admin.example.test/api/document-status/${school}/BOL-2026-0003`));
  assert.equal((await lookup(at(`/api/document-status/${school}/CER-2026-0001`))).status, 404);
  for (const path of [`/api/document-status/school-01/BOL-2026-0003`, `/api/document-status/${school}/..%2Fx`, `/api/document-status/${school}/Ana`])
    assert.equal((await lookup(at(path))).status, 404, path);
  assert.equal(calls.length, 3, 'malformed numbers never reach Admin');
  assert.equal((await createDocumentStatusLookup({})(at(`/api/document-status/${school}/BOL-2026-0003`))).status, 503);
  const odd = createDocumentStatusLookup({ adminUrl: 'https://admin.example.test', fetchImpl: async () => new Response('{"number":"X","version":2,"annulled":true}') });
  assert.equal((await odd(at(`/api/document-status/${school}/BOL-2026-0003`))).status, 503);
});
