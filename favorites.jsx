/* global React */
const { useState: useSavedState, useEffect: useSavedEffect } = React;

// ---------- localStorage-backed favorites store ----------
// Schema (key "tsi_saved"):
//   { v: 1, items: [ { slug, name, at }, ... ] }
// slug — stable, URL-safe id (matches app.jsx slugify + findStudioBySlug)
// name — kept for resilient rendering if the dataset shifts
// at   — save timestamp (ms) for most-recent-first ordering
const SAVED_KEY = "tsi_saved";

const SavedStore = (() => {
  const listeners = new Set();
  let items = load();

  function load() {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : parsed && parsed.items;
      return Array.isArray(arr)
        ? arr.filter((x) => x && x.slug).map((x) => ({ slug: x.slug, name: x.name || "", at: x.at || 0 }))
        : [];
    } catch (e) {
      return [];
    }
  }

  function persist() {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify({ v: 1, items }));
    } catch (e) {
      /* private mode / quota — keep working in-memory this session */
    }
  }

  function emit() {
    listeners.forEach((fn) => {
      try { fn(items); } catch (e) {}
    });
  }

  // Cross-tab sync
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === SAVED_KEY) { items = load(); emit(); }
    });
  }

  return {
    get() { return items.slice(); },
    has(slug) { return items.some((x) => x.slug === slug); },
    count() { return items.length; },
    toggle(slug, name) {
      if (!slug) return;
      if (this.has(slug)) items = items.filter((x) => x.slug !== slug);
      else items = [{ slug, name: name || "", at: Date.now() }, ...items];
      persist(); emit();
    },
    remove(slug) {
      items = items.filter((x) => x.slug !== slug);
      persist(); emit();
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
})();

// Hook: re-render on any change to the saved set.
function useSaved() {
  const [, force] = useSavedState(0);
  useSavedEffect(() => SavedStore.subscribe(() => force((n) => n + 1)), []);
  return SavedStore;
}

// slugify — must match app.jsx exactly so slugs resolve back to studios.
function savedSlugify(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------- Save / Saved toggle button (studio detail) ----------
function SaveButton({ studio }) {
  const store = useSaved();
  if (!studio) return null;
  const slug = savedSlugify(studio.name);
  const saved = store.has(slug);
  return (
    <button
      className={`save-btn ${saved ? "is-saved" : ""}`}
      onClick={() => store.toggle(slug, studio.name)}
      aria-pressed={saved}
      title={saved ? "Remove from My List" : "Save to My List"}
    >
      <svg viewBox="0 0 24 24" width="14" height="14" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
      </svg>
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}

// ---------- My List page ----------
function MyListView({ go }) {
  const store = useSaved();
  const all = (window.SITE && window.SITE.studios) || [];
  const bySlug = React.useMemo(() => {
    const m = new Map();
    all.forEach((s) => m.set(savedSlugify(s.name), s));
    return m;
  }, [all]);

  // Resolve saved slugs → studios (most-recent-first; skip unresolvable).
  const rows = store.get()
    .map((it) => ({ it, s: bySlug.get(it.slug) }))
    .filter((r) => r.s);

  return (
    <div className="view wrap">
      <div className="pd-head">
        <div>
          <Eyebrow><span>Saved</span></Eyebrow>
          <h2 style={{ marginTop: 14 }}>My List</h2>
        </div>
        <dl className="meta">
          <dt>Saved</dt><dd>{rows.length} {rows.length === 1 ? "studio" : "studios"}</dd>
          <dt>Storage</dt><dd>This browser only</dd>
        </dl>
      </div>

      {rows.length === 0 ? (
        <div className="mylist-empty">
          <p className="lead">Nothing saved yet.</p>
          <p className="sub">Open any studio and tap <em>Save</em> to keep it here. Your list lives in this browser — no account needed.</p>
          <button onClick={() => go("studios")} className="back-btn" style={{ marginTop: 8 }}>
            <span className="arr">→</span><span>Browse the studios</span>
          </button>
        </div>
      ) : (
        <div className="st-list" style={{ marginTop: 8 }}>
          {rows.map(({ it, s }) => (
            <div key={it.slug} className="studio-row mylist-row" onClick={() => go("studio", { name: s.name })}>
              <div className="t">{s.name}</div>
              <div className="c">{s.city}{s.city && s.country ? ", " : ""}{s.country}</div>
              <div className="k">{s.category}</div>
              <div className="u">{(s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")}</div>
              <button
                className="mylist-remove"
                onClick={(e) => { e.stopPropagation(); store.remove(it.slug); }}
                aria-label={`Remove ${s.name} from My List`}
                title="Remove"
              >×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { SavedStore, useSaved, SaveButton, MyListView });
