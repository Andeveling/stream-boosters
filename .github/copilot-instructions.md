# Stream-Boosters Project - Copilot Instructions

## Project Overview
This project, "Stream-Boosters," is a web application built with Astro. It aims to provide services for streamers. The UI text is in Spanish, while all code, comments, variable names, and commit messages must be in English.

## Core Technologies
- **Framework:** Astro
- **UI Components:** React with TypeScript (.tsx)
- **Styling:** Tailwind CSS. We follow Fluent Design principles for a modern, clean, and accessible UI.
- **State Management:** Primarily managed within React components.
- **Forms:** We use `react-hook-form` for form handling and `zod` for schema validation.
- **Linting & Formatting:** The project is configured with ESLint and Prettier. Please adhere to the established rules.

## Key Conventions
1.  **Language:**
    -   **UI Text (what the user sees):** Spanish.
    -   **Code (variables, functions, comments, etc.):** English.
    -   **Commit Messages:** English, following conventional commit standards.
2.  **Component Structure:**
    -   Astro components (`.astro`) are used for layouts and pages.
    -   React components (`.tsx`) are used for interactive UI elements and are located in `src/components`.
    -   Shared, reusable components are encouraged.
3.  **Styling:**
    -   Use Tailwind CSS utility classes directly in the markup.
    -   Adhere to Fluent Design principles. This means using acrylic/blur effects, motion, and a clear visual hierarchy. Look at existing components in `src/components/shared/astro` for inspiration (e.g., `FluentButton.astro`, `FluentSection.astro`).
4.  **Best Practices:**
    -   Write clean, readable, and maintainable code.
    -   Ensure components are accessible (a11y). Use semantic HTML.
    -   Follow the rules defined in the `eslint.config.js` and `.prettierrc` files.
    -   All new features should have corresponding tests. We use Vitest for testing.