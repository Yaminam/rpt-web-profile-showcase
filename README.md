# Shreyash Tripathi — Portfolio

A cyberpunk / terminal-themed personal portfolio for **Shreyash Tripathi** — Full-Stack Developer & AI Enthusiast.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tooling)
- **Tailwind CSS** + **shadcn/ui** (Radix UI)
- **lucide-react** (icons)

## Getting Started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:8080)
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

## Editing Content

All site content (profile, experience, projects, skills, education, achievements)
lives in a single file:

```
src/data/portfolio.ts
```

Update it there and the whole site reflects the changes.

## Project Structure

```
src/
  components/     UI sections + interactive effects (hero, footer, matrix rain, etc.)
  components/ui/  shadcn/ui primitives
  data/           portfolio content (single source of truth)
  hooks/          reveal, typewriter, active-section, count-up helpers
  pages/          Index + NotFound
public/           resume PDF, profile photo, static assets
```
