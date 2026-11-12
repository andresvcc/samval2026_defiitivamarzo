import React, { useEffect, useState } from 'react';
import { BarChart3, Lock, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CONSENT_PREFERENCES_EVENT,
  getStoredConsentChoice,
  saveConsentChoice,
  trackPageView,
} from '../utils/analytics';

const getCurrentPath = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;

const CookieConsentBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const storedChoice = getStoredConsentChoice();
    setIsVisible(storedChoice === null);
    setAnalyticsEnabled(storedChoice === 'accepted');

    const handleOpenPreferences = () => {
      const currentChoice = getStoredConsentChoice();
      setAnalyticsEnabled(currentChoice === 'accepted');
      setShowSettings(true);
      setIsVisible(true);
    };

    window.addEventListener(CONSENT_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(CONSENT_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  const persistChoice = (enabled: boolean) => {
    const choice = enabled ? 'accepted' : 'rejected';
    saveConsentChoice(choice);

    if (enabled) {
      trackPageView(getCurrentPath(), { force: true });
    }

    setAnalyticsEnabled(enabled);
    setShowSettings(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mx-auto max-w-5xl rounded-[20px] border border-white/10 bg-[#1e1b18] p-4 text-stone-100 shadow-2xl sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#d4a373]">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 id="cookie-consent-title" className="text-base font-bold text-white">
                {t('cookie_banner.title')}
              </h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-stone-300">
                {t('cookie_banner.description')}{' '}
                <Link to="/privacidad" className="font-semibold text-[#d4a373] hover:text-white">
                  {t('cookie_banner.privacy_link')}
                </Link>
              </p>

              {showSettings && (
                <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start gap-3 rounded-xl bg-white/[0.04] p-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/10 text-[#d4a373]">
                      <Lock size={13} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-sm font-bold text-white">
                        {t('cookie_banner.necessary_label')}
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold text-stone-300">
                          {t('cookie_banner.always_active')}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-stone-400">
                        {t('cookie_banner.necessary_description')}
                      </span>
                    </div>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-[#801b1b]"
                    />
                    <span>
                      <span className="flex items-center gap-2 text-sm font-bold text-white">
                        <BarChart3 size={16} aria-hidden="true" />
                        {t('cookie_banner.analytics_label')}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-stone-400">
                        {t('cookie_banner.analytics_description')}
                      </span>
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
            {showSettings ? (
              <>
                <button
                  type="button"
                  onClick={() => persistChoice(false)}
                  className="min-h-[44px] rounded-xl border border-white/15 px-4 text-sm font-bold text-stone-200 transition-colors hover:border-white/30 hover:text-white"
                >
                  {t('cookie_banner.reject')}
                </button>
                <button
                  type="button"
                  onClick={() => persistChoice(analyticsEnabled)}
                  className="min-h-[44px] rounded-xl bg-[#d4a373] px-5 text-sm font-extrabold text-[#1e1b18] transition-colors hover:bg-white"
                >
                  {t('cookie_banner.save')}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-bold text-stone-200 transition-colors hover:border-white/30 hover:text-white"
                >
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  {t('cookie_banner.settings')}
                </button>
                <button
                  type="button"
                  onClick={() => persistChoice(false)}
                  className="min-h-[44px] rounded-xl border border-white/15 px-4 text-sm font-bold text-stone-200 transition-colors hover:border-white/30 hover:text-white"
                >
                  {t('cookie_banner.reject')}
                </button>
                <button
                  type="button"
                  onClick={() => persistChoice(true)}
                  className="min-h-[44px] rounded-xl bg-[#d4a373] px-5 text-sm font-extrabold text-[#1e1b18] transition-colors hover:bg-white"
                >
                  {t('cookie_banner.accept')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
