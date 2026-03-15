# Tommaso Berti Portfolio

Personal portfolio SPA built with React, Vite and MUI.

## Tech Stack

- React 19
- React Router 7
- MUI 7 (`@mui/material`, `@mui/icons-material`)
- Vite (rolldown-vite)
- ESLint 9
- i18n dictionaries (`en.json`, `it.json`)

## Local Setup

1. `npm install`
2. `npm run dev`
3. Open the local URL printed by Vite

## Scripts

- `npm run dev`: start development server
- `npm run build`: create production build in `dist/`
- `npm run preview`: preview production build locally
- `npm run lint`: run ESLint checks
- `npm run i18n:check`: verify key alignment between `src/i18n/en.json` and `src/i18n/it.json`

## Main Features

- Multilingual UI (EN/IT) with runtime language switch
- Theme support and shared layout shell (header/footer/navigation)
- Projects area with tabs (`All`, `Main`, `Side`, `Practice`)
- Project preview cards with:
  - internal CTA (`Explore project`)
  - external CTA (`Open site`)
  - GitHub CTA (`GitHub`) for configured projects
- Practice tab with frontend-only `Exercises` list powered by GitHub REST API
- Release Notes modal powered by GitHub tags/compare APIs
- Skeleton-based loading states for Exercises and Release Notes

## Projects & Exercises Behavior

- Project source config lives in `src/pages/projects/projectsPages/projects.js`.
- Project view models are built in `src/pages/projects/projectsPages/projectSelectors.js`.
- `githubHref` (optional) enables the GitHub action button in project cards.
- `Practice` tab renders `ExercisesSection` instead of static project cards.
- Exercises data source:
  - `GET https://api.github.com/users/tommaso-berti/starred`
  - request params: `per_page=12` and `page`
- Exercises filtering rules:
  - exclude forked repositories
  - include only repos with at least one topic in:
    - `exercise`, `exercises`, `kata`, `challenge`, `challenges`, `practice`, `learning`, `study`
- Pagination behavior:
  - UI loads by chunks of up to 12 visible exercise items
  - multiple raw GitHub pages can be scanned to build one visible chunk
  - `Load more` is shown only when more exercise items may still exist

## Release Notes Behavior

- Modal component: `src/app/layout/ReleaseNotesModal.jsx`
- Data hook: `src/hooks/useLatestReleaseNotes.js`
- Source:
  - latest semver tags from GitHub
  - compare between latest and previous tags when available
  - fallback to commits for first release
- Commit entries are normalized, deduplicated and filtered for noise.
- Loading uses MUI Skeleton; errors show retry action.

## Project Architecture

- `src/app`: app providers, routing and top-level composition
- `src/app/layout`: global layout components (header/footer, toggles, release notes modal)
- `src/app/routing/appDefinitions.js`: page definitions + breadcrumb context configuration
- `src/contexts`: global providers (`Theme`, `Language`, `Breadcrumb`)
- `src/features`: cross-page UI features (for example breadcrumbs/menu helpers)
- `src/pages`: route-level pages (`home`, `about`, `projects`, `blog`)
- `src/pages/projects/projectsPages`: project data/config and detail sections
- `src/hooks`: reusable hooks (`useTranslation`, `useScrollToHash`, `useLatestReleaseNotes`)
- `src/i18n`: dictionaries and i18n bootstrap
- `src/styles`: theme factory/configuration
- `src/assets`: static media
- `src/config/brandIcons.js`: centralized brand icon registry

## Maintenance Guide

### Add or Edit Pages/Routes

- Update `PAGE_DEFINITIONS` in `src/app/routing/appDefinitions.js`.
- Set `breadcrumbContext` there to keep breadcrumbs consistent.

### Add or Edit Breadcrumb Sections

- Update `BREADCRUMB_CONTEXT_DEFINITIONS` in `src/app/routing/appDefinitions.js`.
- Keep About hash IDs aligned with section anchors:
  - `bio`
  - `hobbies`
  - `study-and-experience`
  - `tech-skills`

### Add or Edit Projects

- Add/update entries in `src/pages/projects/projectsPages/projects.js`.
- Keep stable IDs for technologies and labels.
- Add `githubHref` when a GitHub button is needed in project preview cards.
- Ensure required i18n keys exist in both locale files.

### Icon Management

- Keep brand icon mappings in `src/config/brandIcons.js`.
- Prefer official `react-icons/si` icons when available.
- If a direct icon is unavailable, use the nearest free/public fallback and document the choice in code.

## Release Versioning and Deploy

- Versioning is SemVer tag-based: `vMAJOR.MINOR.PATCH`.
- Automatic deploy runs on push to `main`.
- Bump tokens (case-insensitive):
  - `#major` or `[major]`
  - `#minor` or `[minor]`
  - `#patch` or `[patch]`
- Precedence: `major` > `minor` > `patch`.
- If no bump token is found on automatic events, deploy is skipped (`no_bump_token`).
- If commit is already tagged with SemVer, the workflow reuses that version.

### Automatic Deploy (main)

1. Merge or push to `main`.
2. Workflow `Deploy www.tommasoberti.com (versioned)` runs automatically.
3. If a bump token exists, build/deploy/tag steps run.
4. If not, deploy steps are skipped.

### Manual Deploy (`workflow_dispatch`)

1. Open GitHub repository Actions and select `Deploy www.tommasoberti.com (versioned)`.
2. Click `Run workflow`.
3. Set:
   - `target_ref`
   - `bump_level` (`patch` | `minor` | `major`)
   - `skip_deploy` (`true` | `false`)
4. Run workflow.

Behavior:
- Deploy can run from any ref.
- Tags are created only for `main`.
- With `skip_deploy=true`, build/deploy/tag steps are skipped.

### Skip Deploy Token

- Add `#skip-deploy` or `[skip-deploy]` in commit/PR text to skip deploy on automatic runs.
- Supported text sources:
  - commit messages (push range)
  - PR title/body
  - merge commit message
- For manual dispatch, skip behavior is controlled only by `skip_deploy`.
