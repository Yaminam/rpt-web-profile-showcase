import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppShell, AppRoutes } from "./App";

/**
 * Build-time render of "/" (see scripts/prerender.mjs) so crawlers and AI engines get
 * real HTML and the browser paints content before any JS runs. Same tree as App,
 * with StaticRouter in place of BrowserRouter, so main.tsx can hydrate it.
 */
export function render(url = "/"): string {
  return renderToString(
    <AppShell>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppShell>
  );
}
