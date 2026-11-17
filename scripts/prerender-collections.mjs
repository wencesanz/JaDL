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
 *   /regions                -> regions.html
 *   /region/<slug>          -> region/<slug>.html
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
import { regionOf, REGION_PLACE } from './regions.mjs';

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
let ALL = [];
// Studios whose names give the same slug (e.g. "Ensemble" and "ENSEMBLE") keep
// the plain slug for the oldest entry; later ones get their first city appended.
function studioSlug(s, list) {
  const base = slugify(s && s.name);
  const same = (list || []).filter((x) => x && x.name && slugify(x.name) === base);
  if (same.length < 2) return base;
  same.sort((a, b) => String(a.created || "").localeCompare(String(b.created || "")) || String(a.name).localeCompare(String(b.name)));
  if (same[0].name === s.name) return base;
  const city = slugify(String(s.city || "").split(",")[0]);
  return base + "-" + (city || String(same.findIndex((x) => x.name === s.name) + 1));
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
  region:     { field: 'region',   singular: 'region',     plural: 'regions',     label: 'Region',     labelPlural: 'Regions' },
};


// Build value -> studios[] for a kind.
// Latest edit date among a set of studios (YYYY-MM-DD), for sitemap lastmod.
function lastEdited(list) {
  let best = '';
  for (const s of list) {
    const dt = new Date(s.edited || s.created || '');
    if (!isNaN(dt.getTime())) { const d = dt.toISOString().slice(0, 10); if (d > best) best = d; }
  }
  return best || null;
}
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
      title: `${/design$/i.test(value) ? value : value + " design"} studios · Just a Design List`,
      desc: `${n} independent ${plural} and designers working in ${value.toLowerCase()}, collected in the Just a Design List index. Browse by country and city.`,
    };
  }
  if (kind === 'region') {
    const place = REGION_PLACE[value] || value;
    return {
      h1: value,
      title: `Design studios in ${place} · Just a Design List`,
      desc: `${n} independent design ${plural} and designers based in ${place}, from the Just a Design List index. Browse by country, city and discipline.`,
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

// Discipline within a place ("Branding studios in Berlin"): only when the
// combination has COMBO_MIN studios or more. Mirror of collComboCopy() in
// collections.jsx.
const COMBO_MIN = 5;
const COMBO_KINDS = ['city', 'country'];
function comboTitleWord(disc) { return /design$/i.test(disc) ? disc : disc + ' design'; }
function comboCopy(kind, place, disc, n) {
  const what = comboTitleWord(disc);
  return {
    h1: `${disc} in ${place}`,
    title: `${what} studios in ${place} · Just a Design List`,
    desc: `${n} independent ${n === 1 ? 'studio' : 'studios'} working in ${disc.toLowerCase()} in ${place}, from the Just a Design List index.`,
  };
}
function comboSnapshot(kind, place, disc, studios, copy) {
  const cfg = KINDS[kind];
  const items = studios.map((s) => {
    const loc = [s.city, s.country].filter(Boolean).join(', ');
    return `<li><a href="/studio/${studioSlug(s, ALL)}">${htmlEsc(s.name)}</a>${loc ? ` — ${htmlEsc(loc)}` : ''}</li>`;
  }).join('');
  return `<div class="page" data-screen-label="collection"><main class="view wrap"><nav><a href="/${cfg.singular}/${slugify(place)}">All studios in ${htmlEsc(place)}</a> · <a href="/discipline/${slugify(disc)}">All ${htmlEsc(disc)} studios</a></nav><header><p>${htmlEsc(cfg.label)} · ${htmlEsc(disc)}</p><h1>${htmlEsc(copy.h1)}</h1><p>${htmlEsc(copy.desc)}</p></header><ul>${items}</ul></main></div>`;
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
        '@type': 'ListItem', position: i + 1, url: `${SITE_BASE}/studio/${studioSlug(s, ALL)}`, name: s.name,
      })),
    },
  };
}
function ldScripts(nodes) {
  return nodes.map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join('\n');
}

