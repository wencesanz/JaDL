#!/usr/bin/env node
/**
 * prerender-collections.mjs
 *
 * Companion to prerender.mjs. Bakes ONE static html file per auto-generated
 * taxonomy collection, so social crawlers (no JS) and search engines get a
 * real <title>, meta description, canonical, Open Graph, JSON-LD and a
 * crawlable snapshot of the studio list — all generated from studios.json.
 *
 *   /disciplines            -> disciplines.html       (hub)
 *   /discipline/<slug>      -> discipline/<slug>.html  (leaf)
 *   /countries              -> countries.html
 *   /country/<slug>         -> country/<slug>.html
 *   /cities                 -> cities.html
 *   /city/<slug>            -> city/<slug>.html
 *
 * Leaves with < MIN_INDEXABLE studios are still written (correct social meta)
 * but marked <meta name="robots" content="noindex, follow"> and left OUT of the
 * sitemap, to avoid thin/duplicate content hurting the domain.
 *
 * Vercel serves these at the clean path when "cleanUrls": true; the
 * /country/:slug -> /index.html rewrites remain a fallback. Zero dependencies.
 *
 * Env: TEMPLATE_PATH (index.html), DATA_PATH (studios.json), SITE_BASE.
 */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';

const TEMPLATE_PATH = process.env.TEMPLATE_PATH || 'index.html';
const DATA_PATH     = process.env.DATA_PATH     || 'studios.json';
const SITE_BASE     = process.env.SITE_BASE     || 'https://justadesignlist.com';
const MIN_INDEXABLE = 2; // leaves with fewer studios get noindex

// Must match slugify() in app.jsx / collections.jsx.
function slugify(s) {
  return String(s || '')
    .toLowerCase().normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function attrEsc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function htmlEsc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Kind config — field on the record + noun labels.
const KINDS = {
  discipline: { field: 'category', singular: 'discipline', plural: 'disciplines', label: 'Discipline', labelPlural: 'Disciplines' },
  country:    { field: 'country',  singular: 'country',    plural: 'countries',   label: 'Country',    labelPlural: 'Countries' },
  city:       { field: 'city',     singular: 'city',       plural: 'cities',      label: 'City',       labelPlural: 'Cities' },
};

// Build value -> studios[] for a kind.
function groupBy(studios, field) {
  const map = new Map();
  for (const s of studios) {
    String(s[field] || '').split(',').map((x) => x.trim()).filter(Boolean).forEach((v) => {
      if (!map.has(v)) map.set(v, []);
      map.get(v).push(s);
    });
  }
  return map;
}

// Auto copy — mirror of collCopy() in collections.jsx.
function copyFor(kind, value, n) {
  const plural = n === 1 ? 'studio' : 'studios';
  if (kind === 'discipline') {
    return {
      h1: value,
      title: `${value} design studios · Just a Design List`,
      desc: `${n} independent ${plural} and designers working in ${value.toLowerCase()}, collected in the Just a Design List index. Browse by country and city.`,
    };
  }
  if (kind === 'country') {
    return {
      h1: value,
      title: `Design studios in ${value} · Just a Design List`,
      desc: `${n} independent design ${plural} and practices based in ${value}. A curated index — browse by city and discipline.`,
    };
  }
  return {
    h1: value,
    title: `Design studios in ${value} · Just a Design List`,
    desc: `${n} independent design ${plural} based in ${value}, from the Just a Design List index. Browse by discipline.`,
  };
}

function breadcrumbLd(pairs) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: pairs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  };
}
function collectionLd(name, description, url, studios) {
  return {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name, description, url,
    isPartOf: { '@type': 'WebSite', name: 'Just a Design List', url: SITE_BASE + '/' },
    mainEntity: {
      '@type': 'ItemList', numberOfItems: studios.length,
      itemListElement: studios.slice(0, 100).map((s, i) => ({
        '@type': 'ListItem', position: i + 1, url: `${SITE_BASE}/studio/${slugify(s.name)}`, name: s.name,
      })),
    },
  };
}
function ldScripts(nodes) {
  return nodes.map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join('\n');
}

// Crawlable body snapshot. The SPA replaces #root on hydration, so this only
// needs to be valid + informative for crawlers that don't run JS.
function leafSnapshot(kind, value, studios, copy) {
  const cfg = KINDS[kind];
  const items = studios.slice(0, 200).map((s) => {
    const loc = [s.city, s.country].filter(Boolean).join(', ');
    return `<li><a href="/studio/${slugify(s.name)}">${htmlEsc(s.name)}</a>${loc ? ` — ${htmlEsc(loc)}` : ''}</li>`;
  }).join('');
  return `<div class="page" data-screen-label="collection"><main class="view wrap"><nav><a href="/${cfg.plural}">All ${cfg.labelPlural.toLowerCase()}</a></nav><header><p>${htmlEsc(cfg.label)}</p><h1>${htmlEsc(copy.h1)}</h1><p>${htmlEsc(copy.desc)}</p></header><ul>${items}</ul></main></div>`;
}
function hubSnapshot(kind, rows) {
  const cfg = KINDS[kind];
  const items = rows.map(([value, studios]) =>
    `<li><a href="/${cfg.singular}/${slugify(value)}">${htmlEsc(value)}</a> (${studios.length})</li>`
  ).join('');
  return `<div class="page" data-screen-label="collectionHub"><main class="view wrap"><header><p>Browse</p><h1>${htmlEsc(cfg.labelPlural)}</h1><p>${rows.length} ${cfg.labelPlural.toLowerCase()} represented across the index.</p></header><ul>${items}</ul></main></div>`;
}

