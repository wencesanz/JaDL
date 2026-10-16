#!/usr/bin/env node
/**
 * capture-shots.mjs — monthly screenshots of every studio website.
 *
 * Opens each website in Chromium (1280×960, top of the page), saves an
 * 800×600 WebP to OUT_DIR/<slug>.webp and writes OUT_DIR/../manifest.json.
 * Sites that fail keep last month's image if there is one; images of studios
 * no longer in the list are removed.
 *
 * Used by .github/workflows/capture-shots.yml, which publishes the images on
 * the "shots" branch (served by jsDelivr) and commits shots.json to main.
 *
 * Needs: playwright (chromium) and sharp. Env: OUT_DIR (shots/s), CONCURRENCY
 * (4), LIMIT (for testing), DATA_PATH (studios.json).
 */
import { readFile, writeFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { chromium } from 'playwright';
import sharp from 'sharp';

const DATA_PATH = process.env.DATA_PATH || 'studios.json';
const OUT_DIR = process.env.OUT_DIR || 'shots/s';
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);
const LIMIT = Number(process.env.LIMIT || 0);
const W = 800, H = 600, QUALITY = 50;
const MIN_BYTES = 2500; // smaller than this is a blank page

function slugify(s) {
  return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function studioSlug(s, list) {
  const base = slugify(s && s.name);
  const same = list.filter((x) => x && x.name && slugify(x.name) === base);
  if (same.length < 2) return base;
  same.sort((a, b) => String(a.created || '').localeCompare(String(b.created || '')) || String(a.name).localeCompare(String(b.name)));
  if (same[0].name === s.name) return base;
  const city = slugify(String(s.city || '').split(',')[0]);
  return base + '-' + (city || String(same.findIndex((x) => x.name === s.name) + 1));
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Hide the most common cookie / consent layers so the page itself shows.
const HIDE_CSS = `
  [id*="cookie" i], [class*="cookie" i], [id*="consent" i], [class*="consent" i],
  [id*="gdpr" i], [class*="gdpr" i], [aria-label*="cookie" i], #onetrust-banner-sdk,
  #CybotCookiebotDialog, .cc-window, .cky-consent-container { display: none !important; }
  html, body { overflow: hidden !important; }
`;

async function shoot(browser, s, out) {
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
    locale: 'en-GB', reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  try {
    await page.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.addStyleTag({ content: HIDE_CSS }).catch(() => {});
    await sleep(2500); // intro animations, lazy images
    const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1280, height: 960 } });
    const webp = await sharp(png).resize(W, H, { fit: 'cover', position: 'top' }).webp({ quality: QUALITY }).toBuffer();
    if (webp.length < MIN_BYTES) return 'blank';
    // A single flat colour (blank, error or loading screen) compresses to almost nothing.
    const { channels } = await sharp(png).stats();
    if (channels.every((c) => c.stdev < 2)) return 'blank';
    await writeFile(out, webp);
    return 'ok';
  } catch (e) {
    return 'error';
  } finally {
    await ctx.close().catch(() => {});
  }
}

(async () => {
  let studios = JSON.parse(await readFile(DATA_PATH, 'utf8')).filter((s) => s && s.name);
  const all = studios;
  if (LIMIT) studios = studios.slice(0, LIMIT);
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const tally = { ok: 0, kept: 0, blank: 0, error: 0, nourl: 0 };
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (i < studios.length) {
      const s = studios[i++];
      const slug = studioSlug(s, all);
      const out = `${OUT_DIR}/${slug}.webp`;
      if (!s.url) { tally.nourl++; continue; }
      const r = await shoot(browser, s, out);
      if (r === 'ok') tally.ok++;
      else {
        tally[r]++;
        try { await stat(out); tally.kept++; } catch {}
      }
      if (++done % 50 === 0) console.log(`  ${done}/${studios.length}`);
    }
  }));
  await browser.close();

  // Drop images of studios that left the list; list what remains.
  const keep = new Set(all.map((s) => studioSlug(s, all)));
  const files = (await readdir(OUT_DIR)).filter((f) => f.endsWith('.webp'));
  for (const f of files) if (!keep.has(f.replace(/\.webp$/, ''))) await rm(`${OUT_DIR}/${f}`);
  const slugs = (await readdir(OUT_DIR)).filter((f) => f.endsWith('.webp')).map((f) => f.replace(/\.webp$/, '')).sort();
  let bytes = 0;
  for (const s of slugs) bytes += (await stat(`${OUT_DIR}/${s}.webp`)).size;
  console.log(`Total size ${(bytes / 1048576).toFixed(1)} MB${bytes > 45 * 1048576 ? ' — WARNING: close to the 50 MB jsDelivr limit, lower QUALITY' : ''}.`);
  await writeFile(`${OUT_DIR}/../manifest.json`, JSON.stringify({ at: new Date().toISOString(), slugs }) + '\n');
  console.log(`New ${tally.ok} · failed ${tally.error} · blank ${tally.blank} (kept last month's for ${tally.kept}) · no website ${tally.nourl}. ${slugs.length} images in total.`);
})().catch((e) => { console.error('CAPTURE FAILED:', e); process.exit(1); });
