# 📧 Configuración de Envío de Cotizaciones por Email

Este proyecto utiliza **Resend** para enviar las cotizaciones del formulario por correo electrónico.

## 🚀 Configuración Rápida

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita
2. Verifica tu email

### 2. Obtener API Key

1. Ve a [API Keys](https://resend.com/api-keys)
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "SAMVAL Cotizaciones")
4. Copia la API Key generada

### 3. Configurar dominio (Opcional pero recomendado)

Para enviar emails desde tu propio dominio (`@samval.org`):

1. Ve a [Domains](https://resend.com/domains)
2. Haz clic en "Add Domain"
3. Ingresa tu dominio: `samval.org`
4. Sigue las instrucciones para agregar los registros DNS:
   - **SPF**: Registro TXT en `@`
   - **DKIM**: Registro TXT en `resend._domainkey`
   - **DMARC**: Registro TXT en `_dmarc` (opcional)

**Nota**: Si no configuras un dominio propio, Resend enviará los emails desde `onboarding@resend.dev` (plan gratuito).

### 4. Configurar variables de entorno

Edita el archivo `.env` en la raíz del proyecto:

```bash
RESEND_API_KEY=re_tu_api_key_aqui
```

### 5. Configurar email de destino

Edita el archivo `api/send-quote.ts` y cambia el email de destino en la línea 33:

```typescript
to: ['contacto@samval.org'], // ← Cambia esto por tu email
```

## 📊 Plan Gratuito de Resend

- ✅ 100 emails/día
- ✅ 3,000 emails/mes
- ✅ Sin tarjeta de crédito requerida
- ✅ Perfecto para empezar

## 🧪 Probar en Local

Para probar el envío de emails en desarrollo local, necesitas usar un servicio como Vercel Dev:

```bash
npm install -g vercel
vercel dev
```

Esto iniciará un servidor local que puede ejecutar las funciones serverless.

## 🚀 Desplegar en Vercel

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Despliega el proyecto:
```bash
vercel
```

3. Configura las variables de entorno en Vercel:
   - Ve a tu proyecto en [vercel.com](https://vercel.com)
   - Settings → Environment Variables
   - Agrega `RESEND_API_KEY` con tu API key

## 📧 Emails que se envían

Cuando un usuario llena el formulario, se envían **2 emails**:

1. **Email al equipo de SAMVAL** (`contacto@samval.org`)
   - Contiene todos los datos del formulario
   - Diseño profesional con información estructurada
   - Fecha y hora de recepción

2. **Email de confirmación al cliente**
   - Confirma que recibimos su solicitud
   - Indica tiempo estimado de respuesta (24-48 horas)
   - Diseño profesional con branding de SAMVAL

## 🎨 Personalizar los emails

Los templates de email están en `api/send-quote.ts`. Puedes personalizar:

- Colores y estilos
- Contenido de los mensajes
- Estructura del HTML
- Información adicional

## ⚠️ Solución de Problemas

### Error: "API Key inválida"
- Verifica que copiaste correctamente la API Key
- Asegúrate de que la variable `RESEND_API_KEY` esté configurada

### Los emails no llegan
- Verifica la carpeta de spam
- Si usas dominio propio, verifica que los registros DNS estén configurados correctamente
- Revisa los logs en [Resend Dashboard](https://resend.com/emails)

### Error en desarrollo local
- Usa `vercel dev` en lugar de `npm run dev` para probar las funciones serverless
- O despliega directamente en Vercel para probar

## 📚 Documentación

- [Resend Docs](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
