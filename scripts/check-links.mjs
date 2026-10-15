#!/usr/bin/env node
/**
 * check-links.mjs — monthly check of every studio website in studios.json.
 *
 * Each URL is requested (GET, redirects followed, 20 s timeout) and retried
 * once after a pause before it counts as failing. Results are grouped as:
 *   - Not responding: DNS error, refused connection, timeout, SSL error
 *   - Error pages:    404 / 410 / 5xx
 *   - Moved:          ends up on a different domain (sold, parked or renamed)
 * 401 / 403 / 429 answers count as alive: those sites block automated visits.
 *
 * Writes link-report.md. With GITHUB_TOKEN + GITHUB_REPOSITORY set (in the
 * GitHub Action) it also opens an issue with the report and closes the
 * previous month's one, so the repo owner gets it by email.
 *
 * Env: DATA_PATH (studios.json), CONCURRENCY (8), LIMIT (for testing).
 */
import { readFile, writeFile } from 'node:fs/promises';

const DATA_PATH = process.env.DATA_PATH || 'studios.json';
const CONCURRENCY = Number(process.env.CONCURRENCY || 8);
const LIMIT = Number(process.env.LIMIT || 0);
const TIMEOUT_MS = 20000;
const LABEL = 'link-check';
const SITE = 'https://justadesignlist.com';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36 JustADesignList-LinkCheck';

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
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, '').toLowerCase(); } catch { return ''; } };
// "studio.com" and "studio.co.uk" style changes are still the same site; compare the main label.
const mainLabel = (h) => { const p = h.split('.'); return p.length > 2 && p[p.length - 2].length <= 3 ? p[p.length - 3] : p[p.length - 2] || h; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function normalise(url) {
  let u = String(url || '').trim();
  if (!u) return '';
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  return u;
}

async function probe(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': UA, accept: 'text/html,*/*;q=0.8', 'accept-language': 'en' } });
    // Don't download whole pages.
    try { await res.body?.cancel(); } catch {}
    return { status: res.status, finalUrl: res.url || url };
  } catch (e) {
    const c = e.cause || {};
    const code = c.code || (e.name === 'AbortError' ? 'TIMEOUT' : e.name || 'ERROR');
    return { error: String(code) };
  } finally {
    clearTimeout(t);
  }
}

function classify(r, original) {
  if (r.error) return { kind: 'down', detail: errorText(r.error) };
  if (r.status === 404 || r.status === 410 || r.status >= 500) return { kind: 'error', detail: r.status === 404 || r.status === 410 ? `error ${r.status}, página no encontrada` : `error ${r.status} del servidor` };
  if (r.status >= 400 && ![401, 403, 429].includes(r.status)) return { kind: 'error', detail: r.status === 402 ? 'error 402, la web está suspendida (sin pagar el alojamiento)' : `error ${r.status}` };
  const a = host(original), b = host(r.finalUrl);
  if (a && b && a !== b && mainLabel(a) !== mainLabel(b)) return { kind: 'moved', detail: `ahora lleva a ${b}` };
  return { kind: 'ok' };
}
function errorText(code) {
  if (/ENOTFOUND|EAI_AGAIN/.test(code)) return 'el dominio no existe';
  if (/ECONNREFUSED/.test(code)) return 'rechaza la conexión';
  if (/TIMEOUT|ETIMEDOUT|UND_ERR_CONNECT_TIMEOUT|UND_ERR_HEADERS_TIMEOUT/.test(code)) return 'no contesta en 20 s';
  if (/CERT|SSL|TLS|ERR_TLS|LEAF_SIGNATURE|SELF_SIGNED|ISSUER/i.test(code)) return 'problema con el certificado de seguridad';
  if (/ECONNRESET|UND_ERR_SOCKET/.test(code)) return 'corta la conexión';
  return code.toLowerCase();
}

async function check(s) {
  const url = normalise(s.url);
  if (!url) return { s, url, kind: 'error', detail: 'sin web' };
  let r = await probe(url);
  let c = classify(r, url);
  if (c.kind === 'down' || c.kind === 'error') {
    await sleep(5000);
    // Second try; http:// sites sometimes only fail on https and the reverse.
    const r2 = await probe(url);
    const c2 = classify(r2, url);
    if (c2.kind !== 'down' && c2.kind !== 'error') return { s, url, ...c2 };
    if (url.startsWith('http://')) {
      const r3 = await probe(url.replace(/^http:/, 'https:'));
      const c3 = classify(r3, url);
      if (c3.kind !== 'down' && c3.kind !== 'error') return { s, url, ...c3 };
    }
    c = c2;
  }
  return { s, url, ...c };
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) {
      const k = i++;
      out[k] = await fn(items[k]);
      if (++done % 100 === 0) console.log(`  ${done}/${items.length}`);
    }
  }));
  return out;
}

function section(title, note, rows, all) {
  if (!rows.length) return '';
  const lines = rows
    .sort((a, b) => a.s.name.localeCompare(b.s.name))
    .map((r) => `- [ ] **${r.s.name}** — ${r.url} — ${r.detail} · [ficha](${SITE}/studio/${studioSlug(r.s, all)})`);
  return `### ${title} (${rows.length})\n${note}\n\n${lines.join('\n')}\n\n`;
}

(async () => {
  let studios = JSON.parse(await readFile(DATA_PATH, 'utf8'));
  const all = studios;
  if (LIMIT) studios = studios.slice(0, LIMIT);
  console.log(`Checking ${studios.length} websites…`);
  const results = await pool(studios, CONCURRENCY, check);

  const down = results.filter((r) => r.kind === 'down');
  const err = results.filter((r) => r.kind === 'error');
  // Redirects already reviewed and accepted (scripts/link-check-ok.json: { "Studio": "domain it goes to" }).
  let accepted = {};
  try { accepted = JSON.parse(await readFile('scripts/link-check-ok.json', 'utf8')); } catch {}
  const moved = results.filter((r) => r.kind === 'moved' && !(accepted[r.s.name] && r.detail.endsWith(accepted[r.s.name])));
  const ok = results.length - down.length - err.length - moved.length;
  const month = new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  let body = `Revisión automática de las ${results.length} webs de la lista (${month}).\n\n`;
  body += `**${ok} responden bien.** ${down.length + err.length} fallan y ${moved.length} ${moved.length === 1 ? 'lleva' : 'llevan'} a otro dominio.\n\n`;
  if (!down.length && !err.length && !moved.length) body += 'Todo en orden este mes.\n';
  body += section('No responden', 'Han fallado dos veces con 5 segundos de diferencia. Puede ser una caída puntual: si una vuelve a salir el mes que viene, conviene revisarla a mano.', down, all);
  body += section('Páginas de error', 'La web responde, pero con un error (por ejemplo, página no encontrada).', err, all);
  body += section('Llevan a otro dominio', 'Puede ser un cambio de nombre del estudio, o que el dominio se haya vendido o aparcado. Vale la pena abrirlas y, si es el caso, actualizar la URL en Notion.', moved, all);
  body += `\n<sub>Las webs que bloquean visitas automáticas (401, 403, 429) cuentan como activas. Generado por scripts/check-links.mjs.</sub>\n`;

  await writeFile('link-report.md', body, 'utf8');
  console.log(`OK ${ok} · down ${down.length} · error ${err.length} · moved ${moved.length}. Wrote link-report.md`);

  const token = process.env.GITHUB_TOKEN, repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) return;
  const api = (path, opts = {}) => fetch(`https://api.github.com/repos/${repo}${path}`, {
    ...opts,
    headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'content-type': 'application/json', ...(opts.headers || {}) },
  }).then(async (r) => { if (!r.ok) throw new Error(`${path}: ${r.status} ${await r.text()}`); return r.json(); });

  try { await api('/labels', { method: 'POST', body: JSON.stringify({ name: LABEL, color: 'F95721', description: 'Monthly website check' }) }); } catch {}
  const open = await api(`/issues?state=open&labels=${LABEL}&per_page=20`);
  const issue = await api('/issues', { method: 'POST', body: JSON.stringify({ title: `Webs a revisar · ${month} (${down.length + err.length + moved.length})`, body, labels: [LABEL] }) });
  for (const o of open) {
    await api(`/issues/${o.number}/comments`, { method: 'POST', body: JSON.stringify({ body: `Sustituida por #${issue.number}.` }) });
    await api(`/issues/${o.number}`, { method: 'PATCH', body: JSON.stringify({ state: 'closed', state_reason: 'completed' }) });
  }
  console.log(`Opened issue #${issue.number}${open.length ? `, closed ${open.map((o) => '#' + o.number).join(', ')}` : ''}.`);
})().catch((e) => { console.error('LINK CHECK FAILED:', e); process.exit(1); });
