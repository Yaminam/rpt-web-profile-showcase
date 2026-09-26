// Writes server-rendered HTML for every static page into dist/.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx`.
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ssrDir = path.join(root, "dist-ssr");
const htmlPath = path.join(root, "dist", "index.html");
const SITE_URL = "https://shreyashtripathi.in";

const { render, caseStudyPages } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await readFile(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
// JSON-LD lives inside <script>: keep "</script>" (and friends) from ending it early.
const safeJson = (o) => JSON.stringify(o, null, 2).replace(/</g, "\\u003c");

/** Swap one tag in the template; throws if the template stops containing it. */
function sub(html, re, replacement, label) {
  if (!re.test(html)) throw new Error(`prerender: ${label} not found in dist/index.html`);
  return html.replace(re, replacement);
}

/** Rewrite the home page's <head> for another indexable page (title, description, canonical, social, JSON-LD). */
function withHead(html, { path: pagePath, title, description, jsonLd }) {
  const url = `${SITE_URL}${pagePath}`;
  const t = escAttr(title);
  const d = escAttr(description);
  html = sub(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, "title");
  html = sub(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${d}" />`, "description");
  html = sub(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, "canonical");
  html = sub(html, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="article" />`, "og:type");
  html = sub(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, "og:url");
  html = sub(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`, "og:title");
  html = sub(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${d}" />`, "og:description");
  html = sub(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`, "twitter:title");
  html = sub(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${d}" />`, "twitter:description");
  html = sub(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${safeJson(jsonLd)}\n    </script>`,
    "JSON-LD"
  );
  return html;
}

const pages = [
  { url: "/", file: "index.html" },
  // Case studies: /projects/<slug> is served from projects/<slug>.html (vercel.json cleanUrls).
  ...caseStudyPages().map((seo) => ({ url: seo.path, file: `${seo.path.slice(1)}.html`, seo })),
  // Served by Vercel for unknown paths (404 status); noindex + no canonical so it never competes with "/".
  { url: "/404", file: "404.html", notFound: true },
];

for (const page of pages) {
  let html = template.replace(marker, `<div id="root">${render(page.url)}</div>`);
  if (page.seo) html = withHead(html, page.seo);
  if (page.notFound) {
    html = html
      .replace(/<title>[^<]*<\/title>/, "<title>404 — Page not found | Shreyash Tripathi</title>")
      .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />')
      .replace(/\s*<link rel="canonical"[^>]*>/, "");
  }
  const out = path.join(root, "dist", page.file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerender: ${page.url} -> dist/${page.file} (${(html.length / 1024).toFixed(1)} KB)`);
}

await rm(ssrDir, { recursive: true, force: true });
