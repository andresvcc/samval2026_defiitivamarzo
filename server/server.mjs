import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildFormNotificationEmail,
  buildSubmitterAutoresponderEmail,
  getSubmitterEmail,
  getSubmitterName,
} from './email-templates/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const loadLocalEnv = async () => {
  try {
    const envFile = await fs.readFile(path.join(projectRoot, '.env'), 'utf8');
    for (const line of envFile.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
      if (!match || process.env[match[1]] !== undefined) continue;

      const rawValue = match[2].trim();
      process.env[match[1]] = rawValue.replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // Production environments should inject variables directly.
  }
};

await loadLocalEnv();

const PORT = Number(process.env.SAMVAL_PORT || process.env.PORT || 8080);
const STATIC_DIR = process.env.SAMVAL_STATIC_DIR || path.join(projectRoot, 'dist');
const DATA_DIR = process.env.SAMVAL_DATA_DIR || path.join(projectRoot, 'data');
const MAX_BODY_BYTES = 48 * 1024;
const IP_HASH_SALT = process.env.SAMVAL_IP_HASH_SALT || 'samval-local-development-salt';
const FORM_WEBHOOK_URL = process.env.SAMVAL_FORM_WEBHOOK_URL || '';
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || '';
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Fundacion SAMVAL';
const BREVO_TO_EMAIL = process.env.BREVO_TO_EMAIL || process.env.SAMVAL_NOTIFY_EMAIL || BREVO_SENDER_EMAIL;
const BREVO_TO_NAME = process.env.BREVO_TO_NAME || 'Fundacion SAMVAL';
const CLOUDFLARE_TURNSTILE_SITE_KEY = process.env.CLOUDFLARE_TURNSTILE_SITE_KEY || '';
const CLOUDFLARE_TURNSTILE_SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || '';
const TURNSTILE_ENABLED = Boolean(CLOUDFLARE_TURNSTILE_SITE_KEY && CLOUDFLARE_TURNSTILE_SECRET_KEY);
const ALLOWED_ORIGINS = (process.env.SAMVAL_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const rateLimitBuckets = new Map();

const formConfigs = {
  contact: {
    eventName: 'samval_contact',
    required: ['correo', 'nombre', 'apellidos', 'movil', 'pais', 'estado', 'ciudad', 'mensaje'],
    emailField: 'correo',
    publicLabel: 'contact form',
  },
  'tech-services': {
    eventName: 'samval_tech_services',
    required: ['firstName', 'lastName', 'email', 'phone', 'message'],
    emailField: 'email',
    publicLabel: 'tech services form',
    validate: (fields) => fields.consentData === true || fields.consentData === 'true',
    validateMessage: 'Data processing consent is required.',
  },
  volunteer: {
    eventName: 'samval_volunteer',
    required: ['area', 'name', 'contact', 'availability'],
    publicLabel: 'volunteer form',
  },
};

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const json = (res, status, body) => {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(JSON.stringify(body));
};

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const firstForwardedIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return firstForwardedIp?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
};

const hashIp = (ip) => crypto.createHash('sha256').update(`${IP_HASH_SALT}:${ip}`).digest('hex');

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Payload too large.'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('error', reject);
    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(Object.assign(new Error('Invalid JSON body.'), { statusCode: 400 }));
      }
    });
  });

const cleanString = (value, maxLength = 2000) => {
  if (typeof value !== 'string') return value;
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
};

const cleanObject = (value) => {
  if (Array.isArray(value)) return value.map(cleanObject);
  if (!value || typeof value !== 'object') return cleanString(value);

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined && entryValue !== null)
      .map(([key, entryValue]) => [key, cleanObject(entryValue)])
  );
};

const validateEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const checkRateLimit = (key, limit, windowMs) => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key) || [];
  const recent = bucket.filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    rateLimitBuckets.set(key, recent);
    return false;
  }

  recent.push(now);
  rateLimitBuckets.set(key, recent);
  return true;
};

const appendJsonLine = async (filename, record) => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(path.join(DATA_DIR, filename), `${JSON.stringify(record)}\n`, 'utf8');
};

const shouldAllowOrigin = (req) => {
  const origin = req.headers.origin;
  if (!origin || ALLOWED_ORIGINS.length === 0) return true;
  return ALLOWED_ORIGINS.includes(origin);
};

const applyCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('access-control-allow-origin', origin);
    res.setHeader('vary', 'Origin');
  }

  res.setHeader('access-control-allow-methods', 'GET,POST,OPTIONS');
  res.setHeader('access-control-allow-headers', 'content-type');
};

const forwardToWebhook = async (record) => {
  if (!FORM_WEBHOOK_URL) return null;

  const response = await fetch(FORM_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error(`Webhook returned ${response.status}`);
  }

  return { status: response.status };
};

