(function(){
"use strict";
const {
  useMemo: useCollMm,
  useState: useCollSt
} = React;
function collSlugify(s) {
  return String(s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const COLLECTION_KINDS = {
  discipline: {
    singular: "discipline",
    plural: "disciplines",
    field: "category",
    index: "byCat",
    label: "Discipline",
    labelPlural: "Disciplines"
  },
  country: {
    singular: "country",
    plural: "countries",
    field: "country",
    index: "byCountry",
    label: "Country",
    labelPlural: "Countries"
  },
  city: {
    singular: "city",
    plural: "cities",
    field: "city",
    index: "byCity",
    label: "City",
    labelPlural: "Cities"
  }
};
function collValues(kind) {
  const d = window.SITE || {};
  const idx = d[COLLECTION_KINDS[kind].index] || {};
  return Object.keys(idx);
}
const _slugMaps = {};
function collSlugToValue(kind, slug) {
  const values = collValues(kind);
  if (!_slugMaps[kind] || !_slugMaps[kind].__n) {
    if (values.length) {
      const m = {
        __n: values.length
      };
      for (const v of values) m[collSlugify(v)] = v;
      _slugMaps[kind] = m;
    }
  }
  return _slugMaps[kind] && _slugMaps[kind][slug] || null;
}
function collStudiosFor(kind, value) {
  const field = COLLECTION_KINDS[kind].field;
  const all = window.SITE && window.SITE.studios || [];
  return all.filter(s => String(s[field] || "").split(",").map(x => x.trim()).includes(value));
}
function collCopy(kind, value, n) {
  const plural = n === 1 ? "studio" : "studios";
  if (kind === "discipline") {
    const low = value.toLowerCase();
    return {
      h1: value,
      title: `${value} design studios · Just a Design List`,
      desc: `${n} independent ${plural} and designers working in ${low}, collected in the Just a Design List index. Browse by country and city.`
    };
  }
  if (kind === "country") {
    return {
      h1: value,
      title: `Design studios in ${value} · Just a Design List`,
      desc: `${n} independent design ${plural} and practices based in ${value}. A curated index — browse by city and discipline.`
    };
  }
  return {
    h1: value,
    title: `Design studios in ${value} · Just a Design List`,
    desc: `${n} independent design ${plural} based in ${value}, from the Just a Design List index. Browse by discipline.`
  };
}
function CollChips({
  items,
  onPick
}) {
  if (!items.length) return null;
  return React.createElement("div", {
    className: "chips",
    style: {
      marginTop: 12
    }
  }, items.map(([label, n, go]) => React.createElement("button", {
    key: label,
    onClick: go
  }, label, n != null ? React.createElement("span", {
    className: "num"
  }, " ", n) : null)));
}
function CollStudioList({
  studios,
  go
}) {
  const [limit, setLimit] = useCollSt(60);
  const shown = studios.slice(0, limit);
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "st-list",
    style: {
      marginTop: 24
    }
  }, shown.map(s => React.createElement("div", {
    key: s.name,
    className: "studio-row",
    onClick: () => go("studio", {
      name: s.name
    })
  }, React.createElement("div", {
    className: "t"
  }, s.name), React.createElement("div", {
    className: "c"
  }, s.city, s.city && s.country ? ", " : "", s.country), React.createElement("div", {
    className: "k"
  }, s.category), React.createElement("div", {
    className: "u"
  }, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), React.createElement("div", {
    className: "arr"
  }, "\u2192")))), studios.length > limit && React.createElement("button", {
    onClick: () => setLimit(n => n + 120),
    className: "link",
    style: {
      marginTop: 28,
      fontFamily: "var(--mono)",
      fontSize: 12,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--accent)"
    }
  }, "Show more \u2014 ", studios.length - limit, " remaining"));
}
function CollectionView({
  kind,
  value,
  go
}) {
  const d = window.SITE || {};
  const cfg = COLLECTION_KINDS[kind];
  const studios = useCollMm(() => collStudiosFor(kind, value).sort((a, b) => (a.name || "").localeCompare(b.name || "")), [kind, value]);
  const facets = useCollMm(() => {
    const disc = {},
      countries = {},
      cities = {};
    for (const s of studios) {
      s.category.split(",").map(x => x.trim()).filter(Boolean).forEach(c => disc[c] = (disc[c] || 0) + 1);
      s.country.split(",").map(x => x.trim()).filter(Boolean).forEach(c => countries[c] = (countries[c] || 0) + 1);
      s.city.split(",").map(x => x.trim()).filter(Boolean).forEach(c => cities[c] = (cities[c] || 0) + 1);
    }
    const rank = (obj, exclude) => Object.entries(obj).filter(([k]) => k !== exclude).sort((a, b) => b[1] - a[1]);
    return {
      disc: rank(disc, kind === "discipline" ? value : null),
      countries: rank(countries, kind === "country" ? value : null),
      cities: rank(cities, kind === "city" ? value : null)
    };
  }, [studios, kind, value]);
  if (!value) {
    return React.createElement("div", {
      className: "view wrap",
      style: {
        paddingTop: 120
      }
    }, React.createElement("p", {
      style: {
        fontFamily: "var(--serif)",
        fontSize: 32
      }
    }, "Collection not found."), React.createElement("button", {
      onClick: () => go("index"),
      className: "link",
      style: {
        fontFamily: "var(--mono)",
        fontSize: 12
      }
    }, "\u2190 Back to the index"));
  }
  const copy = collCopy(kind, value, studios.length);
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "pd-topbar"
  }, React.createElement("button", {
    onClick: () => go("collectionHub", {
      kind: cfg.plural
    }),
    className: "back-btn",
    "aria-label": `All ${cfg.labelPlural}`
  }, React.createElement("span", {
    className: "arr"
  }, "\u2190"), React.createElement("span", null, "All ", cfg.labelPlural.toLowerCase()))), React.createElement("div", {
    className: "pd-head",
    style: {
      marginTop: 8
    }
  }, React.createElement("div", null, React.createElement(Eyebrow, null, React.createElement("span", null, cfg.label)), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, copy.h1), React.createElement("p", {
    style: {
      marginTop: 14,
      maxWidth: 640,
      color: "var(--ink-2)",
      fontFamily: "var(--serif)",
      fontSize: 20,
      lineHeight: 1.5
    }
  }, studios.length, " design ", studios.length === 1 ? "studio" : "studios", kind === "city" ? " based here" : kind === "country" ? " based here" : " in the index", "."))), React.createElement("div", {
    className: "coll-facets"
  }, kind !== "discipline" && facets.disc.length > 0 && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "By discipline"), React.createElement(CollChips, {
    items: facets.disc.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", {
      kind: "discipline",
      value: c
    })])
  })), kind !== "country" && facets.countries.length > 1 && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "By country"), React.createElement(CollChips, {
    items: facets.countries.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", {
      kind: "country",
      value: c
    })])
  })), kind !== "city" && facets.cities.length > 1 && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "By city"), React.createElement(CollChips, {
    items: facets.cities.slice(0, 12).map(([c, n]) => [c, n, () => go("collection", {
      kind: "city",
      value: c
    })])
  }))), React.createElement("div", {
    style: {
      paddingTop: 40
    }
  }, React.createElement(Eyebrow, null, React.createElement("span", null, "The studios")), React.createElement(CollStudioList, {
    studios: studios,
    go: go
  })));
}
function CollectionHubView({
  kind,
  go
}) {
  const singular = Object.keys(COLLECTION_KINDS).find(k => COLLECTION_KINDS[k].plural === kind) || "discipline";
  const cfg = COLLECTION_KINDS[singular];
  const d = window.SITE || {};
  const rows = useCollMm(() => {
    const idx = d[cfg.index] || {};
    return Object.entries(idx).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [kind]);
  const max = rows[0]?.[1] || 1;
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "pd-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, null, React.createElement("span", null, "Browse")), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, cfg.labelPlural), React.createElement("p", {
    style: {
      marginTop: 14,
      maxWidth: 640,
      color: "var(--ink-2)",
      fontFamily: "var(--serif)",
      fontSize: 20,
      lineHeight: 1.5
    }
  }, rows.length, " ", cfg.labelPlural.toLowerCase(), " represented across the index. Pick one to see its studios."))), React.createElement("div", {
    className: "coll-hub",
    style: {
      borderTop: "1px solid var(--rule)",
      marginTop: 32
    }
  }, rows.map(([value, n], i) => React.createElement("div", {
    key: value,
    className: "country-row big",
    onClick: () => go("collection", {
      kind: singular,
      value
    })
  }, React.createElement("div", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", {
    className: "t"
  }, value), React.createElement("div", {
    className: "bar"
  }, React.createElement("span", {
    className: "fill",
    style: {
      width: `${Math.max(6, n / max * 100)}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " ", n === 1 ? "studio" : "studios"), React.createElement("div", {
    className: "arr"
  }, "\u2192")))));
}
Object.assign(window, {
  COLLECTION_KINDS,
  collSlugify,
  collSlugToValue,
  collStudiosFor,
  collCopy,
  CollectionView,
  CollectionHubView
});
})();
