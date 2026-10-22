const {
  useState,
  useEffect
} = React;
function slugify(s) {
  return (s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
// Studios whose names give the same slug (e.g. "Ensemble" and "ENSEMBLE") keep
// the plain slug for the oldest entry; later ones get their first city appended.
function studioSlug(s, list) {
  const base = slugify(s && s.name);
  const same = (list || []).filter((x) => x && x.name && slugify(x.name) === base);
  if (same.length < 2) return base;
  same.sort((a, b) => String(a.created || "").localeCompare(String(b.created || "")) || String(a.name).localeCompare(String(b.name)));
  if (same[0].name === s.name) return base;
  const city = slugify(String(s.city || "").split(",")[0]);
  return base + "-" + (city || String(same.findIndex((x) => x.name === s.name) + 1));
}
function findStudioBySlug(slug) {
  const st = window.SITE && window.SITE.studios || [];
  return st.find(s => studioSlug(s, st) === slug);
}
window.studioSlug = s => studioSlug(s, window.SITE && window.SITE.studios || []);
const SITE_BASE = "https://justadesignlist.com";
// Factual, per-studio description (mirror of scripts/prerender.mjs): disciplines, place,
// how many studios share its city or country, and when it was added.
const DESC_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function studioDesc(s, loc, all) {
  const list = (v) => String(v || '').split(',').map((t) => t.trim()).filter(Boolean);
  const cats = list(s.category).map((c) => c.toLowerCase()).slice(0, 3);
  const what = cats.length ? (cats.length > 1 ? cats.slice(0, -1).join(', ') + ' and ' + cats[cats.length - 1] : cats[0]) + ' practice' : 'design practice';
  const city = list(s.city)[0], country = list(s.country)[0];
  const n = (field, v) => all.filter((x) => x && list(x[field]).includes(v)).length;
  let where = '';
  const nc = city ? n('city', city) : 0;
  const nk = country ? n('country', country) : 0;
  if (nc > 1) where = ` One of ${nc} studios from ${city} on Just a Design List`;
  else if (nk > 1) where = ` ${city ? `The only studio from ${city}` : 'One'}${city ? ', one of' : ' of'} ${nk} from ${country} on Just a Design List`;
  else where = ' On Just a Design List';
  const d = s.created ? new Date(s.created) : null;
  const added = d && !isNaN(d) ? `, added in ${DESC_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}` : '';
  return `${s.name}: ${what}${loc ? ' based in ' + loc : ''}.${where}${added}.`;
}
function routeToPath(r) {
  if (!r) return "/";
  switch (r.view) {
    case "studio":
      {
        const st = window.SITE && window.SITE.studios || [];
        const s = st.find(x => x.name === r.name);
        return `/studio/${s ? studioSlug(s, st) : slugify(r.name || "")}`;
      }
    case "collection":
      {
        const cfg = (window.COLLECTION_KINDS || {})[r.kind];
        return cfg ? `/${cfg.singular}/${slugify(r.value || "")}` : "/";
      }
    case "collectionHub":
      return `/${r.kind}`;
    case "studios":
      {
        const f = r.filter || {};
        const qs = new URLSearchParams();
        if (f.cat) qs.set("cat", f.cat);
        if (f.country) qs.set("country", f.country);
        if (f.city) qs.set("city", f.city);
        const q = qs.toString();
        return q ? `/studios?${q}` : "/studios";
      }
    case "geography":
      return "/geography";
    case "categories":
      return "/categories";
    case "list":
      return r.shared ? `/list?s=${r.shared}` : "/list";
    case "submit":
      return "/submit";
    case "about":
      return "/about";
    case "notfound":
      return r.path || "/";
    case "index":
    default:
      return "/";
  }
}
function pathToRoute(pathname, search) {
  const parts = (pathname || "/").split("/").filter(Boolean);
  const seg = parts[0];
  if (!seg || seg === "index.html") return {
    view: "index"
  };
  if (seg === "studio" && parts[1]) {
    const s = findStudioBySlug(parts[1]);
    return s ? {
      view: "studio",
      name: s.name
    } : {
      view: "notfound",
      path: pathname
    };
  }
  if (["discipline", "country", "city", "region"].includes(seg) && parts[1]) {
    const value = window.collSlugToValue ? window.collSlugToValue(seg, parts[1]) : null;
    return value ? {
      view: "collection",
      kind: seg,
      value
    } : {
      view: "notfound",
      path: pathname
    };
  }
  if (["disciplines", "countries", "cities", "regions"].includes(seg)) {
    return {
      view: "collectionHub",
      kind: seg
    };
  }
  if (seg === "studios") {
    const qs = new URLSearchParams(search || "");
    const filter = {};
    if (qs.get("cat")) filter.cat = qs.get("cat");
    if (qs.get("country")) filter.country = qs.get("country");
    if (qs.get("city")) filter.city = qs.get("city");
    return {
      view: "studios",
      filter: Object.keys(filter).length ? filter : undefined
    };
  }
  if (seg === "list") {
    const shared = new URLSearchParams(search || "").get("s");
    return shared ? { view: "list", shared } : { view: "list" };
  }
  if (["geography", "categories", "submit", "about", "index"].includes(seg)) {
    return {
      view: seg
    };
  }
  return {
    view: "notfound",
    path: pathname
  };
}
function legacyHashToPath() {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  if (!h) return null;
  const [path, queryStr] = h.split("?");
  const parts = path.split("/").filter(Boolean);
  const seg = parts[0];
  if (!seg) return "/";
  if (seg === "studio" && parts[1]) return `/studio/${parts[1]}`;
  if (["discipline", "country", "city", "region"].includes(seg) && parts[1]) return `/${seg}/${parts[1]}`;
  if (["disciplines", "countries", "cities", "regions"].includes(seg)) return `/${seg}`;
  if (seg === "studios") return queryStr ? `/studios?${queryStr}` : "/studios";
  if (["geography", "categories", "submit", "about", "list"].includes(seg)) return `/${seg}`;
  return "/";
}
function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
function setRobots(content) {
  let el = document.head.querySelector('meta[name="robots"]');
  if (content == null) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setJsonLd(nodes) {
  let el = document.getElementById("route-jsonld");
  if (!nodes || !nodes.length) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "route-jsonld";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(nodes.length === 1 ? nodes[0] : nodes);
}
function breadcrumbLd(pairs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pairs.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item
    }))
  };
}
function collectionLd(name, description, url, studios) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Just a Design List",
      url: SITE_BASE + "/"
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: studios.length,
      itemListElement: studios.slice(0, 100).map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_BASE}/studio/${studioSlug(s, studios)}`,
        name: s.name
      }))
    }
  };
}
// Mirror of jsonLd() in scripts/prerender.mjs — keep the two in sync. This
// runs client-side so SPA navigation between studios (e.g. the Random button)
// gets correct per-studio structured data too, not just the prerendered
// first-load page.
function studioLd(s, url, desc) {
  const sameAs = [];
  if (s.url) sameAs.push(s.url);
  if (s.ig) {
    const handle = String(s.ig).replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");
    if (handle) sameAs.push(`https://www.instagram.com/${handle}/`);
  }
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.name,
    url,
    description: desc
  };
  if (sameAs.length) data.sameAs = sameAs;
  if (s.city || s.country) {
    data.address = {
      "@type": "PostalAddress",
      ...(s.city ? { addressLocality: s.city } : {}),
      ...(s.country ? { addressCountry: s.country } : {})
    };
  }
  return data;
}
function websiteLd(desc) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Just a Design List",
    url: SITE_BASE + "/",
    description: desc
  };
}
function setMeta(route) {
  const d = window.SITE || {};
  let title = "Just a Design List — A curated directory of design practices";
  let desc = "A slow, curated index of design studios and independent designers.";
  if (d.totals && d.totals.studios) desc += ` ${d.totals.studios} entries across ${d.totals.countries} countries.`;
  let image = null;
  let robots = null;
  let jsonld = [];
  const url = SITE_BASE + routeToPath(route);
  if (route.view === "studio") {
    const s = (d.studios || []).find(x => x.name === route.name);
    if (s) {
      const cat = (s.category || "").split(",")[0].trim();
      const loc = window.jadlPlace ? window.jadlPlace(s, "full") : [s.city, s.country].filter(Boolean).join(", ");
      const loc1 = window.jadlPlace ? window.jadlPlace(s, "primary") : loc;
      title = `${s.name} — ${cat}${loc1 ? ", " + loc1 : ""} · Just a Design List`;
      desc = studioDesc(s, loc1, d.studios || []);
      image = `${SITE_BASE}/api/og?name=${encodeURIComponent(s.name)}&meta=${encodeURIComponent([cat, loc1].filter(Boolean).join(" · ") || "A curated directory of design practices")}&v=2`;
      jsonld = [studioLd(s, url, desc), breadcrumbLd([["Home", SITE_BASE + "/"], ...(s.country ? [[s.country.split(",")[0].trim(), SITE_BASE + "/country/" + (window.collSlugify ? window.collSlugify(s.country.split(",")[0].trim()) : "")]] : [["Studios", SITE_BASE + "/studios"]]), [s.name, url]])];
    }
  } else if (route.view === "index") {
    jsonld = [websiteLd(desc)];
  } else if (route.view === "studios") {
    const f = route.filter || {};
    if (f.cat) {
      title = `${f.cat} — design studios · Just a Design List`;
      desc = `Design studios and independent practices working in ${f.cat.toLowerCase()}.`;
    } else if (f.country) {
      title = `Design studios in ${f.country} · Just a Design List`;
      desc = `Independent design practices based in ${f.country}.`;
    } else if (f.city) {
      title = `Design studios in ${f.city} · Just a Design List`;
      desc = `Independent design practices based in ${f.city}.`;
    } else {
      title = "All studios · Just a Design List";
      desc = "Browse the full index of design studios and independent designers.";
    }
  } else if (route.view === "geography") {
    title = "Geography · Just a Design List";
    desc = "A world map and country index of where design studios are based.";
  } else if (route.view === "categories") {
    title = "Categories · Just a Design List";
    desc = "Browse design studios and practices by discipline.";
  } else if (route.view === "about") {
    title = "Colophon · Just a Design List";
    desc = "About Just a Design List — a hand-edited index of design practices.";
  } else if (route.view === "submit") {
    title = "Submit a studio or designer · Just a Design List";
    desc = "Suggest a design studio or independent designer for the index.";
  } else if (route.view === "list") {
    title = route.shared ? "A shared list · Just a Design List" : "My List · Just a Design List";
    desc = route.shared ? "A list of design studios shared from Just a Design List." : "Studios you've saved on this browser.";
    if (route.shared) robots = "noindex, follow";
  } else if (route.view === "notfound") {
    title = "Not found · Just a Design List";
    desc = "This page is not on the list.";
    robots = "noindex, follow";
  } else if (route.view === "collectionHub") {
    const cfg = Object.values(window.COLLECTION_KINDS || {}).find(c => c.plural === route.kind);
    const lp = cfg ? cfg.labelPlural : "Collections";
    title = `Design studios by ${cfg ? cfg.singular : "collection"} · Just a Design List`;
    desc = `Browse the index of design studios by ${cfg ? cfg.singular : "collection"}. Every ${cfg ? cfg.singular : "collection"} represented across the directory.`;
    jsonld = [breadcrumbLd([["Home", SITE_BASE + "/"], [lp, url]])];
  } else if (route.view === "collection") {
    const studios = window.collStudiosFor ? window.collStudiosFor(route.kind, route.value) : [];
    const c = window.collCopy ? window.collCopy(route.kind, route.value, studios.length) : {
      title,
      desc
    };
    title = c.title;
    desc = c.desc;
    if (studios.length < 2) robots = "noindex, follow";
    image = `${SITE_BASE}/api/og?kind=${route.kind}&value=${encodeURIComponent(route.value || "")}&v=1`;
    const cfg = (window.COLLECTION_KINDS || {})[route.kind] || {};
    jsonld = [collectionLd(title, desc, url, studios), breadcrumbLd([["Home", SITE_BASE + "/"], [cfg.labelPlural || "Collections", SITE_BASE + "/" + (cfg.plural || "")], [route.value, url]])];
  }
  document.title = title;
  setRobots(robots);
  setJsonLd(jsonld);
  upsertMeta("name", "description", desc);
  upsertLink("canonical", url);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", desc);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:type", route.view === "studio" ? "article" : "website");
  upsertMeta("property", "og:site_name", "Just a Design List");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", desc);
  upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
  if (image) {
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:image", image);
  }
}
function App() {
  const [ready, setReady] = useState(!!window.SITE?.studios);
  const [route, setRoute] = useState(() => {
    const legacy = legacyHashToPath();
    if (legacy) {
      const [lp, lq] = legacy.split("?");
      window.history.replaceState(null, "", legacy);
      return pathToRoute(lp, lq || "");
    }
    return pathToRoute(window.location.pathname, window.location.search);
  });
  useEffect(() => {
    if (ready) return;
    const p = window.SITE_READY || fetch("studios.json").then(r => r.json()).then(st => {
      window.SITE.studios = st;
      return window.SITE;
    });
    Promise.resolve(p).then(() => {
      setRoute(pathToRoute(window.location.pathname, window.location.search));
      setReady(true);
    }).catch(err => {
      console.error("load failed", err);
      setReady(true);
    });
  }, [ready]);
  useEffect(() => {
    if (!ready) return;
    const desired = routeToPath(route);
    const current = window.location.pathname + window.location.search;
    if (current !== desired) {
      window.history.replaceState(null, "", desired);
    }
    setMeta(route);
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [ready, route.view, route.name, route.kind, route.value, route.filter?.cat, route.filter?.country, route.filter?.city, route.shared]);
  useEffect(() => {
    const onPop = () => setRoute(pathToRoute(window.location.pathname, window.location.search));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  function go(view, extra = {}) {
    const next = {
      view,
      ...extra
    };
    const desired = routeToPath(next);
    const current = window.location.pathname + window.location.search;
    if (current !== desired) {
      window.history.pushState(null, "", desired);
    }
    setRoute(next);
  }
  // ---------- Keyboard shortcut: "R" jumps to a random studio ----------
  // Ignored while the user is typing (inputs, textareas, contenteditable) or
  // holding a modifier key, so it never hijacks normal browser/OS shortcuts.
  useEffect(() => {
    if (!ready) return;
    function onKeyDown(e) {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== "r" && e.key !== "R") return;
      const tag = (e.target && e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || e.target && e.target.isContentEditable) return;
      if (!window.pickRandomStudio) return;
      const currentName = route.view === "studio" ? route.name : null;
      const s = window.pickRandomStudio(currentName);
      if (s) go("studio", {
        name: s.name
      });
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ready, route.view, route.name]);
  if (!ready) {
    return React.createElement("div", {
      className: "boot"
    }, React.createElement("div", {
      className: "boot-inner"
    }, React.createElement("div", {
      style: {
        fontFamily: "var(--mono)",
        fontSize: 11,
        color: "var(--mute)",
        letterSpacing: ".06em",
        textTransform: "uppercase"
      }
    }, "Loading the index\u2026"), React.createElement("div", {
      style: {
        fontFamily: "var(--serif)",
        fontSize: 40,
        marginTop: 12
      }
    }, React.createElement("em", null, "Just a Design List"))));
  }
  let body;
  switch (route.view) {
    case "studios":
      body = React.createElement(StudiosView, {
        go: go,
        initialFilter: route.filter
      });
      break;
    case "geography":
      body = React.createElement(GeographyView, {
        go: go
      });
      break;
    case "categories":
      body = React.createElement(CategoriesView, {
        go: go
      });
      break;
    case "submit":
      body = React.createElement(SubmitView, null);
      break;
    case "about":
      body = React.createElement(AboutView, {
        go: go
      });
      break;
    case "list":
      body = React.createElement(MyListView, {
        go: go,
        shared: route.shared
      });
      break;
    case "studio":
      body = React.createElement(StudioDetail, {
        name: route.name,
        go: go
      });
      break;
    case "collection":
      body = React.createElement(CollectionView, {
        kind: route.kind,
        value: route.value,
        go: go
      });
      break;
    case "notfound":
      body = React.createElement(NotFoundView, {
        go: go
      });
      break;
    case "collectionHub":
      body = React.createElement(CollectionHubView, {
        kind: route.kind,
        go: go
      });
      break;
    default:
      body = React.createElement(IndexView, {
        go: go
      });
  }
  return React.createElement("div", {
    className: "page",
    "data-screen-label": route.view
  }, window.AnnounceBar ? React.createElement(window.AnnounceBar, null) : null, React.createElement(TopBar, {
    view: route.view,
    go: go
  }), React.createElement("main", null, body), React.createElement(Footer, {
    go: go
  }), React.createElement(Tweaks, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
