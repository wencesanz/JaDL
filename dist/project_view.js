(function(){
"use strict";
const {
  useMemo: usePdMm,
  useState: usePdState,
  useEffect: usePdEffect
} = React;
const h = React.createElement;
const ES_MONTHS = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
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
      day: "numeric", month: "short", year: "numeric", timeZone: "UTC"
    }).format(d);
  } catch {
    return d.toDateString();
  }
}
const SD_STYLE_ID = "sd-detail-styles";
const SD_CSS = "/* Studio detail — new text + image layout.\n   Injected by this file on purpose: it must not depend on styles.css being\n   patched, nor on the stylesheet cache being fresh. Uses existing tokens\n   (--rule, --mute, --ink, --serif, --mono), so light/dark still apply. */\n.pd-head--stack {\n  display: block !important;\n  grid-template-columns: none !important;\n  padding: clamp(48px, 7vw, 110px) 0 36px;\n  border-bottom: 1px solid var(--rule);\n  text-align: left !important;\n}\n.pd-head--stack h2 {\n  margin: 18px 0 0 !important;\n  max-width: 18ch;\n  text-align: left !important;\n}\n.pd-meta-line {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px 28px;\n  margin-top: 30px;\n  font-family: var(--mono);\n  font-size: 12px;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--mute);\n}\n.sd-spread {\n  display: grid;\n  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);\n  gap: 48px;\n  padding-top: 48px;\n  align-items: start;\n}\n.sd-figure-col, .sd-col { min-width: 0; }\n.sd-figure-link { display: block; min-width: 0; }\n.sd-figure {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  border: 1px solid var(--rule);\n  background: var(--col, #D8CFBD);\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.sd-figure .pd-hero-img {\n  position: absolute;\n  inset: 0;\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  object-fit: cover;\n  object-position: top center;\n  display: block;\n  transition: opacity .45s ease;\n}\n.sd-figure-fallback {\n  position: relative;\n  z-index: 2;\n  padding: 0 40px;\n  text-align: center;\n  font-family: var(--serif);\n  font-style: italic;\n  font-size: clamp(36px, 6vw, 80px);\n  line-height: 1;\n  color: var(--ink);\n  opacity: .25;\n}\n.sd-figure-link:hover .sd-figure { border-color: var(--ink); }\n.sd-cap {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  margin-top: 12px;\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--mute);\n}\n.sd-nav { display: flex; flex-direction: column; }\n.sd-nav-row {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  align-items: baseline;\n  gap: 16px;\n  padding: 13px 0;\n  border-top: 1px solid var(--rule);\n  cursor: pointer;\n}\n.sd-nav-row .t { font-family: var(--serif); font-size: 22px; letter-spacing: -.01em; }\n.sd-nav-row .k {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--mute);\n  white-space: nowrap;\n}\n.sd-nav-row:hover .t { color: var(--accent); }\n.sd-note {\n  margin: 26px 0 0;\n  font-size: 15px;\n  line-height: 1.65;\n  color: var(--ink-2, var(--mute));\n  text-wrap: pretty;\n}\n.sd-links { display: grid; margin-top: 32px; border-top: 1px solid var(--rule); }\n.sd-links a {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 12px;\n  padding: 13px 0;\n  border-bottom: 1px solid var(--rule);\n  font-family: var(--mono);\n  font-size: 13px;\n  color: var(--ink);\n  text-decoration: none;\n}\n.sd-links a:hover { color: var(--accent); }\n.sd-col .save-block { margin-top: 24px; }\n.sd-lbl {\n  margin-top: 36px;\n  padding-top: 20px;\n  border-top: 1px solid var(--rule);\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--mute);\n}\n.sd-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }\n.sd-tag {\n  font-family: var(--mono);\n  font-size: 11px;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--ink);\n  border: 1px solid var(--rule);\n  border-radius: 999px;\n  padding: 6px 12px;\n  cursor: pointer;\n  transition: border-color .15s ease, color .15s ease;\n}\n.sd-tag:hover { border-color: var(--ink); color: var(--accent); }\n@media (max-width: 900px) {\n  .sd-spread { grid-template-columns: 1fr; gap: 32px; }\n  .sd-cap { flex-direction: column; gap: 6px; }\n}";
function ensureSdStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SD_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = SD_STYLE_ID;
  el.textContent = SD_CSS;
  document.head.appendChild(el);
}
ensureSdStyles();
function StudioHero({ s, col }) {
  const [loaded, setLoaded] = usePdState(false);
  const [srcIdx, setSrcIdx] = usePdState(0);
  const sources = s.url ? [`/api/ogimage?url=${encodeURIComponent(s.url)}`, `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1600&h=1200`] : [];
  usePdEffect(() => {
    setLoaded(false);
    setSrcIdx(0);
  }, [s.url]);
  const shot = sources[srcIdx] || null;
  const exhausted = srcIdx >= sources.length;
  const advance = () => setSrcIdx(i => i + 1);
  // Geometry is inline on purpose: .pd-hero-img has no size of its own in
  // styles.css, so a stale or unpatched stylesheet would let the screenshot
  // render at natural size and blow out the page.
  return h("div", {
    className: "sd-figure",
    style: {
      "--col": col,
      position: "relative",
      width: "100%",
      aspectRatio: "4 / 3",
      overflow: "hidden"
    }
  }, shot && !exhausted && h("img", {
    key: shot,
    src: shot,
    alt: `${s.name} — website preview`,
    onLoad: e => { if (e.target.naturalWidth > 100) setLoaded(true); else advance(); },
    onError: advance,
    className: "pd-hero-img",
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      maxWidth: "100%",
      objectFit: "cover",
      objectPosition: "top center",
      display: "block",
      opacity: loaded ? 1 : 0,
      transition: "opacity .45s ease"
    }
  }), !loaded && h("div", {
    className: "sd-figure-fallback",
    style: { position: "relative", zIndex: 2 }
  }, s.name));
}
const CORRECTION_ENDPOINT = "https://formspree.io/f/xzdylwvg";
const EDITOR_EMAIL_CORR = "hola@justadesignlist.com";

