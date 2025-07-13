# Copilot Instructions for Stream Boosters

## Main Guidelines

- **Language:** Spanish (respuestas y código)
- **Project:** Modular landing page for connecting brands/game devs with streamers
- **Stack:** Astro (SSG), React (client), Tailwind CSS 4, PHP (backend), MySQL
- **Hosting:** Hostinger Single Plan (static + PHP)

## TypeScript Rules

- When `verbatimModuleSyntax` is enabled in TypeScript, **types must be imported using `import type`**. Example:
  ```ts
  import type { FieldError } from "react-hook-form"
  ```
- No uses `import { FieldError } ...` para tipos, ya que generará el error TS1484.
- Apply this rule for any type (for example, `FC`, `FieldError`, etc.) in all `.ts` and `.tsx` files.

## Tailwind CSS 4 Configuration (Official Astro Integration)

### Current Setup
- **Tailwind Version:** 4.1.11 via `@tailwindcss/vite` plugin
- **Configuration:** CSS-based configuration in `src/styles/global.css` using `@theme`
- **No Config File:** Tailwind 4 doesn't require `tailwind.config.mjs`
- **Official Pattern:** Follows Astro's official documentation for Tailwind 4 integration

### Astro Config (astro.config.mjs)
```js
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  vite: {
    plugins: [tailwindcss()], // Official Tailwind 4 Vite plugin
    // ... other vite config
  }
})
```

### CSS Configuration (src/styles/global.css)
```css
@import "tailwindcss";

@theme {
  /* Custom theme variables */
  --color-brand-pink: #FF2D92;
  --color-brand-purple: #8B5CF6;
  /* ... other variables */
}

@layer base {
  /* Global styles */
}
```

### Key Differences from Tailwind 3
- **NO** `@astrojs/tailwind` integration needed
- **NO** `tailwind.config.mjs` file required
- **YES** `@tailwindcss/vite` plugin in Vite config
- **YES** CSS-based theme configuration using `@theme`

## Naming Conventions

- **Variables, functions, and types:** Always in English (e.g., `name`, `email`, `company`, `projectType`)
- **UI texts:** Always in Spanish (e.g., label, placeholder, error messages)

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

---

## UI/UX Design System - Fluent Design Theory

### Design Philosophy
Inspirado en Microsoft Fluent Design System, nuestro enfoque visual prioriza:

#### 1. **Light (Iluminación)**
- **Glow Effects:** Uso de gradientes y sombras sutiles para crear profundidad
- **Color Temperature:** Paleta fría dominante con acentos cálidos (pink, purple, cyan)
- **Lighting Hierarchy:** Elementos más importantes tienen más "luz" (gradientes, shadows)

#### 2. **Depth (Profundidad)**
- **Layering:** Cards, overlays y backgrounds con diferentes niveles de opacidad
- **Z-Index Visual:** Uso de sombras y blur para simular capas físicas
- **Parallax Subtle:** Elementos de fondo con opacidad reducida para crear profundidad

#### 3. **Motion (Movimiento)**
- **Transition Timing:** 200-300ms para micro-interacciones, hasta 500ms para cambios de estado
- **Easing:** `cubic-bezier(0.4,0,0.2,1)` para transiciones naturales
- **Hover States:** Scale (1.05), opacity changes, border color transitions
- **Loading States:** Spinners, progress indicators con animaciones fluidas

#### 4. **Material (Materialidad)**
- **Glass Effect:** `backdrop-blur-sm` para elementos flotantes
- **Surface Textures:** Diferentes niveles de transparencia (`/10`, `/30`, `/50`)
- **Elevation:** Shadow variants para diferentes niveles de importancia

#### 5. **Scale (Escala)**
- **Responsive Scaling:** Mobile-first con breakpoints consistentes
- **Typography Scale:** Jerárquico y proporcionado (text-sm, text-lg, text-3xl)
- **Component Sizing:** Consistent padding y spacing usando multiplos de 4px

