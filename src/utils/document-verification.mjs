// Verifica en el navegador los documentos del agente escolar (formato v1, contrato en
// samval-school-agent apps/school-agent-actix/docs/issued-documents.md). El QR lleva
// `{base}#{base64url(resumen canónico)}.{base64url(firma Ed25519)}`; el fragmento nunca sale del
// navegador: al servidor sólo se le pide la llave pública del colegio (`s`) con ese id (`i`).

const CONTEXT = new TextEncoder().encode('samval.issued-document.v1\0');
const B64URL = /^[A-Za-z0-9_-]+$/;
const KID = /^[A-Za-z0-9_-]{11}$/;
const MAX_FRAGMENT = 4096;

export const DOCUMENT_KINDS = { CER: 'Certificado de estudio', CON: 'Constancia de matrícula', BOL: 'Boletín' };

const fromBase64Url = text => {
  if (!B64URL.test(text) || text.length % 4 === 1) return null;
  const binary = atob(text.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - text.length % 4) % 4));
  return Uint8Array.from(binary, char => char.charCodeAt(0));
};

const text = value => typeof value === 'string' && value.length > 0 && value.length <= 300;

/** El resumen y la firma del fragmento, o null si no tiene la forma v1. */
export function parseFragment(hash) {
  const fragment = String(hash ?? '').replace(/^#/, '');
  if (!fragment || fragment.length > MAX_FRAGMENT) return null;
  const parts = fragment.split('.');
  if (parts.length !== 2) return null;
  const canonical = fromBase64Url(parts[0]), signature = fromBase64Url(parts[1]);
  if (!canonical || signature?.length !== 64) return null;
  let summary;
  try { summary = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(canonical)); } catch { return null; }
  if (!summary || typeof summary !== 'object' || summary.v !== 1 || !text(summary.s) || !KID.test(summary.i ?? '')
    || !(summary.k in DOCUMENT_KINDS) || !text(summary.n) || !Number.isInteger(summary.r) || !text(summary.t)
    || !text(summary.c) || !text(summary.p) || !text(summary.g) || !text(summary.h) || !Number.isInteger(summary.y)) return null;
  return { canonical, signature, summary };
}

/**
 * `lookupKey(school, kid)` devuelve la llave pública en base64url, null si Samval no la conoce, o
 * lanza si no se pudo consultar. Resultado: `valid` (con el resumen), `invalid`, `unavailable`
 * (no se pudo consultar ahora) o `unsupported` (el navegador no verifica Ed25519).
 */
export async function verifyDocument(hash, lookupKey, subtle = globalThis.crypto?.subtle) {
  const parsed = parseFragment(hash);
  if (!parsed) return { status: 'invalid' };
  const { canonical, signature, summary } = parsed;
  let publicKey;
  try { publicKey = await lookupKey(summary.s, summary.i); } catch { return { status: 'unavailable' }; }
  const raw = publicKey ? fromBase64Url(publicKey) : null;
  if (raw?.length !== 32) return { status: 'invalid' };
  const message = new Uint8Array(CONTEXT.length + canonical.length);
  message.set(CONTEXT);
  message.set(canonical, CONTEXT.length);
  let key;
  try { key = await subtle.importKey('raw', raw, { name: 'Ed25519' }, false, ['verify']); } catch { return { status: 'unsupported' }; }
  try {
    return await subtle.verify({ name: 'Ed25519' }, key, signature, message) ? { status: 'valid', summary } : { status: 'invalid' };
  } catch {
    return { status: 'invalid' };
  }
}

/** Nombre abreviado: el primero completo y las iniciales del resto («Ana M. N. P.»). */
export function abbreviatedName(name) {
  const [first = '', ...rest] = String(name).trim().split(/\s+/);
  return [first, ...rest.map(part => `${[...part][0]?.toLocaleUpperCase('es') ?? ''}.`)].join(' ');
}

/** «TI 0704» → «TI ••••0704». */
export function maskedIdentity(value) {
  const [type, last] = String(value ?? '').split(' ');
  return type && last ? `${type} ••••${last}` : '';
}

/** Lo que la página muestra de un documento auténtico, en orden. */
export function documentRows(summary) {
  return [
    ['Colegio', summary.d ? `${summary.c} (DANE ${summary.d})` : summary.c],
    ['Documento', DOCUMENT_KINDS[summary.k]],
    ['Número', summary.r > 1 ? `${summary.n} (versión ${summary.r})` : summary.n],
    ['Expedido', summary.t],
    ['Estudiante', abbreviatedName(summary.p)],
    ...(summary.x ? [['Identificación', maskedIdentity(summary.x)]] : []),
    ['Grado y grupo', `${summary.g} ${summary.h}`],
    ['Año escolar', String(summary.y)],
    ...(summary.k === 'BOL' && summary.e ? [['Periodo', summary.e]] : []),
    ...(summary.k === 'BOL' && summary.a ? [['Promedio', summary.a]] : []),
  ];
}
