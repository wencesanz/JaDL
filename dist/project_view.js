(function(){
"use strict";
const {
  useMemo: usePdMm,
  useState: usePdState,
  useEffect: usePdEffect
} = React;
const ES_MONTHS = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11
};
function formatIndexed(raw) {
  if (!raw) return "—";
  let d = null;
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const t = new Date(raw);
    if (!isNaN(t.getTime())) d = t;
  }
  if (!d) {
    const m = raw.match(/^(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})/i);
    if (m) {
      const month = ES_MONTHS[m[2].toLowerCase()];
      if (month !== undefined) d = new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
    }
  }
  if (!d) return raw;
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(d);
  } catch {
    return d.toDateString();
  }
}
function StudioHero({
  s,
  col
}) {
  const [loaded, setLoaded] = usePdState(false);
  const [srcIdx, setSrcIdx] = usePdState(0);
  const sources = s.url ? [`/api/ogimage?url=${encodeURIComponent(s.url)}`, `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1600&h=1000`] : [];
  usePdEffect(() => {
    setLoaded(false);
    setSrcIdx(0);
  }, [s.url]);
  const shot = sources[srcIdx] || null;
  const exhausted = srcIdx >= sources.length;
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const advance = () => setSrcIdx(i => i + 1);
  return React.createElement("div", {
    className: "pd-hero",
    style: {
      "--col": col
    }
  }, shot && !exhausted && React.createElement("img", {
    key: shot,
    src: shot,
    alt: `${s.name} — website preview`,
    onLoad: e => {
      if (e.target.naturalWidth > 100) setLoaded(true);else advance();
    },
    onError: advance,
    className: "pd-hero-img",
    style: {
      opacity: loaded ? 1 : 0
    }
  }), !loaded && React.createElement("div", {
    style: {
      fontFamily: "var(--serif)",
      fontStyle: "italic",
      fontSize: "clamp(36px, 6vw, 80px)",
      color: "var(--ink)",
      opacity: .25,
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      padding: "0 40px",
      lineHeight: 1
    }
  }, s.name), React.createElement("span", {
    className: "ph"
  }, loaded && host ? `${host} · click through to visit` : "Studio site preview · click through to visit"));
}
function StudioDetail({
  name,
  go
}) {
  const d = window.SITE;
  const all = d.studios || [];
  const idx = all.findIndex(x => x.name === name);
  const s = all[idx];
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const related = usePdMm(() => {
    if (!s) return [];
    const firstCat = s.category.split(",")[0].trim();
    return all.filter(x => x.name !== s.name && x.category.includes(firstCat)).slice(0, 6);
  }, [s]);
  if (!s) {
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
    }, "Entry not found."), React.createElement("button", {
      onClick: () => go("studios"),
      className: "link",
      style: {
        fontFamily: "var(--mono)",
        fontSize: 12
      }
    }, "\u2190 Back to the list"));
  }
  const col = d.catColors?.[s.category.split(",")[0].trim()] || "#D8CFBD";
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const igHandle = (s.ig || "").split("/").filter(Boolean).pop();
  usePdEffect(() => {
    if (window.recordVisit) window.recordVisit(s.name);
  }, [s.name]);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${s.name} — ${s.category.split(",")[0].trim()}${s.city ? `, ${s.city}` : ""} · via Just a Design List`;
  const [copied, setCopied] = usePdState(false);
  const [igOpen, setIgOpen] = usePdState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const i = document.createElement("input");
      i.value = shareUrl;
      document.body.appendChild(i);
      i.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
      document.body.removeChild(i);
    }
  };
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "pd-topbar"
  }, React.createElement("button", {
    onClick: () => go("studios"),
    className: "back-btn",
    "aria-label": "Back to the list"
  }, React.createElement("span", {
    className: "arr"
  }, "\u2190"), React.createElement("span", null, "The List")), window.RandomButton ? React.createElement(window.RandomButton, {
    go: go,
    currentName: s.name
  }) : null), React.createElement("div", {
    className: "pd-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, {
    num: `№ ${String(idx + 1).padStart(3, "0")} of ${all.length}`
  }, React.createElement("span", null, s.category.split(",")[0])), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, s.name)), React.createElement("dl", {
    className: "meta"
  }, React.createElement("dt", null, "City"), React.createElement("dd", null, s.city || "—"), React.createElement("dt", null, "Country"), React.createElement("dd", null, s.country || "—"), React.createElement("dt", null, "Discipline"), React.createElement("dd", null, s.category), s.type && React.createElement(React.Fragment, null, React.createElement("dt", null, "Type"), React.createElement("dd", null, s.type)), React.createElement("dt", null, "Indexed"), React.createElement("dd", null, formatIndexed(s.created || s.edited)))), React.createElement("div", {
    className: "pd-hero-wrap"
  }, s.url ? React.createElement("a", {
    href: s.url,
    target: "_blank",
    rel: "noopener",
    style: {
      display: "block"
    }
  }, React.createElement(StudioHero, {
    s: s,
    col: col
  })) : React.createElement(StudioHero, {
    s: s,
    col: col
  })), React.createElement("div", {
    className: "pd-body"
  }, React.createElement("aside", {
    className: "side-col"
  }, "Visit", React.createElement("div", {
    style: {
      marginTop: 14,
      display: "grid",
      gap: 10,
      textTransform: "none",
      letterSpacing: 0,
      fontSize: 14
    }
  }, s.url && React.createElement("a", {
    href: s.url,
    target: "_blank",
    rel: "noopener",
    className: "link",
    style: {
      color: "var(--ink)",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 8
    }
  }, React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, host), React.createElement("span", {
    style: {
      color: "var(--mute)"
    }
  }, "\u2197")), s.ig && React.createElement("a", {
    href: s.ig,
    target: "_blank",
    rel: "noopener",
    className: "link",
    style: {
      color: "var(--ink)",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 8
    }
  }, React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, "@", igHandle), React.createElement("span", {
    style: {
      color: "var(--mute)"
    }
  }, "\u2197"))), window.SaveButton ? React.createElement("div", {
    className: "save-block"
  }, React.createElement(window.SaveButton, {
    studio: s
  })) : null, React.createElement("div", {
    className: "share-block"
  }, React.createElement("div", {
    className: "share-lbl"
  }, "Share"), React.createElement("div", {
    className: "share-row"
  }, React.createElement("a", {
    className: "share-btn",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Share on X / Twitter",
    title: "Share on X / Twitter"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "currentColor",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  })), React.createElement("span", null, "X")), React.createElement("a", {
    className: "share-btn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Share on LinkedIn",
    title: "Share on LinkedIn"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "currentColor",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
  })), React.createElement("span", null, "LinkedIn")), React.createElement("a", {
    className: "share-btn",
    href: `mailto:?subject=${encodeURIComponent(s.name + " — Just a Design List")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
    "aria-label": "Share by email",
    title: "Share by email"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    "aria-hidden": "true"
  }, React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "1"
  }), React.createElement("path", {
    d: "M3 7l9 6 9-6"
  })), React.createElement("span", null, "Email")), React.createElement("button", {
    className: "share-btn",
    onClick: () => setIgOpen(true),
    "aria-label": "Share to Instagram",
    title: "Share to Instagram"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    "aria-hidden": "true"
  }, React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "1",
    fill: "currentColor",
    stroke: "none"
  })), React.createElement("span", null, "Instagram")), React.createElement("button", {
    className: "share-btn",
    onClick: copyLink,
    "aria-label": "Copy link",
    title: "Copy link"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"
  }), React.createElement("path", {
    d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"
  })), React.createElement("span", null, copied ? "Copied" : "Copy link"))))), React.createElement("div", {
    className: "intro"
  }, "An independent practice based in ", React.createElement("em", null, s.city || s.country), s.country && s.city ? React.createElement(React.Fragment, null, ", ", React.createElement("em", null, s.country)) : null, ", working in ", s.category.split(",").map((c, i, a) => React.createElement(React.Fragment, {
    key: c
  }, React.createElement("em", null, c.trim().toLowerCase()), i < a.length - 1 ? i === a.length - 2 ? " and " : ", " : null)), ".")), React.createElement("div", {
    className: "pd-body"
  }, React.createElement("div", {
    className: "body-col"
  }, React.createElement("p", null, "The entry is intentionally brief. The index is a pointer, not a review \u2014 visit the studio's own site to see the work in its preferred frame. What we note here is only what is needed to find the practice again: where it is, what it does, and where to look."), React.createElement("p", null, React.createElement("a", {
    className: "link",
    href: s.url,
    target: "_blank",
    rel: "noopener"
  }, "Open ", host), s.ig && React.createElement(React.Fragment, null, " \xB7 ", React.createElement("a", {
    className: "link",
    href: s.ig,
    target: "_blank",
    rel: "noopener"
  }, "Follow on Instagram")), "."))), React.createElement("div", {
    className: "pd-credits"
  }, React.createElement("h4", null, "Filed under"), React.createElement("dl", null, s.category.split(",").map(c => {
    const t = c.trim();
    return React.createElement(React.Fragment, {
      key: t
    }, React.createElement("dt", {
      onClick: () => go("collection", {
        kind: "discipline",
        value: t
      }),
      style: {
        cursor: "pointer"
      }
    }, t), React.createElement("dd", {
      onClick: () => go("collection", {
        kind: "discipline",
        value: t
      }),
      style: {
        cursor: "pointer",
        color: "var(--ink-2)"
      }
    }, React.createElement("span", {
      className: "link",
      style: {
        color: "var(--accent)"
      }
    }, "See all ", d.byCat[t], " \u2192")));
  }), React.createElement("dt", {
    onClick: () => go("collection", {
      kind: "country",
      value: s.country.split(",")[0].trim()
    }),
    style: {
      cursor: "pointer"
    }
  }, s.country.split(",")[0]), React.createElement("dd", {
    onClick: () => go("collection", {
      kind: "country",
      value: s.country.split(",")[0].trim()
    }),
    style: {
      cursor: "pointer",
      color: "var(--ink-2)"
    }
  }, React.createElement("span", {
    className: "link",
    style: {
      color: "var(--accent)"
    }
  }, "See all ", d.byCountry[s.country.split(",")[0].trim()], " \u2192")))), related.length > 0 && React.createElement("div", {
    style: {
      paddingTop: 64,
      marginTop: 64,
      borderTop: "1px solid var(--rule)"
    }
  }, React.createElement(Eyebrow, null, "Neighbours in ", s.category.split(",")[0].trim()), React.createElement("div", {
    className: "st-list",
    style: {
      marginTop: 24
    }
  }, related.map(r => React.createElement("div", {
    key: r.name,
    className: "studio-row",
    onClick: () => go("studio", {
      name: r.name
    })
  }, React.createElement("div", {
    className: "t"
  }, r.name), React.createElement("div", {
    className: "c"
  }, r.city, r.city && r.country ? ", " : "", r.country), React.createElement("div", {
    className: "k"
  }, r.category), React.createElement("div", {
    className: "u"
  }, (r.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), React.createElement("div", {
    className: "arr"
  }, "\u2192"))))), igOpen && window.IGShareModal ? React.createElement(window.IGShareModal, {
    s: s,
    col: col,
    idx: idx,
    total: all.length,
    onClose: () => setIgOpen(false)
  }) : null, React.createElement("div", {
    className: "pd-next"
  }, React.createElement("div", {
    className: "side",
    onClick: () => go("studio", {
      name: prev.name
    })
  }, React.createElement("span", {
    className: "k"
  }, "Previous"), React.createElement("span", {
    className: "t"
  }, prev.name)), React.createElement("div", {
    className: "side right",
    onClick: () => go("studio", {
      name: next.name
    })
  }, React.createElement("span", {
    className: "k"
  }, "Next"), React.createElement("span", {
    className: "t"
  }, next.name))), window.RecentlyViewedInline ? React.createElement(window.RecentlyViewedInline, {
    go: go,
    excludeName: s.name
  }) : null);
}
Object.assign(window, {
  StudioDetail
});
})();
