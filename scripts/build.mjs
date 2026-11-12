#!/usr/bin/env node
/**
 * build.mjs — compiles the view sources (*.jsx in the repo root) into the
 * files the site loads (dist/*.js).
 *
 *   node scripts/build.mjs           # write dist/*.js
 *   node scripts/build.mjs --check   # fail if dist/ is out of date
 *
 * The .jsx files are the only place to edit views. Each is wrapped in its own
 * function scope, exactly as the site expects; shared pieces are passed on
 * window (see Object.assign(window, …) at the end of each file).
 * It then joins React, the plain scripts and dist/*.js into ONE file,
 * dist/bundle.js, so each visit downloads a single script instead of ~20
 * (every file counts as a CDN request on Vercel). The pages load it as
 * /dist/bundle.js?v=<hash>; the hash is updated in every .html file
 * automatically, so there are no ?v= numbers to bump by hand.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { transform } from 'esbuild';

// Load order of the bundle (same order the pages used to load the files in).
const BUNDLE = [
  'vendor/react-18.3.1.production.min.js',
  'vendor/react-dom-18.3.1.production.min.js',
  'data.js',
  'scroll_fx.js',
  'social.js',
  'community.js',
  'dist/chrome.js',
  'dist/index_view.js',
  'dist/studios_view.js',
  'dist/other_views.js',
  'dist/geo_map.js',
  'dist/project_view.js',
  'dist/ig_share.js',
  'dist/submit_view.js',
  'dist/tweaks.js',
  'dist/favorites.js',
  'dist/random.js',
  'dist/todays_pick.js',
  'dist/recently_viewed.js',
  'dist/collections.js',
  'dist/app.js',
];
const BUNDLE_TAG = /<script src="\/dist\/bundle\.js\?v=[0-9a-f]*"><\/script>/g;

const check = process.argv.includes('--check');
const names = (await readdir('.')).filter((f) => f.endsWith('.jsx')).map((f) => f.replace(/\.jsx$/, '')).sort();

let stale = [];
const built = new Map();
for (const name of names) {
  const src = await readFile(`${name}.jsx`, 'utf8');
  const { code } = await transform(src, { loader: 'jsx', jsx: 'transform', charset: 'utf8', sourcefile: `${name}.jsx`, target: 'es2020' });
  const out = `(function(){\n"use strict";\n${code}})();\n`;
  const path = `dist/${name}.js`;
  built.set(path, out);
  let current = null;
  try { current = await readFile(path, 'utf8'); } catch {}
  if (current === out) continue;
  if (check) stale.push(path);
  else { await writeFile(path, out, 'utf8'); console.log(`built ${path}`); }
}
// dist/bundle.js — every script of the site in one file.
const missing = names.map((n) => `dist/${n}.js`).filter((p) => !BUNDLE.includes(p));
if (missing.length) {
  console.error(`Add to BUNDLE in scripts/build.mjs: ${missing.join(', ')}`);
  process.exit(1);
}
const parts = [];
for (const file of BUNDLE) {
  const code = built.get(file) ?? await readFile(file, 'utf8');
  parts.push(`/* ${file} */\n${code.trimEnd()}\n;`);
}
const bundle = parts.join('\n') + '\n';
const hash = createHash('sha1').update(bundle).digest('hex').slice(0, 10);
const tag = `<script src="/dist/bundle.js?v=${hash}"></script>`;
let currentBundle = null;
try { currentBundle = await readFile('dist/bundle.js', 'utf8'); } catch {}
if (currentBundle !== bundle) {
  if (check) stale.push('dist/bundle.js');
  else { await writeFile('dist/bundle.js', bundle, 'utf8'); console.log(`built dist/bundle.js (v=${hash})`); }
}

// Point every page at the current bundle.
const htmlFiles = [];
for (const dir of ['.', 'studio', 'city', 'country', 'region', 'discipline']) {
  let entries = [];
  try { entries = await readdir(dir); } catch {}
  for (const f of entries) if (f.endsWith('.html')) htmlFiles.push(dir === '.' ? f : `${dir}/${f}`);
}
let pagesUpdated = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!html.includes('/dist/bundle.js')) continue;
  const next = html.replace(BUNDLE_TAG, tag);
  if (next === html) continue;
  if (check) stale.push(file);
  else { await writeFile(file, next, 'utf8'); pagesUpdated++; }
}
if (!check && pagesUpdated) console.log(`updated bundle tag in ${pagesUpdated} page(s)`);

if (check) {
  if (stale.length) {
    const shown = stale.length > 10 ? [...stale.slice(0, 10), `…and ${stale.length - 10} more`] : stale;
    console.error(`Out of date (run node scripts/build.mjs): ${shown.join(', ')}`);
    process.exit(1);
  }
  console.log(`dist/ is up to date (${names.length} files).`);
}
