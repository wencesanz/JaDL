# Just a Design List — cómo está montada la web

Web estática (React sin paso de build en Vercel). Los datos viven en Notion.

## Datos
- **Notion → studios.json**: `.github/workflows/sync-notion.yml`, cada 6 horas o a mano desde Actions.
  En cada pasada también se generan las páginas estáticas: fichas (`studio/`), disciplinas, países,
  ciudades y regiones, y la portada y listados (`index.html`, `studios.html`, `geography.html`…),
  además de `sitemap.xml` y `feed.xml`.
- Las URLs sin `https://` en Notion se completan solas, y las `http://` que funcionan con https se
  muestran con https (`scripts/https-ok.json` guarda las ya comprobadas).

## Código de las vistas
- Se edita **solo** en los `*.jsx` de la raíz. `dist/*.js` se genera con:
  `npm install --no-save esbuild@0.24.0 && node scripts/build.mjs`
- Después hay que subir los `?v=` de `index.html` (dist/ se guarda en caché un año) y la versión
  del service worker en `sw.js`.
- `.github/workflows/check-build.yml` avisa si `dist/` no coincide con los `.jsx`.
- `social.js`, `community.js` y `data.js` son JavaScript normal, sin build.

## Tareas automáticas
- Día 1 de cada mes: revisión de webs (`check-links.yml`), que abre un aviso en GitHub.
  `scripts/link-check-ok.json` lista redirecciones ya revisadas.
- Día 2 de cada mes: capturas de las webs (`capture-shots.yml`). Se guardan en la rama `shots`
  y se sirven con jsDelivr; `shots.json` indica la versión. Si falta una, se usa mshots.

## Recursos propios
- React en `vendor/`, tipografías en `fonts/` (Aileron CC0, Paper Mono OFL).
