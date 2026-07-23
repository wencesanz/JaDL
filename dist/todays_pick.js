(function(){
"use strict";
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = a + 0x6d2b79f5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function pickStudioForDate(studios, date) {
  const list = studios || [];
  const N = list.length;
  if (N === 0) return null;
  if (N === 1) return list[0];
  const d = date || new Date();
  const dayNumber = Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000);
  const cycle = Math.floor(dayNumber / N);
  const pos = (dayNumber % N + N) % N;
  const order = Array.from({
    length: N
  }, (_, i) => i);
  const rand = mulberry32(cycle + 1);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return list[order[pos]];
}
function TodaysPick({
  go
}) {
  const studios = window.SITE && window.SITE.studios || [];
  const pick = React.useMemo(() => pickStudioForDate(studios, new Date()), [studios.length]);
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  if (!pick) return null;
  const loc = [pick.city, pick.country].filter(Boolean).join(", ");
  const host = (pick.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
  const shot = pick.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(pick.url)}?w=520&h=400` : null;
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const open = () => go("studio", {
    name: pick.name
  });
  return React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 28
    }
  }, React.createElement("div", {
    className: "pick-card",
    onClick: open,
    role: "link",
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === "Enter") open();
    }
  }, React.createElement("div", {
    className: "pick-body"
  }, React.createElement("div", {
    className: "pick-eyebrow"
  }, React.createElement("span", {
    className: "pick-dot",
    "aria-hidden": "true"
  }), "Today\u2019s Discovery", React.createElement("span", {
    className: "pick-date"
  }, today)), React.createElement("div", {
    className: "pick-name"
  }, pick.name), loc && React.createElement("div", {
    className: "pick-loc"
  }, loc), React.createElement("div", {
    className: "pick-cta"
  }, React.createElement("span", {
    className: "arr"
  }, "\u2192"), " View studio")), shot && !failed && React.createElement("div", {
    className: "pick-thumb"
  }, React.createElement("img", {
    src: shot,
    alt: "",
    loading: "lazy",
    onLoad: e => {
      if (e.target.naturalWidth > 100) setLoaded(true);else setFailed(true);
    },
    onError: () => setFailed(true),
    style: {
      opacity: loaded ? 1 : 0
    }
  }), host && React.createElement("span", {
    className: "pick-host"
  }, host, " \u2197"))));
}
Object.assign(window, {
  pickStudioForDate,
  TodaysPick
});
})();
