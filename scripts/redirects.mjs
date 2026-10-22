#!/usr/bin/env node
/**
 * redirects.mjs — keeps old studio URLs working after a studio is removed or
 * renamed in Notion.
 *
 * Runs in the sync after prerender.mjs. For every studio page that was in the
 * last commit (or anywhere in git history, when the history is available) but
 * is no longer generated, it adds a permanent redirect to vercel.json:
 *
 *   1. to the current studio with the same website (a rename), or
 *   2. to its city page, if that page exists and is indexable, or
 *   3. to its country page, or
 *   4. to /studios.
 *
 * It also removes redirects whose old URL is a live studio again (a studio
 * that came back), and repoints redirects whose destination has itself gone.
 * Hand-written redirects are kept; only /studio/ sources are touched.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const git = (...args) => {
  try { return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 }); }
  catch { return ''; }
};
const host = (u) => {
  try { return new URL(/^https?:/i.test(u) ? u : 'https://' + u).hostname.toLowerCase().replace(/^www\./, ''); }
  catch { return ''; }
};

const live = new Set((await readdir('studio')).filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')));

// Current studios by website host → slug (read from the generated pages, so the
// slug logic stays in one place).
const byHost = new Map();
for (const slug of live) {
  const html = await readFile(`studio/${slug}.html`, 'utf8');
  const m = html.match(/<a href="([^"]+)" rel="noopener">Visit /);
  const h = m && host(m[1]);
  if (h && !byHost.has(h)) byHost.set(h, slug);
}

// Studio pages that existed before: last commit + deletions in history.
const gone = new Map(); // slug -> old html
for (const path of git('ls-tree', '--name-only', 'HEAD', 'studio/').split('\n')) {
  const slug = path.replace(/^studio\//, '').replace(/\.html$/, '');
  if (path.endsWith('.html') && !live.has(slug)) gone.set(slug, git('show', `HEAD:${path}`));
}
for (const block of git('log', '--diff-filter=D', '--format=@%H', '--name-only', '--', 'studio/').split('@').filter(Boolean)) {
  const [sha, ...paths] = block.trim().split('\n');
  for (const path of paths.filter((p) => p.endsWith('.html'))) {
    const slug = path.replace(/^studio\//, '').replace(/\.html$/, '');
    if (!live.has(slug) && !gone.has(slug)) gone.set(slug, git('show', `${sha}^:${path}`));
  }
}

async function okPage(file) {
  if (!existsSync(file)) return false;
  return !/<meta name="robots" content="noindex/.test(await readFile(file, 'utf8'));
}

async function targetFor(html) {
  const site = (html.match(/<a href="([^"]+)" rel="noopener">Visit /) || [])[1];
  const h = site && host(site);
  if (h && byHost.has(h)) return `/studio/${byHost.get(h)}`;
  const city = (html.match(/<a href="\/city\/([a-z0-9-]+)">/) || [])[1];
  if (city && await okPage(`city/${city}.html`)) return `/city/${city}`;
  const country = (html.match(/<a href="\/country\/([a-z0-9-]+)">/) || [])[1];
  if (country && existsSync(`country/${country}.html`)) return `/country/${country}`;
  return '/studios';
}

const cfg = JSON.parse(await readFile('vercel.json', 'utf8'));
let list = cfg.redirects || [];
const before = JSON.stringify(list);
const isStudio = (p) => /^\/studio\/[^/]+$/.test(p || '');
const slugOf = (p) => p.replace(/^\/studio\//, '');

// A studio that is back: its old URL must not redirect away.
list = list.filter((r) => !(isStudio(r.source) && live.has(slugOf(r.source))));

const has = new Set(list.map((r) => r.source));
const added = [];
for (const [slug, html] of gone) {
  if (!html || has.has(`/studio/${slug}`)) continue;
  const destination = await targetFor(html);
  list.push({ source: `/studio/${slug}`, destination, permanent: true });
  added.push(`${slug} → ${destination}`);
}

// Repoint redirects that land on a studio that has gone too (no chains).
const bySource = new Map(list.map((r) => [r.source, r]));
for (const r of list) {
  const seen = new Set();
  while (isStudio(r.destination) && !live.has(slugOf(r.destination)) && bySource.has(r.destination) && !seen.has(r.destination)) {
    seen.add(r.destination);
    r.destination = bySource.get(r.destination).destination;
  }
  if (isStudio(r.destination) && !live.has(slugOf(r.destination))) r.destination = '/studios';
}

if (JSON.stringify(list) !== before) {
  cfg.redirects = list;
  await writeFile('vercel.json', JSON.stringify(cfg, null, 2) + '\n');
}
console.log(added.length ? `Redirects added:\n  ${added.join('\n  ')}` : 'No new redirects.');
