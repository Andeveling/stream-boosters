# Stream-Boosters Project - Copilot Instructions

## Big Picture Architecture
- **Astro SSG** is used for layouts, routing, and static generation. Pages and sections are `.astro` files in `src/components/sections` and `src/components/shared/astro`.
- **React (TypeScript)** powers interactive UI, forms, and client logic. React components live in `src/components/forms`, `src/components/shared`, and are composed within Astro layouts.
- **Fluent Design System**: All UI follows Fluent Design principles (acrylic/blur, motion, clear hierarchy). See `src/components/shared/astro/README.md` and components like `FluentSection.astro`, `FluentButton.astro`.
- **Tailwind CSS** is used for styling, with utility classes in markup. No global CSS frameworks; use Tailwind and custom classes only.
- **PHP Backend**: Form submissions POST to PHP scripts in `src/components/php/`, which connect to MySQL (see Hostinger instructions for DB config).

## Developer Workflow
- **Build**: `npm run build:hostinger` (Astro static build + PHP copy for Hostinger deployment)
- **Test**: `pnpm test` or `npm test` (Vitest for React/TS, see `src/__tests__` and `src/components/forms/__tests__`)
- **Preview**: `npm run preview` (local static preview)
- **Deploy**: Zip `dist/` and upload to Hostinger `public_html/`.
- **Local PHP Testing**: `php -S localhost:8080` in `dist/` to simulate Hostinger.

## Project-Specific Conventions
- **Language**: UI text is Spanish. All code, comments, and commit messages are in English.
- **Component Structure**: Astro for layouts/pages, React for interactive UI. Shared components are encouraged. Use composition over inheritance.
- **Forms**: Use `react-hook-form` + `zod` for validation. Form logic is in React, submission via PHP endpoints.
- **Accessibility**: All components must be accessible (semantic HTML, ARIA, keyboard nav, color contrast). Fluent components include a11y features by default.
- **Testing**: All new features require Vitest tests. Test files are colocated in `__tests__` folders next to components.
- **Linting/Formatting**: ESLint and Prettier are enforced. Follow rules in `eslint.config.js` and `.prettierrc`.
- **State Management**: Prefer local state in React. Use context or external state only if necessary.
- **Styling**: Use Tailwind utility classes. No CSS-in-JS or global CSS frameworks.
- **Commit Messages**: English, conventional commit format.

## Integration Points & Patterns
- **Astro <-> React**: Astro composes React components for interactivity. Pass props/data from Astro to React as needed.
- **React <-> PHP**: Forms POST to PHP scripts. Use absolute paths for endpoints. PHP scripts handle DB logic and return JSON responses.
- **Fluent Design**: All UI must use Fluent components and design tokens. See `src/components/shared/astro/README.md` for usage.
- **Hostinger Deployment**: Follow `/home/andres/Documentos/Proyectos/stream-boosters/.github/instructions/hostinger-host.instructions.md` for build, PHP config, and deployment steps.

## Key Files & Directories
- `src/components/shared/astro/` — Fluent Design components
- `src/components/forms/` — React forms and logic
- `src/components/php/` — PHP backend scripts
- `src/__tests__/` and `src/components/forms/__tests__/` — Vitest tests
- `.github/instructions/hostinger-host.instructions.md` — Hostinger deployment/config
- `.github/instructions/react-expert.instructions.md` — React/TS standards
- `astro.config.mjs` — Astro build config
- `eslint.config.js`, `.prettierrc` — Lint/format rules

---
**For AI agents:**
- Always read relevant instructions in `.github/instructions/` before making changes.
- Use the workflow and conventions above for all code generation and edits.
- Reference and reuse Fluent components for UI.
- Ensure accessibility and test coverage for all new features.
- Use Spanish for UI, English for code/comments/commits.
- Follow Hostinger deployment steps for production builds.