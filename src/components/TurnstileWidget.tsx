import React, { useEffect, useRef, useState } from 'react';
import { getPublicConfig } from '../services/samvalApi';

type TurnstileWidgetProps = {
  action: string;
  onAvailabilityChange?: (enabled: boolean) => void;
  onTokenChange: (token: string) => void;
  resetKey?: number;
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      action: string;
      callback: (token: string) => void;
      'error-callback': () => void;
      'expired-callback': () => void;
      language: string;
      sitekey: string;
      theme: 'auto';
    }
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    samvalTurnstileScriptPromise?: Promise<void>;
  }
}

const TURNSTILE_SCRIPT_ID = 'samval-turnstile-script';
const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const loadTurnstileScript = () => {
  if (window.turnstile) return Promise.resolve();
  if (window.samvalTurnstileScriptPromise) return window.samvalTurnstileScriptPromise;

  window.samvalTurnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Turnstile script failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Turnstile script failed to load.'));
    document.head.appendChild(script);
  });

  return window.samvalTurnstileScriptPromise;
};

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  action,
  onAvailabilityChange,
  onTokenChange,
  resetKey = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [siteKey, setSiteKey] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'disabled'>('loading');

  useEffect(() => {
    let isMounted = true;

    getPublicConfig()
      .then((config) => {
        if (!isMounted) return;

        const enabled = Boolean(config.turnstile.enabled && config.turnstile.siteKey);
        setIsEnabled(enabled);
        setSiteKey(config.turnstile.siteKey);
        setStatus(enabled ? 'loading' : 'disabled');
        onAvailabilityChange?.(enabled);
        if (!enabled) onTokenChange('');
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus('error');
        onAvailabilityChange?.(true);
        onTokenChange('');
      });

    return () => {
      isMounted = false;
    };
  }, [onAvailabilityChange, onTokenChange]);

  useEffect(() => {
    if (!isEnabled || !siteKey || !containerRef.current) return;

    let isMounted = true;

    loadTurnstileScript()
      .then(() => {
        if (!isMounted || !containerRef.current || !window.turnstile || widgetIdRef.current) return;

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          action,
          callback: (token) => onTokenChange(token),
          'error-callback': () => {
            onTokenChange('');
            setStatus('error');
          },
          'expired-callback': () => onTokenChange(''),
          language: document.documentElement.lang || 'auto',
          sitekey: siteKey,
          theme: 'auto',
        });
        setStatus('ready');
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus('error');
        onTokenChange('');
      });

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, isEnabled, onTokenChange, siteKey]);

  useEffect(() => {
    if (!widgetIdRef.current || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenChange('');
  }, [onTokenChange, resetKey]);

  if (status === 'disabled') return null;

  return (
    <div className="sm:col-span-2 flex flex-col items-center justify-center py-1">
      <div ref={containerRef} className="min-h-[54px]" />
      {status === 'error' && (
        <p className="mt-2 text-center text-xs font-bold text-[#ffaa80]">
          No pudimos cargar la verificación anti-spam. Recarga la página e intenta de nuevo.
        </p>
      )}
    </div>
  );
};

export default TurnstileWidget;
