# Archivos para subir al repo de GitHub

Sólo 3 archivos. Cópialos a la raíz de tu repo manteniendo la misma estructura:

```
tu-repo/
├── api/
│   └── studios.js     ← NUEVO (crea la carpeta api/ si no existe)
├── data.js            ← REEMPLAZA el que ya tienes
└── package.json       ← AÑADE si no existe; si ya existe, NO lo sobrescribas (avísame)
```

Después: commit + push, y Vercel re-despliega solo.

⚠️ Antes del primer deploy, añade en Vercel las variables de entorno
`NOTION_TOKEN` y `DATABASE_ID` (ver chat).
