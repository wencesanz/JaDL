/* global React, Eyebrow */
const { useMemo: usePdMm, useState: usePdState, useEffect: usePdEffect } = React;

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

  return (
    <div className="view wrap">
      <button onClick={() => go("studios")} style={{ marginTop: 48, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--mute)" }}>
        ← The List
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
          <dt>Indexed</dt><dd>{(s.edited || "").replace(/\s+\d{1,2}:\d{2}$/, "")}</dd>
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
