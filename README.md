# Samval.org — web institucional

Fuente vigente de **https://samval.org** y **https://www.samval.org**.

| Dato | Ubicación vigente |
| --- | --- |
| Repositorio | [andresvcc/samval2026_defiitivamarzo](https://github.com/andresvcc/samval2026_defiitivamarzo) |
| Rama de trabajo y publicación | `main`, única rama permanente |
| Checkout del workspace | `/home/tito/samval/frontends/samval-org` |
| Dokploy | Proyecto `web`, aplicación `samvalprod` |
| Application ID | `W5qKam62sre2XQVf0q0eu` |
| Publicación | Push a `main` → tipos, build y pruebas del `Dockerfile` en Dokploy → despliegue → salud |
| Salud pública | https://samval.org/api/health |

El frontend usa React, TypeScript, Vite y Tailwind; el servidor Node sirve la
web, los formularios y los eventos propios. Los idiomas son `es`, `en`, `fr`
y `de`. La landing de `central.samval.org` tiene su propio repositorio,
`Samval-colombia/samval-landing-central`.

El build deja preparadas las once páginas públicas en los cuatro idiomas.
El servidor entrega su HTML legible antes de descargar JavaScript. Las
imágenes, el logo, las fuentes y el CSS se sirven desde el propio dominio;
cada página e idioma carga su código cuando se necesita. Los formularios se
activan cuando sus validaciones y manejadores están listos.
Los enlaces navegan al HTML del destino; un fallo al descargar su código
interactivo conserva la lectura de la página.

## Empezar un cambio

```bash
cd /home/tito/samval/frontends/samval-org
git pull --ff-only
npm ci
```

En otro equipo, clonar el repositorio de la tabla en una carpeta `samval-org`.
Usar Node 22, como el `Dockerfile`. Este repositorio es independiente de los
servicios que administra `samval-local`.

Para desarrollar, abrir dos terminales:

```bash
# Terminal 1: API en http://127.0.0.1:8080
npm start

# Terminal 2: Vite en http://127.0.0.1:3001
npm run dev
```

Vite dirige `/api` al backend local. Para comprobar el resultado de producción:

```bash
npm run build
npm test
npm start
```

Abrir http://127.0.0.1:8080. `npm run preview` sólo sirve el frontend; la prueba
de formularios y `/api` requiere el servidor Node.

## Dónde editar

| Cambio | Archivos |
| --- | --- |
| Páginas y navegación | `src/pages/`, `src/components/`, `src/App.tsx` |
| Traducciones | `src/locales/{es,en,fr,de}.json` |
| Estilos | `src/styles.css`, `tailwind.config.cjs`, `postcss.config.cjs` |
| API y almacenamiento | `server/server.mjs` |
| Correos de formularios | `server/email-templates/` |
| Consentimiento y medición | `src/components/CookieConsentBanner.tsx`, `src/utils/` |
| Compilación y runtime | `Dockerfile`, `vite.config.ts`, `package-lock.json` |
| HTML preparado y compresión | `scripts/build.mjs`, `src/entry-server.tsx`, `server/static-site.mjs` |
| Idiomas y rutas preparados | `server/site-config.mjs`, `src/i18n.ts` |
| Imágenes y fuente locales | `public/media/`, `src/generated/media.ts` |
| Documentación institucional | `docs/reference/` |

Tailwind se compila en el build. Las páginas preparadas incluyen el CSS en el
propio HTML para mostrar el diseño con la primera respuesta. El CSS versionado
de `/assets/` se conserva para el frontend de desarrollo y las páginas
dinámicas. Mantener esta configuración al cambiar el diseño.

## Mantener la carga ligera

- La lectura no depende de ejecutar JavaScript. Mantener el prerenderizado al
  añadir rutas y traducciones; las páginas de confirmación con parámetros se
  resuelven en el cliente.
- Las fotos usan WebP y carga diferida. La portada tiene tamaños específicos
  para móvil y escritorio; conservar `picture`, `srcSet` y sus dimensiones.
- El build prepara Brotli y gzip. El servidor negocia la compresión y permite
  respuestas 304; los recursos con nombre versionado se cachean por un año.
- Google Analytics se descarga después del consentimiento; PayPal, al acercarse
  a su sección. El contenido sigue disponible cuando estos proveedores fallan.
- No ocultar el contenido para animarlo al entrar ni añadir bibliotecas para
  representar datos que ya se pueden mostrar con HTML y CSS.

El build rechaza JavaScript inicial de la portada superior a **120 KiB en Brotli**,
incluidos los diccionarios necesarios, o HTML
inicial superior a **20 KiB**. Las pruebas limitan la portada móvil a **70 KiB**
y comprueban que las 44 variantes contienen títulos visibles antes de activar
JavaScript. Estos límites se ejecutan también en Dokploy.

Para actualizar imágenes, ajustar sus fuentes en `scripts/optimize-images.mjs`
y ejecutar `npm run optimize:images -- --refresh`. Sólo esta tarea de
mantenimiento descarga originales; el build habitual usa los WebP ya guardados
en Git. Revisar y publicar juntos `public/media/` y `src/generated/media.ts`.
La licencia de Inter acompaña a la fuente en `public/media/OFL-Inter.txt`.

## Configuración y datos

Copiar `.env.example` a `.env` sólo para configuración local. La producción
recibe sus valores desde el Environment de Dokploy. Los archivos `.env*`
privados están ignorados; no guardar ni imprimir secretos.

| Grupo | Variables |
| --- | --- |
| Servidor | `SAMVAL_PORT`, `SAMVAL_STATIC_DIR`, `SAMVAL_DATA_DIR` |
| Validación y entrega | `SAMVAL_ALLOWED_ORIGINS`, `SAMVAL_IP_HASH_SALT`, `SAMVAL_FORM_WEBHOOK_URL` |
| Correo Brevo | `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `BREVO_TO_EMAIL`, `BREVO_TO_NAME` |
| Turnstile | `CLOUDFLARE_TURNSTILE_SITE_KEY`, `CLOUDFLARE_TURNSTILE_SECRET_KEY` |
| Build del frontend | `VITE_SAMVAL_API_BASE_URL`, `VITE_GA_MEASUREMENT_ID` |

Las variables `VITE_*` llegan al navegador. Guardar las credenciales del
servidor en variables sin ese prefijo. Turnstile publica únicamente el site key
mediante `GET /api/config`. Las notificaciones por Brevo requieren su
configuración; comprobar entregas sólo con un destinatario de prueba autorizado.

El servidor conserva solicitudes y eventos en JSONL dentro de `SAMVAL_DATA_DIR`.
En producción, `/app/data` usa un volumen existente declarado explícitamente en
Dokploy. Conservar ese montaje al publicar o revertir. El directorio local
`data/` está ignorado por Git y por el build Docker.

Los endpoints de escritura son `POST /api/forms/contact`,
`POST /api/forms/tech-services`, `POST /api/forms/volunteer` y `POST /api/events`.
El consentimiento de analítica se gestiona en el banner y en el pie de página.

## Verificar y publicar

1. Ejecutar `npm run typecheck`, `npm run build`, `npm test` y probar ese build
   con `npm start`.
2. Comprobar portada, navegación y Contacto en móvil y tablet; revisar los
   cuatro idiomas. Anchos de referencia: 360, 390, 768, 820, 1024, 1280, 1440
   y 1920 píxeles.
   Para rendimiento, usar caché fría, 400 kbps de bajada, 400 ms de latencia y
   CPU ralentizada 4×. Medir primer contenido y elemento principal, además de
   comprobar la lectura con JavaScript bloqueado.
3. Bloquear `cdn.tailwindcss.com` en el navegador: el logo, el diseño y el menú
   deben seguir funcionando, con cero solicitudes a ese dominio.
4. Confirmar que el diff contiene sólo el cambio previsto y publicar en `main`.
   Dokploy ejecuta el build y el despliegue automáticamente.
5. Comprobar el SHA publicado, el estado `done`, el contenedor `healthy`,
   `/api/health`, el bloque `style[data-samval-critical]` y el CSS `/assets/*.css`
   con respuesta 200 y tipo `text/css`.
   Revisar también `www.samval.org`.

La inspección habitual usa el MCP `samval-ops`:

```text
institutional_web_release environment=prod
```

Esta consulta sólo lee el origen, compara `main` con el commit desplegado y
comprueba el contenedor y su volumen. Las credenciales del operador están fuera
de Git. No se utilizan GitHub Actions ni publicaciones manuales por commit.

Para revertir un cambio, hacer `git revert <commit>` en `main`, publicar y
comprobar el nuevo despliegue por el mismo flujo. Mantener el volumen y el
Environment. Si falla un build, consultar primero el log del despliegue en
Dokploy y comprobar qué contenedor sigue sirviendo tráfico.

## Diagnóstico rápido

| Síntoma | Primera comprobación |
| --- | --- |
| Página sin formato o logo enorme | Comprobar `style[data-samval-critical]`, el CSS de `/assets/` y el build de Tailwind |
| El push no aparece en la web | Origen y rama de la tabla, último SHA y estado del despliegue en Dokploy |
| Formularios sin notificación | `/api/health`, `/api/config`, nombres de las variables de Brevo y recibo de entrega |
| Cambio de estilos sin efecto | Abrir una sesión nueva y comprobar que el HTML referencia el asset versionado del último build |

La procedencia recuperada y los recibos operativos se conservan privadamente
en `/home/tito/samval-recovery/institutional-web-source/`. Las versiones
anteriores del código y de la documentación permanecen en el historial Git.
