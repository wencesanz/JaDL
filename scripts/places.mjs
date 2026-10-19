// Same pairing as window.jadlPlace in social.js, for the build scripts.
  // ---- Places: pair each city with its own country ----
  // Notion keeps cities and countries as two separate lists, so a studio in
  // Copenhagen and Tokyo reads "Copenhagen, Tokyo, Denmark, Japan". Cities are
  // matched to countries using the studios that have a single country.
function placeLists(v) { return String(v || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean); }
function buildCityIndex(all) {
    var votes = {};
    (all || []).forEach(function (s) {
      var k = placeLists(s.country);
      if (k.length !== 1) return;
      placeLists(s.city).forEach(function (c) {
        var key = c.toLowerCase();
        votes[key] = votes[key] || {};
        votes[key][k[0]] = (votes[key][k[0]] || 0) + 1;
      });
    });
    var out = {};
    Object.keys(votes).forEach(function (c) {
      var best = null, n = 0;
      Object.keys(votes[c]).forEach(function (k) { if (votes[c][k] > n) { n = votes[c][k]; best = k; } });
      out[c] = best;
    });
    return out;
  }
  // [{ country, cities: [] }] in the order the studio lists them.
// Cities that appear in no single-country studio yet.
var PLACE_HINTS = { fremantle: "Australia", tijuana: "Mexico", queenstown: "New Zealand" };
function placeGroups(s, index) {
    var C = placeLists(s.city), K = placeLists(s.country);
    var groups = K.map(function (k) { return { country: k, cities: [] }; });
    var find = function (k) { for (var i = 0; i < groups.length; i++) if (groups[i].country.toLowerCase() === String(k).toLowerCase()) return groups[i]; return null; };
    // First pass: cities we can place for sure; second pass: the rest.
    var known = C.map(function (c, i) {
      if (K.length <= 1) return groups[0] || null;
      var hint = PLACE_HINTS[c.toLowerCase()] || index[c.toLowerCase()];
      return find(c) || (hint ? find(hint) : null) || (C.length === K.length ? groups[i] : null);
    });
    var prev = null;
    C.forEach(function (c, i) {
      var g = known[i];
      if (!g) {
        // A country that has no city yet, in the order listed; otherwise the
        // country of the city before it (cities are usually grouped).
        var free = groups.filter(function (x) { return !x.cities.length && known.indexOf(x) < 0; })[0];
        g = free || prev || groups[0] || null;
      }
      if (!g) { g = { country: "", cities: [] }; groups.push(g); }
      if (g.country.toLowerCase() !== c.toLowerCase()) g.cities.push(c);
      prev = g;
    });
    var used = groups.filter(function (g) { return g.cities.length; });
    // Countries with no city of their own still count, after the others.
    return used.concat(groups.filter(function (g) { return !g.cities.length && g.country; }));
  }
function formatPlace(s, index, mode) {
    var g = placeGroups(s, index);
    if (!g.length) return "";
    var one = function (x) { return x.cities.concat(x.country ? [x.country] : []).join(", "); };
    if (mode === "primary") {
      var f = g[0];
      return [f.cities[0], f.country].filter(Boolean).join(", ");
    }
    if (mode === "short") {
      var first = g[0], extra = g.slice(1).reduce(function (n, x) { return n + Math.max(1, x.cities.length); }, 0) + Math.max(0, first.cities.length - 1);
      return [first.cities[0], first.country].filter(Boolean).join(", ") + (extra ? " +" + extra : "");
    }
    return g.map(one).join(" · ");
  }

let cache = null, cacheFor = null;
export function place(s, all, mode = 'full') {
  if (cacheFor !== all) { cache = buildCityIndex(all); cacheFor = all; }
  return formatPlace(s, cache, mode);
}
