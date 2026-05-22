// Directory content model — driven by the CSV.
// Loads studios.json at runtime; exposes SITE globally.
window.SITE = {
  title: "Just a Design List",
  strap: "A curated directory of design studios and independent practices.",
  curator: "Edited by Wences — Madrid",
  since: "Begun 2023",
  updated: "",
  statement:
    "A working index of studios whose practice the editor finds worth returning to. Entries are collected slowly, without ranking, and each is kept short on purpose — a pointer, not a review. Navigate by discipline, geography, or simply read it as a list.",
  note:
    "The index is not exhaustive and makes no attempt to be. It favours small and medium studios, independent practices, and designers who publish their own work clearly on the open web.",
  categoriesOrder: [
    "Branding",
    "Graphic Design",
    "Interactive",
    "Packaging",
    "Typography",
    "Motion Graphics",
    "Illustration",
    "Advertising",
    "Industrial Design",
  ],
  categoryBlurbs: {
    "Branding": "Identity systems, marks, and brand architecture.",
    "Graphic Design": "Print, editorial, and graphic practices in the broadest sense.",
    "Interactive": "Digital product, art direction for the web, motion-led sites.",
    "Packaging": "Form, label, and the object that leaves the shelf.",
    "Typography": "Type design, custom lettering, and the specimen as a medium.",
    "Motion Graphics": "Title sequences, loops, and design that moves.",
    "Illustration": "Drawing as a discipline, alone or alongside design.",
    "Advertising": "Campaigns and the applied arts of persuasion.",
    "Industrial Design": "Objects, furniture, and the three-dimensional edge of the field.",
  },
  contact: {
    email: "wencesanz@gmail.com",
    instagram: "@thestudios.index",
    rss: "/feed.xml",
  },
  colophon: [
    "© 2026. Updated regularly with new studios and reader suggestions.",
    "Made with love for design by Wences Sanz-Alonso, from Madrid.",
  ],
};

// Async loader so studios.json isn't inlined (it's ~100KB).
window.SITE_READY = fetch("studios.json")
  .then((r) => r.json())
  .then((studios) => {
    window.SITE.studios = studios;

    // derive aggregates
    const byCat = {};
    const byCountry = {};
    const byCity = {};
    const byType = {};
    studios.forEach((s) => {
      s.category.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (byCat[c] = (byCat[c] || 0) + 1));
      s.country.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (byCountry[c] = (byCountry[c] || 0) + 1));
      s.city.split(",").map((x) => x.trim()).filter(Boolean).forEach((c) => (byCity[c] = (byCity[c] || 0) + 1));
      const t = (s.type || "").trim();
      if (t) byType[t] = (byType[t] || 0) + 1;
    });
    window.SITE.byCat = byCat;
    window.SITE.byCountry = byCountry;
    window.SITE.byCity = byCity;
    window.SITE.byType = byType;
    window.SITE.totals = {
      studios: studios.length,
      categories: Object.keys(byCat).length,
      countries: Object.keys(byCountry).length,
      cities: Object.keys(byCity).length,
    };

    // featured: 6 hand-picked anchor studios + 6 random rotating, total 12 for home grid
    const pick = (name) => studios.find((s) => s.name === name);
    const anchors = [
      pick("Ludovic Balland"),
      pick("Akatre"),
      pick("Eric Hu studio"),
      pick("Another Collective"),
      pick("Fix Studio"),
      pick("Post-Spectacular Office"),
    ].filter(Boolean);

    // pick 6 random studios that (a) have a URL and (b) aren't already anchors
    const anchorNames = new Set(anchors.map((s) => s.name));
    const pool = studios.filter((s) => s.url && !anchorNames.has(s.name));
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const randoms = shuffled.slice(0, 6);

    // Interleave anchors + randoms so the grid has variety and the hero tile rotates
    const featured = [];
    for (let i = 0; i < 6; i++) {
      featured.push(anchors[i]);
      featured.push(randoms[i]);
    }
    window.SITE.featured = featured.filter(Boolean);

    // recent: last 20 by edited date.
    // edited may come either as ISO string (from Notion's last_edited_time)
    // or as a Spanish-formatted date (legacy export). Try ISO first, fall
    // back to the Spanish parser.
    const monthMap = { enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5, julio:6, agosto:7, septiembre:8, octubre:9, noviembre:10, diciembre:11 };
    function parseEd(s) {
      if (!s || typeof s !== "string") return 0;
      const trim = s.trim();
      if (!trim || trim === "undefined" || trim === "null") return 0;
      // ISO 8601: starts with YYYY-MM-DD
      if (/^\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(trim)) {
        const iso = Date.parse(trim);
        if (!isNaN(iso)) return iso;
      }
      // Spanish: "16 de abril de 2025 15:03"
      const m = trim.match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/i);
      if (m) {
        const month = monthMap[m[2].toLowerCase()];
        if (month !== undefined) {
          return new Date(+m[3], month, +m[1], +(m[4]||0), +(m[5]||0)).getTime();
        }
      }
      // Last-ditch: try Date.parse anyway
      const last = Date.parse(trim);
      return isNaN(last) ? 0 : last;
    }
    window.SITE.recent = [...studios]
      .sort((a, b) => {
        const diff = parseEd(b.created || b.edited) - parseEd(a.created || a.edited);
        if (diff !== 0) return diff;
        return (a.name || "").localeCompare(b.name || "");
      })
      .slice(0, 20);

    // Category color palette — intentionally monochrome.
    // All disciplines resolve to the same neutral ink colour so the system reads
    // as one index rather than a rainbow of tags.
    const _monoLight = new Proxy({}, { get: () => "var(--ink)" });
    const _monoDark  = new Proxy({}, { get: () => "var(--ink)" });
    window.SITE.catColors = _monoLight;
    window.SITE.catColorsDark = _monoDark;
    // Dark-mode companions (lighter, more saturated for legibility on dark)
    window.SITE.catColorsDark = _monoDark;

    return window.SITE;
  });
