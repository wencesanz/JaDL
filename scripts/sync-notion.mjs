#!/usr/bin/env node
/**
 * sync-notion.mjs
 *
 * Reads a Notion database and writes studios.json in the exact format
 * the Design Index site expects.
 *
 * Required env vars:
 *   NOTION_TOKEN  — Internal integration token (secret_...)
 *   DATABASE_ID   — The Notion database UUID
 *
 * Optional env vars:
 *   OUTPUT_PATH   — Default: studios.json
 *
 * This script has ZERO dependencies — uses built-in fetch (Node 18+).
 */

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.DATABASE_ID;
const OUTPUT_PATH = process.env.OUTPUT_PATH || 'studios.json';
const NOTION_VERSION = '2022-06-28';

if (!NOTION_TOKEN || !DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or DATABASE_ID env var');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Property name mapping
// ---------------------------------------------------------------------------
// Change these strings if your Notion columns are named differently.
// The script is case-insensitive and tolerant of extra spaces.
// ---------------------------------------------------------------------------
const FIELD_MAP = {
  name:     ['name', 'studio', 'nombre', 'title'],
  category: ['category', 'categoría', 'categoria', 'disciplines', 'discipline', 'tags'],
  city:     ['city', 'ciudad'],
  country:  ['country', 'país', 'pais'],
  ig:       ['ig', 'instagram'],
  url:      ['url', 'website', 'web', 'site'],
};

function findProp(properties, candidates) {
  const keys = Object.keys(properties);
  const lookup = new Map(keys.map(k => [k.toLowerCase().trim(), k]));
  for (const c of candidates) {
    const k = lookup.get(c.toLowerCase().trim());
    if (k) return properties[k];
  }
  return null;
}

// ---------------------------------------------------------------------------
// Extract a plain-string value from any Notion property type
// ---------------------------------------------------------------------------
function extractValue(prop) {
  if (!prop) return '';
  switch (prop.type) {
    case 'title':
      return prop.title.map(t => t.plain_text).join('').trim();
    case 'rich_text':
      return prop.rich_text.map(t => t.plain_text).join('').trim();
    case 'url':
      return prop.url || '';
    case 'email':
      return prop.email || '';
    case 'phone_number':
      return prop.phone_number || '';
    case 'select':
      return prop.select?.name || '';
    case 'multi_select':
      return prop.multi_select.map(s => s.name).join(', ');
    case 'status':
      return prop.status?.name || '';
    case 'number':
      return prop.number != null ? String(prop.number) : '';
    case 'checkbox':
      return prop.checkbox ? 'true' : '';
    case 'date':
      return prop.date?.start || '';
    case 'people':
      return prop.people.map(p => p.name || '').join(', ');
    case 'files':
      return prop.files.map(f => f.external?.url || f.file?.url || '').join(', ');
    case 'formula':
      return extractFormula(prop.formula);
    case 'rollup':
      return extractRollup(prop.rollup);
    default:
      return '';
  }
}

function extractFormula(f) {
  if (!f) return '';
  if (f.type === 'string') return f.string || '';
  if (f.type === 'number') return f.number != null ? String(f.number) : '';
  if (f.type === 'boolean') return f.boolean ? 'true' : '';
  if (f.type === 'date') return f.date?.start || '';
  return '';
}

function extractRollup(r) {
  if (!r) return '';
  if (r.type === 'array') {
    return r.array.map(extractValue).filter(Boolean).join(', ');
  }
  if (r.type === 'number') return r.number != null ? String(r.number) : '';
  if (r.type === 'date') return r.date?.start || '';
  if (r.type === 'string') return r.string || '';
  return '';
}

// ---------------------------------------------------------------------------
// Query the Notion DB, paginating through all pages
// ---------------------------------------------------------------------------
async function fetchAllPages() {
  const all = [];
  let cursor = undefined;
  let page = 0;

  while (true) {
    page++;
    const body = {
      page_size: 100,
      ...(cursor ? { start_cursor: cursor } : {}),
    };

    // Retry with exponential backoff on 429 (rate limit) and 5xx errors.
    // Notion's public API limit is ~3 req/s averaged — we play it safe.
    let res;
    let attempt = 0;
    const maxAttempts = 6;
    while (true) {
      attempt++;
      res = await fetch(
        `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${NOTION_TOKEN}`,
            'Notion-Version': NOTION_VERSION,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      if (res.ok) break;

      const retriable = res.status === 429 || (res.status >= 500 && res.status < 600);
      if (!retriable || attempt >= maxAttempts) {
        const errText = await res.text();
        throw new Error(`Notion API error ${res.status}: ${errText}`);
      }

      // Honour Retry-After if present, otherwise exponential backoff
      const ra = Number(res.headers.get('retry-after'));
      const waitMs = (!isNaN(ra) && ra > 0)
        ? ra * 1000
        : Math.min(30000, 1000 * Math.pow(2, attempt));
      console.log(`  page ${page}: ${res.status}, retry ${attempt}/${maxAttempts - 1} in ${Math.round(waitMs / 1000)}s`);
      await new Promise((r) => setTimeout(r, waitMs));
    }

    const json = await res.json();
    all.push(...json.results);
    console.log(`  page ${page}: +${json.results.length} rows (total ${all.length})`);

    if (!json.has_more) break;
    cursor = json.next_cursor;

    // Gentle pacing between pages to stay under Notion's ~3 req/s ceiling
    await new Promise((r) => setTimeout(r, 350));
  }

  return all;
}

// ---------------------------------------------------------------------------
// Map a Notion page to our studio shape
// ---------------------------------------------------------------------------
function mapPage(page) {
  const p = page.properties;
  const studio = {
    name:     extractValue(findProp(p, FIELD_MAP.name)),
    category: extractValue(findProp(p, FIELD_MAP.category)),
    city:     extractValue(findProp(p, FIELD_MAP.city)),
    country:  extractValue(findProp(p, FIELD_MAP.country)),
    ig:       extractValue(findProp(p, FIELD_MAP.ig)),
    url:      extractValue(findProp(p, FIELD_MAP.url)),
    edited:   page.last_edited_time || '',
  };
  return studio;
}

// ---------------------------------------------------------------------------
// RSS feed
// ---------------------------------------------------------------------------
const SITE_URL   = process.env.SITE_URL   || 'https://justadesignlist.com';
const SITE_TITLE = process.env.SITE_TITLE || 'Just a Design List';
const SITE_DESC  = process.env.SITE_DESC  || 'A hand-edited list of design studios and freelances around the world. Curated by Wences Sanz-Alonso, from Madrid.';

function xmlEsc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Must match slugify() in app.jsx so sitemap URLs resolve to real routes.
function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function writeSitemap(studios) {
  const { writeFile } = await import('node:fs/promises');
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  const staticPages = [
    ['', '1.0', 'daily'],
    ['studios', '0.8', 'weekly'],
    ['geography', '0.6', 'weekly'],
    ['categories', '0.6', 'weekly'],
    ['about', '0.4', 'monthly'],
    ['submit', '0.4', 'monthly'],
  ];
  for (const [path, pr, cf] of staticPages) {
    lines.push(`  <url><loc>${SITE_URL}/${path}</loc><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`);
  }
  const seen = new Set();
  for (const s of studios) {
    const slug = slugify(s.name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    let lastmod = today;
    if (s.edited) {
      const dt = new Date(s.edited);
      if (!isNaN(dt.getTime())) lastmod = dt.toISOString().slice(0, 10);
    }
    lines.push(`  <url><loc>${SITE_URL}/studio/${slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join('\n')}\n</urlset>\n`;
  await writeFile('sitemap.xml', xml, 'utf8');
}

async function writeFeed(studios) {
  const { writeFile } = await import('node:fs/promises');
  const sorted = [...studios].sort((a, b) => {
    const ta = a.edited ? new Date(a.edited).getTime() : 0;
    const tb = b.edited ? new Date(b.edited).getTime() : 0;
    return tb - ta;
  });
  const recent = sorted.slice(0, 30);

  const items = recent.map((s) => {
    const ts = s.edited ? new Date(s.edited).toUTCString() : new Date().toUTCString();
    const link = s.url || SITE_URL;
    const cats = (s.category || '').split(',').map(x => x.trim()).filter(Boolean);
    const loc = [s.city, s.country].filter(Boolean).join(', ');
    const desc = `${cats.join(' · ')}${loc ? ' — ' + loc : ''}.`;
    const guid = `${SITE_URL}/studio/${slugify(s.name)}`;
    return `    <item>
      <title>${xmlEsc(s.name)}</title>
      <link>${xmlEsc(link)}</link>
      <guid isPermaLink="false">${xmlEsc(guid)}</guid>
      <pubDate>${ts}</pubDate>
      <description>${xmlEsc(desc)}</description>
${cats.map(c => `      <category>${xmlEsc(c)}</category>`).join('\n')}
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEsc(SITE_TITLE)}</title>
    <link>${xmlEsc(SITE_URL)}</link>
    <description>${xmlEsc(SITE_DESC)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${xmlEsc(SITE_URL)}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  await writeFile('feed.xml', xml, 'utf8');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  console.log(`Fetching from Notion database ${DATABASE_ID}...`);
  const pages = await fetchAllPages();
  console.log(`Fetched ${pages.length} rows total.`);

  const studios = pages
    .map(mapPage)
    .filter(s => s.name) // drop blank rows
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(`Mapped ${studios.length} studios.`);

  // Write JSON (compact-ish: one studio per line via indent 2)
  const { writeFile } = await import('node:fs/promises');
  await writeFile(OUTPUT_PATH, JSON.stringify(studios, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${OUTPUT_PATH}`);

  // Write RSS feed (latest 30 by Notion last_edited_time)
  await writeFeed(studios);
  console.log('Wrote feed.xml');

  // Write sitemap.xml (every page + one URL per studio)
  await writeSitemap(studios);
  console.log('Wrote sitemap.xml');

  // Quick diagnostics
  const missing = studios.filter(s => !s.url && !s.ig);
  if (missing.length) {
    console.log(`Note: ${missing.length} studios have no url or ig.`);
  }
})().catch(err => {
  console.error('SYNC FAILED:', err);
  process.exit(1);
});
