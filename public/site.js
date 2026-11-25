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

// Lead tracking: any link with data-event="name" sends that GA4 event when clicked
// (book preview downloads, full-book requests, hire buttons). data-book adds the book slug.
document.addEventListener(
  "click",
  function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-event]") : null;
    if (!el) return;
    var params = { link_url: el.getAttribute("href") || "", page_path: location.pathname };
    var book = el.getAttribute("data-book");
    if (book) params.book = book;
    gtag("event", el.getAttribute("data-event"), params);
  },
  true
);

// Microsoft Clarity: heatmaps, scroll depth and session recordings (where visitors leave a page).
// Loaded on the first scroll, tap or key press, so no third-party cookies are set while the page
// loads (keeps Lighthouse best practices at 100; heatmaps only need visitors who interact anyway).
// Paste the Project ID from clarity.microsoft.com below; while it is empty nothing loads.
(function () {
  var CLARITY_ID = "zde1zvil9b";
  if (!CLARITY_ID) return;
  window.clarity =
    window.clarity ||
    function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
  var events = ["scroll", "pointerdown", "keydown", "touchstart"];
  function loadClarity() {
    events.forEach(function (e) {
      window.removeEventListener(e, loadClarity, true);
    });
    if (window.__clarityLoaded) return;
    window.__clarityLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
    document.head.appendChild(s);
  }
  events.forEach(function (e) {
    window.addEventListener(e, loadClarity, { capture: true, passive: true });
  });
})();
