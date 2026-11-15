#!/usr/bin/env node
/**
 * skills-index.mjs — writes .well-known/agent-skills/index.json (Agent Skills
 * Discovery v0.2.0) from every .well-known/agent-skills/<name>/SKILL.md, with
 * its sha256 digest. Run after editing a SKILL.md; --check fails if stale.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const BASE = 'https://justadesignlist.com';
const DIR = '.well-known/agent-skills';
const skills = [];
for (const name of (await readdir(DIR, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  const buf = await readFile(`${DIR}/${name}/SKILL.md`);
  const desc = (buf.toString('utf8').match(/^description:\s*(.+)$/m) || [])[1] || '';
  skills.push({
    name, type: 'skill-md', description: desc.trim(),
    url: `${BASE}/${DIR}/${name}/SKILL.md`,
    digest: 'sha256:' + createHash('sha256').update(buf).digest('hex'),
  });
}
const out = JSON.stringify({ $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json', skills }, null, 2) + '\n';
const path = `${DIR}/index.json`;
if (process.argv.includes('--check')) {
  const cur = await readFile(path, 'utf8').catch(() => '');
  if (cur !== out) { console.error(`${path} is out of date: run node scripts/skills-index.mjs`); process.exit(1); }
  console.log(`${path} is up to date.`);
} else { await writeFile(path, out); console.log(`Wrote ${path} (${skills.length} skill).`); }
