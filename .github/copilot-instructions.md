# Copilot Instructions for Stream Boosters

## Main Guidelines

- **Language:** Spanish (respuestas y código)
- **Project:** Modular landing page for connecting brands/game devs with streamers
- **Stack:** Astro (SSG), React (client), Tailwind CSS 4, PHP (backend), MySQL
- **Hosting:** Hostinger Single Plan (static + PHP)
- **Testing:** Vitest + Testing Library (comprehensive test suite implemented)
- **Form Management:** React Hook Form + Zod validation + shared components

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
- **Forms:** 
  - **Contact Forms:** React + Zod in `src/components/forms/contact/`
  - **Campaign Forms:** React + Zod in `src/components/forms/campaign/`
  - **Custom Campaign Forms:** React + Zod in `src/components/forms/custom-plan/`
  - **Shared Components:** Reusable form components in `src/components/forms/shared/`
- **PHP Backend:** 
  - Form handlers in `src/php/` (contact_submit.php, campaign_submit.php, custom_plan_submit.php)
  - Copied to `dist/` on build for Hostinger deployment
- **Styling:** Tailwind 4 via Astro/Vite, global styles in `src/styles/global.css`
- **Layout:** Main layout in `src/layouts/Layout.astro` (SEO, meta)
- **Entry Point:** Page composed in `src/pages/index.astro`
- **Testing:** Comprehensive test suite in `src/__tests__/` and component-level tests

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
  - **Test coverage:** `pnpm test:coverage` (when available)
  - **Test files:** Place in `src/__tests__/` or next to components as `*.test.ts(x)`
  - **Setup:** See `vitest.config.ts` and `vitest.setup.ts` for environment config
  - **Integration tests:** ContactForm, form submission workflows
  - **Unit tests:** Individual components (FormButton, FormField, Notification, etc.)
  - **Testing Libraries:** @testing-library/react, @testing-library/user-event, jsdom

## Conventions & Patterns

- **Modular sections:** All landing sections are imported in `index.astro`
- **Animations:** Use Tailwind + custom classes (e.g. `animate-fade-in`)
- **SEO:** Spanish-language, gaming-focused meta in `Layout.astro`
- **Responsive:** Mobile-first, Tailwind breakpoints
- **Validation:** React Hook Form + Zod with comprehensive error handling
- **Icons:** Managed via `astro-icon` and `@iconify-json/material-symbols`
- **PHP routing:** All form submissions go to `src/php/` scripts
- **Testing:** Use Vitest + Testing Library for React/Astro components
- **Form Architecture:** Shared components pattern with FormField, FormButton, FormSelect, etc.
- **Notifications:** Centralized notification system with auto-dismiss and accessibility

## Integration Points

- **Astro + React:** Use `client:load` for dynamic forms
- **Astro + PHP:** PHP files are statically copied to `dist/` for server-side handling
- **Tailwind:** Configured as Astro/Vite plugin in `astro.config.mjs`
- **Testing:** Vitest + Testing Library for unit/component tests
- **Form Integration:** React Hook Form + Zod + shared component architecture
- **Backend Integration:** PHP endpoints with proper validation and error handling
- **Deployment:** Hostinger: static files + PHP in `public_html/`

## Dependencies & Integrations

### Core Stack
- **Astro:** 5.11.0 (SSG framework)
- **React:** 19.1.0 (UI components)
- **Tailwind CSS:** 4.1.11 (styling)
- **TypeScript:** Built-in support via Astro

### Form Management
- **React Hook Form:** 7.60.0 (form state management)
- **Zod:** 3.25.74 (schema validation)
- **@hookform/resolvers:** 5.1.1 (Zod integration)

### Testing Suite
- **Vitest:** 3.2.4 (test runner)
- **@testing-library/react:** 14.3.1 (component testing)
- **@testing-library/user-event:** 14.6.1 (user interaction simulation)
- **@testing-library/jest-dom:** 6.6.3 (custom matchers)
- **jsdom:** 26.1.0 (DOM environment simulation)

### UI/UX Enhancements
- **Astro Icon:** 1.1.5 (icon management)
- **@iconify-json/material-symbols:** 1.2.29 (icon library)
- **@fontsource/sora:** 5.2.6 (typography)

### Build & Development Tools
- **@tailwindcss/vite:** 4.1.11 (Tailwind 4 integration)
- **rimraf:** 6.0.1 (cross-platform file removal)

## Key Files & Directories

