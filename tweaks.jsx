/* global React */
const { useState: useTwState, useEffect: useTwEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "mono",
  "density": "default",
  "accent": "on",
  "type": "sans",
  "motion": "on"
}/*EDITMODE-END*/;

function Tweaks() {
  const [open, setOpen] = useTwState(false);
  const [vals, setVals] = useTwState(TWEAK_DEFAULTS);

  useTwEffect(() => {
    function onMsg(e) {
      if (e.data?.type === "__activate_edit_mode") setOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setOpen(false);
    }
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useTwEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", vals.palette || "mono");
    if (vals.density === "default" || !vals.density) root.removeAttribute("data-density");
    else root.setAttribute("data-density", vals.density);
    if (vals.accent === "off") root.setAttribute("data-accent", "off");
    else root.removeAttribute("data-accent");
    if (vals.motion === "off") root.setAttribute("data-listfx", "off");
    else root.removeAttribute("data-listfx");
    root.setAttribute("data-type", vals.type || "sans");
  }, [vals]);

  function set(k, v) {
    const next = { ...vals, [k]: v };
    setVals(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  }

  if (!open) return null;

  const seg = (k, options) => (
    <div className="seg">
      {options.map((o) => (
        <button key={o} data-on={vals[k] === o} onClick={() => set(k, o)}>{o}</button>
      ))}
    </div>
  );

  return (
    <div className="tweaks">
      <button className="close" onClick={() => setOpen(false)}>×</button>
      <h5>Tweaks</h5>
      <div className="row"><label>Palette</label>{seg("palette", ["mono", "paper", "cool"])}</div>
      <div className="row"><label>Type</label>{seg("type", ["sans", "serif"])}</div>
      <div className="row"><label>Density</label>{seg("density", ["compact", "default", "roomy"])}</div>
      <div className="row"><label>Accent</label>{seg("accent", ["on", "off"])}</div>
      <div className="row"><label>List motion</label>{seg("motion", ["on", "off"])}</div>
    </div>
  );
}

Object.assign(window, { Tweaks });
