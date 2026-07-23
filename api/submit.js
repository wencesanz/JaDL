// /api/submit — Vercel serverless function.
//
// Receives the studio-submission form as JSON and opens a GitHub issue
// in this site's repo, so every submission is archived, labelled and
// discussable — no mail client involved.
//
// Env vars (Vercel dashboard → Settings → Environment Variables):
//   SUBMIT_GITHUB_TOKEN — fine-grained PAT with "Issues: Read and write"
//                         on the repo below (Settings → Developer settings
//                         → Fine-grained tokens). Free.
//   SUBMIT_GITHUB_REPO  — "owner/repo", e.g. "wences/jadl"

const MAX = (s, n) => String(s || '').slice(0, n).trim();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.SUBMIT_GITHUB_TOKEN;
  const repo = process.env.SUBMIT_GITHUB_REPO;
  if (!token || !repo) {
    return res.status(500).json({ error: 'Submission endpoint not configured.' });
  }

  const b = req.body || {};

  // Honeypot — bots fill every field; humans never see this one.
  if (b.website2) return res.status(200).json({ ok: true });

  const name = MAX(b.name, 120);
  const url = MAX(b.url, 300);
  if (!name || !url) {
    return res.status(400).json({ error: 'Studio name and website are required.' });
  }

  const row = (label, value) => `| ${label} | ${MAX(value, 300) || '—'} |`;
  const body = [
    '### Studio',
    '',
    '| | |',
    '|---|---|',
    row('Name', name),
    row('Website', url),
    row('Instagram', b.ig),
    row('Disciplines', b.categories),
    row('City', b.city),
    row('Country', b.country),
    row('Founded', b.founded),
    row('Team size', b.size),
    '',
    '### Description',
    '',
    MAX(b.description, 2000) || '—',
    '',
    '### Submitter',
    '',
    '| | |',
    '|---|---|',
    row('Name', b.submitterName),
    row('Email', b.submitterEmail),
    row('Relation', b.relation),
    '',
    '### Notes to editor',
    '',
    MAX(b.notes, 2000) || '—',
    '',
    '_Submitted via justadesignlist.com/submit_',
  ].join('\n');

  try {
    const gh = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'jadl-submit',
      },
      body: JSON.stringify({
        title: `Studio submission — ${name}`,
        body,
        labels: ['submission'],
      }),
    });

    if (!gh.ok) {
      const errText = await gh.text();
      console.error('GitHub API error', gh.status, errText);
      return res.status(502).json({ error: 'Could not record the submission.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('submit failed', err);
    return res.status(502).json({ error: 'Could not record the submission.' });
  }
}
