/* Just a Design List — community features (plain JS, no build step).
   - JadlDupHint: warns on /submit when a studio is already in the list
   - SharedListView / ShareListButton: share "My List" as a link
   - NewsletterNote: small Substack block for the footer */
(function () {
  "use strict";
  var h = function () { return React.createElement.apply(React, arguments); };
  var NEWSLETTER = "https://substack.com/@stereochromo";
  window.JADL_NEWSLETTER = NEWSLETTER;

  function slugify(s) {
    return String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function host(u) {
    return String(u || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0];
  }
  function studios() { return (window.SITE && window.SITE.studios) || []; }
  function linkProps(s, go) {
    return window.jadlStudioLink ? window.jadlStudioLink(s, function () { go("studio", { name: s.name }); })
      : { onClick: function () { go("studio", { name: s.name }); } };
  }
  function Row(props) {
    var s = props.s;
    return h("a", Object.assign({ className: "studio-row" + (props.extra ? " " + props.extra : "") }, linkProps(s, props.go)),
      props.date ? h("div", { className: "d" }, props.date) : null,
      h("div", { className: "t" }, window.RegionDot ? h(window.RegionDot, { country: s.country }) : null, s.name),
      h("div", { className: "c" }, (window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", "))),
      h("div", { className: "k" }, s.category),
      props.date ? null : h("div", { className: "u" }, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")),
      h("div", { className: "arr" }, "→"));
  }

  // ------------------------------------------------------- submit: dup hint
  function findDupes(name, url) {
    var n = slugify(name), u = host(url), out = [];
    if (n.length < 2 && !u) return out;
    studios().forEach(function (s) {
      var sn = slugify(s.name), su = host(s.url);
      var exact = (n && sn === n) || (u && su && su === u);
      var core = function (x) { return x.replace(/^(the|studio|estudio|atelier|bureau)-/, ""); };
      var cn = core(n), cs = core(sn);
      var near = !exact && cn.length >= 4 && cs.length >= 4 && (cs.indexOf(cn) === 0 || cn.indexOf(cs) === 0);
      if (exact || near) out.push({ s: s, exact: exact });
    });
    out.sort(function (a, b) { return (b.exact ? 1 : 0) - (a.exact ? 1 : 0); });
    return out.slice(0, 4);
  }
  window.JadlDupHint = function (props) {
    var list = findDupes(props.name, props.url);
    if (!list.length) return null;
    var exact = list.some(function (x) { return x.exact; });
    return h("div", { className: "dup-hint" + (exact ? " is-exact" : ""), role: "status" },
      h("span", { className: "dup-lbl" }, exact ? "Already in the list:" : "Similar names in the list:"),
      list.map(function (x, i) {
        var slug = window.studioSlug ? window.studioSlug(x.s) : slugify(x.s.name);
        return h(React.Fragment, { key: x.s.name },
          i ? ", " : " ",
          h("a", { href: "/studio/" + slug, target: "_blank", rel: "noopener" }, x.s.name),
          x.s.city ? h("span", { className: "dup-city" }, " (" + String(x.s.city).split(",")[0].trim() + ")") : null);
      }),
      exact ? h("span", { className: "dup-note" }, " If something there is wrong or outdated, say so in the notes below.") : null);
  };

  // ---------------------------------------------------- My List: share link
  window.jadlListShareUrl = function (slugs) {
    return location.origin + "/list?s=" + slugs.map(encodeURIComponent).join(",");
  };
  window.ShareListButton = function (props) {
    var st = React.useState(false), copied = st[0], setCopied = st[1];
    var slugs = props.slugs || [];
    if (!slugs.length) return null;
    var url = window.jadlListShareUrl(slugs);
    var share = function () {
      if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        navigator.share({ title: "My list · Just a Design List", url: url }).catch(function () {});
        return;
      }
      var done = function () { setCopied(true); setTimeout(function () { setCopied(false); }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { window.prompt("Copy this link", url); });
      else window.prompt("Copy this link", url);
    };
    return h("div", { className: "list-share" },
      h("button", { type: "button", className: "back-btn", onClick: share },
        h("span", { className: "arr" }, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E")), h("span", null, copied ? "Link copied" : "Share this list")),
      h("span", { className: "list-share-note" }, "Anyone with the link sees these " + slugs.length + " " + (slugs.length === 1 ? "studio" : "studios") + "."));
  };
  window.SharedListView = function (props) {
    var go = props.go;
    var all = studios();
    var bySlug = new Map();
    var keyOf = function (s) { return window.studioSlug ? window.studioSlug(s) : slugify(s.name); };
    all.forEach(function (s) { bySlug.set(keyOf(s), s); });
    var slugs = String(props.shared || "").split(",").map(function (x) { return decodeURIComponent(x).trim(); }).filter(Boolean);
    var rows = slugs.map(function (sl) { return bySlug.get(sl); }).filter(Boolean);
    var store = window.useSaved ? window.useSaved() : null;
    var missing = store ? rows.filter(function (s) { return !store.has(keyOf(s)); }) : [];
    var saveAll = function () {
      missing.slice().reverse().forEach(function (s) { store.toggle(keyOf(s), s.name); });
    };
    return h("div", { className: "view wrap" },
      h("div", { className: "pd-head" },
        h("div", null,
          h(window.Eyebrow, null, h("span", null, "Shared with you")),
          h("h2", { role: "heading", "aria-level": 1, style: { marginTop: 14 } }, "A list of " + rows.length + " " + (rows.length === 1 ? "studio" : "studios"))),
        h("dl", { className: "meta" },
          h("dt", null, "Studios"), h("dd", null, rows.length),
          h("dt", null, "Your list"), h("dd", null, h("a", { href: "/list", onClick: function (e) { e.preventDefault(); go("list"); } }, "Open My List →")))),
      store && rows.length ? h("div", { className: "list-share" },
        h("button", { type: "button", className: "back-btn", disabled: !missing.length, onClick: saveAll },
          h("span", { className: "arr" }, missing.length ? "+" : "✓"),
          h("span", null, missing.length ? (missing.length === rows.length ? "Save all to My List" : "Save the " + missing.length + " you don’t have") : "All saved in My List"))) : null,
      rows.length ? h("div", { className: "st-list", style: { marginTop: 8 } }, rows.map(function (s) {
        return h(Row, { key: s.name, s: s, go: go });
      })) : h("p", { className: "shared-empty" }, "This link has no studios that are still in the list."));
  };

  // ------------------------------------------------------------ newsletter
  window.NewsletterNote = function () {
    return h("div", { className: "nl-note" },
      h("span", null, "There\u2019s also a newsletter, on Substack."),
      h("a", { href: NEWSLETTER, target: "_blank", rel: "noopener" }, "Read and subscribe", h("span", { className: "arr" }, (window.jadlArrowNE ? window.jadlArrowNE() : "\u2197\uFE0E"))));
  };

  // ------------------------------------------------------------- keyboard
  // Some clickable rows and tags are plain elements. Make them reachable with
  // Tab and usable with Enter / Space, without touching each view.
  var KBD = ".country-row, .cat-long-row, .sd-tag, .pick-card, .mylist-row, a:not([href])";
  function tagKbd(root) {
    (root.querySelectorAll ? root.querySelectorAll(KBD) : []).forEach(function (el) {
      if ((el.tagName === "A" && el.hasAttribute("href")) || el.tagName === "BUTTON" || el.hasAttribute("tabindex")) return;
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "link");
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = e.target;
    if (!el || !el.matches || !el.matches(KBD) || el.tagName === "BUTTON") return;
    e.preventDefault();
    el.click();
  });
  var start = function () {
    tagKbd(document);
    new MutationObserver(function () { tagKbd(document); }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);

  // ------------------------------------------------------------ quick search
  // "/" (or the magnifier in the top bar) opens a search box from any page.
  var qsOpen = null;
  function foldText(t) { return String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function searchStudios(q) {
    var words = foldText(q).split(/[\s,]+/).filter(Boolean);
    if (!words.length) return [];
    var out = [];
    studios().forEach(function (s) {
      var name = foldText(s.name);
      var hay = foldText([s.name, s.city, s.country, s.category, window.jadlRegion ? window.jadlRegion(s.country).name : ""].join(" "));
      if (!words.every(function (w) { return hay.indexOf(w) >= 0; })) return;
      var joined = words.join(" ");
      var score = name === joined ? 0 : name.indexOf(joined) === 0 ? 1 : name.indexOf(joined) >= 0 ? 2 : words.every(function (w) { return name.indexOf(w) >= 0; }) ? 3 : 4;
      out.push([score, s]);
    });
    out.sort(function (a, b) { return a[0] - b[0] || a[1].name.localeCompare(b[1].name); });
    return out.map(function (x) { return x[1]; });
  }
  function QuickSearch() {
    var st = React.useState(false), open = st[0], setOpen = st[1];
    var qs = React.useState(""), q = qs[0], setQ = qs[1];
    var as = React.useState(0), active = as[0], setActive = as[1];
    var input = React.useRef(null), back = React.useRef(null);
    qsOpen = function () { back.current = document.activeElement; setOpen(true); };
    React.useEffect(function () {
      if (!open) return;
      var t = setTimeout(function () { if (input.current) input.current.focus(); }, 10);
      document.documentElement.classList.add("qs-lock");
      return function () { clearTimeout(t); document.documentElement.classList.remove("qs-lock"); };
    }, [open]);
    var results = React.useMemo(function () { return searchStudios(q); }, [q]);
    var shown = results.slice(0, 8);
    React.useEffect(function () { setActive(0); }, [q]);
    if (!open) return null;
    var close = function () { setOpen(false); setQ(""); if (back.current && back.current.focus) back.current.focus(); };
    var goStudio = function (s) { close(); window.jadlNavigate("/studio/" + (window.studioSlug ? window.studioSlug(s) : slugify(s.name))); };
    var goAll = function () {
      try {
        var k = "tsi:studios-state", prev = JSON.parse(localStorage.getItem(k) || "{}") || {};
        localStorage.setItem(k, JSON.stringify(Object.assign(prev, { q: q, cat: "All", country: "All", city: "All", type: "All" })));
      } catch (e) {}
      close();
      // Already on the list: reload it so it picks up the new query.
      if (location.pathname === "/studios") location.assign("/studios");
      else window.jadlNavigate("/studios");
    };
    var onKey = function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActive(function (i) { return Math.min(i + 1, shown.length - 1); }); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(function (i) { return Math.max(i - 1, 0); }); }
      else if (e.key === "Enter") { e.preventDefault(); if (shown[active]) goStudio(shown[active]); else if (q.trim()) goAll(); }
    };
    var place = function (s) { return window.jadlPlace ? window.jadlPlace(s, "short") : [s.city, s.country].filter(Boolean).join(", "); };
    return h("div", { className: "qs-backdrop", onMouseDown: function (e) { if (e.target === e.currentTarget) close(); } },
      h("div", { className: "qs-panel", role: "dialog", "aria-modal": "true", "aria-label": "Search the list", onKeyDown: onKey },
        h("div", { className: "qs-field" },
          h("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" }, h("circle", { cx: 7, cy: 7, r: 5.2, fill: "none", stroke: "currentColor", strokeWidth: 1.3 }), h("path", { d: "M11 11l3.5 3.5", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" })),
          h("input", { ref: input, value: q, onChange: function (e) { setQ(e.target.value); }, placeholder: "Search studios, cities, disciplines…", "aria-label": "Search", role: "combobox", "aria-expanded": shown.length > 0, "aria-controls": "qs-list", "aria-activedescendant": shown[active] ? "qs-opt-" + active : undefined, autoComplete: "off", spellCheck: false }),
          h("button", { type: "button", className: "qs-esc", onClick: close, "aria-label": "Close search" }, "Esc")),
        q.trim() ? h("ul", { className: "qs-list", id: "qs-list", role: "listbox" },
          shown.map(function (s, i) {
            return h("li", { key: s.name, id: "qs-opt-" + i, role: "option", "aria-selected": i === active, className: i === active ? "is-active" : "", onMouseEnter: function () { setActive(i); }, onClick: function () { goStudio(s); } },
              h("span", { className: "qs-name" }, window.RegionDot ? h(window.RegionDot, { country: s.country }) : null, s.name),
              h("span", { className: "qs-place" }, place(s)));
          }),
          shown.length === 0 ? h("li", { className: "qs-empty" }, "Nothing matches that.") : null) : h("p", { className: "qs-hint" }, "Type a name, a city, a country or a discipline. Press / anywhere to search."),
        q.trim() && results.length > shown.length ? h("button", { type: "button", className: "qs-all", onClick: goAll }, "See all " + results.length + " results", h("span", null, " →")) : null));
  }
  window.jadlOpenSearch = function () { if (qsOpen) qsOpen(); };
  window.JadlSearchButton = function () {
    return h("button", { type: "button", className: "search-toggle", onClick: window.jadlOpenSearch, "aria-label": "Search (press /)", title: "Search (/)" },
      h("svg", { viewBox: "0 0 16 16", width: 14, height: 14, "aria-hidden": "true" }, h("circle", { cx: 7, cy: 7, r: 5.2, fill: "none", stroke: "currentColor", strokeWidth: 1.4 }), h("path", { d: "M11 11l3.5 3.5", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" })));
  };
  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
    e.preventDefault();
    window.jadlOpenSearch();
  });
  var mountQs = function () {
    var el = document.createElement("div");
    el.id = "qs-root";
    document.body.appendChild(el);
    ReactDOM.createRoot(el).render(h(QuickSearch));
  };
  if (document.body) mountQs(); else document.addEventListener("DOMContentLoaded", mountQs);
})();