- `src/components/sections/` — Landing page sections
- `src/components/forms/contact/` — Contact form components and schemas
- `src/components/forms/campaign/` — Campaign form components and schemas
- `src/components/forms/custom-plan/` — Custom campaign form logic
- `src/components/forms/shared/` — Reusable form components (FormField, FormButton, etc.)
- `src/php/` — Backend PHP scripts (contact_submit.php, campaign_submit.php, custom_plan_submit.php)
- `src/layouts/Layout.astro` — Global layout/SEO
- `src/styles/global.css` — Global styles and Tailwind theme configuration
- `astro.config.mjs` — Astro/Tailwind config
- `package.json` — Scripts/deps
- `vitest.config.ts`, `vitest.setup.ts` — Test config with official Astro integration
- `src/__tests__/` — Test suites for components and integration workflows

## External Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Vitest Docs](https://vitest.dev)

---

For questions about workflow, architecture, or conventions, reference the README or ask for clarification.

## Project Status & Development Phases

### ✅ Completed Phases
- **Phase 1:** Project setup and basic architecture
- **Phase 2:** Astro + React + Tailwind 4 integration
- **Phase 3:** Landing page sections implementation
- **Phase 4:** Form architecture with shared components
- **Phase 5:** Backend integration with PHP endpoints
- **Phase 6:** Testing suite implementation (87.8% unit tests passing)
- **Phase 7:** Mobile-First Design & Layout Integration (✅ NEW)
  - True mobile-first responsive design implemented
  - Button anti-wrapping system with equal-width layout
  - Hero-Header integration with proper viewport calculations
  - Typography scaling with progressive breakpoints
  - Performance optimizations (hardware acceleration, reduced motion)
  - CSS architecture improved with mobile-first utilities

### 🚧 Current Phase
- **Phase 7:** Mobile-First Design & Layout Integration (✅ completed)
  - Mobile-first responsive design: ✅ Complete implementation
  - Button text wrapping prevention: ✅ Anti-wrapping system implemented
  - Hero-Header integration: ✅ Fixed layout displacement issues
  - Typography scaling: ✅ True mobile-first approach applied
  - Performance optimization: ✅ Hardware acceleration & reduced motion

### 📋 Testing Architecture
- **Unit Tests:** FormButton, FormField, Notification, useFormSubmission
- **Integration Tests:** ContactForm workflows, form submission handling
- **Mocking Strategy:** Fetch API, user interactions, server responses
- **Configuration:** Official Astro getViteConfig() pattern with jsdom environment

### 🎯 Next Steps
1. Complete ContactForm integration with React Hook Form
2. Achieve 80% test coverage across all components
3. Implement e2e testing with Playwright
4. Performance optimization and final deployment preparation

---

## UI/UX Design System - Fluent Design Theory

### Design Philosophy
Inspired by Microsoft Fluent Design System, our visual approach prioritizes five core principles:

#### 1. **Light (Illumination)**
- **Glow Effects:** Subtle gradients and shadows to create depth and visual hierarchy
- **Color Temperature:** Cool-dominant palette with warm accents (pink, purple, cyan)
- **Lighting Hierarchy:** More important elements receive more "light" through gradients and shadows
- **Implementation:** Strategic use of `shadow-lg`, `shadow-xl`, and custom shadow colors

#### 2. **Depth (Layering)**
- **Z-Index Strategy:** Visual layering using shadows and blur effects to simulate physical depth
- **Surface Elevation:** Cards, overlays, and backgrounds with varying opacity levels
- **Parallax Effects:** Subtle background elements with reduced opacity for depth perception
- **Backdrop Blur:** `backdrop-blur-sm` for floating elements and modal overlays

#### 3. **Motion (Animation)**
- **Transition Timing:** 200-300ms for micro-interactions, up to 500ms for state changes
- **Easing Functions:** `cubic-bezier(0.4,0,0.2,1)` for natural, organic transitions
- **Hover States:** Scale transforms (1.05), opacity changes, and border color transitions
- **Loading States:** Spinners and progress indicators with fluid animations
- **Performance:** GPU-accelerated transforms and opacity changes for 60fps

#### 4. **Material (Surface Textures)**
- **Glass Morphism:** `backdrop-blur-sm` combined with semi-transparent backgrounds
- **Surface Textures:** Multiple transparency levels (`/10`, `/30`, `/50`) for depth variation
- **Elevation System:** Consistent shadow variants for different importance levels
- **Touch Feedback:** Visual response to user interactions through material state changes

