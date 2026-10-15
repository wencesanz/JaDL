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
      h("div", { className: "c" }, s.city, s.city && s.country ? ", " : "", s.country),
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
        h("span", { className: "arr" }, "↗"), h("span", null, copied ? "Link copied" : "Share this list")),
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
      h("span", null, "Wences also writes a newsletter on Substack."),
      h("a", { href: NEWSLETTER, target: "_blank", rel: "noopener" }, "Read and subscribe", h("span", { className: "arr" }, "↗")));
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
})();
