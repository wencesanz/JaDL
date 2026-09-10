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
    case "collection": {
      const cfg = (window.COLLECTION_KINDS || {})[r.kind];
      return cfg ? `/${cfg.singular}/${slugify(r.value || "")}` : "/";
    }
    case "collectionHub": return `/${r.kind}`; // r.kind is the plural: disciplines|countries|cities
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
  // Auto-generated taxonomy collections: /discipline/<slug>, /country/<slug>, /city/<slug>
  if (["discipline", "country", "city"].includes(seg) && parts[1]) {
    const value = window.collSlugToValue ? window.collSlugToValue(seg, parts[1]) : null;
    return value ? { view: "collection", kind: seg, value } : { view: "index" };
  }
  // Collection hubs: /disciplines, /countries, /cities
  if (["disciplines", "countries", "cities"].includes(seg)) {
    return { view: "collectionHub", kind: seg };
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
  if (["discipline", "country", "city"].includes(seg) && parts[1]) return `/${seg}/${parts[1]}`;
  if (["disciplines", "countries", "cities"].includes(seg)) return `/${seg}`;
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
// Single managed robots tag — lets us noindex thin collection pages without
// touching the crawlable link graph (they stay linked, just not indexed).
function setRobots(content) {
  let el = document.head.querySelector('meta[name="robots"]');
  if (content == null) { if (el) el.remove(); return; }
  if (!el) { el = document.createElement("meta"); el.setAttribute("name", "robots"); document.head.appendChild(el); }
  el.setAttribute("content", content);
}
// Single managed JSON-LD block, replaced per route.
function setJsonLd(nodes) {
  let el = document.getElementById("route-jsonld");
  if (!nodes || !nodes.length) { if (el) el.remove(); return; }
  if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.id = "route-jsonld"; document.head.appendChild(el); }
  el.textContent = JSON.stringify(nodes.length === 1 ? nodes[0] : nodes);
}
// ---------- JSON-LD builders (schema.org) ----------
function breadcrumbLd(pairs) {
  return {
    "@context": "https://schema.org",
    "@type":
