#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 *
 * Regenerates sitemap.xml from studios.json, so it never again drifts out of
 * sync with the live index (it previously sat frozen at 814 studios while the
 * site grew past 1,300+).
 *
 * Preserves each existing studio's <lastmod> from the current sitemap.xml
 * when present — never invents a fake "updated today" date. New studios that
 * aren't in the old sitemap are written without a <lastmod> (optional per the
 * sitemap spec) rather than guessing one.
 *
 * Zero dependencies. Run after sync-notion.mjs (studios.json must exist),
 * ideally in the same CI step/workflow so the sitemap always tracks the data.
 *
 * Env:
 *   DATA_PATH      default "studios.json"
 *   SITEMAP_PATH   default "sitemap.xml"
 *   SITE_BASE      default "https://justadesignlist.com"
 */

import { readFile, writeFile } from 'node:fs/promises';

const DATA_PATH    = process.env.DATA_PATH    || 'studios.json';
const SITEMAP_PATH = process.env.SITEMAP_PATH || 'sitemap.xml';
const SITE_BASE     = process.env.SITE_BASE    || 'https://justadesignlist.com';

// Must match slugify() in app.jsx / prerender.mjs so URLs resolve to real routes.
function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function xmlEsc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Pull { slug -> lastmod } out of whatever sitemap.xml is currently on disk,
// so re-running this script never loses dates you (or a previous run) set.
async function loadExistingLastmods(path) {
  const map = new Map();
  let xml;
  try {
    xml = await readFile(path, 'utf8');
  } catch {
    return map; // no existing sitemap — fine, just start fresh
  }
  const urlRe = /<url><loc>([^<]*)<\/loc>(?:<lastmod>([^<]*)<\/lastmod>)?/g;
  let m;
  while ((m = urlRe.exec(xml))) {
    const loc = m[1];
    const lastmod = m[2];
    const match = loc.match(/\/studio\/([^/]+)$/);
    if (match && lastmod) map.set(match[1], lastmod);
  }
  return map;
}

const STATIC_PAGES = [
  { loc: '/',           changefreq: 'daily',   priority: '1.0' },
  { loc: '/studios',    changefreq: 'weekly',  priority: '0.8' },
  { loc: '/geography',  changefreq: 'weekly',  priority: '0.6' },
  { loc: '/categories', changefreq: 'weekly',  priority: '0.6' },
  { loc: '/about',      changefreq: 'monthly', priority: '0.4' },
  { loc: '/submit',     changefreq: 'monthly', priority: '0.4' },
];

function urlTag({ loc, lastmod, changefreq, priority }) {
  let tag = `  <url><loc>${xmlEsc(SITE_BASE + loc)}</loc>`;
  if (lastmod) tag += `<lastmod>${xmlEsc(lastmod)}</lastmod>`;
  tag += `<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  return tag;
}

(async () => {
  const studios = JSON.parse(await readFile(DATA_PATH, 'utf8'));
  const existingLastmods = await loadExistingLastmods(SITEMAP_PATH);

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...STATIC_PAGES.map(urlTag),
  ];

  const seen = new Set();
  let studioCount = 0;
  for (const s of studios) {
    if (!s || !s.name) continue;
    const slug = slugify(s.name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    lines.push(urlTag({
      loc: `/studio/${slug}`,
      lastmod: existingLastmods.get(slug), // undefined for new studios — omitted, not guessed
      changefreq: 'monthly',
      priority: '0.6',
    }));
    studioCount++;
  }

  lines.push('</urlset>');
  await writeFile(SITEMAP_PATH, lines.join('\n') + '\n', 'utf8');
  console.log(`Wrote ${SITEMAP_PATH}: ${STATIC_PAGES.length} static pages + ${studioCount} studios.`);
})().catch((err) => {
  console.error('SITEMAP GENERATION FAILED:', err);
  process.exit(1);
});
