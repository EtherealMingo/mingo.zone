# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mingo's personal portfolio site — a static SPA showcasing front-end projects, photography, and resume. Deployed to https://www.mingo.zone.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Vite dev server on port 8080
npm run build        # Production build → build/<VITE_CHAT_VARIABLE>/
npm run build:dev    # Development-mode build → build/
npm run lint         # ESLint (JS/JSX, zero warnings enforced)
npm run preview      # Preview production build locally
```

## Architecture

**Stack:** React 18 + Vite 5 + Tailwind CSS 3 + JavaScript (no TypeScript)

**Routing:** `react-router-dom` v6 with `HashRouter` (hash-based, for static hosting compatibility). Route definitions are centralized in `src/nav-items.jsx`.

**Data layer:** Content is driven by static JS modules in `src/data/` (resumeData.js, photosData.js), not fetched from an API. Resume PDF is served from `public/resume.pdf`.

**Path alias:** `@/` maps to `./src/` (configured in both `vite.config.js` and `jsconfig.json`).

**UI:** shadcn/ui components (Radix UI primitives) in `src/components/ui/`, styled with Tailwind + `tailwind-merge` + `class-variance-authority`. Theme support via `next-themes` (class-based dark/light toggle).

**Build output:** Production builds output to `build/<VITE_CHAT_VARIABLE>/` (multi-tenant path controlled by env vars). Dev builds go to `build/`.

**Notable:** `hmr-client.js` is a custom Vite plugin that posts HMR error messages to `window.parent` — this project was scaffolded from Meituan's NoCode platform and retains that integration.

## Content Editing

- Resume text: `src/data/resumeData.js`
- Resume PDF: `public/resume.pdf`
- Photography gallery: `src/data/photosData.js` (images hosted on Weibo CDN)
- Navigation/routes: `src/nav-items.jsx`