// Crawlable body snapshot. The SPA replaces #root on hydration, so this only
// needs to be valid + informative for crawlers that don't run JS.
function leafSnapshot(kind, value, studios, copy, combos = []) {
  const cfg = KINDS[kind];
  const by = combos.length ? `<p>By discipline: ${combos.map(([d, n]) => `<a href="/${cfg.singular}/${slugify(value)}/${slugify(d)}">${htmlEsc(comboCopy(kind, value, d, n).title.replace(" · Just a Design List", ""))}</a> (${n})`).join(', ')}</p>` : '';
  const items = studios.slice(0, 200).map((s) => {
    const loc = [s.city, s.country].filter(Boolean).join(', ');
    return `<li><a href="/studio/${studioSlug(s, ALL)}">${htmlEsc(s.name)}</a>${loc ? ` — ${htmlEsc(loc)}` : ''}</li>`;
  }).join('');
  return `<div class="page" data-screen-label="collection"><main class="view wrap"><nav><a href="/${cfg.plural}">All ${cfg.labelPlural.toLowerCase()}</a></nav><header><p>${htmlEsc(cfg.label)}</p><h1>${htmlEsc(copy.h1)}</h1><p>${htmlEsc(copy.desc)}</p>${by}</header><ul>${items}</ul></main></div>`;
}
function hubSnapshot(kind, rows) {
  const cfg = KINDS[kind];
  const items = rows.map(([value, studios]) =>
    `<li><a href="/${cfg.singular}/${slugify(value)}">${htmlEsc(value)}</a> (${studios.length})</li>`
  ).join('');
  return `<div class="page" data-screen-label="collectionHub"><main class="view wrap"><header><p>Browse</p><h1>${htmlEsc(cfg.labelPlural)}</h1><p>${rows.length} ${cfg.labelPlural.toLowerCase()} represented across the index.</p></header><ul>${items}</ul></main></div>`;
}

