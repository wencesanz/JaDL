#!/usr/bin/env node
/**
 * markdown.mjs — a Markdown copy of every generated page, for AI agents.
 *
 * Reads the prerendered HTML (index, main pages, studio/, city/, country/,
 * region/, discipline/), takes the title, description, canonical URL and the
 * crawlable snapshot inside <div id="root">, and writes md/<same path>.md.
 *
 * middleware.js serves these when a request sends "Accept: text/markdown";
 * browsers keep getting HTML. Runs in the sync after the prerender scripts.
 */
import { readFile, writeFile, mkdir, readdir, rm } from 'node:fs/promises';

const SITE_BASE = process.env.SITE_BASE || 'https://justadesignlist.com';
const DIRS = ['studio', 'city', 'country', 'region', 'discipline'];
const SKIP = new Set(['404.html']);

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&amp;/g, '&');
const abs = (href) => (href.startsWith('/') ? SITE_BASE + href : href);
const meta = (html, re) => decode((html.match(re) || [])[1] || '');

function toMarkdown(snap) {
  let s = snap
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<nav aria-label="Primary">[\s\S]*?<\/nav>/g, '')
    .replace(/︎|️/g, '');
  s = s.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, h, t) => `[${t.replace(/<[^>]+>/g, '').trim()}](${abs(h)})`);
  s = s
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '\n\n### $1\n\n')
    .replace(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g, '\n- **$1:** $2')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '\n- $1')
    .replace(/<\/(ul|ol|dl)>/g, '\n\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '\n\n$1\n\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '');
  return decode(s).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

async function convert(file) {
  const html = await readFile(file, 'utf8');
  const root = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script src="(?:https:\/\/unpkg\.com\/react|\/vendor\/react)/);
  if (!root) return null;
  const title = meta(html, /<title>([^<]*)<\/title>/);
  const desc = meta(html, /<meta name="description" content="([^"]*)"/);
  const url = meta(html, /<link rel="canonical" href="([^"]*)"/) || SITE_BASE + '/' + file.replace(/(index)?\.html$/, '');
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const yaml = (v) => JSON.stringify(v);
  const front = ['---', `title: ${yaml(title)}`, `description: ${yaml(desc)}`, `url: ${yaml(url)}`, noindex ? 'robots: "noindex"' : null, '---'].filter(Boolean).join('\n');
  const body = toMarkdown(root[1]);
  const foot = `---\n\nFrom [Just a Design List](${SITE_BASE}/), a hand-edited index of design studios. All entries as JSON: ${SITE_BASE}/studios.json`;
  return `${front}\n\n${body}\n\n${foot}\n`;
}

await rm('md', { recursive: true, force: true });
const files = (await readdir('.')).filter((f) => f.endsWith('.html') && !SKIP.has(f));
for (const d of DIRS) {
  try { for (const f of await readdir(d)) if (f.endsWith('.html')) files.push(`${d}/${f}`); } catch {}
}
let n = 0;
for (const f of files) {
  const md = await convert(f);
  if (!md) continue;
  const out = 'md/' + f.replace(/\.html$/, '.md');
  await mkdir(out.slice(0, out.lastIndexOf('/')), { recursive: true });
  await writeFile(out, md);
  n++;
}
console.log(`Markdown: ${n} pages written to md/.`);
