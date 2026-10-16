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
 * After a change, also bump the ?v= numbers in index.html (dist/ is cached
 * for a year).
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { transform } from 'esbuild';

const check = process.argv.includes('--check');
const names = (await readdir('.')).filter((f) => f.endsWith('.jsx')).map((f) => f.replace(/\.jsx$/, '')).sort();

let stale = [];
for (const name of names) {
  const src = await readFile(`${name}.jsx`, 'utf8');
  const { code } = await transform(src, { loader: 'jsx', jsx: 'transform', charset: 'utf8', sourcefile: `${name}.jsx`, target: 'es2020' });
  const out = `(function(){\n"use strict";\n${code}})();\n`;
  const path = `dist/${name}.js`;
  let current = null;
  try { current = await readFile(path, 'utf8'); } catch {}
  if (current === out) continue;
  if (check) stale.push(path);
  else { await writeFile(path, out, 'utf8'); console.log(`built ${path}`); }
}
if (check) {
  if (stale.length) {
    console.error(`Out of date (run node scripts/build.mjs): ${stale.join(', ')}`);
    process.exit(1);
  }
  console.log(`dist/ is up to date (${names.length} files).`);
}
