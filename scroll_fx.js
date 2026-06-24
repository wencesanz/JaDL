/* Scroll-velocity distortion for the studios list.
 *
 * Inspired by velocity-reactive lists (e.g. tomoyaokada.com): while the page
 * scrolls, the list rows lean (skewY) and stretch (scaleY) in proportion to
 * scroll velocity, then settle back to rest. Deliberately SUBTLE.
 *
 * Implementation notes:
 *  - Pure rAF loop reading window.scrollY — does NOT hijack native scrolling,
 *    so the scrollbar, keyboard, anchors and accessibility stay intact.
 *  - Transform is applied per-row via CSS vars set on the .st-list container.
 *  - At rest, the `sfx-active` class is removed so NO transform is present.
 *    This matters: a transformed ancestor turns `position:fixed` children into
 *    absolutely-positioned ones, which would misplace the row hover-preview.
 *    Clearing the transform at rest keeps the preview correct.
 *  - Honors prefers-reduced-motion and the `data-listfx="off"` tweak.
 */
(function () {
  var root = document.documentElement;
  var reduceMQ = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  // --- subtle intensity ---
  var MAX_SKEW = 1.6;    // degrees of lean at full velocity
  var MAX_SCALE = 0.055; // extra vertical stretch at full velocity
  var NORM = 55;         // px/frame that maps to "full" intensity
  var SMOOTH_VEL = 0.18; // velocity smoothing
  var EASE = 0.22;       // how fast applied transform chases the target

  var lastY = window.scrollY || window.pageYOffset || 0;
  var vel = 0;
  var curSkew = 0;
  var curScale = 0;
  var lastList = null;

  function enabled() {
    if (reduceMQ.matches) return false;
    return root.getAttribute("data-listfx") !== "off";
  }

  function clearList(list) {
    if (!list) return;
    list.classList.remove("sfx-active");
    list.style.removeProperty("--sfx-skew");
    list.style.removeProperty("--sfx-scale");
  }

  function frame() {
    var y = window.scrollY || window.pageYOffset || 0;
    var dv = y - lastY;
    lastY = y;
    vel += (dv - vel) * SMOOTH_VEL;

    var list = enabled() ? document.querySelector(".st-list") : null;

    // List gone (other view / grid mode / disabled) — make sure it's reset.
    if (!list) {
      if (lastList) { clearList(lastList); lastList = null; }
      curSkew = 0; curScale = 0;
      requestAnimationFrame(frame);
      return;
    }
    if (list !== lastList) { clearList(lastList); lastList = list; }

    var v = vel / NORM;
    if (v > 1) v = 1; else if (v < -1) v = -1;

    var targetSkew = -v * MAX_SKEW;                 // lean against the motion
    var targetScale = Math.min(Math.abs(v), 1) * MAX_SCALE;

    curSkew += (targetSkew - curSkew) * EASE;
    curScale += (targetScale - curScale) * EASE;

    if (Math.abs(curSkew) < 0.03 && curScale < 0.0025) {
      clearList(list); // truly at rest → drop the transform entirely
    } else {
      list.style.setProperty("--sfx-skew", curSkew.toFixed(3) + "deg");
      list.style.setProperty("--sfx-scale", (1 + curScale).toFixed(4));
      list.classList.add("sfx-active");
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
