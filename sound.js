// sound.js — a short click when a button is pressed.
// Buttons only (not links or studio rows). On by default at a soft volume;
// the speaker icon in the top bar turns it off, and the choice is remembered.
// Uses Web Audio so the click plays instantly and overlaps cleanly.
(function () {
  "use strict";
  var KEY = "jadl_sound";
  var VOLUME = 0.35;
  var h = window.React && window.React.createElement;

  function isOn() {
    try { return localStorage.getItem(KEY) !== "off"; } catch (e) { return true; }
  }
  function setOn(on) {
    try { localStorage.setItem(KEY, on ? "on" : "off"); } catch (e) {}
    window.dispatchEvent(new CustomEvent("jadl:sound", { detail: on }));
  }

  var ctx = null, buffer = null, loading = null;
  function src() {
    var a = document.createElement("audio");
    return a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"') ? "/sounds/click.ogg" : "/sounds/click.mp3";
  }
  function load() {
    if (buffer || loading) return loading;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = ctx || new AC();
    loading = fetch(src()).then(function (r) { return r.arrayBuffer(); }).then(function (data) {
      return new Promise(function (ok, ko) { ctx.decodeAudioData(data, ok, ko); });
    }).then(function (b) { buffer = b; return b; }).catch(function () { loading = null; });
    return loading;
  }
  function play() {
    if (!buffer || !ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    var s = ctx.createBufferSource(), g = ctx.createGain();
    g.gain.value = VOLUME;
    s.buffer = buffer;
    s.connect(g).connect(ctx.destination);
    s.start(0);
  }

  // Warm up on the first touch or key press (browsers only allow audio after
  // the person interacts), so the very first click already has the sound.
  function warm() { if (isOn()) load(); }
  window.addEventListener("pointerdown", warm, { once: true, capture: true });
  window.addEventListener("keydown", warm, { once: true, capture: true });

  document.addEventListener("click", function (e) {
    if (!isOn()) return;
    var el = e.target && e.target.closest ? e.target.closest('button, [role="button"], input[type="submit"], input[type="button"]') : null;
    if (!el || el.disabled || el.getAttribute("aria-disabled") === "true" || el.hasAttribute("data-no-sound")) return;
    if (buffer) play(); else { var p = load(); if (p) p.then(play); }
  }, true);

  // The speaker toggle in the top bar.
  window.JadlSoundButton = function () {
    var st = window.React.useState(isOn), on = st[0], set = st[1];
    window.React.useEffect(function () {
      var f = function (e) { set(!!e.detail); };
      window.addEventListener("jadl:sound", f);
      return function () { window.removeEventListener("jadl:sound", f); };
    }, []);
    var toggle = function () {
      var next = !on;
      setOn(next);
      set(next);
      if (next) { var p = load(); if (p) p.then(play); }
    };
    var wave = on ? [h("path", { key: "a", d: "M15.5 8.5a5 5 0 0 1 0 7" }), h("path", { key: "b", d: "M18.5 5.5a9 9 0 0 1 0 13" })]
      : [h("path", { key: "c", d: "M16 9.5l5 5M21 9.5l-5 5" })];
    return h("button", {
      type: "button", className: "theme-toggle sound-toggle", onClick: toggle, "data-no-sound": "",
      "aria-pressed": on ? "true" : "false",
      "aria-label": on ? "Turn click sounds off" : "Turn click sounds on",
      title: on ? "Sound on" : "Sound off"
    }, h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
      [h("path", { key: "s", d: "M4 9.5h3.5L12 5.5v13l-4.5-4H4z" })].concat(wave)));
  };
})();
