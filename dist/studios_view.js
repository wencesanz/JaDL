(function(){
"use strict";
const {
  useState: useSt,
  useMemo: useMm,
  useEffect: useEf
} = React;
const STUDIOS_STATE_KEY = "tsi:studios-state";
function readStudiosState() {
  try {
    return JSON.parse(localStorage.getItem(STUDIOS_STATE_KEY) || "{}") || {};
  } catch {
    return {};
  }
}
function writeStudiosState(patch) {
  try {
    const cur = readStudiosState();
    localStorage.setItem(STUDIOS_STATE_KEY, JSON.stringify({
      ...cur,
      ...patch
    }));
  } catch {}
}
function StudiosView({
  go,
  initialFilter
}) {
  const d = window.SITE;
  const all = d.studios || [];
  const saved = useMm(() => readStudiosState(), []);
  const hasInitial = !!initialFilter && (initialFilter.cat || initialFilter.country || initialFilter.city || initialFilter.type);
  const [q, setQ] = useSt(hasInitial ? "" : saved.q || "");
  const [cat, setCat] = useSt(initialFilter?.cat || (hasInitial ? "All" : saved.cat || "All"));
  const [country, setCountry] = useSt(initialFilter?.country || (hasInitial ? "All" : saved.country || "All"));
  const [city, setCity] = useSt(initialFilter?.city || (hasInitial ? "All" : saved.city || "All"));
  const [type, setType] = useSt(initialFilter?.type || (hasInitial ? "All" : saved.type || "All"));
  const [sort, setSort] = useSt(saved.sort || "name");
  const [mode, setMode] = useSt(saved.mode || "list");
  useEf(() => {
    if (!initialFilter) return;
    const {
      cat: nCat,
      country: nCountry,
      city: nCity,
      type: nType
    } = initialFilter;
    if (!nCat && !nCountry && !nCity && !nType) return;
    setCat(nCat || "All");
    setCountry(nCountry || "All");
    setCity(nCity || "All");
    setType(nType || "All");
    setQ("");
  }, [initialFilter?.cat, initialFilter?.country, initialFilter?.city, initialFilter?.type]);
  useEf(() => {
    writeStudiosState({
      q,
      cat,
      country,
      city,
      type,
      sort,
      mode
    });
  }, [q, cat, country, city, type, sort, mode]);
  const allCats = ["All", ...d.categoriesOrder.filter(c => d.byCat?.[c])];
  const allCountries = useMm(() => ["All", ...Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]).map(([c]) => c)], []);
  const typeOrder = ["Studio", "Freelance", "Ambiguous"];
  const allTypes = useMm(() => {
    const present = Object.keys(d.byType || {});
    if (!present.length) return null;
    const ordered = [...typeOrder.filter(t => present.includes(t)), ...present.filter(t => !typeOrder.includes(t))];
    return ["All", ...ordered];
  }, [d.byType]);
  const filtered = useMm(() => {
    let rs = all;
    if (cat !== "All") rs = rs.filter(s => s.category.split(",").map(x => x.trim()).includes(cat));
    if (country !== "All") rs = rs.filter(s => s.country.split(",").map(x => x.trim()).includes(country));
    if (city !== "All") rs = rs.filter(s => (s.city || "").split(",").map(x => x.trim()).includes(city));
    if (type !== "All") rs = rs.filter(s => (s.type || "").trim() === type);
    if (q.trim()) {
      const Q = q.trim().toLowerCase();
      rs = rs.filter(s => s.name.toLowerCase().includes(Q) || s.city.toLowerCase().includes(Q) || s.country.toLowerCase().includes(Q) || s.category.toLowerCase().includes(Q));
    }
    const coll = new Intl.Collator("en", {
      sensitivity: "base"
    });
    rs = [...rs].sort((a, b) => coll.compare(a[sort] || "", b[sort] || ""));
    return rs;
  }, [all, cat, country, city, type, q, sort]);
  const grouped = useMm(() => {
    if (sort !== "name") return null;
    const out = {};
    filtered.forEach(s => {
      const L = (s.name[0] || "#").toUpperCase();
      const K = /[A-Z]/.test(L) ? L : "#";
      (out[K] = out[K] || []).push(s);
    });
    return out;
  }, [filtered, sort]);
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "studios-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "\xA7S"
  }, "The List"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, filtered.length === all.length ? "All" : filtered.length, " studios", cat !== "All" ? React.createElement(React.Fragment, null, " in ", React.createElement("em", null, cat)) : null, city !== "All" ? React.createElement(React.Fragment, null, ", based in ", React.createElement("em", null, city), " ", React.createElement("button", {
    onClick: () => setCity("All"),
    className: "clear-filter",
    "aria-label": "Clear city filter",
    title: "Clear city filter"
  }, "\xD7")) : country !== "All" ? React.createElement(React.Fragment, null, ", from ", React.createElement("em", null, country)) : null, ".")), React.createElement("div", {
    style: {
      display: "grid",
      gap: 16,
      justifyItems: "end"
    }
  }, React.createElement("div", {
    className: "searchbar"
  }, React.createElement("span", {
    className: "lbl"
  }, "Search"), React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "name, city, country\u2026"
  }), q && React.createElement("button", {
    onClick: () => setQ(""),
    className: "clr"
  }, "\xD7")), React.createElement("div", {
    className: "work-toggles"
  }, React.createElement("span", {
    className: "lbl"
  }, "Sort"), React.createElement("div", {
    className: "seg"
  }, [["name", "A–Z"], ["city", "City"], ["country", "Country"]].map(([k, lbl]) => React.createElement("button", {
    key: k,
    "data-on": sort === k,
    onClick: () => setSort(k)
  }, lbl))), React.createElement("span", {
    className: "lbl",
    style: {
      marginLeft: 10
    }
  }, "View"), React.createElement("div", {
    className: "seg"
  }, ["list", "grid"].map(m => React.createElement("button", {
    key: m,
    "data-on": mode === m,
    onClick: () => setMode(m)
  }, m)))))), React.createElement("div", {
    className: "filter-row"
  }, React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "Discipline"), React.createElement("div", {
    className: "chips"
  }, allCats.map(c => React.createElement("button", {
    key: c,
    "data-on": cat === c,
    onClick: () => setCat(c)
  }, c, c !== "All" && d.byCat?.[c] ? React.createElement("span", {
    className: "num"
  }, " ", d.byCat[c]) : null)))), React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "Country"), React.createElement("div", {
    className: "chips scroll"
  }, allCountries.slice(0, 16).map(c => React.createElement("button", {
    key: c,
    "data-on": country === c,
    onClick: () => setCountry(c)
  }, c, c !== "All" && d.byCountry?.[c] ? React.createElement("span", {
    className: "num"
  }, " ", d.byCountry[c]) : null)), allCountries.length > 16 && React.createElement("select", {
    className: "more-select",
    value: allCountries.slice(16).includes(country) ? country : "",
    onChange: e => e.target.value && setCountry(e.target.value)
  }, React.createElement("option", {
    value: ""
  }, "More\u2026"), allCountries.slice(16).map(c => React.createElement("option", {
    key: c,
    value: c
  }, c, " (", d.byCountry[c], ")"))))), allTypes && React.createElement("div", null, React.createElement("div", {
    className: "lbl"
  }, "Type"), React.createElement("div", {
    className: "chips"
  }, allTypes.map(t => React.createElement("button", {
    key: t,
    "data-on": type === t,
    onClick: () => setType(t)
  }, t, t !== "All" && d.byType?.[t] ? React.createElement("span", {
    className: "num"
  }, " ", d.byType[t]) : null))))), mode === "list" && sort === "name" && grouped && React.createElement(AlphabetIndex, {
    grouped: grouped
  }), mode === "list" ? React.createElement("div", {
    className: "st-list"
  }, sort === "name" && grouped ? Object.keys(grouped).sort().map(L => React.createElement("div", {
    key: L,
    id: `grp-${L}`,
    className: "st-group"
  }, React.createElement("div", {
    className: "st-letter"
  }, L), React.createElement("div", null, grouped[L].map((s, i) => React.createElement(StudioRow, {
    key: s.name + i,
    s: s,
    go: go
  }))))) : filtered.map((s, i) => React.createElement(StudioRow, {
    key: s.name + i,
    s: s,
    go: go
  })), filtered.length === 0 && React.createElement("div", {
    style: {
      padding: "80px 0",
      textAlign: "center",
      color: "var(--mute)",
      fontFamily: "var(--mono)",
      fontSize: 12,
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Nothing matches that filter.")) : React.createElement("div", {
    className: "work-grid",
    style: {
      paddingTop: 24
    }
  }, filtered.slice(0, 48).map(s => {
    const col = d.catColors?.[s.category.split(",")[0].trim()] || "#D8CFBD";
    const shot = s.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=800&h=560` : null;
    return React.createElement("div", {
      className: "card",
      key: s.name,
      onClick: () => go("studio", {
        name: s.name
      }),
      style: {
        cursor: "pointer"
      }
    }, React.createElement("div", {
      className: "frame",
      style: {
        "--col": col,
        position: "relative",
        overflow: "hidden"
      }
    }, React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,.05) 0 1px, transparent 1px 14px)"
      }
    }), shot && React.createElement("img", {
      src: shot,
      alt: "",
      loading: "lazy",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      },
      onError: e => {
        e.currentTarget.style.display = "none";
      }
    }), React.createElement("div", {
      className: "ix",
      style: {
        position: "relative",
        zIndex: 2
      }
    }, s.city || "—"), React.createElement("div", {
      className: "yr",
      style: {
        position: "relative",
        zIndex: 2
      }
    }, s.country), React.createElement("div", {
      className: "ttl",
      style: {
        position: "absolute",
        left: 12,
        bottom: 12,
        zIndex: 3,
        display: "inline-block",
        padding: "8px 14px",
        borderRadius: 999,
        background: "rgba(15,15,14,.32)",
        color: "#fff",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        fontFamily: "var(--sans)",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        lineHeight: 1.2,
        maxWidth: "calc(100% - 24px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, s.name)), React.createElement("div", {
      className: "meta"
    }, React.createElement("span", null, s.category.split(",")[0]), React.createElement("span", null, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").slice(0, 24))));
  }), filtered.length > 48 && React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      padding: "32px 0",
      textAlign: "center",
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "var(--mute)",
      letterSpacing: ".06em",
      textTransform: "uppercase"
    }
  }, "Showing 48 of ", filtered.length, " \xB7 switch to list view to see all")));
}
function StudioRow({
  s,
  go
}) {
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const [hover, setHover] = useSt(false);
  const boxRef = React.useRef(null);
  const target = React.useRef({
    x: 0,
    y: 0
  });
  const cur = React.useRef({
    x: 0,
    y: 0
  });
  const raf = React.useRef(0);
  const primed = React.useRef(false);
  const shot = s.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=520&h=400` : null;
  useEf(() => {
    if (!hover) {
      primed.current = false;
      cancelAnimationFrame(raf.current);
      return;
    }
    const tick = () => {
      const el = boxRef.current;
      if (el) {
        if (!primed.current) {
          cur.current = {
            ...target.current
          };
          primed.current = true;
        }
        cur.current.x += (target.current.x - cur.current.x) * 0.16;
        cur.current.y += (target.current.y - cur.current.y) * 0.16;
        el.style.transform = `translate(${cur.current.x + 24}px, ${cur.current.y - 140}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [hover]);
  return React.createElement("div", {
    className: "studio-row",
    onClick: () => go("studio", {
      name: s.name
    }),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onMouseMove: e => {
      target.current = {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, React.createElement("div", {
    className: "t"
  }, s.name, s.type && s.type !== "Studio" && React.createElement("span", {
    className: `type-tag type-tag--${s.type.toLowerCase()}`
  }, s.type)), React.createElement("div", {
    className: "c"
  }, s.city, s.city && s.country ? ", " : "", s.country), React.createElement("div", {
    className: "k"
  }, s.category), React.createElement("div", {
    className: "u"
  }, host), React.createElement("div", {
    className: "arr"
  }, "\u2192"), hover && shot && React.createElement("div", {
    ref: boxRef,
    className: "row-preview-follow"
  }, React.createElement("div", {
    className: "row-preview"
  }, React.createElement("img", {
    src: shot,
    alt: "",
    onError: e => {
      e.currentTarget.style.display = "none";
    }
  }))));
}
Object.assign(window, {
  StudiosView
});
function AlphabetIndex({
  grouped
}) {
  const present = new Set(Object.keys(grouped));
  const letters = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
  const jump = L => {
    const el = document.getElementById(`grp-${L}`);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({
      top,
      behavior: "smooth"
    });
  };
  return React.createElement("nav", {
    className: "az-index",
    "aria-label": "Jump to letter"
  }, letters.map(L => React.createElement("button", {
    key: L,
    className: "az-letter",
    "data-empty": !present.has(L),
    disabled: !present.has(L),
    onClick: () => jump(L),
    "aria-label": `Jump to ${L}`
  }, L)));
}
})();
