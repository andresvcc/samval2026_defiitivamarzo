import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ShieldCheck, ShieldX, ShieldAlert, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import TurnstileWidget from '../components/TurnstileWidget';
import { documentRows, parseFragment, verifyDocument } from '../utils/document-verification.mjs';

type Outcome = Awaited<ReturnType<typeof verifyDocument>> | { status: 'checking' } | { status: 'missing' } | { status: 'challenge' };
type Answer = { publicKey: string | null; state: null | 'annulled' | 'replaced'; version?: number };

const API_BASE_URL = (import.meta.env.VITE_SAMVAL_API_BASE_URL || '/api').replace(/\/$/, '');

// Una sola consulta por verificación, con el token de Turnstile: llave pública y estado por huella.
const lookupWith = (token: string) => async (query: { school: string; kid: string; fingerprint: string }) => {
  const response = await fetch(`${API_BASE_URL}/verify`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...query, token }),
  });
  if (!response.ok) throw new Error('document_verifier_unavailable');
  return (await response.json()) as Answer;
};

const messages = {
  invalid: { icon: ShieldX, tone: 'text-samval-guinda', title: 'No válido', text: 'Este código no corresponde a un documento firmado por un colegio registrado en Samval, o el documento fue alterado.' },
  unavailable: { icon: ShieldAlert, tone: 'text-stone-600', title: 'No se pudo comprobar ahora', text: 'Intente de nuevo en unos minutos. Esto no indica que el documento sea falso.' },
  unsupported: { icon: ShieldAlert, tone: 'text-stone-600', title: 'Navegador no compatible', text: 'Actualice su navegador o use otro para verificar este documento.' },
  missing: { icon: ShieldAlert, tone: 'text-stone-600', title: 'Escanee el código QR', text: 'Para verificar un documento escanee el código QR impreso en él. Por privacidad, esta página no conserva el documento al recargarla.' },
} as const;

const VerifyDocument: React.FC = () => {
  const [outcome, setOutcome] = useState<Outcome>({ status: 'checking' });
  const [challengeKey, setChallengeKey] = useState(0);
  // El fragmento leído espera aquí el token de Turnstile; `run` descarta respuestas de un QR anterior.
  const pending = useRef<{ hash: string; run: number } | null>(null);
  const runs = useRef(0);

  useEffect(() => {
    const read = () => {
      const hash = window.location.hash, run = ++runs.current;
      // El documento sólo vive en el fragmento: se quita de la barra y del historial en cuanto se lee.
      if (hash) window.history.replaceState(window.history.state, '', window.location.pathname);
      pending.current = null;
      if (!hash) { setOutcome({ status: 'missing' }); return; }
      if (!parseFragment(hash)) { setOutcome({ status: 'invalid' }); return; }
      pending.current = { hash, run };
      setOutcome({ status: 'challenge' });
      setChallengeKey(value => value + 1);
    };
    read();
    // Otro QR abierto en la misma pestaña sólo cambia el fragmento.
    window.addEventListener('hashchange', read);
    return () => { runs.current = -1; window.removeEventListener('hashchange', read); };
  }, []);

  const consult = useCallback((token: string) => {
    const job = pending.current;
    if (!job) return;
    pending.current = null;
    setOutcome({ status: 'checking' });
    void verifyDocument(job.hash, lookupWith(token)).then(result => { if (job.run === runs.current) setOutcome(result); });
  }, []);
  const onToken = useCallback((token: string) => { if (token) consult(token); }, [consult]);
  // Sin Turnstile configurado (desarrollo) se consulta sin token; en producción el servidor lo exige.
  const onAvailability = useCallback((enabled: boolean) => { if (!enabled) consult(''); }, [consult]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4" style={{ background: '#e0d6cc' }}>
      <SEO title="Verificar documento | SAMVAL" description="Verificación de documentos escolares firmados con Samval." />
      <meta name="robots" content="noindex" />
      <article className="neu-raised-lg w-full max-w-xl p-6 sm:p-8" style={{ borderRadius: '28px' }} aria-live="polite">
        {outcome.status === 'challenge' && (
          <>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-700">Verificar documento</h1>
            <p className="mt-3 mb-4 text-stone-600 font-medium">Confirme que es una persona para consultar el documento.</p>
            <TurnstileWidget action="verify" onTokenChange={onToken} onAvailabilityChange={onAvailability} resetKey={challengeKey} />
          </>
        )}
        {outcome.status === 'checking' && (
          <div className="flex items-center gap-3 text-stone-600 font-bold">
            <Loader2 className="animate-spin" size={22} aria-hidden="true" /> Verificando el documento…
          </div>
        )}
        {(outcome.status === 'valid' || outcome.status === 'annulled') && (() => {
          const verdict = outcome.status === 'annulled'
            ? { icon: ShieldX, tone: 'text-samval-guinda', title: 'Anulado', text: 'El colegio anuló este documento: ya no tiene validez.' }
            : outcome.replacedBy
              ? { icon: ShieldAlert, tone: 'text-amber-800', title: `Reemplazado por la versión ${outcome.replacedBy}`, text: 'Firmado por el colegio, pero hay una versión más reciente. Pida al colegio la vigente.' }
              : { icon: ShieldCheck, tone: 'text-emerald-800', title: 'Documento auténtico', text: 'Firmado por el colegio. Compare estos datos con el papel.' };
          const Icon = verdict.icon;
          return (
            <>
              <div className={`flex items-center gap-3 ${verdict.tone}`}>
                <Icon size={36} aria-hidden="true" />
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{verdict.title}</h1>
              </div>
              <p className="mt-3 text-stone-600 font-medium">{verdict.text}</p>
              <dl className="mt-6 divide-y divide-stone-300/70 border-y border-stone-300/70">
                {documentRows(outcome.summary).map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5 text-sm sm:text-base">
                    <dt className="font-black text-stone-500">{label}</dt>
                    <dd className="font-bold text-stone-800 break-words">{value}</dd>
                  </div>
                ))}
              </dl>
            </>
          );
        })()}
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