#### 5. **Scale (Responsive Hierarchy)**
- **Responsive Scaling:** Mobile-first design with consistent breakpoint behavior
- **Typography Scale:** Hierarchical and proportional sizing (text-sm, text-lg, text-3xl)
- **Component Sizing:** Consistent padding and spacing using 4px grid system
- **Adaptive Layouts:** Components that scale gracefully across all device sizes

### Color Psychology & Strategic Application

#### Primary Brand Colors
- **`brand-pink` (#FF2D92):** Energy, action, primary CTAs, active states
  - *Psychological impact:* Urgency, excitement, brand recognition
  - *Usage:* Submit buttons, active navigation, progress indicators
- **`brand-purple` (#8B5CF6):** Creativity, technology, secondary elements
  - *Psychological impact:* Innovation, premium feel, sophistication
  - *Usage:* Hover states, secondary buttons, accent elements
- **`brand-cyan` (#06B6D4):** Trust, modernity, informational elements
  - *Psychological impact:* Reliability, clarity, communication
  - *Usage:* Success states, notifications, informational badges

#### Neutral Foundation Colors
- **`brand-dark/darker`:** Depth, elegance, primary backgrounds
  - *Purpose:* Main content areas, form backgrounds, card surfaces
- **`brand-card`:** Separation, organization, container boundaries
  - *Purpose:* Card borders, dividers, subtle separations
- **`text-light/muted`:** Readability hierarchy, content prioritization
  - *Purpose:* Primary text, secondary text, placeholder content

#### Semantic State Colors
- **`brand-red` (#DC2B50):** Errors, alerts, validation failures
  - *Context:* Form validation, error messages, critical alerts
- **Success Green:** Success states, confirmations, positive feedback
- **Warning Yellow:** Caution, pending states, attention-required items

### Component Design Patterns & Best Practices

#### Form Elements & User Input
- **Focus Ring Strategy:** `ring-2 ring-brand-pink/50` for accessibility compliance
- **Error State Design:** Red border + shadow + icon for immediate visual feedback
- **Placeholder Strategy:** Muted color with descriptive but non-redundant text
- **Label Positioning:** Always top-aligned, left-justified, semibold weight for hierarchy
- **Validation Feedback:** Real-time validation with smooth transitions and clear messaging

#### Interactive Elements & Micro-interactions
- **Primary Buttons:** Gradient backgrounds for high-priority actions
- **Secondary Buttons:** Border-based design for secondary actions
- **Card Interactions:** Hover states with border color transitions and subtle scaling
- **Tab Navigation:** Active state with background tinting and accent borders
- **Link Treatments:** Underline effects with smooth color transitions

#### Layout Principles & Spatial Relationships
- **Spacing System:** 8px-based grid system (space-2, space-4, space-6, etc.)
- **Content Width:** Optimal readability limits (`max-w-4xl`, `max-w-6xl`)
- **Grid Architecture:** Flexbox for general layouts, CSS Grid for complex components
- **Responsive Breakpoints:** Mobile-first approach with consistent behavior across devices

### Animation Guidelines & Performance Optimization

#### Micro-interactions & State Transitions
```css
/* Standard transition for most interactive elements */
transition-all duration-200

/* Enhanced hover effects for buttons and interactive components */
hover:scale-105 transition-all duration-300

/* Accessibility-focused focus states with ring indicators */
focus:outline-none focus:ring-2 focus:ring-brand-pink/50
```

#### Complex State Changes & Loading States
- **Loading Indicators:** Fade in/out with smooth spinners, avoiding layout jumps
- **Success/Error Feedback:** Slide-in animations from top with optional auto-dismiss
- **Page Transitions:** Fade effects with subtle Y-axis translation for depth
- **Progressive Enhancement:** Graceful degradation for users with motion sensitivity

#### Performance Considerations & Best Practices
- **GPU Acceleration:** Prioritize `transform` and `opacity` over layout-affecting properties
- **Reduced Motion Compliance:** Respect user's `prefers-reduced-motion` system preference
- **60fps Target:** Optimize all animations for consistent 60fps performance
- **Efficient Triggers:** Use CSS transitions over JavaScript animations when possible

### Accessibility Standards & Inclusive Design

#### Color Contrast & Visual Accessibility
- **WCAG AA Compliance:** Minimum 4.5:1 contrast ratio for normal text, 3:1 for large text
- **Focus Indicators:** Always visible and high-contrast focus rings for keyboard navigation
- **Color Independence:** Never rely solely on color to communicate important information
- **Dark Mode Compatibility:** Ensure all components work in both light and dark themes

#### Keyboard Navigation & Interaction
- **Logical Tab Order:** Sequential and predictable navigation flow through interactive elements
- **Skip Links:** Quick navigation options for screen reader and keyboard users
- **Focus Management:** Proper focus trapping in modals and complex interactive components
- **Escape Mechanisms:** Always provide clear ways to exit or cancel interactions

#### Screen Reader Support & Semantic HTML
- **Semantic Structure:** Proper heading hierarchy, landmarks, and HTML5 semantic elements
- **Descriptive Alt Text:** Meaningful and contextual alternative text for images and icons
- **ARIA Labels:** Comprehensive labeling for complex interactive components and dynamic content
- **Live Regions:** Proper announcement of dynamic content changes for assistive technologies

### Implementation Examples & Code Patterns

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

#### Advanced Form Field Pattern
```tsx
className={`
  w-full px-4 py-3 rounded-lg transition-all duration-200
  bg-brand-darker border-2 text-text-light placeholder-text-muted
  focus:outline-none focus:ring-2
  ${error 
    ? 'border-brand-red focus:ring-brand-red/50 shadow-lg shadow-brand-red/20' 
    : 'border-brand-card hover:border-brand-purple focus:border-brand-pink focus:ring-brand-pink/50'
  }
`}
```

## Mobile-First Design Implementation (✅ Completed)

### Tailwind CSS Mobile-First Principles Applied
- **Base classes (no prefix):** Apply to mobile by default
- **Responsive prefixes:** `sm:`, `md:`, `lg:`, `xl:` scale up from mobile
- **Anti-pattern avoided:** Never use `sm:` thinking it targets mobile

### Mobile-First Typography System
```typescript
// FluentGlowHeading - Mobile-first responsive scales
'4xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
'5xl': 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl'

// FluentText - Mobile-first text sizing
base: 'text-base sm:text-lg md:text-xl'
lg: 'text-lg sm:text-xl md:text-2xl'
```

### Mobile-First Layout Patterns
```css
/* Mobile-first spacing */
padding: 0.75rem;        /* Mobile base */
sm:padding: 1rem;        /* 640px+ */
md:padding: 1.5rem;      /* 768px+ */
lg:padding: 2rem;        /* 1024px+ */

/* Mobile-first grid */
grid-template-columns: 1fr;           /* Mobile: 1 column */
sm:grid-template-columns: repeat(2, 1fr); /* 640px+: 2 columns */
lg:grid-template-columns: repeat(3, 1fr); /* 1024px+: 3 columns */
```

### Button System Anti-Wrapping
```css
.button-text-control {
  white-space: nowrap;      /* Prevent text wrapping */
  overflow: hidden;         /* Hide overflow */
  text-overflow: ellipsis;  /* Show ellipsis if needed */
}

.buttons-equal-width {
  display: grid;
  grid-template-columns: 1fr;      /* Mobile: stacked */
  sm:grid-template-columns: 1fr 1fr; /* Desktop: side by side */
  gap: 0.75rem;             /* Progressive gap spacing */
}
```

### Mobile Performance Optimizations
```css
.mobile-performant-animation {
  transform: translateZ(0);         /* Hardware acceleration */
  backface-visibility: hidden;
  will-change: transform, opacity;
}

/* Accessibility: Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-* { animation: none; }
}
```

### Mobile Viewport & Safe Areas
```css
.mobile-viewport-height {
  min-height: 100vh;
  min-height: 100dvh;              /* Dynamic viewport height */
}

.mobile-safe-area {
  padding-left: max(env(safe-area-inset-left), 1rem);
  padding-right: max(env(safe-area-inset-right), 1rem);
}
```

## Hero-Header Integration
- **Fixed Header:** Header with `position: fixed` and proper z-index layering
- **Hero Layout:** Accounts for header height with `calc(100vh - var(--header-height))`
- **Smooth Scroll:** `scroll-padding-top` offset for navigation links
- **Mobile Responsive:** Different header heights for mobile vs desktop
- **Dynamic Viewport:** Uses `100dvh` for modern mobile browsers

```css
/* Hero-Header integration variables */
:root {
  --header-height: 4rem;        /* Desktop header */
  --header-height-mobile: 3.5rem; /* Mobile header */
}

.hero-with-header {
  min-height: calc(100dvh - var(--header-height-mobile));
  padding-top: var(--header-height-mobile);
}
```
