(function(){
"use strict";
const {
  useState: useSavedState,
  useEffect: useSavedEffect
} = React;
const SAVED_KEY = "tsi_saved";
const SavedStore = (() => {
  const listeners = new Set();
  let items = load();
  function load() {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const arr = Array.isArray(parsed) ? parsed : parsed && parsed.items;
      return Array.isArray(arr) ? arr.filter(x => x && x.slug).map(x => ({
        slug: x.slug,
        name: x.name || "",
        at: x.at || 0
      })) : [];
    } catch (e) {
      return [];
    }
  }
  function persist() {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify({
        v: 1,
        items
      }));
    } catch (e) {}
  }
  function emit() {
    listeners.forEach(fn => {
      try {
        fn(items);
      } catch (e) {}
    });
  }
  if (typeof window !== "undefined") {
    window.addEventListener("storage", e => {
      if (e.key === SAVED_KEY) {
        items = load();
        emit();
      }
    });
  }
  return {
    get() {
      return items.slice();
    },
    has(slug) {
      return items.some(x => x.slug === slug);
    },
    count() {
      return items.length;
    },
    toggle(slug, name) {
      if (!slug) return;
      if (this.has(slug)) items = items.filter(x => x.slug !== slug);else items = [{
        slug,
        name: name || "",
        at: Date.now()
      }, ...items];
      persist();
      emit();
    },
    remove(slug) {
      items = items.filter(x => x.slug !== slug);
      persist();
      emit();
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
})();
function useSaved() {
  const [, force] = useSavedState(0);
  useSavedEffect(() => SavedStore.subscribe(() => force(n => n + 1)), []);
  return SavedStore;
}
function savedSlugify(s) {
  return (s || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function SaveButton({
  studio
}) {
  const store = useSaved();
  if (!studio) return null;
  const slug = savedSlugify(studio.name);
  const saved = store.has(slug);
  return React.createElement("button", {
    className: `save-btn ${saved ? "is-saved" : ""}`,
    onClick: () => store.toggle(slug, studio.name),
    "aria-pressed": saved,
    title: saved ? "Remove from My List" : "Save to My List"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: saved ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
  })), React.createElement("span", null, saved ? "Saved" : "Save"));
}
function MyListView({
  go
}) {
  const store = useSaved();
  const all = window.SITE && window.SITE.studios || [];
  const bySlug = React.useMemo(() => {
    const m = new Map();
    all.forEach(s => m.set(savedSlugify(s.name), s));
    return m;
  }, [all]);
  const rows = store.get().map(it => ({
    it,
    s: bySlug.get(it.slug)
  })).filter(r => r.s);
  return React.createElement("div", {
    className: "view wrap"
  }, React.createElement("div", {
    className: "pd-head"
  }, React.createElement("div", null, React.createElement(Eyebrow, null, React.createElement("span", null, "Saved")), React.createElement("h2", {
    style: {
      marginTop: 14
    }
  }, "My List")), React.createElement("dl", {
    className: "meta"
  }, React.createElement("dt", null, "Saved"), React.createElement("dd", null, rows.length, " ", rows.length === 1 ? "studio" : "studios"), React.createElement("dt", null, "Storage"), React.createElement("dd", null, "This browser only"))), rows.length === 0 ? React.createElement("div", {
    className: "mylist-empty"
  }, React.createElement("p", {
    className: "lead"
  }, "Nothing saved yet."), React.createElement("p", {
    className: "sub"
  }, "Open any studio and tap ", React.createElement("em", null, "Save"), " to keep it here. Your list lives in this browser \u2014 no account needed."), React.createElement("button", {
    onClick: () => go("studios"),
    className: "back-btn",
    style: {
      marginTop: 8
    }
  }, React.createElement("span", {
    className: "arr"
  }, "\u2192"), React.createElement("span", null, "Browse the studios"))) : React.createElement("div", {
    className: "st-list",
    style: {
      marginTop: 8
    }
  }, rows.map(({
    it,
    s
  }) => React.createElement("div", {
    key: it.slug,
    className: "studio-row mylist-row",
    onClick: () => go("studio", {
      name: s.name
    })
  }, React.createElement("div", {
    className: "t"
  }, s.name), React.createElement("div", {
    className: "c"
  }, s.city, s.city && s.country ? ", " : "", s.country), React.createElement("div", {
    className: "k"
  }, s.category), React.createElement("div", {
    className: "u"
  }, (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "")), React.createElement("button", {
    className: "mylist-remove",
    onClick: e => {
      e.stopPropagation();
      store.remove(it.slug);
    },
    "aria-label": `Remove ${s.name} from My List`,
    title: "Remove"
  }, "\xD7")))));
}
Object.assign(window, {
  SavedStore,
  useSaved,
  SaveButton,
  MyListView
});
})();
