#!/usr/bin/env node
/**
 * prerender.mjs
 *
 * Generates one STATIC html file per studio at studio/<slug>.html, using
 * index.html as the template but with per-studio <title>, meta description,
 * canonical, Open Graph / Twitter tags and JSON-LD (schema.org) baked into
 * the HTML source.
 *
 * Why: the site is a client-side SPA. Social crawlers (WhatsApp, X, LinkedIn,
 * Facebook, iMessage) do NOT run JavaScript, so they only ever see index.html's
 * generic <title>. Search engines render JS slowly and inconsistently. Baking
 * the meta + a small crawlable content snapshot into a real file per studio
 * fixes both — and the SPA still boots and hydrates over it as normal.
 *
 * Vercel serves these static files at the clean path (/studio/<slug>) when
 * "cleanUrls": true is set; the /studio/:slug -> /index.html rewrite stays as a
 * fallback for any slug that has not been prerendered yet.
 *
 * Zero dependencies. Run after sync-notion.mjs (studios.json must exist).
 *
 * Env:
 *   TEMPLATE_PATH  default "index.html"
 *   DATA_PATH      default "studios.json"
 *   OUT_DIR        default "studio"
 *   SITE_BASE      default "https://justadesignlist.com"
 */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';

const TEMPLATE_PATH = process.env.TEMPLATE_PATH || 'index.html';
const DATA_PATH     = process.env.DATA_PATH     || 'studios.json';
const OUT_DIR       = process.env.OUT_DIR       || 'studio';
const SITE_BASE     = process.env.SITE_BASE     || 'https://justadesignlist.com';

// Must match slugify() in app.jsx so URLs resolve to real routes.
function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function attrEsc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function htmlEsc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Mirror of setMeta() in app.jsx for the "studio" route.
function metaForStudio(s) {
  const cat = (s.category || '').split(',')[0].trim();
  const loc = [s.city, s.country].filter(Boolean).join(', ');
  const title = `${s.name} — ${cat}${loc ? ', ' + loc : ''} · Just a Design List`;
  const desc = `${s.name} is an independent design practice${loc ? ' based in ' + loc : ''}, working in ${(s.category || 'design').toLowerCase()}. Indexed on Just a Design List.`;
  const url = `${SITE_BASE}/studio/${slugify(s.name)}`;
  const image = s.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1200&h=630` : null;
  return { title, desc, url, image, cat, loc };
}

// Structured data — helps search engines understand each studio.
function jsonLd(s, m) {
  const sameAs = [];
  if (s.url) sameAs.push(s.url);
  if (s.ig) {
    const handle = String(s.ig).replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '');
    if (handle) sameAs.push(`https://www.instagram.com/${handle}/`);
  }
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: s.name,
    url: m.url,
    description: m.desc,
  };
  if (sameAs.length) data.sameAs = sameAs;
  if (s.city || s.country) {
    data.address = {
      '@type': 'PostalAddress',
      ...(s.city ? { addressLocality: s.city } : {}),
      ...(s.country ? { addressCountry: s.country } : {}),
    };
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Studios', item: `${SITE_BASE}/studios` },
      { '@type': 'ListItem', position: 2, name: s.name, item: m.url },
    ],
  };
  return [data, breadcrumb]
    .map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`)
    .join('\n');
}

// A minimal, real content block for crawlers. The SPA replaces #root's
// children on hydration, so this only needs to be valid + informative.
function bodySnapshot(s, m) {
  const facts = [
    ['Discipline', s.category],
    ['City', s.city],
    ['Country', s.country],
  ].filter(([, v]) => v);
  return `<div class="page" data-screen-label="studio"><main class="view wrap"><article><h1>${htmlEsc(s.name)}</h1><p>${htmlEsc(m.desc)}</p><dl>${facts.map(([k, v]) => `<dt>${htmlEsc(k)}</dt><dd>${htmlEsc(v)}</dd>`).join('')}</dl>${s.url ? `<p><a href="${attrEsc(s.url)}" rel="noopener">Visit ${htmlEsc(s.name)} \u2197</a></p>` : ''}</article></main></div>`;
}

function renderPage(template, s) {
  const m = metaForStudio(s);
  let html = template;

  const repl = (re, out) => { html = html.replace(re, out); };

  repl(/<title>[\s\S]*?<\/title>/, `<title>${htmlEsc(m.title)}</title>`);
  repl(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${attrEsc(m.desc)}">`);
  repl(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${attrEsc(m.url)}">`);
  repl(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="article">`);
  repl(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attrEsc(m.title)}">`);
  repl(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${attrEsc(m.desc)}">`);
  repl(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${attrEsc(m.url)}">`);
  repl(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${attrEsc(m.title)}">`);
  repl(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${attrEsc(m.desc)}">`);

  // Image tags (only if we have a screenshot URL).
  if (m.image) {
    repl(/<meta name="twitter:card" content="[^"]*">/, `<meta name="twitter:card" content="summary_large_image">`);
    // Insert og:image + twitter:image right after twitter:card.
    html = html.replace(
      /(<meta name="twitter:card" content="[^"]*">)/,
      `$1\n<meta property="og:image" content="${attrEsc(m.image)}">\n<meta name="twitter:image" content="${attrEsc(m.image)}">`
    );
  }

  // JSON-LD before </head>.
  html = html.replace(/<\/head>/, `${jsonLd(s, m)}\n</head>`);

  // Swap the (template's) #root snapshot for this studio's snapshot.
  html = html.replace(
    /<div id="root">[\s\S]*<\/div>(\s*<script src="https:\/\/unpkg\.com\/react)/,
    `<div id="root">${bodySnapshot(s, m)}</div>$1`
  );

  return html;
}

(async () => {
  const template = await readFile(TEMPLATE_PATH, 'utf8');
  const studios = JSON.parse(await readFile(DATA_PATH, 'utf8'));

  // Clean & recreate the output dir so removed studios don't linger.
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const seen = new Set();
  let count = 0;
  for (const s of studios) {
    if (!s || !s.name) continue;
    const slug = slugify(s.name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const html = renderPage(template, s);
    await writeFile(`${OUT_DIR}/${slug}.html`, html, 'utf8');
    count++;
  }
  console.log(`Prerendered ${count} studio pages into ${OUT_DIR}/`);
})().catch((err) => {
  console.error('PRERENDER FAILED:', err);
  process.exit(1);
});
