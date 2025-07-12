# Copilot Instructions for Stream Boosters

## Main Guidelines
- **Language:** Spanish (respuestas y código)
- **Project:** Modular landing page for connecting brands/game devs with streamers
- **Stack:** Astro (SSG), React (client), Tailwind CSS, PHP (backend), MySQL
- **Hosting:** Hostinger Single Plan (static + PHP)

## Architecture & Structure
- **Sections:** Each landing section is a separate Astro component in `src/components/sections/`
- **Forms:** Custom campaign forms use React + Zod, in `src/components/forms/custom-plan/`
- **PHP:** Backend form handlers in `src/php/`, copied to `dist/` on build
- **Styling:** Tailwind via Astro/Vite, global styles in `src/styles/global.css`
- **Layout:** Main layout in `src/layouts/Layout.astro` (SEO, meta)
- **Entry Point:** Page composed in `src/pages/index.astro`

## Developer Workflows
- **Install:** `pnpm install`
- **Dev server:** `pnpm dev` (Astro at `localhost:4321`)
- **Build:** `pnpm build` (outputs to `dist/`)
- **Preview:** `pnpm preview`
- **Clean:** `pnpm clean`
- **Local build + PHP:** `pnpm build:local` (Astro + PHP to `dist/`)
- **Test with PHP server:** `php -S localhost:8080 -t dist`
- **Copy to XAMPP:** `pnpm copy:xampp`
- **Testing:**
  - **Run tests:** `pnpm test` (Vitest)
  - **Test UI:** `pnpm test:ui`
  - **Test files:** Place in `src/__tests__/` or next to components
  - **Setup:** See `vitest.config.ts` and `vitest.setup.ts` for environment config

## Conventions & Patterns
- **Modular sections:** All landing sections are imported in `index.astro`
- **Animations:** Use Tailwind + custom classes (e.g. `animate-fade-in`)
- **SEO:** Spanish-language, gaming-focused meta in `Layout.astro`
- **Responsive:** Mobile-first, Tailwind breakpoints
- **Validation:** React Hook Form + Zod
- **Icons:** Managed via `astro-icon` and `@iconify-json/material-symbols`
- **PHP routing:** All form submissions go to `src/php/` scripts
- **Testing:** Use Vitest + Testing Library for React/Astro components

## Integration Points
- **Astro + React:** Use `client:load` for dynamic forms
- **Astro + PHP:** PHP files are statically copied to `dist/` for server-side handling
- **Tailwind:** Configured as Astro/Vite plugin in `astro.config.mjs`
- **Testing:** Vitest + Testing Library for unit/component tests
- **Deployment:** Hostinger: static files + PHP in `public_html/`

## Key Files & Directories
- `src/components/sections/` — Landing page sections
- `src/components/forms/custom-plan/` — Custom campaign form logic
- `src/php/` — Backend PHP scripts
- `src/layouts/Layout.astro` — Global layout/SEO
- `src/styles/global.css` — Global styles
- `astro.config.mjs` — Astro/Tailwind config
- `package.json` — Scripts/deps
- `vitest.config.ts`, `vitest.setup.ts` — Test config
- `src/__tests__/` — Example tests

## External Resources
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Vitest Docs](https://vitest.dev)

---
For questions about workflow, architecture, or conventions, reference the README or ask for clarification.
