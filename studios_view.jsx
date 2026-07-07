/* global React, Eyebrow */
const { useState: useSt, useMemo: useMm, useEffect: useEf } = React;

const STUDIOS_STATE_KEY = "tsi:studios-state";
function readStudiosState() {
  try { return JSON.parse(localStorage.getItem(STUDIOS_STATE_KEY) || "{}") || {}; }
  catch { return {}; }
}
function writeStudiosState(patch) {
  try {
    const cur = readStudiosState();
    localStorage.setItem(STUDIOS_STATE_KEY, JSON.stringify({ ...cur, ...patch }));
  } catch {}
}

function StudiosView({ go, initialFilter }) {
  const d = window.SITE;
  const all = d.studios || [];

  // Restore prior state from localStorage; an explicit initialFilter (e.g. user
  // clicked a category tile or a city/country row) overrides saved state and
  // resets the other filters so the user lands on a clean, predictable view.
  const saved = useMm(() => readStudiosState(), []);
  const hasInitial = !!initialFilter && (initialFilter.cat || initialFilter.country || initialFilter.city || initialFilter.type);
  const [q, setQ]             = useSt(hasInitial ? "" : (saved.q || ""));
  const [cat, setCat]         = useSt(initialFilter?.cat || (hasInitial ? "All" : (saved.cat || "All")));
  const [country, setCountry] = useSt(initialFilter?.country || (hasInitial ? "All" : (saved.country || "All")));
  const [city, setCity]       = useSt(initialFilter?.city || (hasInitial ? "All" : (saved.city || "All")));
  const [type, setType]       = useSt(initialFilter?.type || (hasInitial ? "All" : (saved.type || "All")));
  const [sort, setSort]       = useSt(saved.sort || "name"); // name | city | country
  const [mode, setMode]       = useSt(saved.mode || "list");

  // If a new initialFilter arrives later (in-session re-navigation), honor it
  // AND reset the unrelated filters so the user lands on a clean view.
  useEf(() => {
    if (!initialFilter) return;
    const { cat: nCat, country: nCountry, city: nCity, type: nType } = initialFilter;
    if (!nCat && !nCountry && !nCity && !nType) return;
    setCat(nCat || "All");
    setCountry(nCountry || "All");
    setCity(nCity || "All");
    setType(nType || "All");
    setQ("");
  }, [initialFilter?.cat, initialFilter?.country, initialFilter?.city, initialFilter?.type]);

  // Persist every change so filters survive: list → studio → back, refresh, etc.
  useEf(() => { writeStudiosState({ q, cat, country, city, type, sort, mode }); }, [q, cat, country, city, type, sort, mode]);

  const allCats = ["All", ...d.categoriesOrder.filter((c) => d.byCat?.[c])];
  const allCountries = useMm(
    () => ["All", ...Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]).map(([c]) => c)],
    []
  );
  // Order types deliberately: Studio first (most common), then Freelance,
  // then Ambiguous. Anything else from the data is appended at the end.
  const typeOrder = ["Studio", "Freelance", "Ambiguous"];
  const allTypes = useMm(() => {
    const present = Object.keys(d.byType || {});
    if (!present.length) return null;
    const ordered = [...typeOrder.filter((t) => present.includes(t)), ...present.filter((t) => !typeOrder.includes(t))];
    return ["All", ...ordered];
  }, [d.byType]);

  const filtered = useMm(() => {
    let rs = all;
    if (cat !== "All") rs = rs.filter((s) => s.category.split(",").map((x) => x.trim()).includes(cat));
    if (country !== "All") rs = rs.filter((s) => s.country.split(",").map((x) => x.trim()).includes(country));
    if (city !== "All") rs = rs.filter((s) => (s.city || "").split(",").map((x) => x.trim()).includes(city));
    if (type !== "All") rs = rs.filter((s) => (s.type || "").trim() === type);
    if (q.trim()) {
      const Q = q.trim().toLowerCase();
      rs = rs.filter((s) =>
        s.name.toLowerCase().includes(Q) ||
        s.city.toLowerCase().includes(Q) ||
        s.country.toLowerCase().includes(Q) ||
        s.category.toLowerCase().includes(Q)
      );
    }
    const coll = new Intl.Collator("en", { sensitivity: "base" });
    rs = [...rs].sort((a, b) => coll.compare(a[sort] || "", b[sort] || ""));
    return rs;
  }, [all, cat, country, city, type, q, sort]);

  // group by leading letter for the alphabetical list
  const grouped = useMm(() => {
    if (sort !== "name") return null;
    const out = {};
    filtered.forEach((s) => {
      const L = (s.name[0] || "#").toUpperCase();
      const K = /[A-Z]/.test(L) ? L : "#";
      (out[K] = out[K] || []).push(s);
    });
    return out;
  }, [filtered, sort]);

  return (
    <div className="view wrap">
      <div className="studios-head">
        <div>
          <Eyebrow num="§S">The List</Eyebrow>
          <h2 style={{ marginTop: 14 }}>
            {filtered.length === all.length ? "All" : filtered.length} studios{cat !== "All" ? <> in <em>{cat}</em></> : null}
            {city !== "All" ? <>, based in <em>{city}</em> <button onClick={() => setCity("All")} className="clear-filter" aria-label="Clear city filter" title="Clear city filter">×</button></> : (country !== "All" ? <>, from <em>{country}</em></> : null)}.
          </h2>
        </div>
        <div style={{ display: "grid", gap: 16, justifyItems: "end" }}>
          <div className="searchbar">
            <span className="lbl">Search</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="name, city, country…" />
            {q && <button onClick={() => setQ("")} className="clr">×</button>}
          </div>
          <div className="work-toggles">
            <span className="lbl">Sort</span>
            <div className="seg">
              {[["name","A–Z"],["city","City"],["country","Country"]].map(([k, lbl]) => (
                <button key={k} data-on={sort === k} onClick={() => setSort(k)}>{lbl}</button>
              ))}
            </div>
            <span className="lbl" style={{ marginLeft: 10 }}>View</span>
            <div className="seg">
              {["list", "grid"].map((m) => (
                <button key={m} data-on={mode === m} onClick={() => setMode(m)}>{m}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="filter-row">
        <div>
          <div className="lbl">Discipline</div>
          <div className="chips">
            {allCats.map((c) => (
              <button key={c} data-on={cat === c} onClick={() => setCat(c)}>
                {c}{c !== "All" && d.byCat?.[c] ? <span className="num"> {d.byCat[c]}</span> : null}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="lbl">Country</div>
          <div className="chips scroll">
            {allCountries.slice(0, 16).map((c) => (
              <button key={c} data-on={country === c} onClick={() => setCountry(c)}>
                {c}{c !== "All" && d.byCountry?.[c] ? <span className="num"> {d.byCountry[c]}</span> : null}
              </button>
            ))}
            {allCountries.length > 16 && (
              <select className="more-select" value={allCountries.slice(16).includes(country) ? country : ""} onChange={(e) => e.target.value && setCountry(e.target.value)}>
                <option value="">More…</option>
                {allCountries.slice(16).map((c) => <option key={c} value={c}>{c} ({d.byCountry[c]})</option>)}
              </select>
            )}
          </div>
        </div>
        {allTypes && (
          <div>
            <div className="lbl">Type</div>
            <div className="chips">
              {allTypes.map((t) => (
                <button key={t} data-on={type === t} onClick={() => setType(t)}>
                  {t}{t !== "All" && d.byType?.[t] ? <span className="num"> {d.byType[t]}</span> : null}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {mode === "list" ? (
        <div className="st-list">
          {sort === "name" && grouped ? (
            Object.keys(grouped).sort().map((L) => (
              <div key={L} className="st-group">
                <div className="st-letter">{L}</div>
                <div>
                  {grouped[L].map((s, i) => <StudioRow key={s.name + i} s={s} go={go} />)}
                </div>
              </div>
            ))
          ) : (
            filtered.map((s, i) => <StudioRow key={s.name + i} s={s} go={go} />)
          )}
          {filtered.length === 0 && (
            <div style={{ padding: "80px 0", textAlign: "center", color: "var(--mute)", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" }}>
              Nothing matches that filter.
            </div>
          )}
        </div>
      ) : (
        <div className="work-grid" style={{ paddingTop: 24 }}>
          {filtered.slice(0, 48).map((s) => {
            const col = d.catColors?.[s.category.split(",")[0].trim()] || "#D8CFBD";
            const shot = s.url
              ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=800&h=560`
              : null;
            return (
              <div className="card" key={s.name} onClick={() => go("studio", { name: s.name })} style={{ cursor: "pointer" }}>
                <div className="frame" style={{ "--col": col, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.05) 0 1px, transparent 1px 14px)" }} />
                  {shot && (
                    <img
                      src={shot}
                      alt=""
                      loading="lazy"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                  <div className="ix" style={{ position: "relative", zIndex: 2 }}>{s.city || "—"}</div>
                  <div className="yr" style={{ position: "relative", zIndex: 2 }}>{s.country}</div>
                  <div className="ttl" style={{
                    position: "absolute",
                    left: 12,
                    bottom: 12,
                    zIndex: 3,
                    display: "inline-block",
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "rgba(15,15,14,.32)",
                    color: "#fff",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    fontFamily: "var(--sans)",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                    lineHeight: 1.2,
                    maxWidth: "calc(100% - 24px)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>{s.name}</div>
                </div>
                <div className="meta">
                  <span>{s.category.split(",")[0]}</span>
                  <span>{(s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").slice(0, 24)}</span>
                </div>
              </div>
            );
          })}
          {filtered.length > 48 && (
            <div style={{ gridColumn: "1 / -1", padding: "32px 0", textAlign: "center", fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", letterSpacing: ".06em", textTransform: "uppercase" }}>
              Showing 48 of {filtered.length} · switch to list view to see all
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StudioRow({ s, go }) {
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const [hover, setHover] = useSt(false);
  const boxRef = React.useRef(null);
  const target = React.useRef({ x: 0, y: 0 });
  const cur = React.useRef({ x: 0, y: 0 });
  const raf = React.useRef(0);
  const primed = React.useRef(false);

  const shot = s.url
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=520&h=400`
    : null;

  // Smoothly ease the preview toward the cursor (trailing / inertia motion).
  useEf(() => {
    if (!hover) { primed.current = false; cancelAnimationFrame(raf.current); return; }
    const tick = () => {
      const el = boxRef.current;
      if (el) {
        if (!primed.current) { cur.current = { ...target.current }; primed.current = true; }
        cur.current.x += (target.current.x - cur.current.x) * 0.16;
        cur.current.y += (target.current.y - cur.current.y) * 0.16;
        el.style.transform = `translate(${cur.current.x + 24}px, ${cur.current.y - 140}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [hover]);

  return (
    <div
      className="studio-row"
      onClick={() => go("studio", { name: s.name })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => { target.current = { x: e.clientX, y: e.clientY }; }}
    >
      <div className="t">
        {s.name}
        {s.type && s.type !== "Studio" && (
          <span className={`type-tag type-tag--${s.type.toLowerCase()}`}>{s.type}</span>
        )}
      </div>
      <div className="c">{s.city}{s.city && s.country ? ", " : ""}{s.country}</div>
      <div className="k">{s.category}</div>
      <div className="u">{host}</div>
      <div className="arr">→</div>
      {hover && shot && (
        <div ref={boxRef} className="row-preview-follow">
          <div className="row-preview">
            <img
              src={shot}
              alt=""
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { StudiosView });
