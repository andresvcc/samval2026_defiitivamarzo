type Primitive = string | number | boolean | null | undefined;

type RequestContext = {
  language: string;
  pageName: string;
  pageUri: string;
  referrer: string;
};

type FormRequest<TFields extends Record<string, unknown>> = {
  fields: TFields;
  context: RequestContext;
  attribution: Record<string, Primitive>;
  turnstileToken?: string;
};

type ApiResponse = {
  ok: boolean;
  id?: string;
  error?: string;
  fields?: string[];
};

type PublicConfig = {
  ok: boolean;
  turnstile: {
    enabled: boolean;
    siteKey: string;
  };
};

export type ContactFormFields = {
  empresa: string;
  correo: string;
  nombre: string;
  apellidos: string;
  movil: string;
  pais: string;
  estado: string;
  ciudad: string;
  mensaje: string;
  website?: string;
};

export type TechServicesFormFields = {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  consentData: boolean;
  consentComms: boolean;
  website?: string;
};

export type VolunteerFormFields = {
  area: string;
  name: string;
  contact: string;
  availability: string;
  website?: string;
};

const API_BASE_URL = (import.meta.env.VITE_SAMVAL_API_BASE_URL || '/api').replace(/\/$/, '');

const attributionKeys = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'msclkid',
];

const getAttribution = () => {
  const params = new URLSearchParams(window.location.search);

  return Object.fromEntries(
    attributionKeys
      .map((key) => [key, params.get(key)] as const)
      .filter(([, value]) => value)
  );
};

const getContext = (pageName: string): RequestContext => ({
  language: document.documentElement.lang || navigator.language || 'es',
  pageName,
  pageUri: window.location.href,
  referrer: document.referrer,
});

const postJson = async <TResponse extends ApiResponse>(path: string, body: unknown): Promise<TResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as TResponse;

  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || 'No pudimos procesar la solicitud.');
  }

  return payload;
};

let publicConfigPromise: Promise<PublicConfig> | null = null;

export const getPublicConfig = () => {
  publicConfigPromise =
    publicConfigPromise ||
    fetch(`${API_BASE_URL}/config`, {
      headers: { accept: 'application/json' },
    }).then(async (response) => {
      const payload = (await response.json().catch(() => ({}))) as PublicConfig;

      if (!response.ok || !payload.ok) {
        throw new Error('No pudimos cargar la configuración pública del sitio.');
      }

      return payload;
    });

  return publicConfigPromise;
};

const submitForm = <TFields extends Record<string, unknown>>(
  path: string,
  fields: TFields,
  pageName: string,
  turnstileToken?: string
) => {
  const body: FormRequest<TFields> = {
    fields,
    context: getContext(pageName),
    attribution: getAttribution(),
    turnstileToken,
  };

  return postJson(path, body);
};

export const submitContactForm = (fields: ContactFormFields, turnstileToken?: string) =>
  submitForm('/forms/contact', fields, 'Formulario de Contacto - SAMVAL', turnstileToken);

export const submitTechServicesForm = (fields: TechServicesFormFields, turnstileToken?: string) =>
  submitForm('/forms/tech-services', fields, 'Solicitud de Cotizacion - SAMVAL', turnstileToken);

export const submitVolunteerForm = (fields: VolunteerFormFields, turnstileToken?: string) =>
  submitForm('/forms/volunteer', fields, 'Formulario de Voluntariado - SAMVAL', turnstileToken);

export const captureBackendEvent = (eventName: string, payload: Record<string, Primitive>) =>
  postJson('/events', {
    eventName,
    payload,
    context: getContext(`Evento ${eventName}`),
  });
