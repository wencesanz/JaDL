/* global React, Eyebrow */
const { useState: useSubSt } = React;

function SubmitView() {
  const [form, setForm] = useSubSt({
    name: "",
    url: "",
    ig: "",
    categories: [],
    otherCategory: "",
    city: "",
    country: "",
    founded: "",
    size: "",
    description: "",
    submitterName: "",
    submitterEmail: "",
    relation: "own",
    notes: "",
  });
  const [sent, setSent] = useSubSt(false);
  const [sending, setSending] = useSubSt(false);
  const [failedMailto, setFailedMailto] = useSubSt(null);
  const [hp, setHp] = useSubSt(""); // honeypot

  const EDITOR_EMAIL = "wencesanz@gmail.com";

  const d = window.SITE;
  const cats = (d.categoriesOrder || []).filter((c) => d.byCat?.[c]);

  function upd(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function resolvedCats() {
    const cats = [...form.categories];
    if (cats.includes("__other") && form.otherCategory) {
      cats.splice(cats.indexOf("__other"), 1, form.otherCategory);
    } else if (cats.includes("__other")) {
      cats.splice(cats.indexOf("__other"), 1);
    }
    return cats.join(", ");
  }

  function relationLabel() {
    return form.relation === "own" ? "I run this studio" : form.relation === "work" ? "I work there" : "Just a fan / reader";
  }

  function buildMailto() {
    const lines = [
      `Studio name: ${form.name}`,
      `Website: ${form.url}`,
      `Instagram: ${form.ig || "—"}`,
      `Disciplines: ${resolvedCats() || "—"}`,
      `City: ${form.city || "—"}`,
      `Country: ${form.country || "—"}`,
      `Founded: ${form.founded || "—"}`,
      `Team size: ${form.size || "—"}`,
      ``,
      `Description:`,
      `${form.description || "—"}`,
      ``,
      `— About the submitter —`,
      `Name: ${form.submitterName || "—"}`,
      `Email: ${form.submitterEmail || "—"}`,
      `Relation: ${relationLabel()}`,
      ``,
      `Notes to editor:`,
      `${form.notes || "—"}`,
    ];
    const subject = `Studio submission — ${form.name || "(untitled)"}`;
    return `mailto:${EDITOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setFailedMailto(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          url: form.url,
          ig: form.ig,
          categories: resolvedCats(),
          city: form.city,
          country: form.country,
          founded: form.founded,
          size: form.size,
          description: form.description,
          submitterName: form.submitterName,
          submitterEmail: form.submitterEmail,
          relation: relationLabel(),
          notes: form.notes,
          website2: hp, // honeypot
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch (err) {
      console.error("submit failed", err);
      // Fall back to the old mail flow so no submission is ever lost.
      setFailedMailto(buildMailto());
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="view wrap">
        <section className="masthead masthead--tight">
          <Eyebrow><span>Submit</span></Eyebrow>
          <h1 style={{ marginTop: 20 }}>Received. Thank you.</h1>
          <p className="sub" style={{ maxWidth: "60ch" }}>
            Your submission is in the editor's queue. Every entry is read by
            hand — expect no acknowledgement email, but do expect the studio
            to be researched. If I have questions I'll write to the address
            you left.
          </p>
          <p className="sub" style={{ marginTop: 24 }}>
            <a className="link" onClick={() => setSent(false)}>← Submit another</a>
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="view wrap">
      <section className="masthead masthead--tight">
        <Eyebrow><span>Submit</span></Eyebrow>
        <h1 style={{ marginTop: 20 }}>
          Suggest a <em>studio</em>.
        </h1>
        <p className="sub" style={{ maxWidth: "62ch" }}>
          Just a Design List (JaDL) is a hand-edited list. Entries are read, researched and added when they fit.
          If you run a studio, know one worth including, or spotted a mistake, fill this in.
        </p>
      </section>

      <form className="submit-form" onSubmit={handleSubmit}>
        {/* studio */}
        <fieldset>
          <legend>Studio</legend>

          <div className="fld">
            <label>Studio name <span className="req">*</span></label>
            <input required value={form.name} onChange={(e) => upd("name", e.target.value)} placeholder="e.g. Atelier Dyakova" />
          </div>

          <div className="two">
            <div className="fld">
              <label>Website <span className="req">*</span></label>
              <input required type="url" value={form.url} onChange={(e) => upd("url", e.target.value)} placeholder="https://…" />
            </div>
            <div className="fld">
              <label>Instagram</label>
              <input type="url" value={form.ig} onChange={(e) => upd("ig", e.target.value)} placeholder="https://instagram.com/handle" />
            </div>
          </div>

          <div className="fld">
            <label>Disciplines <span className="req">*</span> <span style={{ color: "var(--mute)", fontWeight: 400 }}>— select one or more</span></label>
            <div className="chip-grid">
              {cats.map((c) => {
                const on = form.categories.includes(c);
                return (
                  <label key={c} className={`chip-check ${on ? "on" : ""}`}>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) => {
                        setForm((f) => ({
                          ...f,
                          categories: e.target.checked
                            ? [...f.categories, c]
                            : f.categories.filter((x) => x !== c),
                        }));
                      }}
                    />
                    <span>{c}</span>
                  </label>
                );
              })}
              <label className={`chip-check ${form.categories.includes("__other") ? "on" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.categories.includes("__other")}
                  onChange={(e) => {
                    setForm((f) => ({
                      ...f,
                      categories: e.target.checked
                        ? [...f.categories, "__other"]
                        : f.categories.filter((x) => x !== "__other"),
                    }));
                  }}
                />
                <span>Other…</span>
              </label>
            </div>
            {form.categories.length === 0 && (
              <input required style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }} value="" onChange={() => {}} />
            )}
          </div>

          {form.categories.includes("__other") && (
            <div className="fld">
              <label>Other discipline</label>
              <input value={form.otherCategory} onChange={(e) => upd("otherCategory", e.target.value)} placeholder="Name the discipline" />
            </div>
          )}

          <div className="two">
            <div className="fld">
              <label>City <span className="req">*</span></label>
              <input required value={form.city} onChange={(e) => upd("city", e.target.value)} placeholder="e.g. Madrid" />
            </div>
            <div className="fld">
              <label>Country <span className="req">*</span></label>
              <input required value={form.country} onChange={(e) => upd("country", e.target.value)} placeholder="e.g. Spain" />
            </div>
          </div>

          <div className="two">
            <div className="fld">
              <label>Founded (year)</label>
              <input value={form.founded} onChange={(e) => upd("founded", e.target.value)} placeholder="e.g. 2019" />
            </div>
            <div className="fld">
              <label>Team size</label>
              <input value={form.size} onChange={(e) => upd("size", e.target.value)} placeholder="e.g. 4" />
            </div>
          </div>

          <div className="fld">
            <label>Short description</label>
            <textarea rows={4} value={form.description} onChange={(e) => upd("description", e.target.value)} placeholder="One or two sentences — what they do, why it's worth including." />
          </div>
        </fieldset>

        {/* submitter */}
        <fieldset>
          <legend>About you</legend>

          <div className="two">
            <div className="fld">
              <label>Your name <span className="req">*</span></label>
              <input required value={form.submitterName} onChange={(e) => upd("submitterName", e.target.value)} />
            </div>
            <div className="fld">
              <label>Your email <span className="req">*</span></label>
              <input required type="email" value={form.submitterEmail} onChange={(e) => upd("submitterEmail", e.target.value)} placeholder="you@domain.com" />
            </div>
          </div>

          <div className="fld">
            <label>Relation to the studio</label>
            <div className="radio-row">
              {[
                ["own", "I run this studio"],
                ["work", "I work there"],
                ["fan", "Just a fan / reader"],
              ].map(([v, lbl]) => (
                <label key={v} className="radio">
                  <input type="radio" name="relation" value={v} checked={form.relation === v} onChange={(e) => upd("relation", e.target.value)} />
                  <span>{lbl}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="fld">
            <label>Notes to editor (optional)</label>
            <textarea rows={3} value={form.notes} onChange={(e) => upd("notes", e.target.value)} placeholder="Anything else — links to specific work, press, reasons to include…" />
          </div>
        </fieldset>

        {/* Honeypot — hidden from humans, irresistible to bots */}
        <div style={{ position: "absolute", left: "-9999px", top: "auto" }} aria-hidden="true">
          <label>Leave this field empty</label>
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>

        <div className="submit-row">
          <button type="submit" className="submit-btn" disabled={sending}>
            {sending ? "Sending…" : "Send submission"} <span className="arr">→</span>
          </button>
          {failedMailto && (
            <p style={{ color: "var(--accent)", fontSize: 13, marginTop: 12, maxWidth: "62ch" }}>
              Something went wrong sending this automatically.{" "}
              <a className="link" href={failedMailto}>Send it by email instead</a> — the
              message is already written for you.
            </p>
          )}
          <p style={{ color: "var(--mute)", fontSize: 13, marginTop: 12, maxWidth: "62ch" }}>
            Submissions go straight to the editor's queue. Prefer email? Write to{" "}
            <a className="link" href={`mailto:${EDITOR_EMAIL}`}>{EDITOR_EMAIL}</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

Object.assign(window, { SubmitView });
