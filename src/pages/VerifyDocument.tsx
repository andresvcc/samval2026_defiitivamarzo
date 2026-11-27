import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldX, ShieldAlert, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { documentRows, verifyDocument } from '../utils/document-verification.mjs';

type Outcome = Awaited<ReturnType<typeof verifyDocument>> | { status: 'checking' } | { status: 'missing' };

const API_BASE_URL = (import.meta.env.VITE_SAMVAL_API_BASE_URL || '/api').replace(/\/$/, '');

// La llave pública del colegio; null si Samval no la tiene registrada, error si no se pudo consultar.
const lookupKey = async (school: string, kid: string) => {
  const response = await fetch(`${API_BASE_URL}/document-keys/${encodeURIComponent(school)}/${encodeURIComponent(kid)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('document_key_unavailable');
  return ((await response.json()) as { publicKey?: string }).publicKey ?? null;
};

const messages = {
  invalid: { icon: ShieldX, tone: 'text-samval-guinda', title: 'No válido', text: 'Este código no corresponde a un documento firmado por un colegio registrado en Samval, o el documento fue alterado.' },
  unavailable: { icon: ShieldAlert, tone: 'text-stone-600', title: 'No se pudo comprobar ahora', text: 'Intente de nuevo en unos minutos. Esto no indica que el documento sea falso.' },
  unsupported: { icon: ShieldAlert, tone: 'text-stone-600', title: 'Navegador no compatible', text: 'Actualice su navegador o use otro para verificar este documento.' },
  missing: { icon: ShieldAlert, tone: 'text-stone-600', title: 'Escanee el código QR', text: 'Para verificar un documento escanee el código QR impreso en él. Por privacidad, esta página no conserva el documento al recargarla.' },
} as const;

const VerifyDocument: React.FC = () => {
  const [outcome, setOutcome] = useState<Outcome>({ status: 'checking' });

  useEffect(() => {
    let current = 0;
    const check = () => {
      const hash = window.location.hash, run = ++current;
      // El documento sólo vive en el fragmento: se quita de la barra y del historial en cuanto se lee.
      if (hash) window.history.replaceState(window.history.state, '', window.location.pathname);
      if (!hash) { setOutcome({ status: 'missing' }); return; }
      setOutcome({ status: 'checking' });
      void verifyDocument(hash, lookupKey).then(result => { if (run === current) setOutcome(result); });
    };
    check();
    // Otro QR abierto en la misma pestaña sólo cambia el fragmento.
    window.addEventListener('hashchange', check);
    return () => { current = -1; window.removeEventListener('hashchange', check); };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4" style={{ background: '#e0d6cc' }}>
      <SEO title="Verificar documento | SAMVAL" description="Verificación de documentos escolares firmados con Samval." />
      <meta name="robots" content="noindex" />
      <article className="neu-raised-lg w-full max-w-xl p-6 sm:p-8" style={{ borderRadius: '28px' }} aria-live="polite">
        {outcome.status === 'checking' && (
          <div className="flex items-center gap-3 text-stone-600 font-bold">
            <Loader2 className="animate-spin" size={22} aria-hidden="true" /> Verificando el documento…
          </div>
        )}
        {outcome.status === 'valid' && (
          <>
            <div className="flex items-center gap-3 text-emerald-800">
              <ShieldCheck size={36} aria-hidden="true" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Documento auténtico</h1>
            </div>
            <p className="mt-3 text-stone-600 font-medium">Firmado por el colegio. Compare estos datos con el papel.</p>
            <dl className="mt-6 divide-y divide-stone-300/70 border-y border-stone-300/70">
              {documentRows(outcome.summary).map(([label, value]) => (
                <div key={label} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5 text-sm sm:text-base">
                  <dt className="font-black text-stone-500">{label}</dt>
                  <dd className="font-bold text-stone-800 break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
        {outcome.status in messages && (() => {
          const { icon: Icon, tone, title, text } = messages[outcome.status as keyof typeof messages];
          return (
            <>
              <div className={`flex items-center gap-3 ${tone}`}>
                <Icon size={36} aria-hidden="true" />
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h1>
              </div>
              <p className="mt-3 text-stone-600 font-medium">{text}</p>
            </>
          );
        })()}
      </article>
    </div>
  );
};

export default VerifyDocument;
