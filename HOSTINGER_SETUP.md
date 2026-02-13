# 🚀 Guía de Configuración para Hostinger

## ✅ Pasos para Configurar el Envío de Emails en Hostinger

### 1. Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com) y crea una cuenta
2. Ve a [API Keys](https://resend.com/api-keys)
3. Crea una nueva API Key
4. **Copia la API Key** (empieza con `re_`)

### 2. Configurar el archivo `config.php`

Edita el archivo `config.php` en la raíz del proyecto:

```php
<?php
define('RESEND_API_KEY', 're_TU_API_KEY_AQUI');
define('RECIPIENT_EMAIL', 'jorge.jimenez@samval.org');
define('FROM_EMAIL', 'SAMVAL Cotizaciones <cotizaciones@samval.org>');
define('FROM_EMAIL_CONFIRMATION', 'SAMVAL <contacto@samval.org>');
?>
```

**⚠️ IMPORTANTE**: Pega tu API Key real de Resend.

### 3. Subir Archivos a Hostinger

Sube estos archivos a tu hosting de Hostinger:

```
tu-dominio.com/
├── config.php                    ← IMPORTANTE: Fuera de public_html
├── public_html/
│   ├── index.html
│   ├── assets/
│   └── api/
│       └── send-quote.php        ← Script PHP para enviar emails
```

**Estructura recomendada en Hostinger:**

```
/home/usuario/domains/samval.org/
├── config.php                    ← Aquí (más seguro)
└── public_html/
    ├── index.html
    ├── assets/
    └── api/
        └── send-quote.php
```

### 4. Verificar Permisos

En el File Manager de Hostinger:

1. Haz clic derecho en `config.php`
2. Selecciona "Permissions"
3. Configura: `644` (rw-r--r--)
4. Haz lo mismo con `send-quote.php`

### 5. Probar el Formulario

1. Ve a tu sitio web
2. Llena el formulario de cotización
3. Haz clic en "Enviar"
4. Deberías recibir:
   - ✅ Email en `jorge.jimenez@samval.org`
   - ✅ Email de confirmación al cliente

### 6. Verificar Dominio en Resend (Opcional pero Recomendado)

Para enviar desde `@samval.org`:

1. Ve a [Resend Domains](https://resend.com/domains)
2. Agrega tu dominio: `samval.org`
3. En Hostinger, ve a **DNS Zone Editor**
4. Agrega los registros DNS que Resend te proporciona:

**Registros DNS a agregar:**

| Tipo | Nombre | Valor |
|------|--------|-------|
| TXT | @ | v=spf1 include:resend.com ~all |
| TXT | resend._domainkey | [valor proporcionado por Resend] |
| TXT | _dmarc | v=DMARC1; p=none; |

5. Espera 24-48 horas para propagación DNS
6. Verifica en Resend Dashboard

### 7. Solución de Problemas

#### ❌ Error: "API Key inválida"
- Verifica que copiaste correctamente la API Key en `config.php`
- Asegúrate de que la API Key empiece con `re_`

#### ❌ Error: "CORS"
- El script PHP ya tiene los headers CORS configurados
- Si persiste, verifica que el archivo esté en `/public_html/api/send-quote.php`

#### ❌ Los emails no llegan
- Revisa la carpeta de spam
- Verifica los logs en [Resend Dashboard](https://resend.com/emails)
- Si no configuraste el dominio, los emails vendrán de `onboarding@resend.dev`

#### ❌ Error 500
- Verifica que PHP esté habilitado en Hostinger
- Revisa los logs de error en Hostinger (File Manager → Error Logs)
- Verifica que `curl` esté habilitado en PHP

### 8. Verificar que PHP tiene cURL habilitado

En Hostinger:

1. Ve a **Hosting → Advanced → PHP Configuration**
2. Busca la extensión `curl`
3. Asegúrate de que esté **habilitada** ✅

### 9. Construir y Desplegar el Proyecto

```bash
# En tu computadora local
npm run build

# Esto genera la carpeta dist/
# Sube TODO el contenido de dist/ a public_html/ en Hostinger
```

**Estructura final en Hostinger:**

```
/home/usuario/domains/samval.org/
├── config.php
└── public_html/
    ├── index.html
    ├── assets/
    │   ├── index-abc123.js
    │   └── index-xyz789.css
    └── api/
        └── send-quote.php
```

### 10. Seguridad Adicional (Opcional)

Protege `config.php` con `.htaccess`:

Crea un archivo `.htaccess` en la raíz (junto a `config.php`):

```apache
<Files "config.php">
    Order Allow,Deny
    Deny from all
</Files>
```

## 📊 Límites del Plan Gratuito de Resend

- ✅ 100 emails/día
- ✅ 3,000 emails/mes
- ✅ Sin tarjeta de crédito

## 🎯 Checklist Final

- [ ] API Key de Resend obtenida
- [ ] `config.php` configurado con tu API Key
- [ ] Archivos subidos a Hostinger
- [ ] Permisos configurados (644)
- [ ] cURL habilitado en PHP
- [ ] Proyecto construido (`npm run build`)
- [ ] Archivos de `dist/` subidos a `public_html/`
- [ ] `send-quote.php` en `public_html/api/`
- [ ] Formulario probado
- [ ] Emails recibidos ✅

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Resend Dashboard
2. Revisa los error logs en Hostinger
3. Verifica que todos los archivos estén en las ubicaciones correctas

---

**¡Listo!** Tu formulario de cotizaciones ahora envía emails automáticamente. 🎉
