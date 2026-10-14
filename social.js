// Social bits: the region colour code shared with the "From the list" posts on
// Instagram and X, the announcement bar and the "Follow the list" band.
// A studio's region comes from the first country in its "country" field.
(function () {
  var REGIONS = [
    { id: "iberia", name: "Iberia", color: "#F95721", countries: ["Spain", "Portugal"] },
    { id: "uk", name: "UK & Ireland", color: "#4D7CFE", countries: ["England", "Scotland", "Wales", "Northern Ireland", "Ireland"] },
    { id: "na", name: "North America", color: "#FFC21A", countries: ["USA", "Canada"] },
    { id: "nordics", name: "Nordics", color: "#2EC4B6", countries: ["Sweden", "Denmark", "Norway", "Finland", "Iceland"] },
    { id: "oceania", name: "Oceania", color: "#7ED957", countries: ["Australia", "New Zealand"] },
    { id: "europe", name: "Rest of Europe", color: "#B79CFF", countries: ["Germany", "France", "The Netherlands", "Switzerland", "Italy", "Austria", "Belgium", "Greece", "Poland", "Czech Republic", "Romania", "Ukraine", "Hungary", "Croatia", "Slovenia", "Estonia", "Lithuania", "Latvia", "Slovakia", "Malta", "North Macedonia", "Luxembourg", "Bulgaria", "Serbia"] },
    { id: "world", name: "Rest of the world", color: "#FF8FC7", countries: [] }
  ];
  // Studios with no fixed base (no country) get a neutral colour.
  var NOMAD = { id: "nomad", name: "Worldwide", color: "#BDBDB7", countries: [] };
  function regionOf(country) {
    var c = String(country || "").split(",")[0].trim().toLowerCase();
    if (!c) return NOMAD;
    for (var i = 0; i < REGIONS.length - 1; i++) {
      for (var j = 0; j < REGIONS[i].countries.length; j++) {
        if (REGIONS[i].countries[j].toLowerCase() === c) return REGIONS[i];
      }
    }
    return REGIONS[REGIONS.length - 1];
  }
  // Exact match only (used for country filter chips, where "All" gets no dot).
  function regionOfCountry(country) {
    var c = String(country || "").trim().toLowerCase();
    for (var i = 0; i < REGIONS.length; i++) {
      for (var j = 0; j < REGIONS[i].countries.length; j++) {
        if (REGIONS[i].countries[j].toLowerCase() === c) return REGIONS[i];
      }
    }
    return null;
  }
  window.JADL_REGIONS = REGIONS;
  window.jadlRegion = regionOf;
  window.jadlRegionOfCountry = regionOfCountry;
  // Small colour square shown before a studio name in lists.
  window.RegionDot = function (props) {
    var r = props.exact ? regionOfCountry(props.country) : regionOf(props.country);
    if (!r) return null;
    return React.createElement("span", {
      className: "rg-dot",
      style: { background: r.color },
      title: r.name,
      "aria-hidden": "true"
    });
  };
  // Labelled chip used on the studio page.
  window.RegionChip = function (props) {
    var r = regionOf(props.country);
    return React.createElement("span", {
      className: "rg-chip",
      style: { background: r.color }
    }, React.createElement("i", null), r.name);
  };
  var IG = "https://www.instagram.com/justadesignlist/";
  var X = "https://x.com/justadesignlist";
  var h = function () { return React.createElement.apply(React, arguments); };
  // Thin bar above the top navigation.
  window.AnnounceBar = function () {
    return h("a", { className: "ann", href: IG, target: "_blank", rel: "noopener" },
      h("b", null, "New"),
      h("span", null, "From the list, every week on Instagram and X"),
      h("u", null, "@justadesignlist \u2192"));
  };
  // Three tiles on the index page, after "Today's discovery".
  window.FollowBand = function () {
    return h("section", { className: "wrap follow-wrap" },
      h("div", { className: "follow-band" },
        h("div", { className: "fb-a" },
          h("div", { className: "fb-lbl" }, "Instagram \u00b7 X"),
          h("h3", null, "Follow the list. ", h("span", null, "New studios and designers every week."))),
        h("div", { className: "fb-b" },
          h("div", { className: "fb-lbl" }, "Colour code"),
          h("ul", { className: "fb-leg" }, REGIONS.map(function (r) {
            return h("li", { key: r.id }, h("i", { style: { background: r.color } }), r.name);
          }))),
        h("div", { className: "fb-c" },
          h("div", { className: "fb-lbl" }, "@justadesignlist"),
          h("div", null,
            h("a", { href: IG, target: "_blank", rel: "noopener" }, "Instagram", h("span", null, "\u2197")),
            h("a", { href: X, target: "_blank", rel: "noopener" }, "X", h("span", null, "\u2197"))))));
  };
})();
