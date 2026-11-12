# 🌟 Fundación SAMVAL - Sitio Web Oficial

Sitio web oficial de la Fundación SAMVAL para el Desarrollo Social y Tecnológico.

## 🚀 Tecnologías

- **React** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **React Router** - Navegación
- **i18next** - Internacionalización (Español/Inglés)
- **Lucide React** - Iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📁 Estructura del Proyecto

```
samval2026/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # Páginas de la aplicación
│   ├── locales/        # Traducciones (es/en)
│   ├── services/       # Servicios (Instagram API)
│   ├── data/           # Datos estáticos
│   └── App.tsx         # Componente principal
├── public/             # Archivos estáticos
│   └── .htaccess       # Configuración Apache
├── dist/               # Build de producción
└── package.json        # Dependencias
```

## 🌐 Despliegue en Dokploy

La producción de `samval.org` y `www.samval.org` se ejecuta en la aplicación
`web/samvalprod` de Dokploy. Estas fuentes se recuperaron del checkout de
producción `430699112b5f78bd09717435f1144815450f3147` antes de aplicar el correctivo.
El CSS de Tailwind se compila con PostCSS durante el build y se sirve desde el
mismo dominio, sin depender del script CDN en los dispositivos de los visitantes.

El sitio ahora necesita backend para formularios y captura de eventos propios. No debe desplegarse solo como archivos estaticos si se quieren usar formularios.

1. Compila el proyecto:
   ```bash
   npm run build
   ```

2. Ejecuta el backend Node:
   ```bash
   npm start
   ```

3. En despliegue con Docker, el contenedor sirve el frontend y los endpoints `/api`.

## 📧 Formularios

Los formularios ya no dependen de HubSpot. El frontend envia datos al backend propio:

- `POST /api/forms/contact`
- `POST /api/forms/tech-services`
- `POST /api/forms/volunteer`
- `POST /api/events`

El backend guarda registros JSONL en `SAMVAL_DATA_DIR`, aplica validacion basica, rate limit por IP hasheada, honeypot anti-spam y envia notificaciones por Brevo si las variables estan configuradas.

En desarrollo local, corre Vite y el backend en procesos separados:

```bash
npm run dev
SAMVAL_PORT=8080 npm start
```

Vite proxya `/api` hacia `http://127.0.0.1:8080`.

Variables de entorno relevantes:

```bash
VITE_SAMVAL_API_BASE_URL=/api
SAMVAL_PORT=8080
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=Fundacion SAMVAL
BREVO_TO_EMAIL=
BREVO_TO_NAME=Fundacion SAMVAL
CLOUDFLARE_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET_KEY=
SAMVAL_DATA_DIR=./data
SAMVAL_IP_HASH_SALT=change-me
```

`BREVO_TO_EMAIL` es el destinatario interno que recibe las solicitudes. Si no existe, el backend usa `BREVO_SENDER_EMAIL` como fallback.

### Templates de email

Los templates estan separados por tipo de formulario:

```text
server/email-templates/contact.mjs
server/email-templates/techServices.mjs
server/email-templates/volunteer.mjs
server/email-templates/shared.mjs
server/email-templates/index.mjs
```

Cada template tiene variantes por idioma (`es`, `en`, `fr`, `de`). El frontend envia el idioma actual en el contexto del formulario y el backend usa ese idioma con fallback a espanol.

### Cloudflare Turnstile

Los formularios usan Cloudflare Turnstile cuando estas dos variables existen en el backend:

```bash
CLOUDFLARE_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET_KEY=
```

El frontend obtiene solo el `siteKey` desde `GET /api/config`. El `secretKey` nunca se expone al navegador. El backend valida cada formulario con `POST https://challenges.cloudflare.com/turnstile/v0/siteverify` antes de guardar la solicitud o enviar email por Brevo.

## 📊 Google Analytics y consentimiento

El sitio incluye una banner personalizada de consentimiento para analítica con Google Consent Mode v2. Por defecto, Google Analytics carga con consentimiento denegado y no envía pageviews hasta que el visitante acepta analítica.

Configura el ID de medición de GA4 en una variable de entorno:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Si esta variable no existe, el sitio usa por defecto el ID de medición configurado para SAMVAL.

### Eventos GA4 disponibles

Estos eventos se disparan solo cuando el visitante acepta cookies analíticas:

| Evento | Cuándo se envía | Uso recomendado en GA4 |
| --- | --- | --- |
| `samval_contact` | Formulario general enviado correctamente | Evento clave |
| `samval_tech_services` | Formulario de servicios tech enviado correctamente | Evento clave |
| `samval_whatsapp` | Click en CTA de WhatsApp | Evento clave |
| `samval_paypal_click` | Click en donación única por PayPal | Evento clave |
| `samval_paypal_subscription` | Suscripción PayPal aprobada | Evento clave |
| `samval_volunteer` | Formulario de voluntariado enviado | Evento clave |
| `samval_thank_you_view` | Vista de la página `/gracias` | Evento clave opcional |

Parámetros útiles añadidos a los eventos:

- `page_path`, `page_location`, `page_title`
- `site_language`
- `page_section`
- `button_location`
- `form_type`
- `contact_method`
- `donation_type`
- `service_name`
- `thank_you_type`

### Configuración recomendada en GA4

1. En **Administrar > Eventos**, marca como eventos clave: `samval_contact`, `samval_tech_services`, `samval_whatsapp`, `samval_paypal_click`, `samval_paypal_subscription` y `samval_volunteer`.
2. En **Administrar > Flujo de datos > Configurar ajustes de etiquetas**, define tráfico interno para excluir visitas propias.
3. Vincula **Google Search Console** desde **Administrar > Vinculaciones de productos**.
4. Para campañas externas, usa URLs con UTM, por ejemplo:

```text
https://www.samval.org/donar?utm_source=instagram&utm_medium=social&utm_campaign=donaciones_2026
```

5. Valida eventos en **Informes > Tiempo real** después de aceptar cookies analíticas.

## 🎨 Características

- ✅ Diseño responsive
- ✅ Multiidioma (ES/EN/FR/DE)
- ✅ SEO optimizado
- ✅ Integración con Instagram
- ✅ Banner de consentimiento para Google Analytics
- ✅ Formularios de contacto
- ✅ Animaciones suaves
- ✅ Performance optimizado

## 📄 Licencia

© 2026 Fundación SAMVAL. Todos los derechos reservados.

## 🔗 Enlaces

- **Sitio Web**: [samval.org](https://samval.org)
- **Instagram**: [@fundacionsamval](https://instagram.com/fundacionsamval)
- **GitHub**: [jorgejime/samval2026](https://github.com/jorgejime/samval2026)
