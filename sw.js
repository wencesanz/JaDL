// Service worker for Just a Design List — offline shell + data cache.
// Strategy:
//   • App shell (HTML/CSS/JS/fonts/icons): stale-while-revalidate.
//   • studios.json + feed/sitemap: network-first, fall back to cache offline.
//   • Everything else same-origin: cache-first with background refresh.
// Bump CACHE_VERSION whenever the shell file list changes to purge old caches.

const CACHE_VERSION = "jadl-v2";
const SHELL = [
  "/",
  "/styles.css",
  "/data.js",
  "/scroll_fx.js",
  "/dist/chrome.js",
  "/dist/index_view.js",
  "/dist/studios_view.js",
  "/dist/other_views.js",
  "/dist/geo_map.js",
  "/dist/project_view.js",
  "/dist/ig_share.js",
  "/dist/submit_view.js",
  "/dist/tweaks.js",
  "/dist/favorites.js",
  "/dist/random.js",
  "/dist/todays_pick.js",
  "/dist/recently_viewed.js",
  "/dist/collections.js",
  "/dist/app.js",
  "/world-map.min.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/apple-touch-icon.png",
  "/favicon-32.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((c) =>
      // addAll is atomic — one failure aborts. Cache individually so a single
      // 404 (e.g. a renamed file) never blocks the whole install.
      Promise.allSettled(SHELL.map((u) => c.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isData(url) {
  return url.pathname === "/studios.json" ||
         url.pathname === "/feed.xml" ||
         url.pathname === "/sitemap.xml";
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Cross-origin (fonts, analytics, unpkg): let the network handle it,
  // fall back to any cached copy if offline.
  if (url.origin !== self.location.origin) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Data: network-first so the list stays fresh; cache is the offline safety net.
  if (isData(url)) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Navigations: serve the app shell so deep links work offline (SPA).
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).catch(() => caches.match("/") )
    );
    return;
  }

  // Everything else same-origin: stale-while-revalidate.
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
