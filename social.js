// Social bits: the region colour code shared with the "From the list" posts on
// Instagram and X, the announcement bar and the "Follow the list" band.
// A studio's region comes from the first country in its "country" field.
(function () {
  var REGIONS = [
    { id: "iberia", name: "Iberia", color: "#F95721", countries: ["Spain", "Portugal"] },
    { id: "uk", name: "UK & Ireland", color: "#4D7CFE", countries: ["England", "Scotland", "Wales", "Northern Ireland", "Ireland"] },
    { id: "na", name: "North America", color: "#FFC21A", countries: ["USA", "Canada"] },
    { id: "nordics", name: "Nordics", color: "#2EC4B6", countries: ["Sweden", "Denmark", "Norway", "Finland", "Iceland"] },
    { id: "oceania", name: "Oceania", color: "#7ED957", countries: ["Australia", "New Zealand"] },
    { id: "europe", name: "Rest of Europe", color: "#B79CFF", countries: ["Germany", "France", "The Netherlands", "Switzerland", "Italy", "Austria", "Belgium", "Greece", "Poland", "Czech Republic", "Romania", "Ukraine", "Hungary", "Croatia", "Slovenia", "Estonia", "Lithuania", "Latvia", "Slovakia", "Malta", "North Macedonia", "Luxembourg", "Bulgaria", "Serbia"] },
    { id: "world", name: "Rest of the world", color: "#FF8FC7", countries: [] }
  ];
  // Studios with no fixed base (no country) get a neutral colour.
  var NOMAD = { id: "nomad", name: "Worldwide", color: "#BDBDB7", countries: [] };
  function regionOf(country) {
    var c = String(country || "").split(",")[0].trim().toLowerCase();
    if (!c) return NOMAD;
    for (var i = 0; i < REGIONS.length - 1; i++) {
      for (var j = 0; j < REGIONS[i].countries.length; j++) {
        if (REGIONS[i].countries[j].toLowerCase() === c) return REGIONS[i];
      }
    }
    return REGIONS[REGIONS.length - 1];
  }
  // Exact match only (used for country filter chips, where "All" gets no dot).
  function regionOfCountry(country) {
    var c = String(country || "").trim().toLowerCase();
    for (var i = 0; i < REGIONS.length; i++) {
      for (var j = 0; j < REGIONS[i].countries.length; j++) {
        if (REGIONS[i].countries[j].toLowerCase() === c) return REGIONS[i];
      }
    }
    return null;
  }

  // Real links for studio rows: crawlable, open in a new tab with Cmd/Ctrl-click,
  // reachable by keyboard; a plain click keeps the in-app navigation.
  window.jadlStudioLink = function (studio, onGo) {
    var slug = window.studioSlug ? window.studioSlug(studio) : "";
    return {
      href: slug ? "/studio/" + slug : undefined,
      onClick: function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        e.preventDefault();
        onGo();
      }
    };
  };
  // In-app navigation to any path (used by links rendered outside the views).
  window.jadlNavigate = function (path) {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
  };
  function slug(s) {
    return String(s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  window.jadlRegionHref = function (name) { return "/region/" + slug(name); };
  window.JADL_REGIONS = REGIONS;
  window.jadlRegion = regionOf;
  window.jadlRegionOfCountry = regionOfCountry;
  // Small colour square shown before a studio name in lists.
  window.RegionDot = function (props) {
    var r = props.exact ? regionOfCountry(props.country) : regionOf(props.country);
    if (!r) return null;
    return React.createElement("span", {
      className: "rg-dot",
      style: { background: r.color },
      title: r.name,
      "aria-hidden": "true"
    });
  };
  // Labelled chip used on the studio page.
  window.RegionChip = function (props) {
    var r = regionOf(props.country);
    if (r.id === "nomad") {
      return React.createElement("span", { className: "rg-chip", style: { background: r.color } }, React.createElement("i", null), r.name);
    }
    var href = "/region/" + slug(r.name);
    return React.createElement("a", {
      className: "rg-chip",
      href: href,
      style: { background: r.color },
      title: "More studios in " + r.name,
      onClick: function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        window.jadlNavigate(href);
      }
    }, React.createElement("i", null), r.name);
  };
  var IG = "https://www.instagram.com/justadesignlist/";
  var X = "https://x.com/justadesignlist";
  var h = function () { return React.createElement.apply(React, arguments); };
  // Thin bar above the top navigation.
  window.AnnounceBar = function () {
    return h("aside", { "aria-label": "Announcement" }, h("a", { className: "ann", href: IG, target: "_blank", rel: "noopener" },
      h("b", null, "New"),
      h("span", null, "From the list, every week on Instagram and X"),
      h("u", null, "@justadesignlist \u2192")));
  };
  // Three tiles on the index page, after "Today's discovery".
  window.FollowBand = function () {
    return h("section", { className: "wrap follow-wrap" },
      h("div", { className: "follow-band" },
        h("div", { className: "fb-a" },
          h("div", { className: "fb-lbl" }, "Instagram \u00b7 X"),
          h("h3", { "aria-level": 2 }, "Follow the list. ", h("span", null, "New studios and designers every week."))),
        h("div", { className: "fb-b" },
          h("div", { className: "fb-lbl" }, "Colour code"),
          h("ul", { className: "fb-leg" }, REGIONS.map(function (r) {
            return h("li", { key: r.id }, h("i", { style: { background: r.color } }), r.name);
          }))),
        h("div", { className: "fb-c" },
          h("div", { className: "fb-lbl" }, "@justadesignlist"),
          h("div", null,
            h("a", { href: IG, target: "_blank", rel: "noopener" }, "Instagram", h("span", null, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E"))),
            h("a", { href: X, target: "_blank", rel: "noopener" }, "X", h("span", null, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E")))))));
  };
  // ---- Studio page: related groups (same city, same region, same discipline) ----
  var REGION_FROM = { "UK & Ireland": "the UK & Ireland", "Nordics": "the Nordic countries", "Rest of Europe": "elsewhere in Europe", "Rest of the world": "elsewhere in the world" };
  function hashStr(str) { var x = 2166136261; for (var i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function firstOf(v) { return String(v || "").split(",")[0].trim(); }
  function listOf(v) { return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); }
  // Stable per-page shuffle, so each studio shows different neighbours.
  function pick(seed, arr, n) {
    return arr.map(function (x) { return [hashStr(seed + "|" + x.name), x]; })
      .sort(function (a, b) { return a[0] - b[0]; }).slice(0, n).map(function (p) { return p[1]; });
  }
  window.jadlRelatedGroups = function (s, all, n) {
    n = n || 6;
    var used = {}; used[s.name] = 1;
    var groups = [];
    var take = function (pool) { return pool.filter(function (x) { return !used[x.name]; }); };
    var mark = function (items) { items.forEach(function (x) { used[x.name] = 1; }); return items; };
    var city = firstOf(s.city);
    if (city) {
      var inCity = all.filter(function (x) { return listOf(x.city).indexOf(city) >= 0; });
      var items = mark(pick(s.name, take(inCity), n));
      if (items.length) groups.push({ key: "city", title: "More from " + city, items: items,
        more: { href: "/city/" + slug(city), label: "All " + inCity.length + " in " + city, kind: "city", value: city } });
    }
    if (s.region) {
      var inRegion = all.filter(function (x) { return x.region === s.region; });
      var ritems = mark(pick(s.name, take(inRegion), n));
      if (ritems.length) groups.push({ key: "region", title: "More from " + (REGION_FROM[s.region] || s.region), items: ritems,
        more: { href: "/region/" + slug(s.region), label: "All " + inRegion.length + " in " + s.region, kind: "region", value: s.region } });
    }
    var cat = firstOf(s.category);
    if (cat) {
      var inCat = all.filter(function (x) { return listOf(x.category).indexOf(cat) >= 0; });
      var citems = mark(pick(s.name, take(inCat), n));
      if (citems.length) groups.push({ key: "cat", title: "Neighbours in " + cat, items: citems,
        more: { href: "/discipline/" + slug(cat), label: "All " + inCat.length + " in " + cat, kind: "discipline", value: cat } });
    }
    return groups;
  };
  // Colour behind the studio name when there is no screenshot.
  window.jadlRegionColor = function (country) { return regionOf(country).color; };
  // ---- Website screenshots ----
  // Own captures (monthly GitHub Action, stored on the "shots" branch and
  // served by jsDelivr at a fixed commit) come first; mshots is the fallback.
  window.jadlShot = function (s, w, h) {
    if (!s || !s.url) return null;
    var m = window.JADL_SHOTS;
    var slug = window.studioSlug ? window.studioSlug(s) : "";
    if (m && m.ref && slug && m.has && m.has[slug]) return "https://cdn.jsdelivr.net/gh/wencesanz/JaDL@" + m.ref + "/s/" + slug + ".webp";
    return "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(s.url) + "?w=" + (w || 800) + "&h=" + (h || 600);
  };
  window.jadlMshot = function (s, w, h) {
    return s && s.url ? "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(s.url) + "?w=" + (w || 800) + "&h=" + (h || 600) : null;
  };
  // Thin "opens elsewhere" arrow. The ↗ character turns into a blue emoji on
  // iPhone, so links use this drawn version instead.
  window.jadlArrowNE = function () {
    return React.createElement("svg", { className: "arr-ne", viewBox: "0 0 12 12", width: "0.72em", height: "0.72em", "aria-hidden": "true", focusable: "false" },
      React.createElement("path", { d: "M3 9 9 3M4.2 3H9v4.8", fill: "none", stroke: "currentColor", strokeWidth: 1.15, strokeLinecap: "square" }));
  };
  // ---- Places: pair each city with its own country ----
  // Notion keeps cities and countries as two separate lists, so a studio in
  // Copenhagen and Tokyo reads "Copenhagen, Tokyo, Denmark, Japan". Cities are
  // matched to countries using the studios that have a single country.
  function placeLists(v) { return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); }
  function buildCityIndex(all) {
    var votes = {};
    (all || []).forEach(function (s) {
      var k = placeLists(s.country);
      if (k.length !== 1) return;
      placeLists(s.city).forEach(function (c) {
        var key = c.toLowerCase();
        votes[key] = votes[key] || {};
        votes[key][k[0]] = (votes[key][k[0]] || 0) + 1;
      });
    });
    var out = {};
    Object.keys(votes).forEach(function (c) {
      var best = null, n = 0;
      Object.keys(votes[c]).forEach(function (k) { if (votes[c][k] > n) { n = votes[c][k]; best = k; } });
      out[c] = best;
    });
    return out;
  }
  // [{ country, cities: [] }] in the order the studio lists them.
  // Cities that appear in no single-country studio yet.
  var PLACE_HINTS = { fremantle: "Australia", tijuana: "Mexico", queenstown: "New Zealand" };
  function placeGroups(s, index) {
    var C = placeLists(s.city), K = placeLists(s.country);
    var groups = K.map(function (k) { return { country: k, cities: [] }; });
    var find = function (k) { for (var i = 0; i < groups.length; i++) if (groups[i].country.toLowerCase() === String(k).toLowerCase()) return groups[i]; return null; };
    // First pass: cities we can place for sure; second pass: the rest.
    var known = C.map(function (c, i) {
      if (K.length <= 1) return groups[0] || null;
      var hint = PLACE_HINTS[c.toLowerCase()] || index[c.toLowerCase()];
      return find(c) || (hint ? find(hint) : null) || (C.length === K.length ? groups[i] : null);
    });
    var prev = null;
    C.forEach(function (c, i) {
      var g = known[i];
      if (!g) {
        // A country that has no city yet, in the order listed; otherwise the
        // country of the city before it (cities are usually grouped).
        var free = groups.filter(function (x) { return !x.cities.length && known.indexOf(x) < 0; })[0];
        g = free || prev || groups[0] || null;
      }
      if (!g) { g = { country: "", cities: [] }; groups.push(g); }
      if (g.country.toLowerCase() !== c.toLowerCase()) g.cities.push(c);
      prev = g;
    });
    var used = groups.filter(function (g) { return g.cities.length; });
    // Countries with no city of their own still count, after the others.
    return used.concat(groups.filter(function (g) { return !g.cities.length && g.country; }));
  }
  function formatPlace(s, index, mode) {
    var g = placeGroups(s, index);
    if (!g.length) return "";
    var one = function (x) { return x.cities.concat(x.country ? [x.country] : []).join(", "); };
    if (mode === "primary") {
      var f = g[0];
      return [f.cities[0], f.country].filter(Boolean).join(", ");
    }
    if (mode === "short") {
      var first = g[0], extra = g.slice(1).reduce(function (n, x) { return n + Math.max(1, x.cities.length); }, 0) + Math.max(0, first.cities.length - 1);
      return [first.cities[0], first.country].filter(Boolean).join(", ") + (extra ? " +" + extra : "");
    }
    return g.map(one).join(" · ");
  }
  var placeIndex = null, placeIndexFor = null;
  // mode: "full" (default) · "short" (first place +N) · "primary" (first place only)
  window.jadlPlace = function (s, mode) {
    if (!s) return "";
    var all = (window.SITE && window.SITE.studios) || [];
    if (placeIndexFor !== all) { placeIndex = buildCityIndex(all); placeIndexFor = all; }
    return formatPlace(s, placeIndex, mode || "full");
  };
})();
