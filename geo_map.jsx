/* global React */
// World choropleth for the Geography view. Loads the inline SVG world map
// (paths keyed by ISO 3166-1 alpha-2) and shades each country by the number
// of studios indexed there. Map artwork: Al MacDonald / Fritz Lekschas,
// CC BY-SA 3.0.

const { useEffect: useMapEffect, useRef: useMapRef, useState: useMapState } = React;

// Country name (as stored in studios.json) → ISO alpha-2 used by the SVG.
// Sub-national entries fold into their sovereign state for the map.
const NAME_TO_ISO = {
  "USA": "us", "Spain": "es", "UK": "gb", "Germany": "de", "Australia": "au",
  "France": "fr", "The Netherlands": "nl", "Switzerland": "ch", "Sweden": "se",
  "Canada": "ca", "Denmark": "dk", "Norway": "no", "Austria": "at", "Italy": "it",
  "Portugal": "pt", "China": "cn", "Belgium": "be", "Mexico": "mx", "Finland": "fi",
  "Scotland": "gb", "South Korea": "kr", "Greece": "gr", "Japan": "jp", "Brazil": "br",
  "Argentina": "ar", "New Zealand": "nz", "Poland": "pl", "Romania": "ro",
  "Czech Republic": "cz", "Ireland": "ie", "Hungary": "hu", "Turkey": "tr",
  "Uruguay": "uy", "Serbia": "rs", "Singapore": "sg", "Ukraine": "ua", "Chile": "cl",
  "Iceland": "is", "Russia": "ru", "Vietnam": "vn", "Tasmania": "au", "Estonia": "ee",
  "Wales": "gb", "United Arab Emirates": "ae", "Guatemala": "gt", "Kenya": "ke",
  "Kazakhstan": "kz", "Lithuania": "lt", "Israel": "il", "Latvia": "lv",
  "Slovakia": "sk", "Colombia": "co", "Northern Ireland": "gb", "North Macedonia": "mk",
};

// Discrete buckets → ink mix percentage (reads as a monochrome choropleth).
function bucketPct(n) {
  if (n >= 100) return 90;
  if (n >= 40) return 72;
  if (n >= 15) return 54;
  if (n >= 5) return 38;
  if (n >= 1) return 22;
  return 0;
}
const LEGEND = [
  ["1–4", 22], ["5–14", 38], ["15–39", 54], ["40–99", 72], ["100+", 90],
];

function fillFor(pct) {
  if (!pct) return "var(--rule-soft)";
  return `color-mix(in srgb, var(--ink) ${pct}%, var(--paper))`;
}

function WorldChoropleth({ go }) {
  const d = window.SITE;
  const holder = useMapRef(null);
  const wrapRef = useMapRef(null);
  const [tip, setTip] = useMapState(null); // { iso, name, n, x, y }

  useMapEffect(() => {
    // Aggregate studio counts per ISO (folding sub-nations into sovereigns),
    // and remember a primary display name + filter target per ISO.
    const byIso = {};       // iso -> count
    const primaryName = {}; // iso -> name to show / filter by
    Object.entries(d.byCountry || {}).forEach(([name, n]) => {
      const iso = NAME_TO_ISO[name];
      if (!iso) return;
      byIso[iso] = (byIso[iso] || 0) + n;
      // Prefer the largest-count name as the label for shared ISOs (e.g. gb→UK)
      if (!primaryName[iso] || n > (d.byCountry[primaryName[iso]] || 0)) {
        primaryName[iso] = name;
      }
    });

    let cancelled = false;
    fetch("world-map.min.svg?v=44")
      .then((r) => r.text())
      .then((txt) => {
        if (cancelled || !holder.current) return;
        holder.current.innerHTML = txt;
        const svg = holder.current.querySelector("svg");
        if (!svg) return;
        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.width = "100%";
        svg.style.height = "auto";
        svg.style.display = "block";

        // Color every country path/group
        const nodes = svg.querySelectorAll("path[id], g[id]");
        nodes.forEach((node) => {
          const iso = node.id;
          const n = byIso[iso] || 0;
          const pct = bucketPct(n);
          const fill = fillFor(pct);
          const targets = node.tagName.toLowerCase() === "g"
            ? node.querySelectorAll("path")
            : [node];
          targets.forEach((p) => {
            p.style.fill = fill;
            p.style.stroke = "var(--paper)";
            p.style.strokeWidth = "0.4";
            p.style.transition = "fill .15s ease";
            p.style.vectorEffect = "non-scaling-stroke";
          });
          if (n > 0) {
            node.style.cursor = "pointer";
            const name = primaryName[iso];
            const enter = () => {
              targets.forEach((p) => { p.style.fill = "var(--accent, var(--ink))"; });
            };
            const leave = () => {
              targets.forEach((p) => { p.style.fill = fill; });
              setTip(null);
            };
            const move = (e) => {
              const rect = wrapRef.current.getBoundingClientRect();
              setTip({ iso, name, n, x: e.clientX - rect.left, y: e.clientY - rect.top });
            };
            const click = () => go("studios", { filter: { country: name } });
            node.addEventListener("mouseenter", enter);
            node.addEventListener("mouseleave", leave);
            node.addEventListener("mousemove", move);
            node.addEventListener("click", click);
          }
        });
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="geo-map-block">
      <div className="geo-map" ref={wrapRef}>
        <div className="geo-map-svg" ref={holder} />
        {tip && (
          <div
            className="geo-tip"
            style={{
              left: Math.min(tip.x + 14, (wrapRef.current?.clientWidth || 0) - 160),
              top: Math.max(tip.y - 14, 0),
            }}
          >
            <span className="geo-tip-name">{tip.name}</span>
            <span className="geo-tip-n">{tip.n} studio{tip.n === 1 ? "" : "s"}</span>
          </div>
        )}
      </div>
      <div className="geo-legend">
        <span className="geo-legend-lbl">Studios per country</span>
        <div className="geo-legend-scale">
          {LEGEND.map(([label, pct]) => (
            <div className="geo-legend-step" key={label}>
              <span className="sw" style={{ background: fillFor(pct) }} />
              <span className="lb">{label}</span>
            </div>
          ))}
        </div>
        <span className="geo-legend-credit">Map: Al MacDonald · Fritz Lekschas, CC BY-SA 3.0</span>
      </div>
    </div>
  );
}

Object.assign(window, { WorldChoropleth });
