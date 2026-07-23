(function(){
"use strict";
const {
  useMemo: useGeoMm,
  useState: useGeoSt
} = React;
function GeographyView({
  go
}) {
  const d = window.SITE;
  const countries = useGeoMm(() => Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]), []);
  const cities = useGeoMm(() => Object.entries(d.byCity || {}).sort((a, b) => b[1] - a[1]).slice(0, 30), []);
  const max = countries[0]?.[1] || 1;
  const [tab, setTab] = useGeoSt("countries");
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "studios-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "\xA7G"
  }, "Geography"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Studios across ", React.createElement("em", null, d.totals?.countries), " countries", React.createElement("br", null), "and ", React.createElement("em", null, d.totals?.cities), " cities."), React.createElement("p", {
    style: {
      color: "var(--ink-2)",
      maxWidth: "52ch",
      marginTop: 18
    }
  }, "A picture of the field, weighted by this editor's reading. Europe and North America are over-represented, which is a fact, not an argument.")), React.createElement("div", {
    style: {
      alignSelf: "end"
    }
  }, React.createElement("div", {
    className: "work-toggles"
  }, React.createElement("span", {
    className: "lbl"
  }, "View"), React.createElement("div", {
    className: "seg"
  }, [["countries", "Countries"], ["cities", "Cities"]].map(([k, l]) => React.createElement("button", {
    key: k,
    "data-on": tab === k,
    onClick: () => setTab(k)
  }, l)))))), window.WorldChoropleth ? React.createElement(window.WorldChoropleth, {
    go: go
  }) : null, tab === "countries" ? React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule)"
    }
  }, countries.map(([c, n], i) => React.createElement("div", {
    key: c,
    className: "country-row big",
    onClick: () => go("collection", {
      kind: "country",
      value: c
    })
  }, React.createElement("div", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", {
    className: "t"
  }, c), React.createElement("div", {
    className: "bar"
  }, React.createElement("div", {
    className: "fill",
    style: {
      width: `${n / max * 100}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " studio", n === 1 ? "" : "s"), React.createElement("div", {
    className: "arr"
  }, "\u2192")))) : React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule)"
    }
  }, cities.map(([c, n], i) => React.createElement("div", {
    key: c,
    className: "country-row big",
    onClick: () => go("collection", {
      kind: "city",
      value: c
    })
  }, React.createElement("div", {
    className: "n"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", {
    className: "t"
  }, c), React.createElement("div", {
    className: "bar"
  }, React.createElement("div", {
    className: "fill",
    style: {
      width: `${n / cities[0][1] * 100}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " studio", n === 1 ? "" : "s"), React.createElement("div", {
    className: "arr"
  }, "\u2192"))), React.createElement("div", {
    style: {
      padding: "24px 0",
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase"
    }
  }, "Top 30 shown \xB7 ", d.totals?.cities, " cities in total")));
}
function CategoriesView({
  go
}) {
  const d = window.SITE;
  const cats = d.categoriesOrder.filter(c => d.byCat?.[c]);
  const max = Math.max(...cats.map(c => d.byCat[c]));
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "studios-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "\xA7C"
  }, "Categories"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Nine ", React.createElement("em", null, "disciplines"), ",", React.createElement("br", null), "loosely defined."), React.createElement("p", {
    style: {
      color: "var(--ink-2)",
      maxWidth: "52ch",
      marginTop: 18
    }
  }, "Most studios belong to more than one category; the counts below overlap on purpose. Click any discipline to enter the list filtered."))), React.createElement("div", {
    className: "cat-long"
  }, cats.map((c, i) => {
    const col = d.catColors?.[c] || "#D8CFBD";
    const colDark = d.catColorsDark?.[c] || col;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textCol = isDark ? colDark : col;
    const exemplars = (d.studios || []).filter(s => s.category.split(",").map(x => x.trim()).includes(c)).slice(0, 4);
    return React.createElement("div", {
      key: c,
      className: "cat-long-row",
      style: {
        "--cat-color": textCol
      },
      onClick: () => go("collection", {
        kind: "discipline",
        value: c
      })
    }, React.createElement("div", {
      className: "nm"
    }, c), React.createElement("div", {
      className: "bl"
    }, d.categoryBlurbs[c]), React.createElement("div", {
      className: "ex"
    }, exemplars.map(s => s.name).join(" · ")), React.createElement("div", {
      className: "bar"
    }, React.createElement("div", {
      className: "fill",
      style: {
        width: `${d.byCat[c] / max * 100}%`,
        background: textCol
      }
    })), React.createElement("div", {
      className: "ct"
    }, d.byCat[c]), React.createElement("div", {
      className: "arr"
    }, "\u2192"));
  })));
}
function AboutView() {
  const d = window.SITE;
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "about-head"
  }, React.createElement(Eyebrow, {
    num: "\xA7B"
  }, "Colophon"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "A reading list, kept", React.createElement("br", null), React.createElement("em", null, "as a website"), ".")), React.createElement("div", {
    className: "about-grid"
  }, React.createElement("aside", {
    className: "about-side"
  }, React.createElement("dl", null, React.createElement("dt", null, "Editor"), React.createElement("dd", null, "Wenceslao Sanz", React.createElement("br", null), "Madrid"), React.createElement("dt", null, "Begun"), React.createElement("dd", null, "2023"), React.createElement("dt", null, "Holdings"), React.createElement("dd", null, d.totals?.studios, " entries"), React.createElement("dt", null, "Submissions"), React.createElement("dd", null, "Open, slow"), React.createElement("dt", null, "Rights"), React.createElement("dd", null, "Public reading")), React.createElement("div", {
    style: {
      paddingTop: 18,
      borderTop: "1px solid var(--rule-soft)",
      fontFamily: "var(--mono)",
      fontSize: 11.5,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase"
    }
  }, "Method"), React.createElement("div", {
    style: {
      display: "grid",
      gap: 6,
      fontSize: 13,
      color: "var(--ink-2)"
    }
  }, React.createElement("span", null, "Every entry is personally curated."), React.createElement("span", null, "No ranking, no rating."), React.createElement("span", null, "Links checked quarterly."), React.createElement("span", null, "Removed entries leave no trace."))), React.createElement("div", {
    className: "about-body"
  }, React.createElement("p", null, "Just a Design List is a personal reading list that grew too long to keep privately. It began in 2023 as a list of bookmarks, and is now a small, slow public archive \u2014 a place to point at studios whose work rewards close attention, without the obligation of a review."), React.createElement("p", null, React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "Every entry on this index is selected personally by me."), " Nothing here is submitted automatically, scraped, or paid for. Each studio has been added because its work, at some point, made me stop and look closely."), React.createElement("p", null, "The index is not exhaustive and does not try to be. It favours small and medium studios, independent practices, and designers who publish their work clearly on the open web. Large network agencies and consultancies are generally absent; this is not an oversight."), React.createElement("p", null, "Each entry is intentionally minimal: a name, a city, a country, a discipline or two, a link. No hero image, no blurb, no star rating. The reader is trusted to click through."), React.createElement("p", null, "If you think a studio is missing, ", React.createElement("a", {
    className: "link",
    href: `mailto:${d.contact.email}`
  }, "write"), ". Submissions are read in the order they arrive; a yes takes a month, a no takes silence."), React.createElement("div", {
    style: {
      marginTop: 56,
      paddingTop: 32,
      borderTop: "1px solid var(--rule-soft)"
    }
  }, React.createElement(Eyebrow, null, "About the editor"), React.createElement("p", {
    style: {
      marginTop: 16
    }
  }, "This index is edited and maintained by ", React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "Wenceslao Sanz"), ", a designer based in Madrid. The project began as a private list of bookmarks and grew into the public archive you are reading now."), React.createElement("p", null, "More of his work and writing lives at ", React.createElement("a", {
    className: "link",
    href: "https://www.wenceslaosanz.rocks",
    target: "_blank",
    rel: "noopener"
  }, "wenceslaosanz.rocks"), ". For professional matters, reach out on ", React.createElement("a", {
    className: "link",
    href: "https://www.linkedin.com/in/wenceslaosanz/",
    target: "_blank",
    rel: "noopener"
  }, "LinkedIn"), "."), React.createElement("div", {
    style: {
      marginTop: 24,
      display: "grid",
      gap: 10,
      maxWidth: 420
    }
  }, React.createElement("a", {
    className: "editor-link",
    href: "https://www.wenceslaosanz.rocks",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", {
    className: "k"
  }, "Portfolio"), React.createElement("span", {
    className: "v"
  }, "wenceslaosanz.rocks"), React.createElement("span", {
    className: "a"
  }, "\u2197")), React.createElement("a", {
    className: "editor-link",
    href: "https://www.linkedin.com/in/wenceslaosanz/",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", {
    className: "k"
  }, "LinkedIn"), React.createElement("span", {
    className: "v"
  }, "in/wenceslaosanz"), React.createElement("span", {
    className: "a"
  }, "\u2197")), React.createElement("a", {
    className: "editor-link",
    href: `mailto:${d.contact.email}`
  }, React.createElement("span", {
    className: "k"
  }, "Email"), React.createElement("span", {
    className: "v"
  }, d.contact.email), React.createElement("span", {
    className: "a"
  }, "\u2197")))))), React.createElement("div", {
    style: {
      marginTop: 120,
      paddingTop: 48,
      borderTop: "1px solid var(--rule)"
    }
  }, React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: 32
    }
  }, React.createElement("div", {
    style: {
      gridColumn: "1 / span 3"
    }
  }, React.createElement(Eyebrow, {
    num: "\xA7B.01"
  }, "Write")), React.createElement("div", {
    style: {
      gridColumn: "4 / span 9",
      fontFamily: "var(--serif)",
      fontSize: "clamp(30px, 4vw, 54px)",
      lineHeight: 1.08,
      letterSpacing: "-0.015em",
      maxWidth: "26ch"
    }
  }, "To propose a studio, correct an error, or simply say hello \u2014 ", React.createElement("a", {
    className: "link",
    href: `mailto:${d.contact.email}`
  }, d.contact.email), "."))));
}
Object.assign(window, {
  GeographyView,
  CategoriesView,
  AboutView
});
})();
