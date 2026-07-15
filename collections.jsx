/* global React, Eyebrow */
/*
 * collections.jsx — auto-generated taxonomy collection pages.
 *
 * Three dimensions, each derived entirely from studios.json aggregates that
 * data.js already computes (byCat / byCountry / byCity). Nothing is written by
 * hand: titles, descriptions, counts and cross-links are all generated.
 *
 *   /disciplines  -> hub   ·  /discipline/<slug>  -> leaf
 *   /countries    -> hub   ·  /country/<slug>     -> leaf
 *   /cities       -> hub   ·  /city/<slug>        -> leaf
 *
 * Exposes, on window:
 *   COLLECTION_KINDS       — leaf-kind config (singular/plural/index key)
 *   collSlugToValue(kind, slug)  — reverse lookup (slug is lossy → canonical value)
 *   collStudiosFor(kind, value)  — studios in a given collection
 *   collCopy(kind, value, n)     — { title, desc, h1 } auto-copy
 *   CollectionView, CollectionHubView — React views
 */
const { useMemo: useCollMm, useState: useCollSt } = React;

// slugify — MUST match app.jsx / prerender so URLs resolve.
function collSlugify(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Per-kind config. `field` is how a studio record exposes the value; `index`
// is the precomputed count map on window.SITE.
const COLLECTION_KINDS = {
  discipline: { singular: "discipline", plural: "disciplines", field: "category", index: "byCat",     label: "Discipline", labelPlural: "Disciplines" },
  country:    { singular: "country",    plural: "countries",   field: "country",  index: "byCountry", label: "Country",    labelPlural: "Countries" },
  city:       { singular: "city",       plural: "cities",      field: "city",     index: "byCity",    label: "City",       labelPlural: "Cities" },
};

// Every distinct value for a kind, from the precomputed count map.
function collValues(kind) {
  const d = window.SITE || {};
  const idx = d[COLLECTION_KINDS[kind].index] || {};
  return Object.keys(idx);
}

// slug -> canonical value (case/spacing preserved). Cached per kind.
const _slugMaps = {};
function collSlugToValue(kind, slug) {
  const values = collValues(kind);
  // Don't cache before studios.json has loaded (values empty) — otherwise the
  // first pre-load call would freeze an empty map and every slug 404s to index.
  if (!_slugMaps[kind] || !_slugMaps[kind].__n) {
    if (values.length) {
      const m = { __n: values.length };
      for (const v of values) m[collSlugify(v)] = v;
      _slugMaps[kind] = m;
    }
  }
  return (_slugMaps[kind] && _slugMaps[kind][slug]) || null;
}

// Studios belonging to a collection value (fields are comma-lists).
function collStudiosFor(kind, value) {
  const field = COLLECTION_KINDS[kind].field;
  const all = (window.SITE && window.SITE.studios) || [];
  return all.filter((s) =>
    String(s[field] || "").split(",").map((x) => x.trim()).includes(value)
  );
}

// Auto-generated, template-driven copy — no per-page manual writing.
function collCopy(kind, value, n) {
  const plural = n === 1 ? "studio" : "studios";
  if (kind === "discipline") {
    const low = value.toLowerCase();
    return {
      h1: value,
      title: `${value} design studios · Just a Design List`,
      desc: `${n} independent ${plural} and designers working in ${low}, collected in the Just a Design List index. Browse by country and city.`,
    };
  }
  if (kind === "country") {
    return {
      h1: value,
      title: `Design studios in ${value} · Just a Design List`,
      desc: `${n} independent design ${plural} and practices based in ${value}. A curated index — browse by city and discipline.`,
    };
  }
  // city
  return {
    h1: value,
    title: `Design studios in ${value} · Just a Design List`,
    desc: `${n} independent design ${plural} based in ${value}, from the Just a Design List index. Browse by discipline.`,
  };
}

// ---- shared bits ----------------------------------------------------------
function CollChips({ items, onPick }) {
  if (!items.length) return null;
  return (
    <div className="chips" style={{ marginTop: 12 }}>
      {items.map(([label, n, go]) => (
        <button key={label} onClick={go}>
          {label}
          {n != null ? <span className="num"> {n}</span> : null}
        </button>
      ))}
    </div>
  );
}

function CollStudioList({ studios, go }) {
  const [limit, setLimit] = useCollSt(60);
  const shown = studios.slice(0, limit);
  return (
    <>
      <div className="st-list" style={{ marginTop: 24 }}>
        {shown.map((s) => (
          <div key={s.name} className="studio-row" onClick={() => go("studio", { name: s.name })}>
            <div className="t">{s.name}</div>
            <div className="c">{s.city}{s.city && s.country ? ", " : ""}{s.country}</div>
            <div className="k">{s.category}</div>
            <div className="u">{(s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")}</div>
            <div className="arr">→</div>
          </div>
        ))}
      </div>
      {studios.length > limit && (
        <button
          onClick={() => setLimit((n) => n + 120)}
          className="link"
          style={{ marginTop: 28, fontFamily: "var(--mono)", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--accent)" }}
        >
          Show more — {studios.length - limit} remaining
        </button>
      )}
    </>
  );
}

// ---- leaf view ------------------------------------------------------------
function CollectionView({ kind, value, go }) {
  const d = window.SITE || {};
  const cfg = COLLECTION_KINDS[kind];

  const studios = useCollMm(
    () => collStudiosFor(kind, value).sort((a, b) => (a.name || "").localeCompare(b.name || "")),
    [kind, value]
  );

  // Cross-links to sibling collections, ranked by how many of THIS page's
  // studios they contain — this is what turns the index into something you
  // wander through rather than search once and leave.
  const facets = useCollMm(() => {
    const disc = {}, countries = {}, cities = {};
    for (const s of studios) {
      s.category.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (disc[c] = (disc[c] || 0) + 1));
      s.country.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (countries[c] = (countries[c] || 0) + 1));
      s.city.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (cities[c] = (cities[c] || 0) + 1));
    }
    const rank = (obj, exclude) =>
      Object.entries(obj).filter(([k]) => k !== exclude).sort((a, b) => b[1] - a[1]);
    return {
      disc: rank(disc, kind === "discipline" ? value : null),
      countries: rank(countries, kind === "country" ? value : null),
      cities: rank(cities, kind === "city" ? value : null),
    };
  }, [studios, kind, value]);

  if (!value) {
    return (
      <div className="view wrap" style={{ paddingTop: 120 }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: 32 }}>Collection not found.</p>
        <button onClick={() => go("index")} className="link" style={{ fontFamily: "var(--mono)", fontSize: 12 }}>← Back to the index</button>
      </div>
    );
  }

  const copy = collCopy(kind, value, studios.length);

  return (
    <div className="view wrap">
      <div className="pd-topbar">
        <button onClick={() => go("collectionHub", { kind: cfg.plural })} className="back-btn" aria-label={`All ${cfg.labelPlural}`}>
          <span className="arr">←</span>
          <span>All {cfg.labelPlural.toLowerCase()}</span>
        </button>
      </div>

      <div className="pd-head" style={{ marginTop: 8 }}>
        <div>
          <Eyebrow><span>{cfg.label}</span></Eyebrow>
          <h2 style={{ marginTop: 14 }}>{copy.h1}</h2>
          <p style={{ marginTop: 14, maxWidth: 640, color: "var(--ink-2)", fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.5 }}>
            {studios.length} design {studios.length === 1 ? "studio" : "studios"}
            {kind === "city" ? " based here" : kind === "country" ? " based here" : " in the index"}.
          </p>
        </div>
      </div>

      {/* exploration cross-links */}
      <div className="coll-facets">
        {kind !== "discipline" && facets.disc.length > 0 && (
          <div>
            <div className="lbl">By discipline</div>
            <CollChips
              items={facets.disc.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", { kind: "discipline", value: c })])}
            />
          </div>
        )}
        {kind !== "country" && facets.countries.length > 1 && (
          <div>
            <div className="lbl">By country</div>
            <CollChips
              items={facets.countries.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", { kind: "country", value: c })])}
            />
          </div>
        )}
        {kind !== "city" && facets.cities.length > 1 && (
          <div>
            <div className="lbl">By city</div>
            <CollChips
              items={facets.cities.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", { kind: "city", value: c })])}
            />
          </div>
        )}
      </div>

      <div style={{ paddingTop: 40 }}>
        <Eyebrow><span>The studios</span></Eyebrow>
        <CollStudioList studios={studios} go={go} />
      </div>
    </div>
  );
}

// ---- hub view (index of all values for a kind) ----------------------------
function CollectionHubView({ kind, go }) {
  // kind here is the PLURAL key (disciplines/countries/cities)
  const singular = Object.keys(COLLECTION_KINDS).find((k) => COLLECTION_KINDS[k].plural === kind) || "discipline";
  const cfg = COLLECTION_KINDS[singular];
  const d = window.SITE || {};

  const rows = useCollMm(() => {
    const idx = d[cfg.index] || {};
    return Object.entries(idx).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [kind]);

  const max = rows[0]?.[1] || 1;

  return (
    <div className="view wrap">
      <div className="pd-head">
        <div>
          <Eyebrow><span>Browse</span></Eyebrow>
          <h2 style={{ marginTop: 14 }}>{cfg.labelPlural}</h2>
          <p style={{ marginTop: 14, maxWidth: 640, color: "var(--ink-2)", fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.5 }}>
            {rows.length} {cfg.labelPlural.toLowerCase()} represented across the index. Pick one to see its studios.
          </p>
        </div>
      </div>

      <div className="coll-hub" style={{ borderTop: "1px solid var(--rule)", marginTop: 32 }}>
        {rows.map(([value, n], i) => (
          <div key={value} className="country-row big" onClick={() => go("collection", { kind: singular, value })}>
            <div className="n">{String(i + 1).padStart(2, "0")}</div>
            <div className="t">{value}</div>
            <div className="bar"><span className="fill" style={{ width: `${Math.max(6, (n / max) * 100)}%` }}></span></div>
            <div className="c">{n} {n === 1 ? "studio" : "studios"}</div>
            <div className="arr">→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  COLLECTION_KINDS,
  collSlugify,
  collSlugToValue,
  collStudiosFor,
  collCopy,
  CollectionView,
  CollectionHubView,
});
