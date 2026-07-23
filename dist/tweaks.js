(function(){
"use strict";
const {
  useState: useTwState,
  useEffect: useTwEffect
} = React;
const TWEAK_DEFAULTS = {
  "palette": "mono",
  "density": "default",
  "accent": "on",
  "type": "sans",
  "motion": "on"
};
function Tweaks() {
  const [open, setOpen] = useTwState(false);
  const [vals, setVals] = useTwState(TWEAK_DEFAULTS);
  useTwEffect(() => {
    function onMsg(e) {
      if (e.data?.type === "__activate_edit_mode") setOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setOpen(false);
    }
    window.addEventListener("message", onMsg);
    window.parent.postMessage({
      type: "__edit_mode_available"
    }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);
  useTwEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", vals.palette || "mono");
    if (vals.density === "default" || !vals.density) root.removeAttribute("data-density");else root.setAttribute("data-density", vals.density);
    if (vals.accent === "off") root.setAttribute("data-accent", "off");else root.removeAttribute("data-accent");
    if (vals.motion === "off") root.setAttribute("data-listfx", "off");else root.removeAttribute("data-listfx");
    root.setAttribute("data-type", vals.type || "sans");
  }, [vals]);
  function set(k, v) {
    const next = {
      ...vals,
      [k]: v
    };
    setVals(next);
    window.parent.postMessage({
      type: "__edit_mode_set_keys",
      edits: {
        [k]: v
      }
    }, "*");
  }
  if (!open) return null;
  const seg = (k, options) => React.createElement("div", {
    className: "seg"
  }, options.map(o => React.createElement("button", {
    key: o,
    "data-on": vals[k] === o,
    onClick: () => set(k, o)
  }, o)));
  return React.createElement("div", {
    className: "tweaks"
  }, React.createElement("button", {
    className: "close",
    onClick: () => setOpen(false)
  }, "\xD7"), React.createElement("h5", null, "Tweaks"), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Palette"), seg("palette", ["mono", "paper", "cool"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Type"), seg("type", ["sans", "serif"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Density"), seg("density", ["compact", "default", "roomy"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "Accent"), seg("accent", ["on", "off"])), React.createElement("div", {
    className: "row"
  }, React.createElement("label", null, "List motion"), seg("motion", ["on", "off"])));
}
Object.assign(window, {
  Tweaks
});
})();
