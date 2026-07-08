/* global React */

// ============================================================
// RECENTLY VIEWED — help visitors return to studios they just explored.
//
// Not a browsing history: LocalStorage only, capped at 10, deduped,
// most-recent-first. Stores just the studio *name* (the stable key the
// router already uses) — everything else is resolved live against
// window.SITE.studios at render, so removed studios simply vanish and no
// stale data is kept.
// ============================================================

const RV_KEY = "jadl:recentlyViewed";
const RV_MAX = 10;                 // hard cap kept in storage
const RV_EVENT = "jadl:rv-change"; // lets mounted sections update live

// ---- storage utility (all access funnels through here) ----
function readRV() {
  try {
    const raw = localStorage.getItem(RV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function recordVisit(name) {
  if (!name) return;
  try {
    const cur = readRV();
    // Skip the write entirely if already at the front — avoids churn.
    if (cur[0] === name) return;
    const next = [name, ...cur.filter((n) => n !== name)].slice(0, RV_MAX);
    localStorage.setItem(RV_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(RV_EVENT));
  } catch {
    /* private mode / quota — no-op */
  }
}

// ---- reusable hook: live list of resolved studio objects ----
function useRecentlyViewed(excludeName) {
  const [names, setNames] = React.useState(readRV);

  React.useEffect(() => {
    const sync = () => setNames(readRV());
    window.addEventListener(RV_EVENT, sync);     // same-tab updates
    window.addEventListener("storage", sync);    // cross-tab updates
    return () => {
      window.removeEventListener(RV_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return React.useMemo(() => {
    const all = (window.SITE && window.SITE.studios) || [];
    const byName = new Map(all.map((s) => [s.name, s]));
    return names
      .filter((n) => n !== excludeName && byName.has(n)) // drop current + removed
      .map((n) => byName.get(n));
  }, [names, excludeName]);
}

// ---- presentation: shared chip row ----
function RVChips({ items, go, limit }) {
  return (
    <div className="rv-list">
      {items.slice(0, limit).map((s) => (
        <button key={s.name} className="rv-chip" onClick={() => go("studio", { name: s.name })}>
          <span className="rv-name">{s.name}</span>
          {(s.city || s.country) && (
            <span className="rv-loc">{[s.city, s.country].filter(Boolean).join(", ")}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ---- homepage section (up to 6) ----
function RecentlyViewed({ go }) {
  const items = useRecentlyViewed();
  if (items.length === 0) return null;
  return (
    <section className="wrap rv-section">
      <div className="rv-head">
        <span className="rv-eyebrow">Recently viewed</span>
      </div>
      <RVChips items={items} go={go} limit={6} />
    </section>
  );
}

// ---- studio-page footer variant (up to 5, excludes current) ----
function RecentlyViewedInline({ go, excludeName }) {
  const items = useRecentlyViewed(excludeName);
  if (items.length === 0) return null;
  return (
    <div className="rv-inline">
      <span className="rv-eyebrow">Recently viewed</span>
      <RVChips items={items} go={go} limit={5} />
    </div>
  );
}

Object.assign(window, {
  recordVisit,
  useRecentlyViewed,
  RecentlyViewed,
  RecentlyViewedInline,
});
