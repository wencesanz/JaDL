// webmcp.js — exposes the list to AI agents in the browser (WebMCP).
// Registers read-only tools with document.modelContext (navigator.modelContext
// on older builds). Does nothing in browsers without the API.
(function () {
  "use strict";
  var mc = (typeof document !== "undefined" && document.modelContext) || (typeof navigator !== "undefined" && navigator.modelContext);
  if (!mc || typeof mc.registerTool !== "function") return;

  var BASE = location.origin;
  var MAX = 50;

  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").trim();
  }
  function parts(v) {
    return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function slugify(s) {
    return norm(s).replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function studios() {
    var ready = window.SITE_READY || fetch("/studios.json").then(function (r) { return r.json(); }).then(function (s) { return { studios: s }; });
    return Promise.resolve(ready).then(function () {
      return (window.SITE && window.SITE.studios) || [];
    }).catch(function () {
      return fetch("/studios.json").then(function (r) { return r.json(); });
    });
  }
  function pathOf(s) {
    var slug = window.studioSlug ? window.studioSlug(s) : slugify(s.name);
    return "/studio/" + slug;
  }
  function regionOf(s) {
    var c = parts(s.country)[0];
    try { return window.jadlRegionOfCountry ? (window.jadlRegionOfCountry(c) || {}).name || "" : ""; } catch (e) { return ""; }
  }
  function card(s) {
    return {
      name: s.name,
      disciplines: parts(s.category),
      place: window.jadlPlace ? window.jadlPlace(s, "full") : [s.city, s.country].filter(Boolean).join(", "),
      region: regionOf(s) || undefined,
      website: s.url || undefined,
      instagram: s.ig || undefined,
      page: BASE + pathOf(s),
      added: s.created ? String(s.created).slice(0, 10) : undefined,
    };
  }
  function result(data) {
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
  function find(list, q) {
    var key = norm(q), sl = slugify(q);
    return list.find(function (s) { return norm(s.name) === key; }) ||
      list.find(function (s) { return pathOf(s) === "/studio/" + sl; }) ||
      list.find(function (s) { return norm(s.name).indexOf(key) === 0; }) || null;
  }
  function has(field, want) {
    var w = norm(want);
    return function (s) { return parts(s[field]).some(function (v) { return norm(v) === w; }); };
  }

  var tools = [
    {
      name: "search_studios",
      description: "Search Just a Design List, a hand-edited index of design studios and independent designers. Filter by free text, city, country, region or discipline. Returns name, place, disciplines, website and the studio's page on the list. Results are not ranked.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Words to match in the name, place or disciplines, e.g. \"packaging lisbon\"." },
          city: { type: "string", description: "Exact city, e.g. \"Copenhagen\". Accents are optional." },
          country: { type: "string", description: "Exact country as used on the list, e.g. \"Spain\", \"USA\", \"England\"." },
          region: { type: "string", enum: ["Iberia", "UK & Ireland", "North America", "Nordics", "Oceania", "Rest of Europe", "Rest of the world"] },
          discipline: { type: "string", enum: ["Branding", "Graphic Design", "Interactive/Digital", "Packaging", "Typography", "Motion", "Illustration", "Advertising/Campaigns", "Industrial Design"] },
          limit: { type: "integer", minimum: 1, maximum: MAX, description: "Maximum results (default 20)." },
        },
      },
      annotations: { readOnlyHint: true },
      execute: function (args) {
        args = args || {};
        return studios().then(function (list) {
          var out = list.filter(function (s) { return s && s.name; });
          if (args.city) out = out.filter(has("city", args.city));
          if (args.country) out = out.filter(has("country", args.country));
          if (args.discipline) out = out.filter(has("category", args.discipline));
          if (args.region) out = out.filter(function (s) { return norm(regionOf(s)) === norm(args.region); });
          if (args.query) {
            var words = norm(args.query).split(/\s+/).filter(Boolean);
            out = out.filter(function (s) {
              var hay = norm([s.name, s.city, s.country, s.category].join(" "));
              return words.every(function (w) { return hay.indexOf(w) !== -1; });
            });
          }
          var limit = Math.min(Math.max(parseInt(args.limit, 10) || 20, 1), MAX);
          return result({ total: out.length, shown: Math.min(out.length, limit), studios: out.slice(0, limit).map(card) });
        });
      },
    },
    {
      name: "get_studio",
      description: "Get one studio's entry on Just a Design List by its name: place, disciplines, website, Instagram and page.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string", description: "Studio name, e.g. \"Kontrapunkt\"." } },
        required: ["name"],
      },
      annotations: { readOnlyHint: true },
      execute: function (args) {
        return studios().then(function (list) {
          var s = find(list, (args || {}).name);
          return result(s ? card(s) : { error: "Not on the list.", name: (args || {}).name });
        });
      },
    },
    {
      name: "open_studio",
      description: "Show a studio's page on Just a Design List in this tab.",
      inputSchema: {
        type: "object",
        properties: { name: { type: "string", description: "Studio name." } },
        required: ["name"],
      },
      annotations: { readOnlyHint: true },
      execute: function (args) {
        return studios().then(function (list) {
          var s = find(list, (args || {}).name);
          if (!s) return result({ error: "Not on the list.", name: (args || {}).name });
          var path = pathOf(s);
          if (window.jadlNavigate) window.jadlNavigate(path); else location.href = path;
          return result({ opened: BASE + path, name: s.name });
        });
      },
    },
    {
      name: "random_studio",
      description: "Pick one studio at random from Just a Design List, optionally within a discipline or region.",
      inputSchema: {
        type: "object",
        properties: {
          discipline: { type: "string", description: "Optional discipline, e.g. \"Typography\"." },
          region: { type: "string", description: "Optional region, e.g. \"Nordics\"." },
        },
      },
      annotations: { readOnlyHint: true },
      execute: function (args) {
        args = args || {};
        return studios().then(function (list) {
          var out = list.filter(function (s) { return s && s.name; });
          if (args.discipline) out = out.filter(has("category", args.discipline));
          if (args.region) out = out.filter(function (s) { return norm(regionOf(s)) === norm(args.region); });
          if (!out.length) return result({ error: "No studio matches." });
          return result(card(out[Math.floor(Math.random() * out.length)]));
        });
      },
    },
  ];

  var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  tools.forEach(function (t) {
    try {
      var p = controller ? mc.registerTool(t, { signal: controller.signal }) : mc.registerTool(t);
      if (p && typeof p.catch === "function") p.catch(function () {});
    } catch (e) {}
  });
})();