// Discreet "spot something wrong?" link that expands into a tiny inline
// form, posting straight to Formspree. Keeps the same fallback pattern as
// SubmitView: if the network call fails, hand the user a pre-written
// mailto: link instead of just failing silently.
function CorrectionBlock({ s }) {
  const [open, setOpen] = usePdState(false);
  const [note, setNote] = usePdState("");
  const [email, setEmail] = usePdState("");
  const [sending, setSending] = usePdState(false);
  const [sent, setSent] = usePdState(false);
  const [err, setErr] = usePdState(null);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!note.trim() || sending) return;
    setSending(true);
    setErr(null);
    try {
      const res = await fetch(CORRECTION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `Correction — ${s.name}`,
          studio: s.name,
          page: pageUrl,
          note,
          email
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch (err2) {
      console.error("correction submit failed", err2);
      setErr(err2.message);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return h("div", { className: "correction-block" },
      h("p", { className: "correction-note" }, "Thanks — noted. It'll be checked."));
  }

  return h("div", { className: "correction-block" }, !open ? h("button", {
    className: "correction-toggle",
    onClick: () => setOpen(true)
  }, h("span", null, "Spot something wrong? Suggest a correction")) : h("form", {
    className: "correction-form",
    onSubmit: handleSubmit
  }, h("textarea", {
    required: true,
    value: note,
    onChange: e => setNote(e.target.value),
    placeholder: "What's outdated or wrong? (e.g. broken link, wrong city, new category)"
  }), h("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "Your email (optional, in case of questions)"
  }), h("button", {
    type: "submit",
    className: "correction-submit",
    disabled: sending
  }, sending ? "Sending…" : "Send"), err && h("p", {
    className: "correction-note",
    style: { color: "var(--accent)" }
  }, `Couldn't send (${err}). `, h("a", {
    className: "link",
    href: `mailto:${EDITOR_EMAIL_CORR}?subject=${encodeURIComponent("Correction — " + s.name)}&body=${encodeURIComponent(note + (email ? "\n\nFrom: " + email : "") + "\n\nPage: " + pageUrl)}`
  }, "send by email instead"))));
}
function StudioDetail({ name, go }) {
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
    return h("div", {
      className: "view wrap",
      style: { paddingTop: 120 }
    }, h("p", {
      style: { fontFamily: "var(--serif)", fontSize: 32 }
    }, "Entry not found."), h("button", {
      onClick: () => go("studios"),
      className: "link",
      style: { fontFamily: "var(--mono)", fontSize: 12 }
    }, "\u2190 Back to the list"));
  }
  const col = d.catColors?.[s.category.split(",")[0].trim()] || "#D8CFBD";
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const igHandle = (s.ig || "").split("/").filter(Boolean).pop();
  const cats = s.category.split(",").map(c => c.trim()).filter(Boolean);
  const place = [s.city, s.country].filter(Boolean).join(", ");
  usePdEffect(() => {
    ensureSdStyles();
    if (window.recordVisit) window.recordVisit(s.name);
  }, [s.name]);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${s.name} — ${cats[0] || "design"}${s.city ? `, ${s.city}` : ""} · via Just a Design List`;
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

  const shareBlock = h("div", { className: "share-block" }, h("div", {
    className: "share-lbl"
  }, "Share"), h("div", { className: "share-row" }, h("a", {
    className: "share-btn",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Share on X / Twitter",
    title: "Share on X / Twitter"
  }, h("svg", {
    viewBox: "0 0 24 24", width: "14", height: "14", fill: "currentColor", "aria-hidden": "true"
  }, h("path", {
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  })), h("span", null, "X")), h("a", {
    className: "share-btn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Share on LinkedIn",
    title: "Share on LinkedIn"
  }, h("svg", {
    viewBox: "0 0 24 24", width: "14", height: "14", fill: "currentColor", "aria-hidden": "true"
  }, h("path", {
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
  })), h("span", null, "LinkedIn")), h("a", {
    className: "share-btn",
    href: `mailto:?subject=${encodeURIComponent(s.name + " — Just a Design List")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
    "aria-label": "Share by email",
    title: "Share by email"
  }, h("svg", {
    viewBox: "0 0 24 24", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "1.6", "aria-hidden": "true"
  }, h("rect", { x: "3", y: "5", width: "18", height: "14", rx: "1" }), h("path", {
    d: "M3 7l9 6 9-6"
  })), h("span", null, "Email")), h("button", {
    className: "share-btn",
    onClick: () => setIgOpen(true),
    "aria-label": "Share to Instagram",
    title: "Share to Instagram"
  }, h("svg", {
    viewBox: "0 0 24 24", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "1.6", "aria-hidden": "true"
  }, h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), h("circle", {
    cx: "12", cy: "12", r: "4"
  }), h("circle", {
    cx: "17.5", cy: "6.5", r: "1", fill: "currentColor", stroke: "none"
  })), h("span", null, "Instagram")), h("button", {
    className: "share-btn",
    onClick: copyLink,
    "aria-label": "Copy link",
    title: "Copy link"
  }, h("svg", {
    viewBox: "0 0 24 24", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true"
  }, h("path", {
    d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"
  }), h("path", {
    d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"
  })), h("span", null, copied ? "Copied" : "Copy link"))));

  return h("div", { className: "view wrap" }, h("div", {
    className: "pd-topbar"
  }, h("button", {
    onClick: () => go("studios"),
    className: "back-btn",
    "aria-label": "Back to the list"
  }, h("span", { className: "arr" }, "\u2190"), h("span", null, "The List")),
    window.RandomButton ? h(window.RandomButton, { go: go, currentName: s.name }) : null),

  h("div", { className: "pd-head pd-head--stack" },
    h(Eyebrow, null, h("span", { className: "num" }, `№ ${String(idx + 1).padStart(3, "0")} of ${all.length}`)),
    h("h2", null, s.name),
    h("div", { className: "pd-meta-line" },
      place && h("span", null, place),
      h("span", null, "Indexed ", formatIndexed(s.created || s.edited)),
      cats.length > 0 && h("span", null, cats.join(" · ")))),

  h("div", { className: "sd-spread" },
    h("div", { className: "sd-figure-col", style: { minWidth: 0 } },
      s.url ? h("a", {
        href: s.url, target: "_blank", rel: "noopener", className: "sd-figure-link",
        style: { display: "block", minWidth: 0 }
      }, h(StudioHero, { s: s, col: col })) : h(StudioHero, { s: s, col: col }),
      h("div", { className: "sd-cap" },
        h("span", null, host ? `${host}, homepage` : "Studio site preview"),
        s.url && h("a", {
          className: "link", href: s.url, target: "_blank", rel: "noopener"
        }, "Visit the site ↗"))),

    h("div", { className: "sd-col" },
      h("div", { className: "sd-nav" },
        h("div", {
          className: "sd-nav-row",
          onClick: () => go("studio", { name: prev.name })
        }, h("span", { className: "t" }, prev.name), h("span", { className: "k" }, "← Previous")),
        h("div", {
          className: "sd-nav-row",
          onClick: () => go("studio", { name: next.name })
        }, h("span", { className: "t" }, next.name), h("span", { className: "k" }, "Next →"))),

      h("p", { className: "sd-note" }, "The entry is intentionally brief. The index is a pointer, not a review \u2014 visit the studio's own site to see the work in its preferred frame. What we note here is only what is needed to find the practice again: where it is, what it does, and where to look."),

      h("div", { className: "sd-links" },
        s.url && h("a", {
          href: s.url, target: "_blank", rel: "noopener"
        }, h("span", {
          style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
        }, host), h("span", { style: { color: "var(--mute)" } }, "\u2197")),
        s.ig && h("a", {
          href: s.ig, target: "_blank", rel: "noopener"
        }, h("span", {
          style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
        }, "@", igHandle), h("span", { style: { color: "var(--mute)" } }, "\u2197"))),

      window.SaveButton ? h("div", { className: "save-block" },
        h(window.SaveButton, { studio: s })) : null,

      shareBlock,

      h(CorrectionBlock, { s: s }),

      h("div", { className: "sd-lbl" }, "Filed under"),
      h("div", { className: "sd-tags" },
        cats.map(t => h("span", {
          key: t,
          className: "sd-tag",
          onClick: () => go("collection", { kind: "discipline", value: t })
        }, t, d.byCat && d.byCat[t] ? ` · ${d.byCat[t]}` : "")),
        s.country && h("span", {
          key: "country",
          className: "sd-tag",
          onClick: () => go("collection", { kind: "country", value: s.country.split(",")[0].trim() })
        }, s.country.split(",")[0].trim(),
           d.byCountry && d.byCountry[s.country.split(",")[0].trim()] ? ` · ${d.byCountry[s.country.split(",")[0].trim()]}` : "")))),

  related.length > 0 && h("div", {
    style: { paddingTop: 64, marginTop: 64, borderTop: "1px solid var(--rule)" }
  }, h(Eyebrow, null, "Neighbours in ", cats[0]), h("div", {
    className: "st-list",
    style: { marginTop: 24 }
  }, related.map(r => h("div", {
    key: r.name,
    className: "studio-row",
    onClick: () => go("studio", { name: r.name })
  }, h("div", { className: "t" }, r.name), h("div", {
    className: "c"
  }, r.city, r.city && r.country ? ", " : "", r.country), h("div", {
    className: "k"
  }, r.category), h("div", {
    className: "u"
  }, (r.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), h("div", {
    className: "arr"
  }, "\u2192"))))),

  igOpen && window.IGShareModal ? h(window.IGShareModal, {
    s: s, col: col, idx: idx, total: all.length, onClose: () => setIgOpen(false)
  }) : null,

  window.RecentlyViewedInline ? h(window.RecentlyViewedInline, {
    go: go, excludeName: s.name
  }) : null);
}
Object.assign(window, { StudioDetail });
})();
