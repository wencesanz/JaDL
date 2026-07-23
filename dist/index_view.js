(function(){
"use strict";
const {
  useState: useIdxState,
  useMemo: useIdxMemo,
  useEffect: useIdxEffect,
  useRef: useIdxRef
} = React;
function formatEdited(s) {
  if (!s) return "";
  const iso = Date.parse(s);
  if (!isNaN(iso)) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  return s.replace(/\s+\d{1,2}:\d{2}$/, "");
}
function IndexView({
  go
}) {
  const d = window.SITE;
  const top5Countries = useIdxMemo(() => Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]).slice(0, 5), []);
  const top5Cats = useIdxMemo(() => d.categoriesOrder.filter(c => d.byCat?.[c]).slice(0, 6).map(c => [c, d.byCat[c]]), []);
  return React.createElement("div", {
    className: "view"
  }, React.createElement("section", {
    className: "masthead wrap masthead--tight"
  }, React.createElement("h1", {
    style: {
      marginTop: 20
    }
  }, React.createElement("em", {
    className: "count-accent"
  }, d.totals?.studios || "—"), " design studios,", React.createElement("br", null), "collected ", React.createElement("em", null, "without ranking"), "."), React.createElement("p", {
    className: "sub"
  }, d.statement, " ", React.createElement("a", {
    className: "link",
    onClick: () => go("studios")
  }, "Read the full list"), ", or enter through", " ", React.createElement("a", {
    className: "link",
    onClick: () => go("categories")
  }, "discipline"), " or", " ", React.createElement("a", {
    className: "link",
    onClick: () => go("geography")
  }, "geography"), "."), window.RandomInline ? React.createElement(window.RandomInline, {
    go: go
  }) : null), window.TodaysPick ? React.createElement(window.TodaysPick, {
    go: go
  }) : null, window.RecentlyViewed ? React.createElement(window.RecentlyViewed, {
    go: go
  }) : null, React.createElement("div", {
    className: "hair wrap",
    style: {
      marginTop: 24
    }
  }), React.createElement("section", {
    className: "wrap"
  }, React.createElement("div", {
    className: "stats-strip"
  }, React.createElement("div", {
    className: "stat"
  }, React.createElement("span", {
    className: "n"
  }, d.totals?.studios), React.createElement("span", {
    className: "k"
  }, "Studios indexed")), React.createElement("div", {
    className: "stat"
  }, React.createElement("span", {
    className: "n"
  }, d.totals?.countries), React.createElement("span", {
    className: "k"
  }, "Countries")), React.createElement("div", {
    className: "stat"
  }, React.createElement("span", {
    className: "n"
  }, d.totals?.cities), React.createElement("span", {
    className: "k"
  }, "Cities")), React.createElement("div", {
    className: "stat"
  }, React.createElement("span", {
    className: "n"
  }, Object.keys(d.byCat || {}).length), React.createElement("span", {
    className: "k"
  }, "Disciplines")))), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 80,
      paddingBottom: 80
    }
  }, React.createElement("div", {
    className: "home-note"
  }, React.createElement(Eyebrow, {
    num: "\xA702"
  }, "Note"), React.createElement("div", {
    className: "home-note-body"
  }, d.note))), React.createElement("div", {
    className: "hair wrap"
  }), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 64
    }
  }, React.createElement("div", {
    className: "sel-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "\xA703"
  }, "By Discipline"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Enter through a category")), React.createElement("button", {
    onClick: () => go("categories"),
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--mute)"
    }
  }, "All categories \xA0\u2192")), React.createElement("div", {
    className: "cat-grid"
  }, top5Cats.map(([c, n]) => {
    const col = (document.documentElement.getAttribute("data-theme") === "dark" ? d.catColorsDark?.[c] : d.catColors?.[c]) || "var(--ink)";
    return React.createElement("button", {
      key: c,
      className: "cat-tile",
      style: {
        "--cat-color": col
      },
      onClick: () => go("studios", {
        filter: {
          cat: c
        }
      })
    }, React.createElement("div", {
      className: "cnt"
    }, n), React.createElement("div", {
      className: "nm"
    }, c), React.createElement("div", {
      className: "bl"
    }, d.categoryBlurbs[c]), React.createElement("div", {
      className: "arr"
    }, "\u2192"));
  }))), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 80
    }
  }, React.createElement("div", {
    className: "sel-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "\xA704"
  }, "By Geography"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Five most represented countries")), React.createElement("button", {
    onClick: () => go("geography"),
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--mute)"
    }
  }, "All geography \xA0\u2192")), React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule)"
    }
  }, top5Countries.map(([c, n], i) => React.createElement("div", {
    key: c,
    className: "country-row",
    onClick: () => go("studios", {
      filter: {
        country: c
      }
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
      width: `${n / top5Countries[0][1] * 100}%`
    }
  })), React.createElement("div", {
    className: "c"
  }, n, " studios"), React.createElement("div", {
    className: "arr"
  }, "\u2192"))))), React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 80
    }
  }, React.createElement("div", {
    className: "sel-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: "\xA705"
  }, "Recent Additions"), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "Twenty most recent entries"))), React.createElement("div", {
    className: "recent-list"
  }, (d.recent || []).map(p => React.createElement(RecentRow, {
    key: p.name,
    p: p,
    go: go
  })))));
}
function RecentRow({
  p,
  go
}) {
  const [hover, setHover] = useIdxState(false);
  const boxRef = useIdxRef(null);
  const target = useIdxRef({
    x: 0,
    y: 0
  });
  const cur = useIdxRef({
    x: 0,
    y: 0
  });
  const raf = useIdxRef(0);
  const primed = useIdxRef(false);
  const shot = p.url ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.url)}?w=520&h=400` : null;
  useIdxEffect(() => {
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
    className: "recent-row",
    onClick: () => go("studio", {
      name: p.name
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
    className: "d"
  }, formatEdited(p.created || p.edited)), React.createElement("div", {
    className: "t"
  }, p.name), React.createElement("div", {
    className: "c"
  }, p.city, p.city && p.country ? ", " : "", p.country), React.createElement("div", {
    className: "k"
  }, (p.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), hover && shot && React.createElement("div", {
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
function EditorialGrid({
  studios,
  go
}) {
  const d = window.SITE;
  const pool = useIdxMemo(() => {
    const all = (d.studios || []).filter(s => s && s.url);
    return all.length ? all : studios || [];
  }, []);
  const pickTwelve = React.useCallback(() => {
    const a = pool.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, 12);
  }, [pool]);
  const [tiles] = useIdxState(() => pickTwelve());
  if (!tiles.length) return null;
  return React.createElement("section", {
    className: "wrap",
    style: {
      paddingTop: 24,
      paddingBottom: 48
    }
  }, React.createElement("div", {
    className: "eg-head"
  }, React.createElement(Eyebrow, {
    num: "\xA701"
  }, "Editor's Selection"), React.createElement("div", {
    className: "eg-head-meta"
  }, "Twelve studios, chosen this month")), React.createElement("div", {
    className: "eg-grid"
  }, tiles.map((s, i) => React.createElement(EditorialTile, {
    key: s.name + "@" + i,
    s: s,
    size: i % 12 + 1,
    index: i,
    onOpen: () => go("studio", {
      name: s.name
    })
  }))));
}
function EditorialTile({
  s,
  size,
  index,
  onOpen
}) {
  const [loaded, setLoaded] = useIdxState(false);
  const [failed, setFailed] = useIdxState(false);
  const ref = useIdxRef(null);
  const [inView, setInView] = useIdxState(false);
  useIdxEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, {
      rootMargin: "200px"
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
  const shotW = size <= 2 ? 1200 : 700;
  const shotH = size <= 2 ? 900 : 540;
  const shot = s.url && inView ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=${shotW}&h=${shotH}` : null;
  const firstCat = (s.category || "").split(",")[0].trim();
  const col = window.SITE.catColors?.[firstCat] || "#D8CFBD";
  return React.createElement("div", {
    ref: ref,
    className: `eg-tile eg-tile--size${size}`,
    onClick: onOpen,
    style: {
      "--tile-col": col
    }
  }, React.createElement("div", {
    className: "eg-frame"
  }, shot && !failed && React.createElement("img", {
    src: shot,
    alt: `${s.name} — ${host}`,
    loading: "lazy",
    onLoad: e => {
      if (e.target.naturalWidth > 100) setLoaded(true);else setFailed(true);
    },
    onError: () => setFailed(true),
    className: "eg-img",
    style: {
      opacity: loaded ? 1 : 0
    }
  }), !loaded && React.createElement("div", {
    className: "eg-placeholder"
  }, React.createElement("span", {
    className: "eg-ph-name"
  }, s.name))), React.createElement("div", {
    className: "eg-meta"
  }, React.createElement("div", {
    className: "eg-name"
  }, s.name), React.createElement("div", {
    className: "eg-loc"
  }, s.city, s.city && s.country ? ", " : "", s.country), React.createElement("div", {
    className: "eg-host"
  }, host, " \u2197")));
}
Object.assign(window, {
  IndexView
});
})();
