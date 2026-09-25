// Injects the server-rendered home page into dist/index.html.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx`.
import { readFile, writeFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ssrDir = path.join(root, "dist-ssr");
const htmlPath = path.join(root, "dist", "index.html");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await readFile(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

const pages = [
  { url: "/", file: "index.html" },
  // Served by Vercel for unknown paths (404 status); noindex + no canonical so it never competes with "/".
  { url: "/404", file: "404.html", notFound: true },
];

for (const page of pages) {
  let html = template.replace(marker, `<div id="root">${render(page.url)}</div>`);
  if (page.notFound) {
    html = html
      .replace(/<title>[^<]*<\/title>/, "<title>404 — Page not found | Shreyash Tripathi</title>")
      .replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />')
      .replace(/\s*<link rel="canonical"[^>]*>/, "");
  }
  await writeFile(path.join(root, "dist", page.file), html);
  console.log(`prerender: ${page.url} -> dist/${page.file} (${(html.length / 1024).toFixed(1)} KB)`);
}

await rm(ssrDir, { recursive: true, force: true });
