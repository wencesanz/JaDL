/* Just a Design List — community features (plain JS, no build step).
   - FromTheListView: archive of studios already posted on Instagram and X
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

  // ---------------------------------------------------------------- archive
  // from-the-list.json: { time: "10:00", tz: "Europe/Madrid", posts: [{ date, name }] }
  // A post shows once its date and time (Madrid) have passed.
  var archiveCache = null;
  function loadArchive() {
    if (!archiveCache) {
      archiveCache = fetch("/from-the-list.json", { cache: "no-cache" })
        .then(function (r) { return r.ok ? r.json() : { posts: [] }; })
        .catch(function () { return { posts: [] }; });
    }
    return archiveCache;
  }
  function madridNow() {
    // "YYYY-MM-DD HH:MM" in Madrid, whatever the viewer's timezone.
    try {
      var p = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
      var g = function (t) { return (p.find(function (x) { return x.type === t; }) || {}).value; };
      return g("year") + "-" + g("month") + "-" + g("day") + " " + g("hour") + ":" + g("minute");
    } catch (e) { return new Date().toISOString().slice(0, 16).replace("T", " "); }
  }
  function fmtDate(iso) {
    var d = new Date(iso + "T12:00:00Z");
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
  }
  window.jadlPublishedPosts = function (data) {
    var now = madridNow(), time = (data && data.time) || "10:00";
    var all = studios();
    return ((data && data.posts) || [])
      .filter(function (p) { return (p.date + " " + (p.time || time)) <= now; })
      .map(function (p) { return { date: p.date, s: all.find(function (x) { return x.name === p.name; }) }; })
      .filter(function (p) { return p.s; })
      .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  };

  window.FromTheListView = function (props) {
    var go = props.go;
    var st = React.useState(null), posts = st[0], setPosts = st[1];
    React.useEffect(function () {
      loadArchive().then(function (d) { setPosts(window.jadlPublishedPosts(d)); });
    }, []);
    // Group by month, newest first.
    var groups = [];
    (posts || []).forEach(function (p) {
      var key = p.date.slice(0, 7);
      var g = groups[groups.length - 1];
      if (!g || g.key !== key) {
        g = { key: key, label: new Date(key + "-15T12:00:00Z").toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }), items: [] };
        groups.push(g);
      }
      g.items.push(p);
    });
    return h("div", { className: "view wrap ftl" },
      h("div", { className: "pd-head" },
        h("div", null,
          h(window.Eyebrow, null, h("span", null, "Instagram · X")),
          h("h2", { style: { marginTop: 14 } }, "From the list"),
          h("p", { className: "ftl-sub" }, "Every studio and designer posted on our Instagram and X so far, newest first. New ones every week.")),
        h("dl", { className: "meta" },
          h("dt", null, "Posted"), h("dd", null, posts ? posts.length : "—"),
          h("dt", null, "Follow"), h("dd", null,
            h("a", { href: "https://www.instagram.com/justadesignlist/", target: "_blank", rel: "noopener" }, "Instagram ↗"), "   ",
            h("a", { href: "https://x.com/justadesignlist", target: "_blank", rel: "noopener" }, "X ↗")))),
      posts && posts.length === 0 ? h("p", { className: "ftl-empty" }, "The first post is on its way.") : null,
      groups.map(function (g) {
        return h("section", { key: g.key, className: "ftl-month" },
          h("div", { className: "ftl-month-lbl" }, g.label),
          h("div", { className: "st-list ftl-list" }, g.items.map(function (p) {
            return h(Row, { key: p.date + p.s.name, s: p.s, go: go, date: fmtDate(p.date), extra: "ftl-row" });
          })));
      }));
  };

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
          h("h2", { style: { marginTop: 14 } }, "A list of " + rows.length + " " + (rows.length === 1 ? "studio" : "studios"))),
        h("dl", { className: "meta" },
          h("dt", null, "Studios"), h("dd", null, rows.length),
          h("dt", null, "Your list"), h("dd", null, h("a", { href: "/list", onClick: function (e) { e.preventDefault(); go("list"); } }, "Open My List →")))),
      store && rows.length ? h("div", { className: "list-share" },
        h("button", { type: "button", className: "back-btn", disabled: !missing.length, onClick: saveAll },
          h("span", { className: "arr" }, missing.length ? "+" : "✓"),
          h("span", null, missing.length ? (missing.length === rows.length ? "Save all to My List" : "Save the " + missing.length + " you don’t have") : "All saved in My List"))) : null,
      rows.length ? h("div", { className: "st-list", style: { marginTop: 8 } }, rows.map(function (s) {
        return h(Row, { key: s.name, s: s, go: go });
      })) : h("p", { className: "ftl-empty" }, "This link has no studios that are still in the list."));
  };

  // ------------------------------------------------------------ newsletter
  window.NewsletterNote = function () {
    return h("div", { className: "nl-note" },
      h("span", null, "Wences also writes a newsletter on Substack."),
      h("a", { href: NEWSLETTER, target: "_blank", rel: "noopener" }, "Read and subscribe", h("span", { className: "arr" }, "↗")));
  };
})();
