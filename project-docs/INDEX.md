# INDEX

Compact repository map for fast navigation.

## Project Summary
- Personal portfolio SPA with multilingual UI (IT/EN), theme toggle, projects area, CV page, and release notes modal.
- Build/runtime model: static frontend with local/CI-generated JSON snapshots.

## Top-Level Layout
- `src/`: application code
- `public/`: static assets and data snapshots (`public/data`)
- `scripts/`: i18n checks, release-note generation, static-data refresh
- `.github/workflows/`: deploy and data automation
- `release-notes/`: generated markdown and payload artifacts
- `project-docs/`: compact agent memory and project-writing guidance

## Entry Points
- `src/main.jsx`: React bootstrap
- `src/App.jsx`: provider composition + route mounting
- `src/app/AppRoutes.jsx`: route rendering from page definitions

## Important Modules
- `src/app/routing/appDefinitions.js`: route and breadcrumb source of truth
- `src/pages/projects/projectsPages/projects.js`: projects catalog/config
- `src/pages/projects/projectsPages/projectSelectors.js`: project view-model logic
- `src/hooks/useLatestReleaseNotes.js`: release-notes data flow
- `src/config/brandIcons.js`: centralized icon mapping

## Configuration & Automation
- `package.json`: scripts and dependencies
- `vite.config.js`: build tool config
- `.release-notes.config.json`: release-note pipeline config
- `.github/workflows/deploy.yml`: primary deploy/release workflow

## Project Docs
- `project-docs/ARCHITECTURE.md`: system architecture notes
- `project-docs/CURRENT_STATE.md`: current confirmed project state
- `project-docs/NEXT_STEPS.md`: recommended follow-up actions
- `project-docs/PROJECT_WRITING_GUIDE.md`: guidance for writing portfolio project descriptions

## Tests / Checks
- No dedicated test suite detected in repo layout.
- Available quality checks:
  - `npm run lint`
  - `npm run i18n:check`

## Risky Areas
- Release-note generation and workflow scripts can impact CI publishing behavior.
- `public/data/*.json` shape changes can break runtime views (projects/release modal).
- Route or breadcrumb updates in `appDefinitions.js` can affect global navigation.
