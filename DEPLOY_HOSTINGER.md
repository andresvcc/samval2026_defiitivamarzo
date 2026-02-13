# 🚀 GUÍA RÁPIDA DE DESPLIEGUE A HOSTINGER

## ✅ Compilación Completada

La aplicación ha sido compilada exitosamente. Todos los archivos están listos en la carpeta `dist/`.

---

## 📦 ARCHIVOS A SUBIR A HOSTINGER

### **Estructura en tu servidor Hostinger:**

```
/home/usuario/domains/samval.org/
│
├── config.php                    ← Subir PRIMERO (fuera de public_html)
│
└── public_html/                  ← Aquí va TODO el contenido de dist/
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   ├── index-[hash].css
    │   └── [otros archivos]
    └── api/
        └── send-quote.php
```

---

## 🎯 PASOS PARA SUBIR A HOSTINGER

### **Paso 1: Configurar config.php**

1. Abre el archivo `config.php` en la raíz del proyecto
2. Pega tu API Key de Resend:

```php
define('RESEND_API_KEY', 're_TU_API_KEY_AQUI');
```

3. Guarda el archivo

---

### **Paso 2: Acceder a Hostinger File Manager**

1. Inicia sesión en [Hostinger](https://hpanel.hostinger.com)
2. Ve a tu hosting
3. Abre **File Manager**

---

### **Paso 3: Subir config.php**

1. Navega a `/home/usuario/domains/samval.org/`
2. Sube el archivo `config.php` **AQUÍ** (fuera de public_html)
3. Verifica que esté en la raíz, NO dentro de public_html

---

### **Paso 4: Limpiar public_html (si es necesario)**

1. Navega a `public_html/`
2. **ELIMINA** todos los archivos antiguos (haz backup si es necesario)
3. Deja la carpeta vacía

---

### **Paso 5: Subir archivos compilados**

1. Abre la carpeta `dist/` en tu computadora
2. **Selecciona TODO** el contenido de `dist/`:
   - `index.html`
   - Carpeta `assets/`
   - Carpeta `api/`
3. Sube todo a `public_html/`

**Resultado esperado:**

```
public_html/
├── index.html
├── assets/
│   ├── index-abc123.js
│   ├── index-xyz789.css
│   └── ...
└── api/
    └── send-quote.php
```

---

### **Paso 6: Verificar Permisos**

1. Haz clic derecho en `config.php`
2. Selecciona **Permissions**
3. Configura: `644` (rw-r--r--)
4. Haz lo mismo con `send-quote.php`

---

### **Paso 7: Verificar PHP y cURL**

1. En Hostinger, ve a **Advanced → PHP Configuration**
2. Verifica que la versión de PHP sea **7.4 o superior**
3. Busca la extensión `curl` y asegúrate de que esté **habilitada** ✅

---

### **Paso 8: Probar el Sitio**

1. Abre tu sitio: `https://samval.org`
2. Navega a la página de **Servicios Tecnológicos**
3. Llena el formulario de cotización
4. Haz clic en **Enviar**
5. Deberías ver el mensaje: "✅ ¡Cotización enviada exitosamente!"
6. Revisa tu email: `jorge.jimenez@samval.org`

---

## 🔍 VERIFICACIÓN RÁPIDA

### ✅ Checklist de Archivos:

- [ ] `config.php` en `/home/usuario/domains/samval.org/`
- [ ] `index.html` en `public_html/`
- [ ] Carpeta `assets/` en `public_html/`
- [ ] Carpeta `api/` en `public_html/`
- [ ] `send-quote.php` en `public_html/api/`
- [ ] Permisos 644 en `config.php`
- [ ] Permisos 644 en `send-quote.php`
- [ ] cURL habilitado en PHP
- [ ] API Key de Resend configurada

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ Error 404 en las rutas

**Solución**: Crea un archivo `.htaccess` en `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### ❌ Error al enviar formulario

1. Verifica que `config.php` tenga tu API Key real
2. Revisa los logs en [Resend Dashboard](https://resend.com/emails)
3. Verifica que cURL esté habilitado
4. Revisa los error logs en Hostinger

### ❌ Página en blanco

1. Verifica que subiste TODO el contenido de `dist/`
2. Revisa la consola del navegador (F12)
3. Verifica que los archivos estén en `public_html/`, no en una subcarpeta

---

## 📊 ARCHIVOS COMPILADOS

La carpeta `dist/` contiene:

- ✅ `index.html` - Página principal
- ✅ `assets/` - JavaScript, CSS, imágenes optimizadas
- ✅ `api/send-quote.php` - Script PHP para emails

**Tamaño total**: ~2-5 MB (optimizado para producción)

---

## 🎉 ¡LISTO!

Una vez completados todos los pasos, tu sitio estará en vivo en:
**https://samval.org**

El formulario de cotizaciones enviará emails automáticamente a:
**jorge.jimenez@samval.org**

---

## 📞 SOPORTE

Si necesitas ayuda:

1. Revisa `HOSTINGER_SETUP.md` para más detalles
2. Verifica los logs en Resend Dashboard
3. Revisa los error logs en Hostinger File Manager

---

**Última compilación**: 13 de febrero de 2026, 15:04
**Versión**: Producción optimizada
