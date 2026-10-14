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
    return h("a", { className: "ann", href: IG, target: "_blank", rel: "noopener" },
      h("b", null, "New"),
      h("span", null, "From the list, every week on Instagram and X"),
      h("u", null, "@justadesignlist \u2192"));
  };
  // Three tiles on the index page, after "Today's discovery".
  window.FollowBand = function () {
    return h("section", { className: "wrap follow-wrap" },
      h("div", { className: "follow-band" },
        h("div", { className: "fb-a" },
          h("div", { className: "fb-lbl" }, "Instagram \u00b7 X"),
          h("h3", null, "Follow the list. ", h("span", null, "New studios and designers every week."))),
        h("div", { className: "fb-b" },
          h("div", { className: "fb-lbl" }, "Colour code"),
          h("ul", { className: "fb-leg" }, REGIONS.map(function (r) {
            return h("li", { key: r.id }, h("i", { style: { background: r.color } }), r.name);
          }))),
        h("div", { className: "fb-c" },
          h("div", { className: "fb-lbl" }, "@justadesignlist"),
          h("div", null,
            h("a", { href: IG, target: "_blank", rel: "noopener" }, "Instagram", h("span", null, "\u2197")),
            h("a", { href: X, target: "_blank", rel: "noopener" }, "X", h("span", null, "\u2197")),
            h("a", { href: "/from-the-list", onClick: function (e) { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); window.jadlNavigate("/from-the-list"); } }, "Archive", h("span", null, "\u2192"))))));
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
})();
