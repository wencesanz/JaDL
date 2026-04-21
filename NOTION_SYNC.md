# Sincronización con Notion

La web toma los estudios de `studios.json`. Este documento explica cómo
configurar la sincronización automática desde una base de datos de Notion
usando GitHub Actions. Una vez hecho, cualquier cambio en Notion aparecerá
en la web publicada en ~6 horas (o al instante si lanzas el workflow
manualmente desde la pestaña **Actions**).

---

## 1. Crear una integración interna en Notion

1. Abre <https://www.notion.so/my-integrations>.
2. Pulsa **+ New integration**.
3. Nombre: `Design Index Sync` (o lo que quieras).
4. Workspace: el que contiene tu base de datos.
5. Type: **Internal**.
6. Guarda. En la siguiente pantalla verás **Internal Integration Secret** —
   copia ese token (empieza por `secret_...` o `ntn_...`). Lo necesitarás en
   el paso 3.

## 2. Compartir la base de datos con la integración

1. Abre la base de datos en Notion.
2. Arriba a la derecha, pulsa **•••** (menú de la página) →
   **Connections** → **Connect to** → elige `Design Index Sync`.
3. También necesitas el **Database ID**. Ábrela como página completa: la URL
   tiene la forma

   ```
   https://www.notion.so/TU_WORKSPACE/DATABASE_ID?v=VIEW_ID
   ```

   El `DATABASE_ID` es la cadena de 32 caracteres hex. Cópiala.

## 3. Añadir los secrets al repo de GitHub

1. En tu repo: **Settings → Secrets and variables → Actions → New repository secret**.
2. Añade dos secrets:
   - `NOTION_TOKEN` → el token del paso 1.
   - `DATABASE_ID`  → el ID del paso 2.

## 4. Nombres de las columnas en Notion

El script mapea automáticamente estas columnas (mayúsculas/minúsculas y
espacios extra no importan). Si tu base tiene otros nombres, renombra las
columnas en Notion o edita `FIELD_MAP` en `scripts/sync-notion.mjs`.

| Campo JSON  | Nombres aceptados en Notion                     | Tipo recomendado      |
|-------------|-------------------------------------------------|-----------------------|
| `name`      | Name, Studio, Nombre, Title                     | Title                 |
| `category`  | Category, Categoría, Disciplines, Tags          | Multi-select o Text   |
| `city`      | City, Ciudad                                    | Text o Select         |
| `country`   | Country, País                                   | Text o Select         |
| `ig`        | IG, Instagram                                   | URL                   |
| `url`       | URL, Website, Web, Site                         | URL                   |

El campo `edited` se rellena automáticamente con `last_edited_time` de
Notion, no hace falta una columna.

## 5. Lanzar la primera sincronización

1. Ve a la pestaña **Actions** del repo.
2. En la lista de workflows, elige **Sync from Notion**.
3. Pulsa **Run workflow** → **Run workflow**.
4. Espera ~30 s. Si todo va bien verás un commit nuevo
   `chore: sync studios from Notion` en el repo y GitHub Pages se
   redesplegará en otro minuto.

A partir de aquí se ejecutará cada 6 horas automáticamente. Cambia el cron
en `.github/workflows/sync-notion.yml` si quieres otra frecuencia:

```yaml
schedule:
  - cron: '0 */6 * * *'   # cada 6 horas
  - cron: '0 3 * * *'     # una vez al día a las 03:00 UTC
  - cron: '*/30 * * * *'  # cada 30 min (mínimo práctico en GitHub)
```

## 6. Probar en local (opcional)

```bash
export NOTION_TOKEN=secret_...
export DATABASE_ID=xxxxxxxxxxxx
node scripts/sync-notion.mjs
```

Escribirá `studios.json` en la raíz del proyecto.

## Troubleshooting

- **`Notion API error 401`** → token mal pegado o la integración no está
  conectada a la base de datos (paso 2).
- **`Notion API error 404`** → `DATABASE_ID` incorrecto, o la integración
  no tiene acceso. Revisa que el ID son 32 hex sin guiones.
- **El JSON sale con campos vacíos** → los nombres de columna no coinciden
  con `FIELD_MAP`. Renombra en Notion o edita el script.
- **El workflow falla en `git push`** → asegúrate de que en
  **Settings → Actions → General → Workflow permissions** está marcado
  **Read and write permissions**.
