// /api/studios — Vercel serverless function.
//
// Reads the Notion database and returns the same JSON shape that
// studios.json used to have. Called by the front-end on page load.
//
// Env vars (set in Vercel dashboard → Settings → Environment Variables):
//   NOTION_TOKEN  — the integration secret (ntn_... or secret_...)
//   DATABASE_ID   — the 32-char Notion database id
//
// Caching: Vercel's CDN keeps the response for 1h (s-maxage=3600) and
// serves stale-while-revalidate for 24h, so heavy traffic doesn't hit
// the Notion API. Force a refresh by appending ?refresh=1 to the URL.

const NOTION_VERSION = '2022-06-28';

const FIELD_MAP = {
  name:     ['name', 'studio', 'nombre', 'title'],
  category: ['category', 'categoría', 'categoria', 'disciplines', 'discipline', 'tags'],
  city:     ['city', 'ciudad'],
  country:  ['country', 'país', 'pais'],
  ig:       ['ig', 'instagram'],
  url:      ['url', 'website', 'web', 'site'],
};

function findProp(properties, candidates) {
  const lookup = new Map(Object.keys(properties).map(k => [k.toLowerCase().trim(), k]));
  for (const c of candidates) {
    const k = lookup.get(c.toLowerCase().trim());
    if (k) return properties[k];
  }
  return null;
}

function extractValue(prop) {
  if (!prop) return '';
  switch (prop.type) {
    case 'title':       return prop.title.map(t => t.plain_text).join('').trim();
    case 'rich_text':   return prop.rich_text.map(t => t.plain_text).join('').trim();
    case 'url':         return prop.url || '';
    case 'email':       return prop.email || '';
    case 'phone_number':return prop.phone_number || '';
    case 'select':      return prop.select?.name || '';
    case 'multi_select':return prop.multi_select.map(s => s.name).join(', ');
    case 'status':      return prop.status?.name || '';
    case 'number':      return prop.number != null ? String(prop.number) : '';
    case 'checkbox':    return prop.checkbox ? 'true' : '';
    case 'date':        return prop.date?.start || '';
    case 'people':      return prop.people.map(p => p.name || '').join(', ');
    case 'files':       return prop.files.map(f => f.external?.url || f.file?.url || '').join(', ');
    case 'formula':     return extractFormula(prop.formula);
    case 'rollup':      return extractRollup(prop.rollup);
    default:            return '';
  }
}

function extractFormula(f) {
  if (!f) return '';
  if (f.type === 'string')  return f.string || '';
  if (f.type === 'number')  return f.number != null ? String(f.number) : '';
  if (f.type === 'boolean') return f.boolean ? 'true' : '';
  if (f.type === 'date')    return f.date?.start || '';
  return '';
}

function extractRollup(r) {
  if (!r) return '';
  if (r.type === 'array')  return r.array.map(extractValue).filter(Boolean).join(', ');
  if (r.type === 'number') return r.number != null ? String(r.number) : '';
  if (r.type === 'date')   return r.date?.start || '';
  if (r.type === 'string') return r.string || '';
  return '';
}

async function fetchAllPages(token, dbId) {
  const all = [];
  let cursor = undefined;

  while (true) {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Notion-Version': NOTION_VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        }),
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Notion API error ${res.status}: ${errText}`);
    }

    const json = await res.json();
    all.push(...json.results);
    if (!json.has_more) break;
    cursor = json.next_cursor;
  }

  return all;
}

function mapPage(page) {
  const p = page.properties;
  return {
    name:     extractValue(findProp(p, FIELD_MAP.name)),
    category: extractValue(findProp(p, FIELD_MAP.category)),
    city:     extractValue(findProp(p, FIELD_MAP.city)),
    country:  extractValue(findProp(p, FIELD_MAP.country)),
    ig:       extractValue(findProp(p, FIELD_MAP.ig)),
    url:      extractValue(findProp(p, FIELD_MAP.url)),
    edited:   page.last_edited_time || '',
  };
}

export default async function handler(req, res) {
  const token = process.env.NOTION_TOKEN;
  const dbId  = process.env.DATABASE_ID;

  if (!token || !dbId) {
    res.status(500).json({ error: 'Missing NOTION_TOKEN or DATABASE_ID env var on the server.' });
    return;
  }

  try {
    const pages = await fetchAllPages(token, dbId);
    const studios = pages
      .map(mapPage)
      .filter(s => s.name)
      .sort((a, b) => a.name.localeCompare(b.name));

    // Cache on Vercel's edge: fresh for 1h, stale-while-revalidate for 24h.
    // Bypass with ?refresh=1.
    const refresh = req.query?.refresh === '1';
    if (!refresh) {
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    } else {
      res.setHeader('Cache-Control', 'no-store');
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(studios);
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
