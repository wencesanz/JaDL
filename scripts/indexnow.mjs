// Notify IndexNow (Bing, Yandex, Seznam, Naver…) about changed URLs.
//
// Usage:
//   node scripts/indexnow.mjs <old-sitemap.xml> [new-sitemap.xml]   → only new, changed or removed URLs
//   node scripts/indexnow.mjs --all [sitemap.xml]                   → every URL in the sitemap
//
// A URL counts as changed when it is new in the sitemap or its <lastmod> moved.
// Removed URLs are also sent, so search engines drop them sooner.
// The key file lives at the site root: https://justadesignlist.com/<KEY>.txt

import { readFileSync, existsSync } from 'node:fs';

const HOST = 'justadesignlist.com';
const KEY = '325798842d9c6242650b4c82e1c1cb87';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10000; // IndexNow limit per request

function parseSitemap(path) {
  const map = new Map();
  if (!path || !existsSync(path)) return map;
  const xml = readFileSync(path, 'utf8');
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? '';
    map.set(loc, lastmod);
  }
  return map;
}

const args = process.argv.slice(2);
let urls;

if (args[0] === '--all') {
  urls = [...parseSitemap(args[1] ?? 'sitemap.xml').keys()];
} else {
  const oldMap = parseSitemap(args[0]);
  const newMap = parseSitemap(args[1] ?? 'sitemap.xml');
  if (oldMap.size === 0) {
    console.log('No previous sitemap to compare with; nothing sent. Use --all for a full submission.');
    process.exit(0);
  }
  const changed = [];
  for (const [loc, lastmod] of newMap) {
    if (!oldMap.has(loc) || oldMap.get(loc) !== lastmod) changed.push(loc);
  }
  for (const loc of oldMap.keys()) {
    if (!newMap.has(loc)) changed.push(loc); // removed
  }
  urls = changed;
}

urls = urls.filter((u) => new URL(u).host === HOST);

if (urls.length === 0) {
  console.log('✔ IndexNow: no changed URLs.');
  process.exit(0);
}

let failed = false;
for (let i = 0; i < urls.length; i += BATCH) {
  const urlList = urls.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  // 200 = accepted, 202 = accepted, key pending validation
  if (res.status === 200 || res.status === 202) {
    console.log(`✔ IndexNow: ${urlList.length} URL(s) sent (HTTP ${res.status}).`);
  } else {
    failed = true;
    console.error(`✖ IndexNow: HTTP ${res.status} — ${await res.text().catch(() => '')}`);
  }
}

// Never fail the sync because of IndexNow; just report it.
if (failed) console.error('IndexNow submission had errors (sync itself is fine).');
