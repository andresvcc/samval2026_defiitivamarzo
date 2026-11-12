# 🌟 Fundación SAMVAL - Sitio Web Oficial

Sitio web oficial de la Fundación SAMVAL para el Desarrollo Social y Tecnológico.

## 🚀 Tecnologías

- **React** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- El CSS se compila con PostCSS durante el build y se sirve desde el mismo dominio;
  no depende del CDN de Tailwind ni genera estilos en el navegador.
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

## 🌐 Producción en Dokploy

`samval.org` y `www.samval.org` se sirven desde la aplicación `samvalprod`
del proyecto `web` en Dokploy. El build de producción genera `dist/`, incluido
el CSS estático con nombre versionado en `dist/assets/`.

Para comprobar los estilos, bloquear `cdn.tailwindcss.com` en el navegador y
revisar la portada y el menú a 360, 390, 768, 820, 1024, 1280 y 1440 píxeles.
El logo debe conservar su tamaño y los enlaces deben ser accesibles sin
desplazamiento horizontal. Comprobar también abrir el menú y navegar a Contacto
en móvil y tablet. Repetir con los cuatro idiomas disponibles.

## 📧 Formulario de Cotizaciones

El formulario de cotizaciones usa `mailto:` para abrir el cliente de correo del usuario con los datos pre-llenados. No requiere configuración adicional.

## 🎨 Características

- ✅ Diseño responsive
- ✅ Multiidioma (ES/EN)
- ✅ SEO optimizado
- ✅ Integración con Instagram
- ✅ Formularios de contacto
- ✅ Animaciones suaves
- ✅ Performance optimizado

## 📄 Licencia

© 2026 Fundación SAMVAL. Todos los derechos reservados.

## 🔗 Enlaces

- **Sitio Web**: [samval.org](https://samval.org)
- **Instagram**: [@fundacionsamval](https://instagram.com/fundacionsamval)
- **GitHub**: [jorgejime/samval2026](https://github.com/jorgejime/samval2026)