### Color Psychology & Application

#### Primary Colors
- **`brand-pink` (#FF2D92):** Energía, acción, llamadas importantes (CTAs, estados activos)
- **`brand-purple` (#8B5CF6):** Creatividad, tecnología (elementos secundarios, hover states)
- **`brand-cyan` (#06B6D4):** Confianza, modernidad (acentos, notificaciones)

#### Neutral Colors
- **`brand-dark/darker`:** Profundidad, elegancia (fondos principales)
- **`brand-card`:** Separación, organización (contenedores, borders)
- **`text-light/muted`:** Legibilidad, jerarquía (contenido primario/secundario)

#### Semantic Colors
- **`brand-red` (#DC2B50):** Errores, alertas, validaciones fallidas

### Component Design Patterns

#### Form Elements
- **Focus Ring:** `ring-2 ring-brand-pink/50` para accesibilidad
- **Error States:** Border rojo + shadow + icono para feedback inmediato
- **Placeholder Strategy:** Color muted con texto descriptivo pero no redundante
- **Label Positioning:** Siempre arriba, alineado a la izquierda, peso semibold

#### Interactive Elements
- **Buttons:** Gradients para primarios, borders para secundarios
- **Cards:** Hover states con border color change y subtle scale
- **Tabs:** Active state con background tint y border accent
- **Links:** Underline effects y color transitions

#### Layout Principles
- **Spacing:** Sistema de 8px (space-2, space-4, space-6, etc.)
- **Max Width:** Contenido limitado para legibilidad (`max-w-4xl`, `max-w-6xl`)
- **Grid System:** Flexbox para layouts, CSS Grid para componentes complejos

### Animation Guidelines

#### Micro-interactions
```css
/* Standard transition para la mayoría de elementos */
transition-all duration-200

/* Hover effects para botones e interactivos */
hover:scale-105 transition-all duration-300

/* Focus states para accesibilidad */
focus:outline-none focus:ring-2 focus:ring-brand-pink/50
```

#### State Changes
- **Loading:** Fade in/out con spinners, no jumps abruptos
- **Error/Success:** Slide in desde arriba, auto-dismiss opcional
- **Page Transitions:** Fade in con slight Y translation

#### Performance Considerations
- **GPU Acceleration:** Transform y opacity preferidos sobre left/top
- **Reduce Motion:** Respetar `prefers-reduced-motion` del usuario
- **60fps Target:** Animaciones optimizadas para fluidez

### Accessibility Standards

#### Color Contrast
- **AA Compliance:** Mínimo 4.5:1 para texto normal, 3:1 para texto grande
- **Focus Indicators:** Siempre visibles y contrastantes
- **Color Independence:** No usar solo color para comunicar estado

#### Keyboard Navigation
- **Tab Order:** Lógico y predecible
- **Skip Links:** Para navegación rápida
- **Focus Traps:** En modals y overlays

#### Screen Readers
- **Semantic HTML:** Headings, labels, roles correctos
- **Alt Text:** Descriptivo y contextual
- **ARIA Labels:** Para elementos complejos

### Implementation Examples

#### Fluent Card Pattern
```tsx
className={`
  bg-brand-card/30 backdrop-blur-sm rounded-2xl border border-brand-card/50 
  p-8 shadow-xl transition-all duration-300
  hover:shadow-2xl hover:border-brand-purple/50
`}
```

#### Fluent Button Pattern
```tsx
className={`
  bg-gradient-to-r from-brand-pink to-brand-purple
  hover:from-brand-purple hover:to-brand-pink hover:scale-105
  focus:outline-none focus:ring-2 focus:ring-brand-pink/50
  transition-all duration-300 shadow-lg shadow-brand-pink/20
`}
```

#### Fluent Input Pattern
```tsx
className={`
  bg-brand-darker border-2 border-brand-card
  focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/50
  hover:border-brand-purple transition-all duration-200
`}
```

## External Resources
