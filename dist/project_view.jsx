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
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const t = new Date(raw);
    if (!isNaN(t.getTime())) d = t;
  }
  if (!d) {
    const m = raw.match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})/i);
    if (m) {
      const month = ES_MONTHS[m[2].toLowerCase()];
      if (month !== undefined) d = new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
    }
  }
  if (!d) return raw;
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
    }).format(d);
  } catch {
    return d.toDateString();
  }
}

function StudioHero({ s, col }) {
  const [loaded, setLoaded] = usePdState(false);
  const [srcIdx, setSrcIdx] = usePdState(0);

  // Source cascade: the OG-image endpoint returns a curated, higher-quality
  // image when the studio has set one; if it 404s (no og:image, or running
  // outside Vercel) we fall back to the mshots screenshot.
  const sources = s.url
    ? [
        `/api/ogimage?url=${encodeURIComponent(s.url)}`,
        `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1600&h=1200`,
      ]
    : [];

  usePdEffect(() => { setLoaded(false); setSrcIdx(0); }, [s.url]);

  const shot = sources[srcIdx] || null;
  const exhausted = srcIdx >= sources.length;
  const advance = () => setSrcIdx((i) => i + 1);

  return (
    <div className="sd-figure" style={{ "--col": col }}>
      {shot && !exhausted && (
        <img
          key={shot}
          src={shot}
          alt={`${s.name} — website preview`}
          onLoad={(e) => { if (e.target.naturalWidth > 100) setLoaded(true); else advance(); }}
          onError={advance}
          className="pd-hero-img"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
      {!loaded && (
        <div className="sd-figure-fallback">{s.name}</div>
      )}
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
  const cats = s.category.split(",").map((c) => c.trim()).filter(Boolean);
  const place = [s.city, s.country].filter(Boolean).join(", ");

  usePdEffect(() => {
    if (window.recordVisit) window.recordVisit(s.name);
  }, [s.name]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${s.name} — ${cats[0] || "design"}${s.city ? `, ${s.city}` : ""} · via Just a Design List`;
  const [copied, setCopied] = usePdState(false);
  const [igOpen, setIgOpen] = usePdState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
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
      <div className="pd-topbar">
        <button onClick={() => go("studios")} className="back-btn" aria-label="Back to the list">
          <span className="arr">←</span>
          <span>The List</span>
        </button>
        {window.RandomButton ? <window.RandomButton go={go} currentName={s.name} /> : null}
      </div>

      <div className="pd-head pd-head--stack">
        <Eyebrow><span className="num">№ {String(idx + 1).padStart(3, "0")} of {all.length}</span></Eyebrow>
        <h2>{s.name}</h2>
        <div className="pd-meta-line">
          {place && <span>{place}</span>}
          <span>Indexed {formatIndexed(s.created || s.edited)}</span>
          {cats.length > 0 && <span>{cats.join(" · ")}</span>}
        </div>
      </div>

      <div className="sd-spread">
        <div className="sd-figure-col">
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener" className="sd-figure-link">
              <StudioHero s={s} col={col} />
            </a>
          ) : (
            <StudioHero s={s} col={col} />
          )}
          <div className="sd-cap">
            <span>{host ? `${host}, homepage` : "Studio site preview"}</span>
            {s.url && <a className="link" href={s.url} target="_blank" rel="noopener">Visit the site ↗</a>}
          </div>
        </div>

        <div className="sd-col">
          <div className="sd-nav">
            <div className="sd-nav-row" onClick={() => go("studio", { name: prev.name })}>
              <span className="t">{prev.name}</span>
              <span className="k">← Previous</span>
            </div>
            <div className="sd-nav-row" onClick={() => go("studio", { name: next.name })}>
              <span className="t">{next.name}</span>
              <span className="k">Next →</span>
            </div>
          </div>

          <p className="sd-note">
            The entry is intentionally brief. The index is a pointer, not a review — visit the studio's own site to see the work in its preferred frame. What we note here is only what is needed to find the practice again: where it is, what it does, and where to look.
          </p>

          <div className="sd-links">
            {s.url && (
              <a href={s.url} target="_blank" rel="noopener">
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{host}</span>
                <span style={{ color: "var(--mute)" }}>↗</span>
              </a>
            )}
            {s.ig && (
              <a href={s.ig} target="_blank" rel="noopener">
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>@{igHandle}</span>
                <span style={{ color: "var(--mute)" }}>↗</span>
              </a>
            )}
          </div>

          {window.SaveButton ? (
            <div className="save-block">
              <window.SaveButton studio={s} />
            </div>
          ) : null}

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

          <div className="sd-lbl">Filed under</div>
          <div className="sd-tags">
            {cats.map((t) => (
              <span
                key={t}
                className="sd-tag"
                onClick={() => go("collection", { kind: "discipline", value: t })}
              >
                {t}{d.byCat && d.byCat[t] ? ` · ${d.byCat[t]}` : ""}
              </span>
            ))}
            {s.country && (
              <span
                className="sd-tag"
                onClick={() => go("collection", { kind: "country", value: s.country.split(",")[0].trim() })}
              >
                {s.country.split(",")[0].trim()}
                {d.byCountry && d.byCountry[s.country.split(",")[0].trim()] ? ` · ${d.byCountry[s.country.split(",")[0].trim()]}` : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ paddingTop: 64, marginTop: 64, borderTop: "1px solid var(--rule)" }}>
          <Eyebrow>Neighbours in {cats[0]}</Eyebrow>
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

      {window.RecentlyViewedInline ? <window.RecentlyViewedInline go={go} excludeName={s.name} /> : null}
    </div>
  );
}

Object.assign(window, { StudioDetail });