// RSS per collection: the latest additions in that city/country/region/
// discipline, linking to each studio's page on the list. Dates come from the
// data only, so a feed changes only when its studios do.
const FEED_SIZE = 30;
const xmlEsc = (v) => String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function feedFor(kind, value, slug, group) {
  const cfg = KINDS[kind];
  const time = (s) => new Date(s.created || s.edited || 0).getTime() || 0;
  const recent = [...group].sort((a, b) => time(b) - time(a) || String(a.name).localeCompare(String(b.name))).slice(0, FEED_SIZE);
  const page = `${SITE_BASE}/${cfg.singular}/${slug}`;
  const self = `${SITE_BASE}/feeds/${cfg.singular}/${slug}.xml`;
  const newest = recent.length ? new Date(time(recent[0])).toUTCString() : new Date(0).toUTCString();
  const where = kind === 'discipline' ? `${value} studios` : `Design studios in ${value}`;
  const items = recent.map((s) => {
    const url = `${SITE_BASE}/studio/${studioSlug(s, ALL)}`;
    const cats = String(s.category || '').split(',').map((x) => x.trim()).filter(Boolean);
    const loc = [String(s.city || '').split(',')[0].trim(), String(s.country || '').split(',')[0].trim()].filter(Boolean).join(', ');
    return `    <item>
      <title>${xmlEsc(s.name)}</title>
      <link>${xmlEsc(url)}</link>
      <guid isPermaLink="true">${xmlEsc(url)}</guid>
      <pubDate>${new Date(time(s)).toUTCString()}</pubDate>
      <description>${xmlEsc(`${cats.join(' · ')}${loc ? ' — ' + loc : ''}.${s.url ? ' ' + s.url : ''}`)}</description>
${cats.map((c) => `      <category>${xmlEsc(c)}</category>`).join('\n')}
    </item>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEsc(where)} · Just a Design List</title>
    <link>${xmlEsc(page)}</link>
    <description>${xmlEsc(`New additions to Just a Design List: ${where.toLowerCase().startsWith('design') ? where.charAt(0).toLowerCase() + where.slice(1) : where}.`)}</description>
    <language>en</language>
    <lastBuildDate>${newest}</lastBuildDate>
    <atom:link href="${xmlEsc(self)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function renderPage(template, { title, desc, url, robots, jsonld, snapshot, image, feed }) {
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
  if (image) {
    repl(/(<meta property="og:image" content=")[^"]*(">)/, `$1${attrEsc(image)}$2`);
    repl(/(<meta name="twitter:image" content=")[^"]*(">)/, `$1${attrEsc(image)}$2`);
  }
  // Inject robots (thin pages) + JSON-LD before </head>.
  const head = `${robots ? `<meta name="robots" content="${robots}">\n` : ''}${feed ? `<link rel="alternate" type="application/rss+xml" title="${attrEsc(feed.title)}" href="${attrEsc(feed.href)}">\n` : ''}${ldScripts(jsonld)}\n</head>`;
  html = html.replace(/<\/head>/, head);
  // Swap the template's #root snapshot for this page's snapshot.
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>(\s*<script src="(?:https:\/\/unpkg\.com\/react|\/vendor\/react))/,
    `<div id="root">${snapshot}</div>$1`
  );
  return html;
}

(async () => {
  const template = await readFile(TEMPLATE_PATH, 'utf8');
  const studios = JSON.parse(await readFile(DATA_PATH, 'utf8'));
  ALL = studios;
  for (const s of studios) s.region = regionOf(s.country);

  let leaves = 0, hubs = 0, thin = 0, combos = 0;
  const sitemapUrls = []; // { path, priority } for indexable pages

  for (const kind of Object.keys(KINDS)) {
    const cfg = KINDS[kind];
    const grouped = groupBy(studios, cfg.field);
    const rows = [...grouped.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

    // ---- hub page ----
    const hubUrl = `${SITE_BASE}/${cfg.plural}`;
    const hubTitle = `Design studios by ${cfg.singular} · Just a Design List`;
    const hubDesc = `Browse the index of design studios by ${cfg.singular}. Every ${cfg.singular} represented across the directory.`;
    await writeFile(`${cfg.plural}.html`, renderPage(template, {
      title: hubTitle, desc: hubDesc, url: hubUrl, robots: null,
      jsonld: [breadcrumbLd([['Home', SITE_BASE + '/'], [cfg.labelPlural, hubUrl]])],
      snapshot: hubSnapshot(kind, rows),
    }), 'utf8');
    hubs++;
    sitemapUrls.push({ path: cfg.plural, priority: '0.7', lastmod: lastEdited(studios) });

    // ---- leaf pages ----
    await rm(cfg.singular, { recursive: true, force: true });
    await mkdir(cfg.singular, { recursive: true });
    await rm(`feeds/${cfg.singular}`, { recursive: true, force: true });
    await mkdir(`feeds/${cfg.singular}`, { recursive: true });
    const seen = new Set();
    for (const [value, group] of rows) {
      const slug = slugify(value);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const copy = copyFor(kind, value, group.length);
      const url = `${SITE_BASE}/${cfg.singular}/${slug}`;
      const indexable = group.length >= MIN_INDEXABLE;
      const sorted = [...group].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      const combosHere = COMBO_KINDS.includes(kind)
        ? [...groupBy(group, 'category').entries()].filter(([, g]) => g.length >= COMBO_MIN).map(([d, g]) => [d, g.length]).sort((a, b) => b[1] - a[1])
        : [];
      await writeFile(`${cfg.singular}/${slug}.html`, renderPage(template, {
        title: copy.title, desc: copy.desc, url,
        image: `${SITE_BASE}/api/og?kind=${kind}&value=${encodeURIComponent(value)}&v=1`,
        robots: indexable ? null : 'noindex, follow',
        jsonld: [
          collectionLd(copy.title, copy.desc, url, sorted),
          breadcrumbLd([['Home', SITE_BASE + '/'], [cfg.labelPlural, `${SITE_BASE}/${cfg.plural}`], [value, url]]),
        ],
        snapshot: leafSnapshot(kind, value, sorted, copy, combosHere),
        feed: { title: `${copy.h1} · Just a Design List`, href: `/feeds/${cfg.singular}/${slug}.xml` },
      }), 'utf8');
      await writeFile(`feeds/${cfg.singular}/${slug}.xml`, feedFor(kind, value, slug, group), 'utf8');
      leaves++;
      if (indexable) sitemapUrls.push({ path: `${cfg.singular}/${slug}`, priority: '0.6', lastmod: lastEdited(group) });
      else thin++;

      // ---- discipline within this place ----
      if (COMBO_KINDS.includes(kind)) {
        const byDisc = groupBy(group, 'category');
        for (const [disc, sub] of byDisc) {
          if (sub.length < COMBO_MIN) continue;
          const dslug = slugify(disc);
          const ccopy = comboCopy(kind, value, disc, sub.length);
          const curl = `${url}/${dslug}`;
          const csorted = [...sub].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          await mkdir(`${cfg.singular}/${slug}`, { recursive: true });
          await writeFile(`${cfg.singular}/${slug}/${dslug}.html`, renderPage(template, {
            title: ccopy.title, desc: ccopy.desc, url: curl,
            image: `${SITE_BASE}/api/og?kind=${kind}&value=${encodeURIComponent(value)}&v=1`,
            robots: null,
            jsonld: [
              collectionLd(ccopy.title, ccopy.desc, curl, csorted),
              breadcrumbLd([['Home', SITE_BASE + '/'], [cfg.labelPlural, `${SITE_BASE}/${cfg.plural}`], [value, url], [disc, curl]]),
            ],
            snapshot: comboSnapshot(kind, value, disc, csorted, ccopy),
          }), 'utf8');
          combos++;
          sitemapUrls.push({ path: `${cfg.singular}/${slug}/${dslug}`, priority: '0.6', lastmod: lastEdited(sub) });
        }
      }
    }
  }

  // Merge the collection URLs into sitemap.xml (written earlier by
  // sync-notion.mjs). Idempotent: replace any block between our markers.
  const today = new Date().toISOString().slice(0, 10);
  const block = sitemapUrls
    .map(({ path, priority, lastmod }) => `  <url><loc>${SITE_BASE}/${path}</loc><lastmod>${lastmod || today}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`)
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

  console.log(`Prerendered ${hubs} hubs + ${leaves} leaf pages (${thin} thin/noindex) + ${combos} discipline-in-place pages. ${sitemapUrls.length} indexable URLs.`);
})().catch((err) => {
  console.error('PRERENDER-COLLECTIONS FAILED:', err);
  process.exit(1);
});