const sendBrevoNotification = async (record) => {
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !BREVO_TO_EMAIL) return null;

  const submitterEmail = getSubmitterEmail(record);
  const submitterName = getSubmitterName(record);
  const email = buildFormNotificationEmail(record);
  const body = {
    sender: {
      email: BREVO_SENDER_EMAIL,
      name: BREVO_SENDER_NAME,
    },
    to: [
      {
        email: BREVO_TO_EMAIL,
        name: BREVO_TO_NAME,
      },
    ],
    subject: email.subject,
    htmlContent: email.htmlContent,
    textContent: email.textContent,
    tags: ['samval-form', record.type],
  };

  if (validateEmail(submitterEmail)) {
    body.replyTo = {
      email: submitterEmail,
      name: submitterName || submitterEmail,
    };
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Brevo returned ${response.status}: ${JSON.stringify(payload)}`);
  }

  return payload;
};

const sendBrevoAutoresponder = async (record) => {
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) return null;

  const submitterEmail = getSubmitterEmail(record);
  const submitterName = getSubmitterName(record);
  if (!validateEmail(submitterEmail)) return null;

  const email = buildSubmitterAutoresponderEmail(record);
  const body = {
    sender: {
      email: BREVO_SENDER_EMAIL,
      name: BREVO_SENDER_NAME,
    },
    to: [
      {
        email: submitterEmail,
        name: submitterName || submitterEmail,
      },
    ],
    subject: email.subject,
    htmlContent: email.htmlContent,
    textContent: email.textContent,
    tags: ['samval-autoresponder', record.type],
  };

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Brevo autoresponder returned ${response.status}: ${JSON.stringify(payload)}`);
  }

  return payload;
};

const validateTurnstileToken = async ({ token, remoteip, action }) => {
  if (!TURNSTILE_ENABLED) {
    return { success: true, skipped: true };
  }

  if (!token || typeof token !== 'string' || token.length > 2048) {
    return { success: false, errorCodes: ['missing-input-response'] };
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        secret: CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: token,
        remoteip,
        idempotency_key: crypto.randomUUID(),
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) {
      return {
        success: false,
        errorCodes: result['error-codes'] || [`siteverify-http-${response.status}`],
      };
    }

    if (result.action && result.action !== action) {
      return {
        success: false,
        errorCodes: ['action-mismatch'],
      };
    }

    return {
      success: true,
      challengeTs: result.challenge_ts,
      hostname: result.hostname,
      action: result.action,
    };
  } catch (error) {
    return {
      success: false,
      errorCodes: [error instanceof Error ? error.message : 'turnstile-network-error'],
    };
  }
};

const handleFormSubmission = async (req, res, formType) => {
  const config = formConfigs[formType];
  if (!config) {
    json(res, 404, { ok: false, error: 'Unknown form type.' });
    return;
  }

  if (!shouldAllowOrigin(req)) {
    json(res, 403, { ok: false, error: 'Origin not allowed.' });
    return;
  }

  const ip = getClientIp(req);
  const ipHash = hashIp(ip);
  if (!checkRateLimit(`form:${formType}:${ipHash}`, 8, 15 * 60 * 1000)) {
    json(res, 429, { ok: false, error: 'Too many submissions. Please try again later.' });
    return;
  }

  const body = cleanObject(await readJsonBody(req));
  const fields = body.fields && typeof body.fields === 'object' ? body.fields : {};
  const isSpam = Boolean(fields.website);
  const missingFields = config.required.filter((field) => !fields[field]);

  if (missingFields.length > 0) {
    json(res, 400, { ok: false, error: 'Missing required fields.', fields: missingFields });
    return;
  }

  if (config.emailField && !validateEmail(fields[config.emailField])) {
    json(res, 400, { ok: false, error: 'Invalid email address.' });
    return;
  }

  if (config.validate && !config.validate(fields)) {
    json(res, 400, { ok: false, error: config.validateMessage || 'Invalid form data.' });
    return;
  }

  const turnstile = isSpam
    ? { success: true, skipped: true, reason: 'honeypot' }
    : await validateTurnstileToken({
        token: body.turnstileToken,
        remoteip: ip,
        action: formType,
      });

  if (!turnstile.success) {
    await appendJsonLine('turnstile-errors.jsonl', {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      type: formType,
      errorCodes: turnstile.errorCodes,
      ipHash,
      userAgent: req.headers['user-agent'] || '',
      origin: req.headers.origin || '',
    });
    json(res, 400, { ok: false, error: 'No pudimos validar la verificación anti-spam. Intenta de nuevo.' });
    return;
  }

  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    type: formType,
    eventName: config.eventName,
    isSpam,
    fields,
    context: cleanObject(body.context || {}),
    attribution: cleanObject(body.attribution || {}),
    turnstile: cleanObject({
      skipped: turnstile.skipped,
      reason: turnstile.reason,
      challengeTs: turnstile.challengeTs,
      hostname: turnstile.hostname,
      action: turnstile.action,
    }),
    request: {
      ipHash,
      userAgent: req.headers['user-agent'] || '',
      origin: req.headers.origin || '',
      referer: req.headers.referer || '',
    },
  };

  await appendJsonLine(isSpam ? 'spam-submissions.jsonl' : 'submissions.jsonl', record);

  if (!isSpam) {
    const deliveryProviders = [
      ['webhook', () => forwardToWebhook(record)],
      ['brevo', () => sendBrevoNotification(record)],
      ['brevo-autoresponder', () => sendBrevoAutoresponder(record)],
    ];

    for (const [provider, deliver] of deliveryProviders) {
      try {
        const response = await deliver();
        if (response) {
          await appendJsonLine('deliveries.jsonl', {
            id: record.id,
            receivedAt: new Date().toISOString(),
            type: formType,
            provider,
            response,
          });
        }
      } catch (error) {
        await appendJsonLine('deliveries.jsonl', {
          id: record.id,
          receivedAt: new Date().toISOString(),
          type: formType,
          provider,
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown delivery error',
        });
      }
    }
  }

  json(res, 202, {
    ok: true,
    id: record.id,
    message: `${config.publicLabel} captured.`,
  });
};

