# Tommaso Berti Portfolio

React SPA built with Vite and MUI.

## Scripts

- `npm run dev`: starts local development server
- `npm run build`: creates production build in `dist/`
- `npm run preview`: previews the production build locally
- `npm run lint`: runs ESLint checks
- `npm run i18n:check`: verifies translation key alignment between `it.json` and `en.json`

## Project Architecture

- `src/app`: app wiring (`AppProviders`, route rendering, route definitions, layout shell)
- `src/app/layout`: global frame (`Header`, `Footer`, `Layout`, toggles, release notes modal, scroll behavior)
- `src/app/routing/appDefinitions.js`: single source of truth for route/page definitions and breadcrumb contexts
- `src/contexts`: global state providers (`Theme`, `Language`, `Breadcrumb`)
- `src/features`: cross-page features (breadcrumbs and feature-specific subcomponents like `IconMenu`)
- `src/pages`: route-level page views (`home`, `about`, `projects`, `blog`)
- `src/pages/projects/projectsPages`: project-detail page sections and project configuration
- `src/hooks`: reusable hooks (`useTranslation`, `useScrollToHash`)
- `src/i18n`: translation dictionaries and i18n entrypoint
- `src/styles`: theme factory and style configuration
- `src/assets`: static media (flags, logo, images)
- `src/config/brandIcons.js`: centralized free/public brand icon registry (Simple Icons via `react-icons`)

## Maintenance Guide

### Add or Edit Pages/Routes

- Update `src/app/routing/appDefinitions.js` in `PAGE_DEFINITIONS`.
- For breadcrumb behavior, set/adjust `breadcrumbContext` in the same file.

### Add or Edit Breadcrumb Menus/Sections

- Update `BREADCRUMB_CONTEXT_DEFINITIONS` in `src/app/routing/appDefinitions.js`.
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
- Automatic deploy runs on push to `main`.
- On automatic deploy to `main`, bump type is read from commit/PR text tokens (case-insensitive):
  - `#major` or `[major]`
  - `#minor` or `[minor]`
  - `#patch` or `[patch]`
- Precedence: `major` > `minor` > `patch`.
- Default when no token is found: `patch`.
- Rerun safety: if the same commit already has a SemVer tag, the workflow reuses that version and does not create a new one.

## Deploy Procedure

### Automatic Deploy (main)

1. Merge or push to `main`.
2. GitHub Actions runs `Deploy www.tommasoberti.com (versioned)` automatically.
3. Version bump is resolved from commit/PR tokens (`#major`, `#minor`, `#patch`).
4. Build is deployed and release tag is created (if not already present).

### Manual Deploy (workflow_dispatch)

1. Open GitHub repository -> `Actions` -> `Deploy www.tommasoberti.com (versioned)`.
2. Click `Run workflow`.
3. Set:
   - `target_ref`: branch/ref to deploy (for example `main` or `feature/my-branch`)
   - `bump_level`: `patch`, `minor`, or `major`
   - `skip_deploy`: `true` to skip build/deploy/tag steps, `false` for normal deploy
4. Run workflow.

Manual deploy behavior:
- Deploy can run from any branch/ref.
- `bump_level` is explicit and does not use commit token parsing.
- Release tag is created only when `target_ref` is `main`.
- For non-main refs, deploy still runs but tag creation is skipped.
- If `skip_deploy=true`, workflow stops after version resolve and skips build/deploy/tag.

### Skip Deploy Token

- You can skip build/deploy/tag by adding `#skip-deploy` (or `[skip-deploy]`) in commit/PR text.
- Supported sources are the same inspected texts used for version bump discovery:
  - commit messages (push range)
  - PR title/body
  - PR merge commit message
- In manual `workflow_dispatch`, skip is controlled only by the `skip_deploy` input.
