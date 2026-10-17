#!/usr/bin/env node
/**
 * prerender-pages.mjs
 *
 * Bakes crawlable HTML for the main pages, like prerender.mjs does for each
 * studio and prerender-collections.mjs for the taxonomy pages:
 *
 *   /            -> index.html       (home: intro, recent additions, links)
 *   /studios     -> studios.html     (every studio, as links)
 *   /geography   -> geography.html   (regions, countries, cities)
 *   /categories  -> categories.html  (disciplines)
 *   /about       -> about.html       (colophon)
 *   /submit      -> submit.html
 *
 * The SPA replaces #root on load, so the snapshot only has to be valid and
 * informative for crawlers and link previews. index.html is also the
 * fallback page for routes without their own file, so its snapshot removes
 * itself when the address is not the home page.
 *
 * Run after sync-notion.mjs (it reads studios.json and the counts it writes
 * into index.html). Zero dependencies.
 */
import { readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';
import { regionOf, REGIONS } from './regions.mjs';

const SITE_BASE = process.env.SITE_BASE || 'https://justadesignlist.com';
const TEMPLATE_PATH = process.env.TEMPLATE_PATH || 'index.html';
const DATA_PATH = process.env.DATA_PATH || 'studios.json';

function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
let ALL = [];
function studioSlug(s, list) {
  const base = slugify(s && s.name);
  const same = (list || []).filter((x) => x && x.name && slugify(x.name) === base);
  if (same.length < 2) return base;
  same.sort((a, b) => String(a.created || '').localeCompare(String(b.created || '')) || String(a.name).localeCompare(String(b.name)));
  if (same[0].name === s.name) return base;
  const city = slugify(String(s.city || '').split(',')[0]);
  return base + '-' + (city || String(same.findIndex((x) => x.name === s.name) + 1));
}
const attrEsc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const htmlEsc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const list = (v) => String(v || '').split(',').map((x) => x.trim()).filter(Boolean);
const first = (v) => list(v)[0] || '';
const ld = (nodes) => nodes.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('');

function count(studios, field, firstOnly) {
  const m = new Map();
  for (const s of studios) for (const v of (firstOnly ? [first(s[field])].filter(Boolean) : list(s[field]))) m.set(v, (m.get(v) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
const studioLink = (s) => `<a href="/studio/${studioSlug(s, ALL)}">${htmlEsc(s.name)}</a>`;
const place = (s) => [first(s.city), first(s.country)].filter(Boolean).join(', ');
const nav = `<nav aria-label="Primary"><ul><li><a href="/">Index</a></li><li><a href="/studios">Studios</a></li><li><a href="/geography">Geography</a></li><li><a href="/categories">Categories</a></li><li><a href="/submit">Submit</a></li><li><a href="/about">Colophon</a></li></ul></nav>`;
const wrap = (label, inner, extra = '') => `<div class="page" data-screen-label="${label}">${nav}<main class="view wrap">${inner}</main>${extra}</div>`;

// Same replacement as the other prerender scripts: swap the meta tags and
// the contents of #root (up to the React script that follows it).
function renderPage(template, { title, desc, url, snapshot }) {
  let html = template;
  const repl = (re, out) => { html = html.replace(re, out); };
  repl(/<title>[\s\S]*?<\/title>/, `<title>${htmlEsc(title)}</title>`);
  repl(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${attrEsc(desc)}">`);
  repl(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${attrEsc(url)}">`);
  repl(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attrEsc(title)}">`);
  repl(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${attrEsc(desc)}">`);
  repl(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${attrEsc(url)}">`);
  repl(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${attrEsc(title)}">`);
  repl(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${attrEsc(desc)}">`);
  const ROOT = /<div id="root">[\s\S]*?<\/div>(\s*<script src="(?:https:\/\/unpkg\.com\/react|\/vendor\/react))/;
  // (Comparing before/after is not enough: when nothing changed since the
  // last run the page is identical, which is fine.)
  if (!ROOT.test(html)) throw new Error('Could not find #root followed by the React script in the template');
  html = html.replace(ROOT, () => `<div id="root">${snapshot}</div>` + html.match(ROOT)[1]);
  return html;
}

(async () => {
  let template = await readFile(TEMPLATE_PATH, 'utf8');
  const studios = JSON.parse(await readFile(DATA_PATH, 'utf8')).filter((s) => s && s.name);
  ALL = studios;
  // Site copy (statement, note, colophon…) lives in data.js; read it without a browser.
  const ctx = { window: {}, fetch: () => new Promise(() => {}), console };
  vm.runInNewContext(await readFile('data.js', 'utf8'), ctx);
  const SITE = ctx.window.SITE || {};

  const byName = [...studios].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
  const countries = count(studios, 'country');
  const cities = count(studios, 'city');
  const cats = count(studios, 'category');
  const nCountries = new Set(studios.map((s) => s.country).filter(Boolean)).size; // same count as sync-notion.mjs
  const recent = [...studios].sort((a, b) => String(b.created || b.edited || '').localeCompare(String(a.created || a.edited || '')) || a.name.localeCompare(b.name)).slice(0, 20);
  const regionCounts = new Map();
  for (const s of studios) { const r = regionOf(s.country); if (r) regionCounts.set(r, (regionCounts.get(r) || 0) + 1); }
  const regionNames = [...REGIONS.map(([n]) => n), 'Rest of the world'].filter((n) => regionCounts.has(n));
  const liCount = (kind, rows) => rows.map(([v, n]) => `<li><a href="/${kind}/${slugify(v)}">${htmlEsc(v)}</a> (${n})</li>`).join('');
  const pages = [];

  // ---- home ----
  const homeDesc = `A slow, curated index of design studios and independent designers. ${studios.length} entries across ${nCountries} countries.`;
  pages.push({
    file: 'index.html',
    title: 'Just a Design List — A curated directory of design practices',
    desc: homeDesc,
    url: `${SITE_BASE}/`,
    snapshot: wrap('index',
      `<header><h1>${studios.length} design studios and independent designers, collected without ranking.</h1><p>${htmlEsc(SITE.statement)}</p><p><a href="/studios">Read the full list</a>, or enter through <a href="/categories">discipline</a> or <a href="/geography">geography</a>.</p></header>` +
      `<section><h2>Recent additions</h2><ul>${recent.map((s) => `<li>${studioLink(s)}${place(s) ? ` — ${htmlEsc(place(s))}` : ''}</li>`).join('')}</ul></section>` +
      `<section><h2>By discipline</h2><ul>${liCount('discipline', cats)}</ul></section>` +
      `<section><h2>By region</h2><ul>${regionNames.map((n) => `<li><a href="/region/${slugify(n)}">${htmlEsc(n)}</a> (${regionCounts.get(n)})</li>`).join('')}</ul></section>` +
      `<section><h2>Most represented countries</h2><ul>${liCount('country', countries.slice(0, 12))}</ul></section>` +
      `<section><h2>Note</h2><p>${htmlEsc(SITE.note)}</p></section>`,
      // index.html is also served for routes that have no file of their own;
      // there, drop the home snapshot so it never flashes on another page.
      ld([{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Just a Design List', url: `${SITE_BASE}/`, description: homeDesc, inLanguage: 'en' }]) +
      `<script>(function(){var p=location.pathname;if(p!=="/"&&p!=="/index.html"&&p!=="/index"){var r=document.getElementById("root");if(r)r.innerHTML="";}})();</script>`),
  });

  // ---- studios ----
  pages.push({
    file: 'studios.html',
    title: 'All studios · Just a Design List',
    desc: `Browse the full index of ${studios.length} design studios and independent designers, A to Z.`,
    url: `${SITE_BASE}/studios`,
    snapshot: wrap('studios', `<header><p>The List</p><h1>All ${studios.length} studios and designers</h1></header><ul>${byName.map((s) => `<li>${studioLink(s)}${place(s) ? ` — ${htmlEsc(place(s))}` : ''}${s.category ? ` · ${htmlEsc(s.category)}` : ''}</li>`).join('')}</ul>`),
  });

  // ---- geography ----
  pages.push({
    file: 'geography.html',
    title: 'Geography · Just a Design List',
    desc: `Where the studios are: ${nCountries} countries and ${cities.length} cities, on a world map and by region.`,
    url: `${SITE_BASE}/geography`,
    snapshot: wrap('geography',
      `<header><p>Geography</p><h1>Studios across ${countries.length} countries and ${cities.length} cities</h1></header>` +
      `<section><h2>Regions</h2><ul>${regionNames.map((n) => `<li><a href="/region/${slugify(n)}">${htmlEsc(n)}</a> (${regionCounts.get(n)})</li>`).join('')}</ul></section>` +
      `<section><h2>Countries</h2><ul>${liCount('country', countries)}</ul></section>` +
      `<section><h2>Cities</h2><ul>${liCount('city', cities.slice(0, 60))}</ul><p><a href="/cities">All cities</a></p></section>`),
  });

  // ---- categories ----
  const blurbs = SITE.categoryBlurbs || {};
  pages.push({
    file: 'categories.html',
    title: 'Categories · Just a Design List',
    desc: `Browse design studios and practices by discipline: ${cats.slice(0, 6).map(([c]) => c.toLowerCase()).join(', ')} and more.`,
    url: `${SITE_BASE}/categories`,
    snapshot: wrap('categories', `<header><p>Categories</p><h1>Disciplines</h1></header><ul>${cats.map(([c, n]) => `<li><a href="/discipline/${slugify(c)}">${htmlEsc(c)}</a> (${n})${blurbs[c] ? ` — ${htmlEsc(blurbs[c])}` : ''}</li>`).join('')}</ul>`),
  });

  // ---- about ----
  pages.push({
    file: 'about.html',
    title: 'Colophon · Just a Design List',
    desc: 'About Just a Design List — a hand-edited index of design practices.',
    url: `${SITE_BASE}/about`,
    snapshot: wrap('about', `<header><p>Colophon</p><h1>About Just a Design List</h1></header><p>${htmlEsc(SITE.statement)}</p><p>${htmlEsc(SITE.note)}</p>${(SITE.colophon || []).map((l) => `<p>${htmlEsc(l)}</p>`).join('')}`),
  });

  // ---- submit ----
  pages.push({
    file: 'submit.html',
    title: 'Submit a studio or designer · Just a Design List',
    desc: 'Suggest a design studio or independent designer for the index.',
    url: `${SITE_BASE}/submit`,
    snapshot: wrap('submit', `<header><p>Submit</p><h1>Suggest a studio or designer</h1><p>Just a Design List is a hand-edited list. Entries are read, researched and added when they fit.</p></header>`),
  });

  // index.html is the template for every other page, so write it last and
  // build the rest from the untouched template.
  for (const p of pages.filter((x) => x.file !== 'index.html')) {
    await writeFile(p.file, renderPage(template, p), 'utf8');
  }
  const home = pages.find((x) => x.file === 'index.html');
  await writeFile(home.file, renderPage(template, home), 'utf8');
  console.log(`Prerendered ${pages.length} main pages (${pages.map((p) => p.file).join(', ')}).`);
})().catch((err) => {
  console.error('PRERENDER-PAGES FAILED:', err);
  process.exit(1);
});
