/* global React, Eyebrow */
const { useState: useIdxState, useMemo: useIdxMemo, useEffect: useIdxEffect, useRef: useIdxRef } = React;

// Pretty-print the `edited` field, whether it's ISO or Spanish-formatted.
function formatEdited(s) {
  if (!s) return "";
  const iso = Date.parse(s);
  if (!isNaN(iso)) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  }
  // Already in Spanish prose — strip trailing time.
  return s.replace(/\s+\d{1,2}:\d{2}$/, "");
}

function IndexView({ go }) {
  const d = window.SITE;

  const top5Countries = useIdxMemo(
    () => Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]).slice(0, 5),
    []
  );
  const top5Cats = useIdxMemo(
    () => d.categoriesOrder.filter((c) => d.byCat?.[c]).slice(0, 6).map((c) => [c, d.byCat[c]]),
    []
  );

  return (
    <div className="view">
      {/* masthead — compact */}
      <section className="masthead wrap masthead--tight">
        <h1 style={{ marginTop: 20 }}>
          <em className="count-accent">{d.totals?.studios || "—"}</em> design studios,<br />
          read as a <em>slow list</em>.
        </h1>
        <p className="sub">
          {d.statement}{" "}
          <a className="link" onClick={() => go("studios")}>Read the full list</a>, or enter through
          {" "}<a className="link" onClick={() => go("categories")}>discipline</a> or{" "}
          <a className="link" onClick={() => go("geography")}>geography</a>.
        </p>
      </section>

      <div className="hair wrap" style={{ marginTop: 24 }} />

      {/* counts strip */}
      <section className="wrap">
        <div className="stats-strip">
          <div className="stat"><span className="n">{d.totals?.studios}</span><span className="k">Studios indexed</span></div>
          <div className="stat"><span className="n">{d.totals?.countries}</span><span className="k">Countries</span></div>
          <div className="stat"><span className="n">{d.totals?.cities}</span><span className="k">Cities</span></div>
          <div className="stat"><span className="n">{Object.keys(d.byCat||{}).length}</span><span className="k">Disciplines</span></div>
        </div>
      </section>

      {/* typographic note */}
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 32 }}>
          <Eyebrow num="§02">Note</Eyebrow>
          <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 1.18, letterSpacing: "-0.01em", maxWidth: "26ch" }}>
            {d.note}
          </div>
        </div>
      </section>

      <div className="hair wrap" />

      {/* quick access: disciplines */}
      <section className="wrap" style={{ paddingTop: 64 }}>
        <div className="sel-head">
          <div>
            <Eyebrow num="§03">By Discipline</Eyebrow>
            <h2 style={{ marginTop: 14 }}>Enter through a category</h2>
          </div>
          <button onClick={() => go("categories")} style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--mute)" }}>
            All categories &nbsp;→
          </button>
        </div>
        <div className="cat-grid">
          {top5Cats.map(([c, n]) => {
            const col = (document.documentElement.getAttribute("data-theme") === "dark"
              ? d.catColorsDark?.[c]
              : d.catColors?.[c]) || "var(--ink)";
            return (
              <button key={c} className="cat-tile" style={{ "--cat-color": col }} onClick={() => go("studios", { filter: { cat: c } })}>
                <div className="cnt">{n}</div>
                <div className="nm">{c}</div>
                <div className="bl">{d.categoryBlurbs[c]}</div>
                <div className="arr">→</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* quick access: geography */}
      <section className="wrap" style={{ paddingTop: 80 }}>
        <div className="sel-head">
          <div>
            <Eyebrow num="§04">By Geography</Eyebrow>
            <h2 style={{ marginTop: 14 }}>Five most represented countries</h2>
          </div>
          <button onClick={() => go("geography")} style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--mute)" }}>
            All geography &nbsp;→
          </button>
        </div>
        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {top5Countries.map(([c, n], i) => (
            <div key={c} className="country-row" onClick={() => go("studios", { filter: { country: c } })}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <div className="t">{c}</div>
              <div className="bar"><div className="fill" style={{ width: `${(n / top5Countries[0][1]) * 100}%` }} /></div>
              <div className="c">{n} studios</div>
              <div className="arr">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* recent additions */}
      <section className="wrap" style={{ paddingTop: 80 }}>
        <div className="sel-head">
          <div>
            <Eyebrow num="§05">Recent Additions</Eyebrow>
            <h2 style={{ marginTop: 14 }}>Twenty most recent entries</h2>
          </div>
        </div>
        <div className="recent-list">
          {(d.recent || []).map((p) => (
            <div key={p.name} className="recent-row" onClick={() => go("studio", { name: p.name })}>
              <div className="d">{formatEdited(p.created || p.edited)}</div>
              <div className="t">{p.name}</div>
              <div className="c">{p.city}{p.city && p.country ? ", " : ""}{p.country}</div>
              <div className="k">{(p.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =============================================================
   EDITORIAL GRID — uniform 4×3 grid of 12 tiles.
   Picks 12 random studios (with URLs) from the pool on each load,
   then periodically rotates one tile for a "living" front page.
   ============================================================= */
function EditorialGrid({ studios, go }) {
  const d = window.SITE;
  // Pool = any studio with a URL; fall back to `studios` prop if empty.
  const pool = useIdxMemo(() => {
    const all = (d.studios || []).filter((s) => s && s.url);
    return all.length ? all : (studios || []);
  }, []);

  // Fisher-Yates shuffle → take 12
  const pickTwelve = React.useCallback(() => {
    const a = pool.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, 12);
  }, [pool]);

  const [tiles] = useIdxState(() => pickTwelve());

  if (!tiles.length) return null;

  return (
    <section className="wrap" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <div className="eg-head">
        <Eyebrow num="§01">Editor's Selection</Eyebrow>
        <div className="eg-head-meta">Twelve studios, chosen this month</div>
      </div>
      <div className="eg-grid">
        {tiles.map((s, i) => (
          <EditorialTile key={s.name + "@" + i} s={s} size={(i % 12) + 1} index={i} onOpen={() => go("studio", { name: s.name })} />
        ))}
      </div>
    </section>
  );
}

function EditorialTile({ s, size, index, onOpen }) {
  const [loaded, setLoaded] = useIdxState(false);
  const [failed, setFailed] = useIdxState(false);
  const ref = useIdxRef(null);
  const [inView, setInView] = useIdxState(false);

  // Lazy-load: only request the screenshot when tile enters viewport
  useIdxEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setInView(true); obs.disconnect(); }
        });
      },
      { rootMargin: "200px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
  // Different resolutions per size to save bandwidth — larger tiles get bigger shots
  const shotW = size <= 2 ? 1200 : 700;
  const shotH = size <= 2 ? 900 : 540;
  const shot = s.url && inView
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=${shotW}&h=${shotH}`
    : null;
  const firstCat = (s.category || "").split(",")[0].trim();
  const col = window.SITE.catColors?.[firstCat] || "#D8CFBD";

  return (
    <div
      ref={ref}
      className={`eg-tile eg-tile--size${size}`}
      onClick={onOpen}
      style={{ "--tile-col": col }}
    >
      <div className="eg-frame">
        {shot && !failed && (
          <img
            src={shot}
            alt={`${s.name} — ${host}`}
            loading="lazy"
            onLoad={(e) => { if (e.target.naturalWidth > 100) setLoaded(true); else setFailed(true); }}
            onError={() => setFailed(true)}
            className="eg-img"
            style={{ opacity: loaded ? 1 : 0 }}
          />
        )}
        {!loaded && (
          <div className="eg-placeholder">
            <span className="eg-ph-name">{s.name}</span>
          </div>
        )}
      </div>
      <div className="eg-meta">
        <div className="eg-name">{s.name}</div>
        <div className="eg-loc">{s.city}{s.city && s.country ? ", " : ""}{s.country}</div>
        <div className="eg-host">{host} ↗</div>
      </div>
    </div>
  );
}

Object.assign(window, { IndexView });
