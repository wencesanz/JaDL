(function(){
"use strict";
const { useEffect: useMapEffect, useRef: useMapRef, useState: useMapState } = React;
const NAME_TO_ISO = {
  "USA": "us",
  "Spain": "es",
  "UK": "gb",
  "England": "gb",
  "Germany": "de",
  "Australia": "au",
  "France": "fr",
  "The Netherlands": "nl",
  "Switzerland": "ch",
  "Sweden": "se",
  "Canada": "ca",
  "Denmark": "dk",
  "Norway": "no",
  "Austria": "at",
  "Italy": "it",
  "Portugal": "pt",
  "China": "cn",
  "Belgium": "be",
  "Mexico": "mx",
  "Finland": "fi",
  "Scotland": "gb",
  "South Korea": "kr",
  "Greece": "gr",
  "Japan": "jp",
  "Brazil": "br",
  "Argentina": "ar",
  "New Zealand": "nz",
  "Poland": "pl",
  "Romania": "ro",
  "Czech Republic": "cz",
  "Ireland": "ie",
  "Hungary": "hu",
  "Turkey": "tr",
  "Uruguay": "uy",
  "Serbia": "rs",
  "Singapore": "sg",
  "Ukraine": "ua",
  "Chile": "cl",
  "Iceland": "is",
  "Russia": "ru",
  "Vietnam": "vn",
  "Tasmania": "au",
  "Estonia": "ee",
  "Wales": "gb",
  "United Arab Emirates": "ae",
  "Guatemala": "gt",
  "Kenya": "ke",
  "Kazakhstan": "kz",
  "Lithuania": "lt",
  "Israel": "il",
  "Latvia": "lv",
  "Slovakia": "sk",
  "Colombia": "co",
  "Northern Ireland": "gb",
  "North Macedonia": "mk"
};
function bucketPct(n) {
  if (n >= 100) return 100;
  if (n >= 40) return 86;
  if (n >= 15) return 72;
  if (n >= 5) return 58;
  if (n >= 1) return 44;
  return 0;
}
const LEGEND = [
  ["1–4", 44],
  ["5–14", 58],
  ["15–39", 72],
  ["40–99", 86],
  ["100+", 100]
];
function fillFor(pct, color) {
  if (!pct) return "var(--rule-soft)";
  return `color-mix(in srgb, ${color || "var(--ink)"} ${pct}%, var(--paper))`;
}
const regionFor = (name) => window.jadlRegion ? window.jadlRegion(name) : { id: "all", name: "", color: "var(--ink)" };
function WorldChoropleth({ go }) {
  const d = window.SITE;
  const holder = useMapRef(null);
  const wrapRef = useMapRef(null);
  const [tip, setTip] = useMapState(null);
  const [focus, setFocus] = useMapState(null);
  const paint = useMapRef([]);
  useMapEffect(() => {
    const byIso = {};
    const primaryName = {};
    Object.entries(d.byCountry || {}).forEach(([name, n]) => {
      const iso = NAME_TO_ISO[name];
      if (!iso) return;
      byIso[iso] = (byIso[iso] || 0) + n;
      if (!primaryName[iso] || n > (d.byCountry[primaryName[iso]] || 0)) {
        primaryName[iso] = name;
      }
    });
    let cancelled = false;
    fetch("world-map.min.svg?v=44").then((r) => r.text()).then((txt) => {
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
      const nodes = svg.querySelectorAll("path[id], g[id]");
      nodes.forEach((node) => {
        const iso = node.id;
        const n = byIso[iso] || 0;
        const pct = bucketPct(n);
        const region = n > 0 ? regionFor(primaryName[iso]) : null;
        const fill = fillFor(pct, region && region.color);
        const targets = node.tagName.toLowerCase() === "g" ? node.querySelectorAll("path") : [node];
        targets.forEach((p) => {
          p.style.fill = fill;
          p.style.stroke = "var(--paper)";
          p.style.strokeWidth = "0.4";
          p.style.transition = "fill .15s ease, opacity .2s ease";
          p.style.vectorEffect = "non-scaling-stroke";
        });
        if (n > 0) paint.current.push({ targets, region: region.id });
        if (n > 0) {
          node.style.cursor = "pointer";
          const name = primaryName[iso];
          const enter = () => {
            targets.forEach((p) => {
              p.style.fill = "var(--ink)";
            });
          };
          const leave = () => {
            targets.forEach((p) => {
              p.style.fill = fill;
            });
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
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useMapEffect(() => {
    paint.current.forEach(({ targets, region }) => {
      targets.forEach((p) => {
        p.style.opacity = !focus || focus === region ? "1" : "0.12";
      });
    });
  }, [focus]);
  const regions = window.JADL_REGIONS || [];
  return /* @__PURE__ */ React.createElement("div", { className: "geo-map-block" }, /* @__PURE__ */ React.createElement("div", { className: "geo-map", ref: wrapRef }, /* @__PURE__ */ React.createElement("div", { className: "geo-map-svg", ref: holder }), tip && /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "geo-tip",
      style: {
        left: Math.min(tip.x + 14, (wrapRef.current?.clientWidth || 0) - 160),
        top: Math.max(tip.y - 14, 0)
      }
    },
    /* @__PURE__ */ React.createElement("span", { className: "geo-tip-name" }, tip.name),
    /* @__PURE__ */ React.createElement("span", { className: "geo-tip-n" }, tip.n, " studio", tip.n === 1 ? "" : "s")
  )), regions.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "geo-regions" }, /* @__PURE__ */ React.createElement("span", { className: "geo-legend-lbl" }, "Region"), /* @__PURE__ */ React.createElement("div", { className: "chips geo-region-chips" }, /* @__PURE__ */ React.createElement("button", { type: "button", "data-on": !focus, onClick: () => setFocus(null) }, "All"), regions.map((r) => /* @__PURE__ */ React.createElement("button", { type: "button", key: r.id, "data-on": focus === r.id, onClick: () => setFocus(focus === r.id ? null : r.id) }, /* @__PURE__ */ React.createElement("span", { className: "rg-dot", style: { background: r.color } }), r.name))), focus && (() => {
    const r = regions.find((x) => x.id === focus);
    if (!r || !window.jadlRegionHref) return null;
    const href = window.jadlRegionHref(r.name);
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        className: "geo-region-go",
        href,
        onClick: (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          window.jadlNavigate(href);
        }
      },
      "See every studio in ",
      r.name,
      " →"
    );
  })()), /* @__PURE__ */ React.createElement("div", { className: "geo-legend" }, /* @__PURE__ */ React.createElement("span", { className: "geo-legend-lbl" }, "Studios per country"), /* @__PURE__ */ React.createElement("div", { className: "geo-legend-scale" }, LEGEND.map(([label, pct]) => /* @__PURE__ */ React.createElement("div", { className: "geo-legend-step", key: label }, /* @__PURE__ */ React.createElement("span", { className: "sw", style: { background: fillFor(pct, "var(--ink)") } }), /* @__PURE__ */ React.createElement("span", { className: "lb" }, label)))), /* @__PURE__ */ React.createElement("span", { className: "geo-legend-credit" }, "Map: Al MacDonald · Fritz Lekschas, CC BY-SA 3.0")));
}
Object.assign(window, { WorldChoropleth });
})();
