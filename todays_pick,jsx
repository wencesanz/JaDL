/* global React */

// ============================================================
// TODAY'S PICK — one studio featured per calendar day.
//
// Zero backend, zero storage, deterministic: the pick is a pure
// function of today's UTC date and the current studio list, so every
// visitor worldwide sees the same studio on the same day, and it
// changes automatically at UTC midnight.
//
// Algorithm — seeded full-cycle permutation:
//   dayNumber = whole days since the Unix epoch (UTC)
//   cycle     = floor(dayNumber / N)   → which pass through the list
//   pos       = dayNumber % N          → position within this pass
//   order     = Fisher–Yates shuffle of [0..N-1] seeded by `cycle`
//   pick      = studios[ order[pos] ]
// Each studio is therefore featured exactly once every N days (the
// maximum possible spacing — no early repeats), while a new shuffle
// each cycle keeps the sequence feeling editorial rather than A→Z.
// ============================================================

// Small, fast, well-distributed seeded PRNG.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic pick for a given date + list. Exposed for reuse/testing.
function pickStudioForDate(studios, date) {
  const list = studios || [];
  const N = list.length;
  if (N === 0) return null;
  if (N === 1) return list[0];

  const d = date || new Date();
  const dayNumber = Math.floor(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000
  );
  const cycle = Math.floor(dayNumber / N);
  const pos = ((dayNumber % N) + N) % N;

  // Seeded Fisher–Yates over index array — reshuffled each cycle.
  const order = Array.from({ length: N }, (_, i) => i);
  const rand = mulberry32(cycle + 1);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return list[order[pos]];
}

function TodaysPick({ go }) {
  const studios = (window.SITE && window.SITE.studios) || [];
  const pick = React.useMemo(() => pickStudioForDate(studios, new Date()), [studios.length]);
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  if (!pick) return null;

  const loc = [pick.city, pick.country].filter(Boolean).join(", ");
  const host = (pick.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
  const shot = pick.url
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(pick.url)}?w=520&h=400`
    : null;
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const open = () => go("studio", { name: pick.name });

  return (
    <section className="wrap" style={{ paddingTop: 28 }}>
      <div className="pick-card" onClick={open} role="link" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") open(); }}>
        <div className="pick-body">
          <div className="pick-eyebrow">
            <span className="pick-dot" aria-hidden="true" />
            Today&rsquo;s Discovery
            <span className="pick-date">{today}</span>
          </div>
          <div className="pick-name">{pick.name}</div>
          {loc && <div className="pick-loc">{loc}</div>}
          <div className="pick-cta"><span className="arr">→</span> View studio</div>
        </div>
        {shot && !failed && (
          <div className="pick-thumb">
            <img
              src={shot}
              alt=""
              loading="lazy"
              onLoad={(e) => { if (e.target.naturalWidth > 100) setLoaded(true); else setFailed(true); }}
              onError={() => setFailed(true)}
              style={{ opacity: loaded ? 1 : 0 }}
            />
            {host && <span className="pick-host">{host} ↗</span>}
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { pickStudioForDate, TodaysPick });
