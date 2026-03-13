# Tommaso Berti Portfolio

React SPA built with Vite and MUI.

## Scripts

- `npm run dev`: starts local development server
- `npm run build`: creates production build in `dist/`
- `npm run preview`: previews the production build locally
- `npm run lint`: runs ESLint checks

## Project Architecture

- `src/components`: global layout shell and shared app frame (`Header`, `Footer`, `Layout`, toggles, scroll behavior)
- `src/contexts`: global state providers (`Theme`, `Language`, `Breadcrumb`)
- `src/features`: cross-page features (breadcrumbs and feature-specific subcomponents like `IconMenu`)
- `src/pages`: route-level page views (`home`, `about`, `projects`, `blog`, `exampleStyles`)
- `src/pages/projects/projectsPages`: project-detail page sections and project configuration
- `src/hooks`: reusable hooks (`useTranslation`)
- `src/i18n`: translation dictionaries and i18n entrypoint
- `src/styles`: theme factory and style configuration
- `src/ui`: reusable UI primitives used by style/demo page
- `src/assets`: static media and custom icon components
