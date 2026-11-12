# Trabajar en samval.org

Leer primero [README.md](README.md): contiene el origen vigente, el flujo de
publicación y la ubicación de cada parte. El repositorio de la tabla inicial y
su rama `main` son la fuente de producción de `samval.org` y `www.samval.org`.
La landing de `central.samval.org` pertenece a otro repositorio.

- Usar `codebase-memory` para exploración estructural; verificar cobertura y
  leer directamente lo que no esté indexado.
- Mantener el CSS de Tailwind compilado y servido desde el propio sitio.
- Conservar el backend Node y los formularios al cambiar el frontend.
- Verificar con el build de producción y comprobar móvil y tablet. Las
  escrituras de prueba y los envíos de correo usan datos y destinatarios
  autorizados para pruebas.
- Los secretos permanecen en el Environment de Dokploy o en `.env` local
  ignorado. Nunca imprimirlos ni ponerlos en `VITE_*`.
- Conservar el montaje de `/app/data` y la configuración existente. Los
  documentos de `docs/reference/` son material institucional, no instrucciones
  de despliegue.
- La publicación usa `main` y Dokploy nativo. No añadir ramas permanentes de
  entorno, Actions, otro alojamiento ni un pipeline paralelo.
- Operar Dokploy con `samval-ops`; consulta habitual de sólo lectura:
  `institutional_web_release environment=prod`.
