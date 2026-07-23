(function(){
"use strict";
const {
  useState,
  useEffect
} = React;
function Eyebrow({
  num,
  children
}) {
  return React.createElement("div", {
    className: "eyebrow"
  }, children);
}
function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const fmt = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid"
  });
  return React.createElement("div", {
    className: "clock"
  }, React.createElement("span", {
    className: "dot"
  }), " Madrid \xB7 ", fmt, " CET");
}
function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("tsi_theme") === "dark";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.setAttribute("data-theme", "dark");else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("tsi_theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  return React.createElement("button", {
    className: "theme-toggle",
    onClick: () => setDark(v => !v),
    "aria-label": dark ? "Switch to light theme" : "Switch to dark theme",
    title: dark ? "Switch to light" : "Switch to dark"
  }, React.createElement("svg", {
    className: "sun",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), React.createElement("path", {
    d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
  })), React.createElement("svg", {
    className: "moon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
  })));
}
function TopBar({
  view,
  go
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const saved = window.useSaved ? window.useSaved() : null;
  const savedCount = saved ? saved.count() : 0;
  const items = [["index", "Index"], ["studios", "Studios"], ["geography", "Geography"], ["categories", "Categories"], ["submit", "Submit"], ["about", "Colophon"], ["list", "My List"]];
  useEffect(() => {
    setMenuOpen(false);
  }, [view]);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 880) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const goAndClose = k => {
    setMenuOpen(false);
    go(k);
  };
  return React.createElement("header", {
    className: `topbar ${menuOpen ? "is-open" : ""}`
  }, React.createElement("div", {
    className: "mark"
  }, React.createElement("span", {
    onClick: () => go("index"),
    style: {
      cursor: "pointer"
    },
    className: "mark-wordmark"
  }, React.createElement("span", null, "JUST"), React.createElement("span", {
    className: "slash"
  }, "/"), React.createElement("span", null, "A"), React.createElement("span", {
    className: "slash"
  }, "/"), React.createElement("span", null, "DESIGN"), React.createElement("span", {
    className: "slash"
  }, "/"), React.createElement("span", null, "LIST")), React.createElement("small", null)), React.createElement("nav", {
    className: "nav",
    "aria-label": "Primary"
  }, items.map(([k, label]) => React.createElement("button", {
    key: k,
    onClick: () => go(k),
    "aria-current": view === k ? "page" : undefined
  }, label, k === "list" && savedCount > 0 ? React.createElement("sup", {
    className: "nav-count"
  }, savedCount) : null))), React.createElement("div", {
    className: "topbar-right"
  }, React.createElement(ThemeToggle, null), React.createElement("button", {
    className: "menu-toggle",
    onClick: () => setMenuOpen(v => !v),
    "aria-label": menuOpen ? "Close menu" : "Open menu",
    "aria-expanded": menuOpen
  }, React.createElement("span", {
    className: "menu-icon",
    "data-open": menuOpen
  }, React.createElement("span", null), React.createElement("span", null), React.createElement("span", null)))), React.createElement("nav", {
    className: `mobile-nav ${menuOpen ? "is-open" : ""}`,
    "aria-label": "Mobile"
  }, items.map(([k, label]) => React.createElement("button", {
    key: k,
    onClick: () => goAndClose(k),
    "aria-current": view === k ? "page" : undefined,
    className: view === k ? "is-current" : ""
  }, label, k === "list" && savedCount > 0 ? React.createElement("sup", {
    className: "nav-count"
  }, savedCount) : null))));
}
function Footer({
  go
}) {
  const d = window.SITE;
  const totals = d.totals || {};
  return React.createElement("footer", {
    className: "foot wrap"
  }, React.createElement("div", {
    className: "foot-grid"
  }, React.createElement("h3", {
    style: {
      lineHeight: 1.1
    }
  }, "A slow index of", React.createElement("br", null), "design practices, worth returning to."), React.createElement("div", {
    className: "addr"
  }, React.createElement("div", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11.5,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "Holdings"), React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, totals.studios, " studios", React.createElement("br", null), totals.countries, " countries, ", totals.cities, " cities", React.createElement("br", null), React.createElement("span", {
    style: {
      color: "var(--mute)"
    }
  }, d.updated))), React.createElement("div", {
    className: "links"
  }, React.createElement("div", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 11.5,
      color: "var(--mute)",
      letterSpacing: ".05em",
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Elsewhere"), React.createElement("a", {
    onClick: () => go("submit"),
    style: {
      cursor: "pointer"
    }
  }, React.createElement("span", null, "Submit a studio"), React.createElement("span", {
    className: "arr"
  }, "\u2192")), React.createElement("a", {
    href: "https://www.wenceslaosanz.rocks",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "Editor \u2014 wenceslaosanz.rocks"), React.createElement("span", {
    className: "arr"
  }, "\u2197")), React.createElement("a", {
    href: "https://www.designmatazz.com",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "Designmatazz"), React.createElement("span", {
    className: "arr"
  }, "\u2197")), React.createElement("a", {
    href: "https://www.linkedin.com/in/wenceslaosanz/",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "LinkedIn"), React.createElement("span", {
    className: "arr"
  }, "\u2197")), React.createElement("a", {
    href: "feed.xml",
    target: "_blank",
    rel: "noopener"
  }, React.createElement("span", null, "RSS feed"), React.createElement("span", {
    className: "arr"
  }, "\u2197"))), React.createElement("div", {
    className: "sponsor"
  }, React.createElement("span", null, "Just a Design List is an independent side project. Interested in sponsoring it?"), React.createElement("a", {
    href: "mailto:wencesanz@gmail.com?subject=SPONSOR"
  }, "Get in touch", React.createElement("span", {
    className: "arr"
  }, "\u2192"))), React.createElement("div", {
    className: "colophon"
  }, d.colophon.map((l, i) => React.createElement("span", {
    key: i
  }, l)), React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, React.createElement("button", {
    onClick: () => window.scrollTo({
      top: 0,
      behavior: "smooth"
    }),
    style: {
      color: "var(--mute)",
      fontFamily: "var(--mono)",
      fontSize: 11
    }
  }, "\u2191 Back to top")))));
}
Object.assign(window, {
  Eyebrow,
  TopBar,
  Footer,
  Clock
});
})();
