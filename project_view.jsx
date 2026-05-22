/* global React, Eyebrow */
const { useMemo: usePdMm, useState: usePdState, useEffect: usePdEffect } = React;

// Format a raw "edited" value to a readable, editorial English date.
// Handles both ISO ("2023-06-04T17:48:00.000Z") and Spanish-formatted
// ("29 de mayo de 2023 12:18") strings.
const ES_MONTHS = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
};
function formatIndexed(raw) {
  if (!raw) return "—";
  let d = null;
  // Try ISO first
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const t = new Date(raw);
    if (!isNaN(t.getTime())) d = t;
  }
  // Spanish "DD de mes de YYYY"
  if (!d) {
    const m = raw.match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})/i);
    if (m) {
      const month = ES_MONTHS[m[2].toLowerCase()];
      if (month !== undefined) d = new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
    }
  }
  if (!d) return raw; // unrecognised format — show as-is
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(d);
  } catch {
    return d.toDateString();
  }
}

function StudioHero({ s, col }) {
  const [loaded, setLoaded] = usePdState(false);
  const [failed, setFailed] = usePdState(false);

  // Reset when the studio changes (nav prev/next)
  usePdEffect(() => { setLoaded(false); setFailed(false); }, [s.url]);

  const shot = s.url
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1600&h=1000`
    : null;
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="pd-hero" style={{ "--col": col }}>
      {shot && !failed && (
        <img
          src={shot}
          alt={`${s.name} — website preview`}
          onLoad={(e) => { if (e.target.naturalWidth > 100) setLoaded(true); else setFailed(true); }}
          onError={() => setFailed(true)}
          className="pd-hero-img"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
      {!loaded && (
        <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(36px, 6vw, 80px)", color: "var(--ink)", opacity: .25, position: "relative", zIndex: 2, textAlign: "center", padding: "0 40px", lineHeight: 1 }}>
          {s.name}
        </div>
      )}
      <span className="ph">{loaded && host ? `${host} · click through to visit` : "Studio site preview · click through to visit"}</span>
    </div>
  );
}

function StudioDetail({ name, go }) {
  const d = window.SITE;
  const all = d.studios || [];
  const idx = all.findIndex((x) => x.name === name);
  const s = all[idx];
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  const related = usePdMm(() => {
    if (!s) return [];
    const firstCat = s.category.split(",")[0].trim();
    return all.filter((x) => x.name !== s.name && x.category.includes(firstCat)).slice(0, 6);
  }, [s]);

  if (!s) {
    return (
      <div className="view wrap" style={{ paddingTop: 120 }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: 32 }}>Entry not found.</p>
        <button onClick={() => go("studios")} className="link" style={{ fontFamily: "var(--mono)", fontSize: 12 }}>← Back to the list</button>
      </div>
    );
  }

  const col = d.catColors?.[s.category.split(",")[0].trim()] || "#D8CFBD";
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const igHandle = (s.ig || "").split("/").filter(Boolean).pop();

  // Share helpers — use the current page URL so people land on this studio
  // when the link is opened.
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${s.name} — ${s.category.split(",")[0].trim()}${s.city ? `, ${s.city}` : ""} · via Just a Design List`;
  const [copied, setCopied] = usePdState(false);
  const [igOpen, setIgOpen] = usePdState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback: select-and-copy via a temp input
      const i = document.createElement("input");
      i.value = shareUrl;
      document.body.appendChild(i);
      i.select();
      try { document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
      document.body.removeChild(i);
    }
  };

  return (
    <div className="view wrap">
      <button onClick={() => go("studios")} className="back-btn" aria-label="Back to the list">
        <span className="arr">←</span>
        <span>The List</span>
      </button>

      <div className="pd-head">
        <div>
          <Eyebrow num={`№ ${String(idx + 1).padStart(3, "0")} of ${all.length}`}><span>{s.category.split(",")[0]}</span></Eyebrow>
          <h2 style={{ marginTop: 14 }}>{s.name}</h2>
        </div>
        <dl className="meta">
          <dt>City</dt><dd>{s.city || "—"}</dd>
          <dt>Country</dt><dd>{s.country || "—"}</dd>
          <dt>Discipline</dt><dd>{s.category}</dd>
          {s.type && <><dt>Type</dt><dd>{s.type}</dd></>}
          <dt>Indexed</dt><dd>{formatIndexed(s.created || s.edited)}</dd>
        </dl>
      </div>

      <div className="pd-hero-wrap">
        {s.url ? (
          <a href={s.url} target="_blank" rel="noopener" style={{ display: "block" }}>
            <StudioHero s={s} col={col} />
          </a>
        ) : (
          <StudioHero s={s} col={col} />
        )}
      </div>

      <div className="pd-body">
        <aside className="side-col">
          Visit
          <div style={{ marginTop: 14, display: "grid", gap: 10, textTransform: "none", letterSpacing: 0, fontSize: 14 }}>
            {s.url && (
              <a href={s.url} target="_blank" rel="noopener" className="link" style={{ color: "var(--ink)", display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{host}</span>
                <span style={{ color: "var(--mute)" }}>↗</span>
              </a>
            )}
            {s.ig && (
              <a href={s.ig} target="_blank" rel="noopener" className="link" style={{ color: "var(--ink)", display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>@{igHandle}</span>
                <span style={{ color: "var(--mute)" }}>↗</span>
              </a>
            )}
          </div>
          <div className="share-block">
            <div className="share-lbl">Share</div>
            <div className="share-row">
              <a
                className="share-btn"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener"
                aria-label="Share on X / Twitter"
                title="Share on X / Twitter"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X</span>
              </a>
              <a
                className="share-btn"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                className="share-btn"
                href={`mailto:?subject=${encodeURIComponent(s.name + " — Just a Design List")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`}
                aria-label="Share by email"
                title="Share by email"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1"/>
                  <path d="M3 7l9 6 9-6"/>
                </svg>
                <span>Email</span>
              </a>
              <button
                className="share-btn"
                onClick={() => setIgOpen(true)}
                aria-label="Share to Instagram"
                title="Share to Instagram"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                <span>Instagram</span>
              </button>
              <button
                className="share-btn"
                onClick={copyLink}
                aria-label="Copy link"
                title="Copy link"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/>
                  <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/>
                </svg>
                <span>{copied ? "Copied" : "Copy link"}</span>
              </button>
            </div>
          </div>
        </aside>
        <div className="intro">
          An independent practice based in <em>{s.city || s.country}</em>
          {s.country && s.city ? <>, <em>{s.country}</em></> : null},
          working in {s.category.split(",").map((c, i, a) => (
            <React.Fragment key={c}>
              <em>{c.trim().toLowerCase()}</em>
              {i < a.length - 1 ? (i === a.length - 2 ? " and " : ", ") : null}
            </React.Fragment>
          ))}.
        </div>
      </div>

      <div className="pd-body">
        <div className="body-col">
          <p>
            The entry is intentionally brief. The index is a pointer, not a review — visit the studio's own site to see the work in its preferred frame. What we note here is only what is needed to find the practice again: where it is, what it does, and where to look.
          </p>
          <p>
            <a className="link" href={s.url} target="_blank" rel="noopener">Open {host}</a>
            {s.ig && <> · <a className="link" href={s.ig} target="_blank" rel="noopener">Follow on Instagram</a></>}.
          </p>
        </div>
      </div>

      <div className="pd-credits">
        <h4>Filed under</h4>
        <dl>
          {s.category.split(",").map((c) => {
            const t = c.trim();
            return (
              <React.Fragment key={t}>
                <dt onClick={() => go("studios", { filter: { cat: t } })} style={{ cursor: "pointer" }}>{t}</dt>
                <dd onClick={() => go("studios", { filter: { cat: t } })} style={{ cursor: "pointer", color: "var(--ink-2)" }}>
                  <span className="link" style={{ color: "var(--accent)" }}>See all {d.byCat[t]} →</span>
                </dd>
              </React.Fragment>
            );
          })}
          <dt onClick={() => go("studios", { filter: { country: s.country.split(",")[0].trim() } })} style={{ cursor: "pointer" }}>{s.country.split(",")[0]}</dt>
          <dd onClick={() => go("studios", { filter: { country: s.country.split(",")[0].trim() } })} style={{ cursor: "pointer", color: "var(--ink-2)" }}>
            <span className="link" style={{ color: "var(--accent)" }}>See all {d.byCountry[s.country.split(",")[0].trim()]} →</span>
          </dd>
        </dl>
      </div>

      {related.length > 0 && (
        <div style={{ paddingTop: 64, marginTop: 64, borderTop: "1px solid var(--rule)" }}>
          <Eyebrow>Neighbours in {s.category.split(",")[0].trim()}</Eyebrow>
          <div className="st-list" style={{ marginTop: 24 }}>
            {related.map((r) => (
              <div key={r.name} className="studio-row" onClick={() => go("studio", { name: r.name })}>
                <div className="t">{r.name}</div>
                <div className="c">{r.city}{r.city && r.country ? ", " : ""}{r.country}</div>
                <div className="k">{r.category}</div>
                <div className="u">{(r.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")}</div>
                <div className="arr">→</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {igOpen && window.IGShareModal ? (
        <window.IGShareModal
          s={s}
          col={col}
          idx={idx}
          total={all.length}
          onClose={() => setIgOpen(false)}
        />
      ) : null}

      <div className="pd-next">
        <div className="side" onClick={() => go("studio", { name: prev.name })}>
          <span className="k">Previous</span>
          <span className="t">{prev.name}</span>
        </div>
        <div className="side right" onClick={() => go("studio", { name: next.name })}>
          <span className="k">Next</span>
          <span className="t">{next.name}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StudioDetail });
