# ARCHITECTURE

System-level notes for the portfolio application.

## Overview
- Single-page React app served by Vite.
- UI is built with MUI components and custom feature/page composition.
- Routing is client-side via React Router 7.

## Main Components
- Providers (`src/app/AppProviders.jsx`):
  - `BreadCrumbProvider`
  - `ThemeModeProvider`
  - `BrowserRouter`
- i18n (`src/i18n/index.js`, imported from `src/main.jsx` before render):
  - `i18next` + `react-i18next`; no React language context provider
  - Locale bundles under `src/i18n/locales/{en,it}/`: `common`, `pages`, `releaseNotes`, `seo`
  - Initial language from `localStorage` (`app-language`) or `navigator.language`; persisted on `languageChanged`
  - UI uses `useTranslation(namespace, { keyPrefix })`; toggle calls `i18n.changeLanguage` (`LanguageToggle.jsx`)
- Route layer (`src/app/AppRoutes.jsx`):
  - Loads route map from `PAGE_DEFINITIONS`
  - Renders under shared `Layout`
- Layout layer (`src/app/layout/`):
  - Fixed mission header with subtle corner markers, horizontal primary navigation, borderless `HeaderControls` cluster, localized language/theme popovers, release notes modal, and footer
- Page layer (`src/pages/`):
  - Home, Projects, About, Services, Blog, Contact, CV, Project details
- Mission UI (`src/features/mission-ui/`):
  - Shared technical labels, color rails, original TB identity, orbital SVG, mission cards, capability cards, and restrained motion panels.
  - The MUI theme provides the light/deep-space palettes plus compact motion timing; CSS media queries and `useReducedMotion` keep all decorative motion optional.
- Project dossiers (`src/pages/projects/projectsPages/ProjectDossier.jsx`):
  - Shared `/projects/:project` mission-dossier shell driven by the existing project config and localized content.
  - Includes a technical application frame around the existing opt-in live preview, truthful telemetry, shared mission-tab navigation, and existing detail content grouped as overview, system, interface, and development log.
- Shared mission tabs (`src/pages/projects/projectsPages/ProjectMissionTabs.jsx`):
  - Reused by project details, the About personnel modules, and the Projects archive category filters so tab behavior and visual treatment remain aligned.
- About personnel file (`src/pages/about/`):
  - `About.jsx` composes the personnel header, factual telemetry, TB identity visual, a desktop-only sticky scroll rail, and four selectable modules from existing biography content.
  - `aboutModules.utils.js` maps the public legacy hashes (`bio`, `tech-skills`, `certifications`, `study-and-experience`, `hobbies`) to the corresponding active module without changing URLs.
  - `IdentityVisualizer.jsx` reuses `CelestialProjectMap` in a decorative, reduced-motion-safe logo-centered mode; profile and career facts remain in the localized module content.
  - `Experience.jsx` and `CareerTimeline.jsx` render the localized education/work archive with NASA-style filters, expandable entries, and the `study-and-experience` anchor.
  - `PersonnelCredential` derives the identity card from localized CV/Bio data, including the Bio summary and personnel systems, while `TechnicalBlueprintPanel` renders the five original blueprint assets with registry-backed technology nodes and responsive connectors.

## Data and Request Flow
- Static-first data model:
  - Exercises snapshot: `public/data/exercises.json`
  - Release notes snapshot: `public/data/release-notes.json`
- Scripts refresh these files locally/CI (`npm run data:refresh`).
- Projects tab uses in-repo config and selectors:
  - Source catalog: `projects.js`
  - Presentation model: `projectSelectors.js`

## Boundaries
- `src/app`: app shell, route orchestration, providers, top-level layout
- `src/pages`: route-specific composition and page behavior
- `src/features`: shared UI features reused across pages
- `src/hooks`: reusable logic wrappers around UI/data behavior
- `src/i18n`: dictionary setup, namespaces, and language detection/persistence
- `scripts`: operational tooling (i18n key checks, release notes, data generation)

## External Dependencies
- React + React DOM
- React Router
- MUI (`@mui/material`, icons, lab)
- i18n (`i18next`, `react-i18next`)
- Markdown tooling (`react-markdown`, `remark-gfm`)

## Constraints and Trade-Offs
- No server runtime in this repo; data is expected from static artifacts.
- Release note quality depends on workflow execution and metadata quality.
- i18n key consistency is a strict requirement across `src/i18n/locales/en/*.json` and `src/i18n/locales/it/*.json`.
