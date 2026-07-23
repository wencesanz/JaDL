(function(){
"use strict";
const {
  useState: useIgState,
  useEffect: useIgEffect,
  useRef: useIgRef
} = React;
function loadImageCORS(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
function pickIgPaperInk() {
  const cs = getComputedStyle(document.documentElement);
  const paper = (cs.getPropertyValue("--paper") || "#FBFBFA").trim() || "#FBFBFA";
  const ink = (cs.getPropertyValue("--ink") || "#0F0F0E").trim() || "#0F0F0E";
  const mute = (cs.getPropertyValue("--mute") || "#8A8A85").trim() || "#8A8A85";
  const rule = (cs.getPropertyValue("--rule") || "#D6D6D2").trim() || "#D6D6D2";
  return {
    paper,
    ink,
    mute,
    rule
  };
}
async function buildStudioImage(s, col, idx, total) {
  const W = 1080,
    H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  const {
    paper,
    ink,
    mute,
    rule
  } = pickIgPaperInk();
  try {
    await document.fonts.ready;
  } catch {}
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);
  const heroH = 760;
  ctx.fillStyle = col || "#D8CFBD";
  ctx.fillRect(0, 0, W, heroH);
  let drewShot = false;
  if (s.url) {
    const shotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(s.url)}?w=1600&h=1000`;
    try {
      const img = await loadImageCORS(shotUrl);
      if (img.naturalWidth > 100) {
        const sa = img.naturalWidth / img.naturalHeight;
        const da = W / heroH;
        let sx = 0,
          sy = 0,
          sw = img.naturalWidth,
          sh = img.naturalHeight;
        if (sa > da) {
          sw = sh * da;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = sw / da;
          sy = (img.naturalHeight - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, heroH);
        drewShot = true;
      }
    } catch (e) {}
  }
  if (!drewShot) {
    ctx.save();
    ctx.fillStyle = "rgba(15,15,14,0.22)";
    let nameSize = 120;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `italic ${nameSize}px "Instrument Serif", Georgia, serif`;
    while (ctx.measureText(s.name).width > W - 120 && nameSize > 56) {
      nameSize -= 6;
      ctx.font = `italic ${nameSize}px "Instrument Serif", Georgia, serif`;
    }
    ctx.fillText(s.name, W / 2, heroH / 2);
    ctx.restore();
  }
  ctx.fillStyle = rule;
  ctx.fillRect(0, heroH, W, 1);
  const pad = 72;
  let y = heroH + 60;
  ctx.fillStyle = mute;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = `500 22px "JetBrains Mono", ui-monospace, monospace`;
  const eyebrow = `№ ${String(idx + 1).padStart(3, "0")} OF ${total}    ·    ${s.category.split(",")[0].trim().toUpperCase()}`;
  ctx.fillText(eyebrow, pad, y);
  y += 56;
  ctx.fillStyle = ink;
  let nameSize = 132;
  ctx.font = `italic ${nameSize}px "Instrument Serif", Georgia, serif`;
  while (ctx.measureText(s.name).width > W - pad * 2 && nameSize > 56) {
    nameSize -= 4;
    ctx.font = `italic ${nameSize}px "Instrument Serif", Georgia, serif`;
  }
  ctx.textBaseline = "alphabetic";
  ctx.fillText(s.name, pad, y + nameSize * 0.85);
  y += nameSize * 0.95 + 24;
  ctx.fillStyle = ink;
  ctx.font = `400 30px "Geist", "Helvetica Neue", Arial, sans-serif`;
  ctx.textBaseline = "top";
  const loc = [s.city, s.country].filter(Boolean).join(", ");
  if (loc) ctx.fillText(loc, pad, y);
  const footerY = H - pad - 14;
  ctx.fillStyle = rule;
  ctx.fillRect(pad, footerY - 36, W - pad * 2, 1);
  ctx.fillStyle = ink;
  ctx.font = `500 20px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("JUST A DESIGN LIST", pad, footerY);
  const host = (s.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (host) {
    ctx.fillStyle = mute;
    ctx.textAlign = "right";
    ctx.fillText(host.toUpperCase(), W - pad, footerY);
  }
  return await new Promise(resolve => canvas.toBlob(resolve, "image/png", 0.95));
}
function IGShareModal({
  s,
  col,
  idx,
  total,
  onClose
}) {
  const [blob, setBlob] = useIgState(null);
  const [url, setUrl] = useIgState(null);
  const [err, setErr] = useIgState(false);
  const [shared, setShared] = useIgState("");
  useIgEffect(() => {
    let cancelled = false;
    let createdUrl = null;
    (async () => {
      try {
        const b = await buildStudioImage(s, col, idx, total);
        if (cancelled || !b) {
          if (!b) setErr(true);
          return;
        }
        createdUrl = URL.createObjectURL(b);
        setBlob(b);
        setUrl(createdUrl);
      } catch (e) {
        if (!cancelled) setErr(true);
      }
    })();
    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [s.name]);
  useIgEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const filename = `${(s.name || "studio").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-jadl.png`;
  const download = () => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setShared("Saved");
    setTimeout(() => setShared(""), 1800);
  };
  const shareNative = async () => {
    if (!blob) return;
    const file = new File([blob], filename, {
      type: "image/png"
    });
    try {
      if (navigator.canShare && navigator.canShare({
        files: [file]
      })) {
        await navigator.share({
          files: [file],
          title: s.name,
          text: `${s.name} — via Just a Design List`
        });
        setShared("Shared");
        setTimeout(() => setShared(""), 1800);
        return;
      }
    } catch (e) {
      return;
    }
    download();
  };
  const canShareFiles = typeof navigator !== "undefined" && typeof navigator.canShare === "function" && (() => {
    try {
      return navigator.canShare({
        files: [new File([new Blob()], "x.png", {
          type: "image/png"
        })]
      });
    } catch {
      return false;
    }
  })();
  return React.createElement("div", {
    className: "ig-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Share to Instagram",
    onClick: onClose
  }, React.createElement("div", {
    className: "ig-modal-inner",
    onClick: e => e.stopPropagation()
  }, React.createElement("button", {
    className: "ig-close",
    onClick: onClose,
    "aria-label": "Close"
  }, "\xD7"), React.createElement("div", {
    className: "ig-modal-head"
  }, React.createElement("div", {
    className: "ig-eyebrow"
  }, "Share \xB7 Instagram"), React.createElement("h3", null, s.name), React.createElement("p", {
    className: "ig-help"
  }, "A 1080 \xD7 1350 card, ready for an Instagram post or Story.")), React.createElement("div", {
    className: "ig-preview-wrap"
  }, !url && !err && React.createElement("div", {
    className: "ig-loading"
  }, "Composing image\u2026"), err && React.createElement("div", {
    className: "ig-loading"
  }, "Couldn't load the studio screenshot. Try again, or use one of the other share options."), url && React.createElement("img", {
    src: url,
    alt: "Studio share preview",
    className: "ig-preview"
  })), React.createElement("div", {
    className: "ig-actions"
  }, canShareFiles && React.createElement("button", {
    className: "share-btn ig-primary",
    onClick: shareNative,
    disabled: !blob
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    "aria-hidden": "true"
  }, React.createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "5"
  }), React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), React.createElement("circle", {
    cx: "17.5",
    cy: "6.5",
    r: "1",
    fill: "currentColor",
    stroke: "none"
  })), React.createElement("span", null, "Share to Instagram")), React.createElement("button", {
    className: "share-btn",
    onClick: download,
    disabled: !blob
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M12 4v12"
  }), React.createElement("path", {
    d: "M7 11l5 5 5-5"
  }), React.createElement("path", {
    d: "M5 20h14"
  })), React.createElement("span", null, shared || "Download image"))), !canShareFiles && React.createElement("p", {
    className: "ig-help-foot"
  }, "Instagram doesn't accept direct web uploads. Save the image and post it from the Instagram app on your phone.")));
}
Object.assign(window, {
  IGShareModal,
  buildStudioImage
});
})();
