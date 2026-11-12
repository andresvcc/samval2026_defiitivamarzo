export type ConsentChoice = 'accepted' | 'rejected';

type ConsentStorageValue = {
  choice: ConsentChoice;
  updatedAt: string;
  version: number;
};

type TrackPageViewOptions = {
  force?: boolean;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_STORAGE_KEY = 'samval_cookie_consent';
export const CONSENT_PREFERENCES_EVENT = 'samval:open-cookie-preferences';

const CONSENT_VERSION = 1;
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-EDTLN44LBG';

let lastTrackedPath: string | null = null;

const ensureGtag = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });
};

const getDeniedConsentState = () => ({
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
});

const getAnalyticsGrantedConsentState = () => ({
  ...getDeniedConsentState(),
  analytics_storage: 'granted',
});

const loadGoogleTag = () => {
  if (typeof document === 'undefined' || !GA_MEASUREMENT_ID) return;

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[data-samval-google-tag="${GA_MEASUREMENT_ID}"], script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`
  );

  if (existingScript) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  script.dataset.cfasync = 'false';
  script.dataset.samvalGoogleTag = GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  window.gtag?.('js', new Date());
  window.gtag?.('config', GA_MEASUREMENT_ID);
};

export const getStoredConsentChoice = (): ConsentChoice | null => {
  if (typeof window === 'undefined') return null;

  try {
    const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!storedValue) return null;

    const parsed = JSON.parse(storedValue) as Partial<ConsentStorageValue>;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (parsed.choice === 'accepted' || parsed.choice === 'rejected') return parsed.choice;
  } catch {
    return null;
  }

  return null;
};

export const isAnalyticsConsentGranted = () => getStoredConsentChoice() === 'accepted';

export const getGoogleAnalyticsMeasurementId = () => GA_MEASUREMENT_ID;

export const updateAnalyticsConsent = (choice: ConsentChoice) => {
  if (typeof window === 'undefined') return;

  ensureGtag();
  window.gtag?.(
    'consent',
    'update',
    choice === 'accepted' ? getAnalyticsGrantedConsentState() : getDeniedConsentState()
  );
};

export const saveConsentChoice = (choice: ConsentChoice) => {
  if (typeof window === 'undefined') return;

  const value: ConsentStorageValue = {
    choice,
    updatedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  updateAnalyticsConsent(choice);
};

export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  const storedChoice = getStoredConsentChoice();

  ensureGtag();
  loadGoogleTag();

  if (storedChoice) {
    updateAnalyticsConsent(storedChoice);
  }
};

export const trackPageView = (path: string, options: TrackPageViewOptions = {}) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !isAnalyticsConsentGranted()) return;
  if (!options.force && lastTrackedPath === path) return;

  ensureGtag();
  loadGoogleTag();

  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });

  lastTrackedPath = path;
};

export const openCookiePreferences = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CONSENT_PREFERENCES_EVENT));
};