function renderPage(template, { title, desc, url, robots, jsonld, snapshot }) {
  let html = template;
  const repl = (re, out) => { html = html.replace(re, out); };
  repl(/<title>[\s\S]*?<\/title>/, `<title>${htmlEsc(title)}</title>`);
  repl(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${attrEsc(desc)}">`);
  repl(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${attrEsc(url)}">`);
  repl(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="website">`);
  repl(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attrEsc(title)}">`);
  repl(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${attrEsc(desc)}">`);
  repl(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${attrEsc(url)}">`);
  repl(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${attrEsc(title)}">`);
  repl(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${attrEsc(desc)}">`);
  // Inject robots (thin pages) + JSON-LD before </head>.
  const head = `${robots ? `<meta name="robots" content="${robots}">\n` : ''}${ldScripts(jsonld)}\n</head>`;
  html = html.replace(/<\/head>/, head);
  // Swap the template's #root snapshot for this page's snapshot.
  html = html.replace(
    /<div id="root">[\s\S]*<\/div>(\s*<script src="https:\/\/unpkg\.com\/react)/,
    `<div id="root">${snapshot}</div>$1`
  );
  return html;
}

(async () => {
  const template = await readFile(TEMPLATE_PATH, 'utf8');
  const studios = JSON.parse(await readFile(DATA_PATH, 'utf8'));

  let leaves = 0, hubs = 0, thin = 0;
  const sitemapUrls = []; // { path, priority } for indexable pages

  for (const kind of Object.keys(KINDS)) {
    const cfg = KINDS[kind];
    const grouped = groupBy(studios, cfg.field);
    const rows = [...grouped.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

    // ---- hub page ----
    const hubUrl = `${SITE_BASE}/${cfg.plural}`;
    const hubTitle = `Design ${cfg.labelPlural.toLowerCase()} · Just a Design List`;
    const hubDesc = `Browse the index of design studios by ${cfg.singular}. Every ${cfg.singular} represented across the directory.`;
    await writeFile(`${cfg.plural}.html`, renderPage(template, {
      title: hubTitle, desc: hubDesc, url: hubUrl, robots: null,
      jsonld: [breadcrumbLd([['Home', SITE_BASE + '/'], [cfg.labelPlural, hubUrl]])],
      snapshot: hubSnapshot(kind, rows),
    }), 'utf8');
    hubs++;
    sitemapUrls.push({ path: cfg.plural, priority: '0.7' });

    // ---- leaf pages ----
    await rm(cfg.singular, { recursive: true, force: true });
    await mkdir(cfg.singular, { recursive: true });
    const seen = new Set();
    for (const [value, group] of rows) {
      const slug = slugify(value);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const copy = copyFor(kind, value, group.length);
      const url = `${SITE_BASE}/${cfg.singular}/${slug}`;
      const indexable = group.length >= MIN_INDEXABLE;
      const sorted = [...group].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      await writeFile(`${cfg.singular}/${slug}.html`, renderPage(template, {
        title: copy.title, desc: copy.desc, url,
        robots: indexable ? null : 'noindex, follow',
        jsonld: [
          collectionLd(copy.title, copy.desc, url, sorted),
          breadcrumbLd([['Home', SITE_BASE + '/'], [cfg.labelPlural, `${SITE_BASE}/${cfg.plural}`], [value, url]]),
        ],
        snapshot: leafSnapshot(kind, value, sorted, copy),
      }), 'utf8');
      leaves++;
      if (indexable) sitemapUrls.push({ path: `${cfg.singular}/${slug}`, priority: '0.6' });
      else thin++;
    }
  }

  // Merge the collection URLs into sitemap.xml (written earlier by
  // sync-notion.mjs). Idempotent: replace any block between our markers.
  const today = new Date().toISOString().slice(0, 10);
  const block = sitemapUrls
    .map(({ path, priority }) => `  <url><loc>${SITE_BASE}/${path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`)
    .join('\n');
  const START = '  <!-- collections:start -->';
  const END = '  <!-- collections:end -->';
  try {
    let xml = await readFile('sitemap.xml', 'utf8');
    const wrapped = `${START}\n${block}\n${END}`;
    if (xml.includes(START) && xml.includes(END)) {
      xml = xml.replace(new RegExp(`${START}[\\s\\S]*?${END}`), wrapped);
    } else {
      xml = xml.replace('</urlset>', `${wrapped}\n</urlset>`);
    }
    await writeFile('sitemap.xml', xml, 'utf8');
    console.log(`Merged ${sitemapUrls.length} collection URLs into sitemap.xml`);
  } catch (e) {
    console.warn('Could not update sitemap.xml (run sync-notion.mjs first):', e.message);
  }

  console.log(`Prerendered ${hubs} hubs + ${leaves} leaf pages (${thin} thin/noindex). ${sitemapUrls.length} indexable URLs.`);
})().catch((err) => {
  console.error('PRERENDER-COLLECTIONS FAILED:', err);
  process.exit(1);
});
