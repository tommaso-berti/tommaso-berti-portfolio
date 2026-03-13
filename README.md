# Tommaso Berti Portfolio

React SPA built with Vite and MUI.

## Scripts

- `npm run dev`: starts local development server
- `npm run build`: creates production build in `dist/`
- `npm run preview`: previews the production build locally
- `npm run lint`: runs ESLint checks
- `npm run i18n:check`: verifies translation key alignment between `it.json` and `en.json`

## Project Architecture

- `src/components`: global layout shell and shared app frame (`Header`, `Footer`, `Layout`, toggles, scroll behavior)
- `src/contexts`: global state providers (`Theme`, `Language`, `Breadcrumb`)
- `src/config/appDefinitions.js`: single source of truth for route/page definitions and breadcrumb contexts
- `src/app`: app wiring (`AppProviders`, route rendering from registry)
- `src/features`: cross-page features (breadcrumbs and feature-specific subcomponents like `IconMenu`)
- `src/pages`: route-level page views (`home`, `about`, `projects`, `blog`, `exampleStyles`)
- `src/pages/projects/projectsPages`: project-detail page sections and project configuration
- `src/hooks`: reusable hooks (`useTranslation`, `useScrollToHash`)
- `src/i18n`: translation dictionaries and i18n entrypoint
- `src/styles`: theme factory and style configuration
- `src/ui`: reusable UI primitives used by style/demo page
- `src/assets`: static media (flags, logo, images)
- `src/config/brandIcons.js`: centralized free/public brand icon registry (Simple Icons via `react-icons`)

## Maintenance Guide

### Add or Edit Pages/Routes

- Update `src/config/appDefinitions.js` in `PAGE_DEFINITIONS`.
- For breadcrumb behavior, set/adjust `breadcrumbContext` in the same file.
- Keep `/example-style` marked as `experimental: true` unless intentionally promoted.

### Add or Edit Breadcrumb Menus/Sections

- Update `BREADCRUMB_CONTEXT_DEFINITIONS` in `src/config/appDefinitions.js`.
- About hash anchors must stay aligned with section IDs in About components:
  - `bio`
  - `hobbies`
  - `study-and-experience`
  - `tech-skills`

### Add or Edit Projects Content

- Keep project data in `src/pages/projects/projectsPages/projects.js`.
- Project list/detail shaping is centralized in `src/pages/projects/projectsPages/projectSelectors.js`.
- Projects tabs are defined in `src/pages/projects/projectsPages/projectTabs.config.js`.

### Icon Management

- Brand icons are centralized in `src/config/brandIcons.js` with `BrandIconDefinition`.
- Always map technologies/tools by stable IDs (for example: `react`, `mui`, `github`, `webstorm`) and reuse those IDs in UI configs.
- Prefer official `react-icons/si` (Simple Icons) entries for each brand.
- If an exact brand icon is unavailable, use the closest free/public fallback and document it in the icon `title` (current examples: `vscode` -> VSCodium, `minisearch` -> JavaScript).

## Release Versioning

- Deploy versioning is tag-based with SemVer format: `vMAJOR.MINOR.PATCH`.
- On deploy to `main`, bump type is read from commit/PR text tokens (case-insensitive):
  - `#major` or `[major]`
  - `#minor` or `[minor]`
  - `#patch` or `[patch]`
- Precedence: `major` > `minor` > `patch`.
- Default when no token is found: `patch`.
- Rerun safety: if the same commit already has a SemVer tag, the workflow reuses that version and does not create a new one.
