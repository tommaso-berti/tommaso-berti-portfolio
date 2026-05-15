# ARCHITECTURE

System-level notes for the portfolio application.

## Overview
- Single-page React app served by Vite.
- UI is built with MUI components and custom feature/page composition.
- Routing is client-side via React Router 7.

## Main Components
- Providers (`src/app/AppProviders.jsx`):
  - `LanguageContextProvider`
  - `BreadCrumbProvider`
  - `ThemeModeProvider`
  - `BrowserRouter`
- Route layer (`src/app/AppRoutes.jsx`):
  - Loads route map from `PAGE_DEFINITIONS`
  - Renders under shared `Layout`
- Layout layer (`src/app/layout/`):
  - Fixed header, breadcrumbs, nav, toggles, release notes modal, footer
- Page layer (`src/pages/`):
  - Home, About, Projects, Blog, Contact, CV, Project details

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
- `scripts`: operational tooling (i18n, release notes, data generation)

## External Dependencies
- React + React DOM
- React Router
- MUI (`@mui/material`, icons, lab)
- Markdown tooling (`react-markdown`, `remark-gfm`)

## Constraints and Trade-Offs
- No server runtime in this repo; data is expected from static artifacts.
- Release note quality depends on workflow execution and metadata quality.
- i18n key consistency is a strict requirement across `src/i18n/locales/en/*.json` and `src/i18n/locales/it/*.json`.
