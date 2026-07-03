/* global React, ReactDOM, TopBar, Footer, IndexView, StudiosView, GeographyView, CategoriesView, AboutView, SubmitView, StudioDetail, MyListView, Tweaks */
const { useState, useEffect } = React;

// ---------- URL <-> route helpers ----------
function slugify(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function findStudioBySlug(slug) {
  const st = (window.SITE && window.SITE.studios) || [];
  return st.find((s) => slugify(s.name) === slug);
}
// Canonical origin used for <link rel=canonical>, OG and sitemap URLs.
const SITE_BASE = "https://justadesignlist.com";

// Route → clean path (no hash). e.g. { view:"studio", name:".Oddity Studio" } -> "/studio/oddity-studio"
function routeToPath(r) {
  if (!r) return "/";
  switch (r.view) {
    case "studio": return `/studio/${slugify(r.name || "")}`;
    case "studios": {
      const f = r.filter || {};
      const qs = new URLSearchParams();
      if (f.cat) qs.set("cat", f.cat);
      if (f.country) qs.set("country", f.country);
      if (f.city) qs.set("city", f.city);
      const q = qs.toString();
      return q ? `/studios?${q}` : "/studios";
    }
    case "geography": return "/geography";
    case "categories": return "/categories";
    case "list": return "/list";
    case "submit": return "/submit";
    case "about": return "/about";
    case "index":
    default: return "/";
  }
}
// Clean path + query → route.
function pathToRoute(pathname, search) {
  const parts = (pathname || "/").split("/").filter(Boolean);
  const seg = parts[0];
  if (!seg || seg === "index.html") return { view: "index" };
  if (seg === "studio" && parts[1]) {
    const s = findStudioBySlug(parts[1]);
    return s ? { view: "studio", name: s.name } : { view: "index" };
  }
  if (seg === "studios") {
    const qs = new URLSearchParams(search || "");
    const filter = {};
    if (qs.get("cat")) filter.cat = qs.get("cat");
    if (qs.get("country")) filter.country = qs.get("country");
    if (qs.get("city")) filter.city = qs.get("city");
    return { view: "studios", filter: Object.keys(filter).length ? filter : undefined };
  }
  if (["geography", "categories", "submit", "about", "list", "index"].includes(seg)) {
    return { view: seg };
  }
  return { view: "index" };
}
// Old shared links used a hash (#/studio/slug). Convert to a clean path once,
// so they keep resolving after the switch to History-API routing.
function legacyHashToPath() {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  if (!h) return null;
  const [path, queryStr] = h.split("?");
  const parts = path.split("/").filter(Boolean);
  const seg = parts[0];
  if (!seg) return "/";
  if (seg === "studio" && parts[1]) return `/studio/${parts[1]}`;
  if (seg === "studios") return queryStr ? `/studios?${queryStr}` : "/studios";
  if (["geography", "categories", "submit", "about", "list"].includes(seg)) return `/${seg}`;
  return "/";
}

// ---------- per-route SEO meta ----------
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
function setMeta(route) {
  const d = window.SITE || {};
  let title = "Just a Design List — A curated directory of design practices";
  let desc = "A slow, curated index of design studios and independent practices. 814 entries across 54 countries.";
  let image = null;
  const url = SITE_BASE + routeToPath(route);

  if (route.view === "studio") {
    const s = (d.studios || []).find((x) => x.name === route.name);
    if (s) {
      const cat = (s.category || "").split(",")[0].trim();
      const loc = [s.city, s.country].filter(Boolean).join(", ");
      title = `${s.name} — ${cat}${loc ? ", " + loc : ""} · Just a Design List`;
      desc = `${s.name} is an independent design practice${loc ? " based in " + loc : ""}, working in ${(s.category || "design").toLowerCase()}. Indexed on Just a Design List.`;
      if (s.url) image = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1200&h=630`;
    }
  } else if (route.view === "studios") {
    const f = route.filter || {};
    if (f.cat) { title = `${f.cat} — design studios · Just a Design List`; desc = `Design studios and independent practices working in ${f.cat.toLowerCase()}.`; }
    else if (f.country) { title = `Design studios in ${f.country} · Just a Design List`; desc = `Independent design practices based in ${f.country}.`; }
    else if (f.city) { title = `Design studios in ${f.city} · Just a Design List`; desc = `Independent design practices based in ${f.city}.`; }
    else { title = "All studios · Just a Design List"; desc = "Browse the full index of design studios and independent practices."; }
  } else if (route.view === "geography") {
    title = "Geography · Just a Design List"; desc = "A world map and country index of where design studios are based.";
  } else if (route.view === "categories") {
    title = "Categories · Just a Design List"; desc = "Browse design studios and practices by discipline.";
  } else if (route.view === "about") {
    title = "Colophon · Just a Design List"; desc = "About Just a Design List — a hand-edited index of design practices.";
  } else if (route.view === "submit") {
    title = "Submit a studio · Just a Design List"; desc = "Suggest a design studio or independent practice for the index.";
  } else if (route.view === "list") {
    title = "My List · Just a Design List"; desc = "Studios you've saved on this browser.";
  }

  document.title = title;
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
    // Migrate any legacy #/ hash links to a clean path first.
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
      // Studios are now loaded — re-resolve the path in case it was /studio/slug
      setRoute(pathToRoute(window.location.pathname, window.location.search));
      setReady(true);
    }).catch(err => {
      console.error("load failed", err);
      setReady(true);
    });
  }, [ready]);

  // Keep URL in sync with route, refresh SEO meta, and reset scroll.
  useEffect(() => {
    const desired = routeToPath(route);
    const current = window.location.pathname + window.location.search;
    if (current !== desired) {
      window.history.replaceState(null, "", desired);
    }
    setMeta(route);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route.view, route.name, route.filter?.cat, route.filter?.country, route.filter?.city]);

  useEffect(() => {
    const onPop = () => setRoute(pathToRoute(window.location.pathname, window.location.search));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function go(view, extra = {}) {
    const next = { view, ...extra };
    const desired = routeToPath(next);
    const current = window.location.pathname + window.location.search;
    if (current !== desired) {
      window.history.pushState(null, "", desired);
    }
    setRoute(next);
  }

  if (!ready) {
    return (
      <div className="boot">
        <div className="boot-inner">
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", letterSpacing: ".06em", textTransform: "uppercase" }}>Loading the index…</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 40, marginTop: 12 }}><em>Just a Design List</em></div>
        </div>
      </div>
    );
  }

  let body;
  switch (route.view) {
    case "studios": body = <StudiosView go={go} initialFilter={route.filter} />; break;
    case "geography": body = <GeographyView go={go} />; break;
    case "categories": body = <CategoriesView go={go} />; break;
    case "submit": body = <SubmitView />; break;
    case "about": body = <AboutView go={go} />; break;
    case "list": body = <MyListView go={go} />; break;
    case "studio": body = <StudioDetail name={route.name} go={go} />; break;
    default: body = <IndexView go={go} />;
  }

  return (
    <div className="page" data-screen-label={route.view}>
      <TopBar view={route.view} go={go} />
      {body}
      <Footer go={go} />
      <Tweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
