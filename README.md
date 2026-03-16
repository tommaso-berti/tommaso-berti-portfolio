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
- Release Notes modal powered by static JSON snapshots generated in CI
- Skeleton-based loading states for Exercises and Release Notes

## Projects & Exercises Behavior

- Project source config lives in `src/pages/projects/projectsPages/projects.js`.
- Project view models are built in `src/pages/projects/projectsPages/projectSelectors.js`.
- `githubHref` (optional) enables the GitHub action button in project cards.
- `Practice` tab renders `ExercisesSection` instead of static project cards.
- Exercises data source:
  - static snapshot: `public/data/exercises.json`
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
  - static snapshot: `public/data/release-notes.json`
- Modal content priority:
  - GitHub Release body (AI-generated markdown, when available)
  - commit list fallback/details
- Commit entries are normalized, deduplicated and filtered for noise.
- Loading uses MUI Skeleton; errors show retry action.

## Automated AI Release Notes

This project uses a single-writer CI pipeline: the deploy workflow is the source of truth for release notes and static JSON snapshots (no runtime GitHub API calls from the browser).

### What is included

- Orchestrator workflow: `.github/workflows/deploy.yml`
- Manual diagnostic workflow: `.github/workflows/release-notes.yml`
- Manual utility workflow: `.github/workflows/refresh-static-data.yml`
- Local wrapper: `scripts/release-notes/run.sh`
- Local scripts:
  - `scripts/release-notes/collect_changes.sh`
  - `scripts/release-notes/generate_notes.mjs`
  - `scripts/release-notes/release_notes_prompt.md`
- Static data generator:
  - `scripts/static-data/refresh-static-data.mjs`
- Optional per-project config: `.release-notes.config.json`

### How it works

- Single writer: workflow `Deploy www.tommasoberti.com (versioned)`.
- Automatic trigger on push to `main` (with bump token) and on push tag `v*` (manual tags supported).
- For each resolved release tag, the workflow:
  - generates `release-notes/vX.Y.Z.md`
  - updates GitHub Release body
  - refreshes `public/data/exercises.json` and `public/data/release-notes.json`
  - commits artifacts on default branch with safe rebase/retry push strategy
- Fallback mode: if `OPENAI_API_KEY` is missing/failing, notes are generated from commit metadata (no AI synthesis).

### One-time setup

1. Add repository secret `OPENAI_API_KEY` in GitHub Actions settings.
2. Use SemVer tags: `vMAJOR.MINOR.PATCH`.

### Local usage

Generate notes locally with the same pipeline used in CI:

```bash
scripts/release-notes/run.sh --tag v1.2.3
```

Optional range override:

```bash
scripts/release-notes/run.sh --tag v1.2.3 --from v1.2.2 --to HEAD
```

Refresh static snapshots locally:

```bash
npm run data:refresh
```

### CI usage

- Automatic release path:
  - push/merge to `main` with `#patch`, `#minor` or `#major`
  - or push a manual tag `v*`
- Manual tools:
  - `Release Notes (Manual Tool)`: diagnostic generation/publish only, no commit on `main`
  - `Refresh Static Data`: snapshot generation only, no commit on `main`

### Notes quality recommendations

- Prefer conventional commit prefixes (`feat`, `fix`, `refactor`, `docs`, `chore`) for better categorization.
- Keep commit messages explicit and user-impact oriented where possible.

### Troubleshooting

- Running `npm run build` does not generate release notes or static snapshots.
- CI generation and artifact commit run in `Deploy www.tommasoberti.com (versioned)`.
- If `OPENAI_API_KEY` is missing or invalid, generation still works in fallback mode using commit metadata.
- Manual workflows `Release Notes (Manual Tool)` and `Refresh Static Data` do not push commits.
- Local static refresh is available via `npm run data:refresh`.

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
- Automatic deploy runs on push to `main` and on push tags `v*`.
- Bump tokens (case-insensitive):
  - `#major` or `[major]`
  - `#minor` or `[minor]`
  - `#patch` or `[patch]`
- Precedence: `major` > `minor` > `patch`.
- If no bump token is found on automatic events, deploy is skipped (`no_bump_token`).
- On semver tag push `v*`, deploy/release pipeline runs even without bump tokens.
- If commit is already tagged with SemVer, the workflow reuses that version.

### Automatic Deploy (main)

1. Merge or push to `main`.
2. Workflow `Deploy www.tommasoberti.com (versioned)` runs automatically.
3. If a bump token exists, build/deploy/tag steps run.
4. If not, deploy steps are skipped.

### Automatic Deploy (manual tag `v*`)

1. Push a semver tag like `v2.7.5`.
2. Workflow `Deploy www.tommasoberti.com (versioned)` runs on that tag.
3. The workflow skips bump calculation and uses that tag as `RELEASE_TAG`.
4. It still generates release notes, refreshes static snapshots and updates GitHub Release body.

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
