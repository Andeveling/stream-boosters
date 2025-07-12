# Copilot Instructions for Stream Boosters

## Project Overview
- **Stream Boosters** is a modular landing page built with [Astro](https://astro.build/), integrating React, Tailwind CSS, and PHP for campaign submission.
- The site connects game developers and brands with streamers for direct, authentic marketing campaigns.

## Architecture & Structure
- **Astro Components:** Each landing section (Hero, HowItWorks, Packages, CustomPlan, Testimonials, GenresAndNext, Founders, CallToAction, Footer) is a separate Astro component in `src/components/sections/`.
- **Forms:** Custom campaign forms use React and Zod for validation, located in `src/components/forms/custom-plan/`.
- **PHP Integration:** All PHP files for backend form handling are in `src/php/` and are copied to `dist/` during build.
- **Styling:** Tailwind CSS is configured via `astro.config.mjs` and global styles are in `src/styles/global.css`.
- **Layout:** The main layout is in `src/layouts/Layout.astro`, with meta tags and SEO settings.
- **Entry Point:** The landing page is composed in `src/pages/index.astro`.

## Developer Workflows
- **Install dependencies:** `pnpm install`
- **Start dev server:** `pnpm dev` (Astro at `localhost:4321`)
- **Build for production:** `pnpm build` (outputs to `dist/`)
- **Preview build:** `pnpm preview`
- **Clean build output:** `pnpm clean`
- **Local build with PHP:** `pnpm build:local` (builds Astro and copies PHP to `dist/`)
- **Test with PHP server:** `php -S localhost:8080 -t dist` (simulates Hostinger)
- **Copy to XAMPP:** `pnpm copy:xampp` (copies `dist/` to `/opt/lampp/htdocs/stream-boosters/`)

## Conventions & Patterns
- **Section Components:** All major landing sections are modular and imported in `index.astro`.
- **Animations:** Use Tailwind and custom classes for smooth transitions (see `animate-fade-in`).
- **SEO:** Meta tags are set in `Layout.astro` for Spanish-language, gaming-focused SEO.
- **Responsive Design:** All components are mobile-first and use Tailwind breakpoints.
- **Form Validation:** React Hook Form + Zod for robust client-side validation.
- **Icon Usage:** Icons are managed via `astro-icon` and `@iconify-json/material-symbols`.
- **PHP Routing:** All backend form submissions route to files in `src/php/`.

## Integration Points
- **Astro + React:** React components are loaded with `client:load` for dynamic forms.
- **Astro + PHP:** PHP files are statically copied to `dist/` for server-side form handling.
- **Tailwind:** Configured as a Vite plugin in `astro.config.mjs`.
- **Deployment:** Hostinger deployment uses PHP for form handling, with static files served from `dist/`.

## Key Files & Directories
- `src/components/sections/` — Main landing page sections
- `src/components/forms/custom-plan/` — Custom campaign form logic
- `src/php/` — Backend PHP scripts
- `src/layouts/Layout.astro` — Global layout and SEO
- `src/styles/global.css` — Global styles
- `astro.config.mjs` — Astro and Tailwind configuration
- `package.json` — Scripts and dependencies

## External Resources
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)

---

For questions about workflow, architecture, or conventions, reference the README or ask for clarification.
