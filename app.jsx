/* global React, ReactDOM, TopBar, Footer, IndexView, StudiosView, GeographyView, CategoriesView, AboutView, SubmitView, StudioDetail, Tweaks */
const { useState, useEffect } = React;

function App() {
  const [ready, setReady] = useState(!!window.SITE?.studios);
  const [route, setRoute] = useState(() => {
    try {
      const s = localStorage.getItem("tsi:route");
      return s ? JSON.parse(s) : { view: "index" };
    } catch { return { view: "index" }; }
  });

  useEffect(() => {
    if (ready) return;
    const p = window.SITE_READY || fetch("studios.json").then(r => r.json()).then(st => {
      window.SITE.studios = st;
      return window.SITE;
    });
    Promise.resolve(p).then(() => setReady(true)).catch(err => {
      console.error("load failed", err);
      setReady(true);
    });
  }, [ready]);

  useEffect(() => {
    try { localStorage.setItem("tsi:route", JSON.stringify(route)); } catch {}
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route.view, route.name, route.filter?.cat, route.filter?.country]);

  function go(view, extra = {}) {
    setRoute({ view, ...extra });
  }

  if (!ready) {
    return (
      <div className="boot">
        <div className="boot-inner">
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", letterSpacing: ".06em", textTransform: "uppercase" }}>Loading the index…</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 40, marginTop: 12 }}><em>Just a Design List</em></div>
        </div>
      </div>
    );
  }

  let body;
  switch (route.view) {
    case "studios": body = <StudiosView go={go} initialFilter={route.filter} />; break;
    case "geography": body = <GeographyView go={go} />; break;
    case "categories": body = <CategoriesView go={go} />; break;
    case "submit": body = <SubmitView />; break;
    case "about": body = <AboutView go={go} />; break;
    case "studio": body = <StudioDetail name={route.name} go={go} />; break;
    default: body = <IndexView go={go} />;
  }

  return (
    <div className="page" data-screen-label={route.view}>
      <TopBar view={route.view} go={go} />
      {body}
      <Footer go={go} />
      <Tweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
