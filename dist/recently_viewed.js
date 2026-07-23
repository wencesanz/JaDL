(function(){
"use strict";
const RV_KEY = "jadl:recentlyViewed";
const RV_MAX = 10;
const RV_EVENT = "jadl:rv-change";
function readRV() {
  try {
    const raw = localStorage.getItem(RV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter(x => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function recordVisit(name) {
  if (!name) return;
  try {
    const cur = readRV();
    if (cur[0] === name) return;
    const next = [name, ...cur.filter(n => n !== name)].slice(0, RV_MAX);
    localStorage.setItem(RV_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(RV_EVENT));
  } catch {}
}
function useRecentlyViewed(excludeName) {
  const [names, setNames] = React.useState(readRV);
  React.useEffect(() => {
    const sync = () => setNames(readRV());
    window.addEventListener(RV_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(RV_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return React.useMemo(() => {
    const all = window.SITE && window.SITE.studios || [];
    const byName = new Map(all.map(s => [s.name, s]));
    return names.filter(n => n !== excludeName && byName.has(n)).map(n => byName.get(n));
  }, [names, excludeName]);
}
function RVChips({
  items,
  go,
  limit
}) {
  return React.createElement("div", {
    className: "rv-list"
  }, items.slice(0, limit).map(s => React.createElement("button", {
    key: s.name,
    className: "rv-chip",
    onClick: () => go("studio", {
      name: s.name
    })
  }, React.createElement("span", {
    className: "rv-name"
  }, s.name), (s.city || s.country) && React.createElement("span", {
    className: "rv-loc"
  }, [s.city, s.country].filter(Boolean).join(", ")))));
}
function RecentlyViewed({
  go
}) {
  const items = useRecentlyViewed();
  if (items.length === 0) return null;
  return React.createElement("section", {
    className: "wrap rv-section"
  }, React.createElement("div", {
    className: "rv-head"
  }, React.createElement("span", {
    className: "rv-eyebrow"
  }, "Recently viewed")), React.createElement(RVChips, {
    items: items,
    go: go,
    limit: 6
  }));
}
function RecentlyViewedInline({
  go,
  excludeName
}) {
  const items = useRecentlyViewed(excludeName);
  if (items.length === 0) return null;
  return React.createElement("div", {
    className: "rv-inline"
  }, React.createElement("span", {
    className: "rv-eyebrow"
  }, "Recently viewed"), React.createElement(RVChips, {
    items: items,
    go: go,
    limit: 5
  }));
}
Object.assign(window, {
  recordVisit,
  useRecentlyViewed,
  RecentlyViewed,
  RecentlyViewedInline
});
})();
