/* global React */
const { useState, useEffect } = React;

function Eyebrow({ num, children }) {
  // `num` intentionally ignored — section numbers removed site-wide.
  return (
    <div className="eyebrow">
      {children}
    </div>
  );
}

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const fmt = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
  return (
    <div className="clock">
      <span className="dot" /> Madrid · {fmt} CET
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("tsi_theme") === "dark"; } catch { return false; }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("tsi_theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);
  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(v => !v)}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light" : "Switch to dark"}
    >
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
      </svg>
    </button>
  );
}

function TopBar({ view, go }) {
  const items = [
    ["index", "Index"],
    ["studios", "Studios"],
    ["geography", "Geography"],
    ["categories", "Categories"],
    ["submit", "Submit"],
    ["about", "Colophon"],
  ];
  return (
    <header className="topbar">
      <div className="mark">
        <span onClick={() => go("index")} style={{ cursor: "pointer" }} className="mark-wordmark">
          <span>JUST</span><span className="slash">/</span><span>A</span><span className="slash">/</span><span>DESIGN</span><span className="slash">/</span><span>LIST</span>
        </span>
        <small></small>
      </div>
      <nav className="nav" aria-label="Primary">
        {items.map(([k, label]) => (
          <button key={k} onClick={() => go(k)} aria-current={view === k ? "page" : undefined}>
            {label}
          </button>
        ))}
      </nav>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Clock />
        <ThemeToggle />
      </div>
    </header>
  );
}

function Footer({ go }) {
  const d = window.SITE;
  const totals = d.totals || {};
  return (
    <footer className="foot wrap">
      <div className="foot-grid">
        <h3>
          A slow index of<br />design practices, worth returning to.
        </h3>
        <div className="addr">
          <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--mute)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 8 }}>
            Holdings
          </div>
          <div style={{ fontSize: 14 }}>
            {totals.studios} studios<br />
            {totals.countries} countries, {totals.cities} cities<br />
            <span style={{ color: "var(--mute)" }}>{d.updated}</span>
          </div>
        </div>
        <div className="links">
          <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--mute)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 4 }}>
            Elsewhere
          </div>
          <a onClick={() => go("submit")} style={{ cursor: "pointer" }}>
            <span>Submit a studio</span><span className="arr">→</span>
          </a>
          <a href="https://www.wenceslaosanz.rocks" target="_blank" rel="noopener">
            <span>Editor — wenceslaosanz.rocks</span><span className="arr">↗</span>
          </a>
          <a href="https://www.linkedin.com/in/wenceslaosanz/" target="_blank" rel="noopener">
            <span>LinkedIn</span><span className="arr">↗</span>
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <span>RSS feed</span><span className="arr">↗</span>
          </a>
        </div>
        <div className="colophon">
          {d.colophon.map((l, i) => <span key={i}>{l}</span>)}
          <span style={{ marginLeft: "auto" }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ color: "var(--mute)", fontFamily: "var(--mono)", fontSize: 11 }}>↑ Back to top</button>
          </span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Eyebrow, TopBar, Footer, Clock });
