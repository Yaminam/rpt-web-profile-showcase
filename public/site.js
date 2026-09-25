// Loaded async from index.html. Kept out of inline <script> so the CSP (vercel.json)
// can forbid inline script entirely.

// Web fonts: the stylesheet is already preloaded in <head>; apply it without blocking first paint.
(function () {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Orbitron:wght@600;700;800;900&display=swap";
  document.head.appendChild(link);
})();

// Google Analytics 4 (G-JKKJRK91DN). Events queue in dataLayer right away;
// gtag.js itself is fetched after window load so it never competes with first paint.
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-JKKJRK91DN");

(function () {
  function loadGtag() {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-JKKJRK91DN";
    document.head.appendChild(s);
  }
  if (document.readyState === "complete") loadGtag();
  else window.addEventListener("load", loadGtag);
})();
