import { getGoogleAnalyticsMeasurementId, isAnalyticsConsentGranted } from './analytics';
import { captureBackendEvent } from '../services/samvalApi';

type AnalyticsPrimitive = string | number | boolean | null | undefined;

export type ConversionType =
  | 'contact'
  | 'tech_services'
  | 'whatsapp'
  | 'paypal_click'
  | 'paypal_subscription'
  | 'volunteer'
  | 'thank_you_view';

type ConversionPayload = {
  category?: string;
  label?: string;
  value?: number;
  destination?: string;
  buttonLocation?: string;
  contactMethod?: string;
  donationType?: string;
  formType?: string;
  pageSection?: string;
  serviceName?: string;
  thankYouType?: string;
  metadata?: Record<string, AnalyticsPrimitive>;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

const cleanPayload = (payload: Record<string, AnalyticsPrimitive>) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

export const trackConversion = (type: ConversionType, payload: ConversionPayload = {}) => {
  if (typeof window === 'undefined') return;
  if (!isAnalyticsConsentGranted()) return;

  const eventName = `samval_${type}`;
  const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const eventPayload = cleanPayload({
    send_to: getGoogleAnalyticsMeasurementId(),
    event_category: payload.category || 'conversion',
    event_label: payload.label || type,
    value: payload.value,
    destination: payload.destination,
    button_location: payload.buttonLocation,
    contact_method: payload.contactMethod,
    donation_type: payload.donationType,
    form_type: payload.formType,
    page_location: window.location.href,
    page_path: pagePath,
    page_section: payload.pageSection,
    page_title: document.title,
    service_name: payload.serviceName,
    site_language: document.documentElement.lang || navigator.language,
    source_page: window.location.pathname,
    thank_you_type: payload.thankYouType,
    ...payload.metadata,
  });

  window.dataLayer?.push({
    event: eventName,
    conversion_type: type,
    ...eventPayload,
  });

  window.gtag?.('event', eventName, eventPayload);
  void captureBackendEvent(eventName, {
    conversion_type: type,
    ...eventPayload,
  }).catch(() => {
    // GA4 remains the primary analytics path; backend capture is best effort.
  });
};
