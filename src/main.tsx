import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root")!;

// Production HTML ships with the page prerendered into #root (scripts/prerender.mjs): hydrate it.
if (container.hasChildNodes()) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
