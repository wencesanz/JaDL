// track.js — sends the few events that say whether the site does its job to
// Google Analytics (gtag). Only actions, never personal data:
//   visit_site       a click to a studio's own website (the key metric)
//   visit_instagram  a click to a studio's Instagram
//   save_to_list     a studio saved to My List
//   share            a share button (method: x, linkedin, email, instagram, copy, list)
//   submit_studio    a studio suggestion sent (fired from submit_view)
(function () {
  "use strict";
  function send(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {}
  }
  window.jadlTrack = send;

  // Links and accounts that belong to the list itself, not to a studio.
  var OWN = /(^|\.)(justadesignlist\.com|substack\.com|wenceslaosanz\.rocks)$|^(x|twitter)\.com$/;
  function studioName() {
    var m = location.pathname.match(/^\/studio\//) && document.title.split(" — ")[0];
    return m || undefined;
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var save = t.closest(".save-btn");
    if (save) {
      if (save.getAttribute("aria-pressed") !== "true") send("save_to_list", { studio: studioName() });
      return;
    }

    var sh = t.closest(".share-btn");
    if (sh) {
      var label = (sh.getAttribute("aria-label") || "").toLowerCase();
      var method = /twitter|\bx\b/.test(label) ? "x" : /linkedin/.test(label) ? "linkedin" : /email/.test(label) ? "email" : /instagram/.test(label) ? "instagram" : /copy/.test(label) ? "copy" : "other";
      send("share", { method: method, content_type: "studio", item_id: studioName() });
      return;
    }
    var btn = t.closest("button");
    if (btn && /share this list/i.test(btn.textContent || "")) { send("share", { method: "list_link", content_type: "list" }); return; }
    if (btn && /open on another device/i.test(btn.textContent || "")) { send("share", { method: "qr", content_type: "list" }); return; }

    var a = t.closest("a[href]");
    if (!a) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (!/^https?:$/.test(url.protocol) || url.host === location.host) return;
    var host = url.hostname.replace(/^www\./, "");
    if (/(^|\.)instagram\.com$/.test(host)) {
      if (/justadesignlist/i.test(url.pathname)) return;
      send("visit_instagram", { link_domain: host, link_url: url.href, studio: studioName() });
      return;
    }
    if (OWN.test(host) || /(^|\.)(linkedin\.com|google\.com|vercel\.com)$/.test(host)) return;
    send("visit_site", { link_domain: host, link_url: url.href, studio: studioName() });
  }, true);
})();
