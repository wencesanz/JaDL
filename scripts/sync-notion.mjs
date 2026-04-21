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

    const res = await fetch(
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

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Notion API error ${res.status}: ${errText}`);
    }

    const json = await res.json();
    all.push(...json.results);
    console.log(`  page ${page}: +${json.results.length} rows (total ${all.length})`);

    if (!json.has_more) break;
    cursor = json.next_cursor;
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

  // Quick diagnostics
  const missing = studios.filter(s => !s.url && !s.ig);
  if (missing.length) {
    console.log(`Note: ${missing.length} studios have no url or ig.`);
  }
})().catch(err => {
  console.error('SYNC FAILED:', err);
  process.exit(1);
});
