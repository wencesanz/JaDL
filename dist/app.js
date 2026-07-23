(function(){
"use strict";
const {
  useState,
  useEffect
} = React;
function slugify(s) {
  return (s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function findStudioBySlug(slug) {
  const st = window.SITE && window.SITE.studios || [];
  return st.find(s => slugify(s.name) === slug);
}
const SITE_BASE = "https://justadesignlist.com";
function routeToPath(r) {
  if (!r) return "/";
  switch (r.view) {
    case "studio":
      return `/studio/${slugify(r.name || "")}`;
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
      return "/list";
    case "submit":
      return "/submit";
    case "about":
      return "/about";
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
      view: "index"
    };
  }
  if (["discipline", "country", "city"].includes(seg) && parts[1]) {
    const value = window.collSlugToValue ? window.collSlugToValue(seg, parts[1]) : null;
    return value ? {
      view: "collection",
      kind: seg,
      value
    } : {
      view: "index"
    };
  }
  if (["disciplines", "countries", "cities"].includes(seg)) {
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
  if (["geography", "categories", "submit", "about", "list", "index"].includes(seg)) {
    return {
      view: seg
    };
  }
  return {
    view: "index"
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
  if (["discipline", "country", "city"].includes(seg) && parts[1]) return `/${seg}/${parts[1]}`;
  if (["disciplines", "countries", "cities"].includes(seg)) return `/${seg}`;
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
        url: `${SITE_BASE}/studio/${slugify(s.name)}`,
        name: s.name
      }))
    }
  };
}
function setMeta(route) {
  const d = window.SITE || {};
  let title = "Just a Design List — A curated directory of design practices";
  let desc = "A slow, curated index of design studios and independent practices. 814 entries across 54 countries.";
  let image = null;
  let robots = null;
  let jsonld = [];
  const url = SITE_BASE + routeToPath(route);
  if (route.view === "studio") {
    const s = (d.studios || []).find(x => x.name === route.name);
    if (s) {
      const cat = (s.category || "").split(",")[0].trim();
      const loc = [s.city, s.country].filter(Boolean).join(", ");
      title = `${s.name} — ${cat}${loc ? ", " + loc : ""} · Just a Design List`;
      desc = `${s.name} is an independent design practice${loc ? " based in " + loc : ""}, working in ${(s.category || "design").toLowerCase()}. Indexed on Just a Design List.`;
      if (s.url) image = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1200&h=630`;
    }
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
      desc = "Browse the full index of design studios and independent practices.";
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
    title = "Submit a studio · Just a Design List";
    desc = "Suggest a design studio or independent practice for the index.";
  } else if (route.view === "list") {
    title = "My List · Just a Design List";
    desc = "Studios you've saved on this browser.";
  } else if (route.view === "collectionHub") {
    const cfg = Object.values(window.COLLECTION_KINDS || {}).find(c => c.plural === route.kind);
    const lp = cfg ? cfg.labelPlural : "Collections";
    title = `Design ${lp.toLowerCase()} · Just a Design List`;
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
  }, [route.view, route.name, route.kind, route.value, route.filter?.cat, route.filter?.country, route.filter?.city]);
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
        go: go
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
  }, React.createElement(TopBar, {
    view: route.view,
    go: go
  }), body, React.createElement(Footer, {
    go: go
  }), React.createElement(Tweaks, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
})();
