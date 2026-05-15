/* global React, Eyebrow */
const { useMemo: useGeoMm, useState: useGeoSt } = React;

function GeographyView({ go }) {
  const d = window.SITE;
  const countries = useGeoMm(() => Object.entries(d.byCountry || {}).sort((a, b) => b[1] - a[1]), []);
  const cities = useGeoMm(() => Object.entries(d.byCity || {}).sort((a, b) => b[1] - a[1]).slice(0, 30), []);
  const max = countries[0]?.[1] || 1;
  const [tab, setTab] = useGeoSt("countries");

  return (
    <div className="view wrap">
      <div className="studios-head">
        <div>
          <Eyebrow num="§G">Geography</Eyebrow>
          <h2 style={{ marginTop: 14 }}>
            Studios across <em>{d.totals?.countries}</em> countries<br />and <em>{d.totals?.cities}</em> cities.
          </h2>
          <p style={{ color: "var(--ink-2)", maxWidth: "52ch", marginTop: 18 }}>
            A picture of the field, weighted by this editor's reading. Europe and North America are over-represented, which is a fact, not an argument.
          </p>
        </div>
        <div style={{ alignSelf: "end" }}>
          <div className="work-toggles">
            <span className="lbl">View</span>
            <div className="seg">
              {[["countries","Countries"],["cities","Cities"]].map(([k,l]) => (
                <button key={k} data-on={tab === k} onClick={() => setTab(k)}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {tab === "countries" ? (
        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {countries.map(([c, n], i) => (
            <div key={c} className="country-row big" onClick={() => go("studios", { filter: { country: c } })}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <div className="t">{c}</div>
              <div className="bar"><div className="fill" style={{ width: `${(n / max) * 100}%` }} /></div>
              <div className="c">{n} studio{n === 1 ? "" : "s"}</div>
              <div className="arr">→</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {cities.map(([c, n], i) => (
            <div key={c} className="country-row big" onClick={() => go("studios", { filter: { city: c } })}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <div className="t">{c}</div>
              <div className="bar"><div className="fill" style={{ width: `${(n / cities[0][1]) * 100}%` }} /></div>
              <div className="c">{n} studio{n === 1 ? "" : "s"}</div>
              <div className="arr">→</div>
            </div>
          ))}
          <div style={{ padding: "24px 0", fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", letterSpacing: ".05em", textTransform: "uppercase" }}>
            Top 30 shown · {d.totals?.cities} cities in total
          </div>
        </div>
      )}
    </div>
  );
}

function CategoriesView({ go }) {
  const d = window.SITE;
  const cats = d.categoriesOrder.filter((c) => d.byCat?.[c]);
  const max = Math.max(...cats.map((c) => d.byCat[c]));

  return (
    <div className="view wrap">
      <div className="studios-head">
        <div>
          <Eyebrow num="§C">Categories</Eyebrow>
          <h2 style={{ marginTop: 14 }}>
            Nine <em>disciplines</em>,<br />loosely defined.
          </h2>
          <p style={{ color: "var(--ink-2)", maxWidth: "52ch", marginTop: 18 }}>
            Most studios belong to more than one category; the counts below overlap on purpose. Click any discipline to enter the list filtered.
          </p>
        </div>
      </div>

      <div className="cat-long">
        {cats.map((c, i) => {
          const col = d.catColors?.[c] || "#D8CFBD";
          const colDark = d.catColorsDark?.[c] || col;
          const isDark = document.documentElement.getAttribute("data-theme") === "dark";
          const textCol = isDark ? colDark : col;
          const exemplars = (d.studios || []).filter((s) => s.category.split(",").map((x) => x.trim()).includes(c)).slice(0, 4);
          return (
            <div key={c} className="cat-long-row" style={{ "--cat-color": textCol }} onClick={() => go("studios", { filter: { cat: c } })}>
              <div className="nm">{c}</div>
              <div className="bl">{d.categoryBlurbs[c]}</div>
              <div className="ex">
                {exemplars.map((s) => s.name).join(" · ")}
              </div>
              <div className="bar"><div className="fill" style={{ width: `${(d.byCat[c] / max) * 100}%`, background: textCol }} /></div>
              <div className="ct">{d.byCat[c]}</div>
              <div className="arr">→</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutView() {
  const d = window.SITE;
  return (
    <div className="view wrap">
      <div className="about-head">
        <Eyebrow num="§B">Colophon</Eyebrow>
        <h2 style={{ marginTop: 14 }}>
          A reading list, kept<br /><em>as a website</em>.
        </h2>
      </div>

      <div className="about-grid">
        <aside className="about-side">
          <dl>
            <dt>Editor</dt><dd>Wenceslao Sanz<br />Madrid</dd>
            <dt>Begun</dt><dd>2023</dd>
            <dt>Holdings</dt><dd>{d.totals?.studios} entries</dd>
            <dt>Submissions</dt><dd>Open, slow</dd>
            <dt>Rights</dt><dd>Public reading</dd>
          </dl>
          <div style={{ paddingTop: 18, borderTop: "1px solid var(--rule-soft)", fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--mute)", letterSpacing: ".05em", textTransform: "uppercase" }}>
            Method
          </div>
          <div style={{ display: "grid", gap: 6, fontSize: 13, color: "var(--ink-2)" }}>
            <span>Every entry is personally curated.</span>
            <span>No ranking, no rating.</span>
            <span>Links checked quarterly.</span>
            <span>Removed entries leave no trace.</span>
          </div>
        </aside>

        <div className="about-body">
          <p>
            Just a Design List is a personal reading list that grew too long to keep privately. It began in 2023 as a list of bookmarks, and is now a small, slow public archive — a place to point at studios whose work rewards close attention, without the obligation of a review.
          </p>
          <p>
            <strong style={{ fontWeight: 500 }}>Every entry on this index is selected personally by me.</strong> Nothing here is submitted automatically, scraped, or paid for. Each studio has been added because its work, at some point, made me stop and look closely.
          </p>
          <p>
            The index is not exhaustive and does not try to be. It favours small and medium studios, independent practices, and designers who publish their work clearly on the open web. Large network agencies and consultancies are generally absent; this is not an oversight.
          </p>
          <p>
            Each entry is intentionally minimal: a name, a city, a country, a discipline or two, a link. No hero image, no blurb, no star rating. The reader is trusted to click through.
          </p>
          <p>
            If you think a studio is missing, <a className="link" href={`mailto:${d.contact.email}`}>write</a>. Submissions are read in the order they arrive; a yes takes a month, a no takes silence.
          </p>

          <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid var(--rule-soft)" }}>
            <Eyebrow>About the editor</Eyebrow>
            <p style={{ marginTop: 16 }}>
              This index is edited and maintained by <strong style={{ fontWeight: 500 }}>Wenceslao Sanz</strong>, a designer based in Madrid. The project began as a private list of bookmarks and grew into the public archive you are reading now.
            </p>
            <p>
              More of his work and writing lives at <a className="link" href="https://www.wenceslaosanz.rocks" target="_blank" rel="noopener">wenceslaosanz.rocks</a>. For professional matters, reach out on <a className="link" href="https://www.linkedin.com/in/wenceslaosanz/" target="_blank" rel="noopener">LinkedIn</a>.
            </p>
            <div style={{ marginTop: 24, display: "grid", gap: 10, maxWidth: 420 }}>
              <a className="editor-link" href="https://www.wenceslaosanz.rocks" target="_blank" rel="noopener">
                <span className="k">Portfolio</span>
                <span className="v">wenceslaosanz.rocks</span>
                <span className="a">↗</span>
              </a>
              <a className="editor-link" href="https://www.linkedin.com/in/wenceslaosanz/" target="_blank" rel="noopener">
                <span className="k">LinkedIn</span>
                <span className="v">in/wenceslaosanz</span>
                <span className="a">↗</span>
              </a>
              <a className="editor-link" href={`mailto:${d.contact.email}`}>
                <span className="k">Email</span>
                <span className="v">{d.contact.email}</span>
                <span className="a">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 120, paddingTop: 48, borderTop: "1px solid var(--rule)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 32 }}>
          <div style={{ gridColumn: "1 / span 3" }}>
            <Eyebrow num="§B.01">Write</Eyebrow>
          </div>
          <div style={{ gridColumn: "4 / span 9", fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 54px)", lineHeight: 1.08, letterSpacing: "-0.015em", maxWidth: "26ch" }}>
            To propose a studio, correct an error, or simply say hello — <a className="link" href={`mailto:${d.contact.email}`}>{d.contact.email}</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GeographyView, CategoriesView, AboutView });
