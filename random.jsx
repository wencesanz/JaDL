/* global React */

// ---------- Random Studio discovery ----------
// Uniform random pick across the whole directory. Remembers the last studio
// served (module-level) so back-to-back clicks avoid an immediate repeat, and
// always excludes the studio you're currently viewing when asked.
let lastRandomName = null;

function pickRandomStudio(excludeName) {
  const all = (window.SITE && window.SITE.studios) || [];
  if (!all.length) return null;
  // Prefer a pool that excludes both the current studio and the last served.
  let pool = all.filter((s) => s.name !== excludeName && s.name !== lastRandomName);
  if (!pool.length) pool = all.filter((s) => s.name !== excludeName);
  if (!pool.length) pool = all;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  lastRandomName = pick.name;
  return pick;
}

// Prominent homepage call-to-action.
function RandomCTA({ go }) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    const s = pickRandomStudio(null);
    if (s) go("studio", { name: s.name });
  };
  return (
    <section className="wrap">
      <div className="random-cta">
        <div className="random-cta-copy">
          <div className="random-cta-lead">Not sure where to start?</div>
          <div className="random-cta-sub">Let the index choose for you.</div>
        </div>
        <button
          className="random-cta-btn"
          onClick={open}
          onMouseEnter={() => setSpin(true)}
          onAnimationEnd={() => setSpin(false)}
        >
          <span>Open a random studio</span>
          <span className={`random-glyph ${spin ? "is-spin" : ""}`} aria-hidden="true">⤳</span>
        </button>
      </div>
    </section>
  );
}

// Compact button for the studio detail header row.
function RandomButton({ go, currentName }) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    setSpin(true);
    const s = pickRandomStudio(currentName);
    if (s) go("studio", { name: s.name });
  };
  return (
    <button className="random-btn" onClick={open} title="Jump to a random studio">
      <span>Random</span>
      <span className={`random-glyph ${spin ? "is-spin" : ""}`} onAnimationEnd={() => setSpin(false)} aria-hidden="true">⤳</span>
    </button>
  );
}

Object.assign(window, { pickRandomStudio, RandomCTA, RandomButton });