const handleEventCapture = async (req, res) => {
  if (!shouldAllowOrigin(req)) {
    json(res, 403, { ok: false, error: 'Origin not allowed.' });
    return;
  }

  const ipHash = hashIp(getClientIp(req));
  if (!checkRateLimit(`event:${ipHash}`, 120, 15 * 60 * 1000)) {
    json(res, 429, { ok: false, error: 'Too many events. Please try again later.' });
    return;
  }

  const body = cleanObject(await readJsonBody(req));
  const eventName = typeof body.eventName === 'string' ? body.eventName : '';

  if (!eventName.startsWith('samval_')) {
    json(res, 400, { ok: false, error: 'Invalid event name.' });
    return;
  }

  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    eventName,
    payload: cleanObject(body.payload || {}),
    context: cleanObject(body.context || {}),
    request: {
      ipHash,
      userAgent: req.headers['user-agent'] || '',
      origin: req.headers.origin || '',
      referer: req.headers.referer || '',
    },
  };

  await appendJsonLine('events.jsonl', record);
  json(res, 202, { ok: true, id: record.id });
};

const getStaticPath = (urlPath) => {
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const requestedPath = path.join(STATIC_DIR, safePath);

  if (!requestedPath.startsWith(STATIC_DIR)) {
    return null;
  }

  return requestedPath;
};

const serveStatic = async (req, res, urlPath) => {
  let filePath = getStaticPath(urlPath === '/' ? '/index.html' : urlPath);

  try {
    const stat = filePath ? await fs.stat(filePath) : null;
    if (stat?.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch {
    filePath = path.join(STATIC_DIR, 'index.html');
  }

  try {
    const file = await fs.readFile(filePath);
    const extension = path.extname(filePath);
    const isAsset = extension && extension !== '.html';

    res.writeHead(200, {
      'content-type': contentTypes[extension] || 'application/octet-stream',
      'cache-control': isAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    res.end(file);
  } catch {
    json(res, 404, { ok: false, error: 'Not found.' });
  }
};

const server = http.createServer(async (req, res) => {
  applyCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url || '/', 'http://localhost');

  try {
    if (req.method === 'GET' && requestUrl.pathname === '/api/health') {
      json(res, 200, { ok: true, service: 'samval-backend', time: new Date().toISOString() });
      return;
    }

    if (req.method === 'GET' && requestUrl.pathname === '/api/config') {
      json(res, 200, {
        ok: true,
        turnstile: {
          enabled: TURNSTILE_ENABLED,
          siteKey: TURNSTILE_ENABLED ? CLOUDFLARE_TURNSTILE_SITE_KEY : '',
        },
      });
      return;
    }

    if (req.method === 'POST' && requestUrl.pathname.startsWith('/api/forms/')) {
      const formType = requestUrl.pathname.replace('/api/forms/', '');
      await handleFormSubmission(req, res, formType);
      return;
    }

    if (req.method === 'POST' && requestUrl.pathname === '/api/events') {
      await handleEventCapture(req, res);
      return;
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
      await serveStatic(req, res, requestUrl.pathname);
      return;
    }

    json(res, 405, { ok: false, error: 'Method not allowed.' });
  } catch (error) {
    const statusCode = Number(error?.statusCode || 500);
    json(res, statusCode, {
      ok: false,
      error: statusCode === 500 ? 'Internal server error.' : error.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`SAMVAL backend listening on port ${PORT}`);
  console.log(`Serving static files from ${STATIC_DIR}`);
  console.log(`Capturing records in ${DATA_DIR}`);
});
