(function(){
"use strict";
const {
  useState: useSubSt
} = React;
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
    notes: ""
  });
  const [sent, setSent] = useSubSt(false);
  const [sending, setSending] = useSubSt(false);
  const [failedMailto, setFailedMailto] = useSubSt(null);
  const [hp, setHp] = useSubSt("");
  const EDITOR_EMAIL = "wencesanz@gmail.com";
  const d = window.SITE;
  const cats = (d.categoriesOrder || []).filter(c => d.byCat?.[c]);
  function upd(k, v) {
    setForm(f => ({
      ...f,
      [k]: v
    }));
  }
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
    const lines = [`Studio name: ${form.name}`, `Website: ${form.url}`, `Instagram: ${form.ig || "—"}`, `Disciplines: ${resolvedCats() || "—"}`, `City: ${form.city || "—"}`, `Country: ${form.country || "—"}`, `Founded: ${form.founded || "—"}`, `Team size: ${form.size || "—"}`, ``, `Description:`, `${form.description || "—"}`, ``, `— About the submitter —`, `Name: ${form.submitterName || "—"}`, `Email: ${form.submitterEmail || "—"}`, `Relation: ${relationLabel()}`, ``, `Notes to editor:`, `${form.notes || "—"}`];
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
        headers: {
          "Content-Type": "application/json"
        },
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
          website2: hp
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch (err) {
      console.error("submit failed", err);
      setFailedMailto(buildMailto());
    } finally {
      setSending(false);
    }
  }
  if (sent) {
    return React.createElement("div", {
      className: "view wrap"
    }, React.createElement("section", {
      className: "masthead masthead--tight"
    }, React.createElement(Eyebrow, null, React.createElement("span", null, "Submit")), React.createElement("h1", {
      style: {
        marginTop: 20
      }
    }, "Received. Thank you."), React.createElement("p", {
      className: "sub",
      style: {
        maxWidth: "60ch"
      }
    }, "Your submission is in the editor's queue. Every entry is read by hand \u2014 expect no acknowledgement email, but do expect the studio to be researched. If I have questions I'll write to the address you left."), React.createElement("p", {
      className: "sub",
      style: {
        marginTop: 24
      }
    }, React.createElement("a", {
      className: "link",
      onClick: () => setSent(false)
    }, "\u2190 Submit another"))));
  }
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("section", {
    className: "masthead masthead--tight"
  }, React.createElement(Eyebrow, null, React.createElement("span", null, "Submit")), React.createElement("h1", {
    style: {
      marginTop: 20
    }
  }, "Suggest a ", React.createElement("em", null, "studio"), "."), React.createElement("p", {
    className: "sub",
    style: {
      maxWidth: "62ch"
    }
  }, "Just a Design List (JaDL) is a hand-edited list. Entries are read, researched and added when they fit. If you run a studio, know one worth including, or spotted a mistake, fill this in.")), React.createElement("form", {
    className: "submit-form",
    onSubmit: handleSubmit
  }, React.createElement("fieldset", null, React.createElement("legend", null, "Studio"), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Studio name ", React.createElement("span", {
    className: "req"
  }, "*")), React.createElement("input", {
    required: true,
    value: form.name,
    onChange: e => upd("name", e.target.value),
    placeholder: "e.g. Atelier Dyakova"
  })), React.createElement("div", {
    className: "two"
  }, React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Website ", React.createElement("span", {
    className: "req"
  }, "*")), React.createElement("input", {
    required: true,
    type: "url",
    value: form.url,
    onChange: e => upd("url", e.target.value),
    placeholder: "https://\u2026"
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Instagram"), React.createElement("input", {
    type: "url",
    value: form.ig,
    onChange: e => upd("ig", e.target.value),
    placeholder: "https://instagram.com/handle"
  }))), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Disciplines ", React.createElement("span", {
    className: "req"
  }, "*"), " ", React.createElement("span", {
    style: {
      color: "var(--mute)",
      fontWeight: 400
    }
  }, "\u2014 select one or more")), React.createElement("div", {
    className: "chip-grid"
  }, cats.map(c => {
    const on = form.categories.includes(c);
    return React.createElement("label", {
      key: c,
      className: `chip-check ${on ? "on" : ""}`
    }, React.createElement("input", {
      type: "checkbox",
      checked: on,
      onChange: e => {
        setForm(f => ({
          ...f,
          categories: e.target.checked ? [...f.categories, c] : f.categories.filter(x => x !== c)
        }));
      }
    }), React.createElement("span", null, c));
  }), React.createElement("label", {
    className: `chip-check ${form.categories.includes("__other") ? "on" : ""}`
  }, React.createElement("input", {
    type: "checkbox",
    checked: form.categories.includes("__other"),
    onChange: e => {
      setForm(f => ({
        ...f,
        categories: e.target.checked ? [...f.categories, "__other"] : f.categories.filter(x => x !== "__other")
      }));
    }
  }), React.createElement("span", null, "Other\u2026"))), form.categories.length === 0 && React.createElement("input", {
    required: true,
    style: {
      position: "absolute",
      opacity: 0,
      pointerEvents: "none",
      height: 0
    },
    value: "",
    onChange: () => {}
  })), form.categories.includes("__other") && React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Other discipline"), React.createElement("input", {
    value: form.otherCategory,
    onChange: e => upd("otherCategory", e.target.value),
    placeholder: "Name the discipline"
  })), React.createElement("div", {
    className: "two"
  }, React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "City ", React.createElement("span", {
    className: "req"
  }, "*")), React.createElement("input", {
    required: true,
    value: form.city,
    onChange: e => upd("city", e.target.value),
    placeholder: "e.g. Madrid"
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Country ", React.createElement("span", {
    className: "req"
  }, "*")), React.createElement("input", {
    required: true,
    value: form.country,
    onChange: e => upd("country", e.target.value),
    placeholder: "e.g. Spain"
  }))), React.createElement("div", {
    className: "two"
  }, React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Founded (year)"), React.createElement("input", {
    value: form.founded,
    onChange: e => upd("founded", e.target.value),
    placeholder: "e.g. 2019"
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Team size"), React.createElement("input", {
    value: form.size,
    onChange: e => upd("size", e.target.value),
    placeholder: "e.g. 4"
  }))), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Short description"), React.createElement("textarea", {
    rows: 4,
    value: form.description,
    onChange: e => upd("description", e.target.value),
    placeholder: "One or two sentences \u2014 what they do, why it's worth including."
  }))), React.createElement("fieldset", null, React.createElement("legend", null, "About you"), React.createElement("div", {
    className: "two"
  }, React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Your name ", React.createElement("span", {
    className: "req"
  }, "*")), React.createElement("input", {
    required: true,
    value: form.submitterName,
    onChange: e => upd("submitterName", e.target.value)
  })), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Your email ", React.createElement("span", {
    className: "req"
  }, "*")), React.createElement("input", {
    required: true,
    type: "email",
    value: form.submitterEmail,
    onChange: e => upd("submitterEmail", e.target.value),
    placeholder: "you@domain.com"
  }))), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Relation to the studio"), React.createElement("div", {
    className: "radio-row"
  }, [["own", "I run this studio"], ["work", "I work there"], ["fan", "Just a fan / reader"]].map(([v, lbl]) => React.createElement("label", {
    key: v,
    className: "radio"
  }, React.createElement("input", {
    type: "radio",
    name: "relation",
    value: v,
    checked: form.relation === v,
    onChange: e => upd("relation", e.target.value)
  }), React.createElement("span", null, lbl))))), React.createElement("div", {
    className: "fld"
  }, React.createElement("label", null, "Notes to editor (optional)"), React.createElement("textarea", {
    rows: 3,
    value: form.notes,
    onChange: e => upd("notes", e.target.value),
    placeholder: "Anything else \u2014 links to specific work, press, reasons to include\u2026"
  }))), React.createElement("div", {
    style: {
      position: "absolute",
      left: "-9999px",
      top: "auto"
    },
    "aria-hidden": "true"
  }, React.createElement("label", null, "Leave this field empty"), React.createElement("input", {
    tabIndex: -1,
    autoComplete: "off",
    value: hp,
    onChange: e => setHp(e.target.value)
  })), React.createElement("div", {
    className: "submit-row"
  }, React.createElement("button", {
    type: "submit",
    className: "submit-btn",
    disabled: sending
  }, sending ? "Sending…" : "Send submission", " ", React.createElement("span", {
    className: "arr"
  }, "\u2192")), failedMailto && React.createElement("p", {
    style: {
      color: "var(--accent)",
      fontSize: 13,
      marginTop: 12,
      maxWidth: "62ch"
    }
  }, "Something went wrong sending this automatically.", " ", React.createElement("a", {
    className: "link",
    href: failedMailto
  }, "Send it by email instead"), " \u2014 the message is already written for you."), React.createElement("p", {
    style: {
      color: "var(--mute)",
      fontSize: 13,
      marginTop: 12,
      maxWidth: "62ch"
    }
  }, "Submissions go straight to the editor's queue. Prefer email? Write to", " ", React.createElement("a", {
    className: "link",
    href: `mailto:${EDITOR_EMAIL}`
  }, EDITOR_EMAIL), "."))));
}
Object.assign(window, {
  SubmitView
});
})();
