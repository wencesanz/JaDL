(function(){
"use strict";
let lastRandomName = null;
function pickRandomStudio(excludeName) {
  const all = window.SITE && window.SITE.studios || [];
  if (!all.length) return null;
  let pool = all.filter(s => s.name !== excludeName && s.name !== lastRandomName);
  if (!pool.length) pool = all.filter(s => s.name !== excludeName);
  if (!pool.length) pool = all;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  lastRandomName = pick.name;
  return pick;
}
function RandomKbd() {
  return React.createElement("kbd", {
    className: "random-kbd",
    "aria-hidden": "true"
  }, "R");
}
function RandomCTA({
  go
}) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    const s = pickRandomStudio(null);
    if (s) go("studio", {
      name: s.name
    });
  };
  return React.createElement("section", {
    className: "wrap"
  }, React.createElement("div", {
    className: "random-cta"
  }, React.createElement("div", {
    className: "random-cta-copy"
  }, React.createElement("div", {
    className: "random-cta-lead"
  }, "Not sure where to start?"), React.createElement("div", {
    className: "random-cta-sub"
  }, "Let the index choose for you.")), React.createElement("button", {
    className: "random-cta-btn",
    onClick: open,
    onMouseEnter: () => setSpin(true),
    onAnimationEnd: () => setSpin(false)
  }, React.createElement("span", null, "Open a random studio"), React.createElement("span", {
    className: `random-glyph ${spin ? "is-spin" : ""}`,
    "aria-hidden": "true"
  }, "\u2933"), React.createElement(RandomKbd, null))));
}
function RandomButton({
  go,
  currentName
}) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    setSpin(true);
    const s = pickRandomStudio(currentName);
    if (s) go("studio", {
      name: s.name
    });
  };
  return React.createElement("button", {
    className: "random-btn",
    onClick: open,
    title: "Jump to a random studio (press R)"
  }, React.createElement("span", null, "Random"), React.createElement("span", {
    className: `random-glyph ${spin ? "is-spin" : ""}`,
    onAnimationEnd: () => setSpin(false),
    "aria-hidden": "true"
  }, "\u2933"), React.createElement(RandomKbd, null));
}
Object.assign(window, {
  pickRandomStudio,
  RandomCTA,
  RandomButton,
  RandomInline
});
function RandomInline({
  go
}) {
  const [spin, setSpin] = React.useState(false);
  const open = () => {
    setSpin(true);
    const s = pickRandomStudio(null);
    if (s) go("studio", {
      name: s.name
    });
  };
  return React.createElement("button", {
    className: "random-inline",
    onClick: open
  }, React.createElement("span", null, "Open a random studio"), React.createElement("span", {
    className: `random-glyph ${spin ? "is-spin" : ""}`,
    onAnimationEnd: () => setSpin(false),
    "aria-hidden": "true"
  }, "\u2933"), React.createElement(RandomKbd, null));
}
})();
