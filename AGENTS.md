# AGENTS.md

Instructions for Codex and other agents working in this repository.

## Scope
- These instructions apply to the whole repository.
- Follow more specific instructions if a nested `AGENTS.md` is added later.
- Keep this file current when project structure, scripts, deployment, or documentation conventions change.

## Project Snapshot
- Project: Tommaso Berti personal portfolio.
- Type: static-first React SPA.
- Stack: React 19, React Router 7, MUI 7, Vite via `rolldown-vite`, ESLint 9.
- Runtime data model: frontend app plus generated static JSON snapshots in `public/data`.
- Main entrypoints: `src/main.jsx`, `src/App.jsx`, `src/app/AppRoutes.jsx`.
- Route and breadcrumb source of truth: `src/app/routing/appDefinitions.js`.

## Required First Steps
- Check `git status --short` before editing.
- Read the relevant files before changing behavior; do not guess from filenames alone.
- Check `project-docs/INDEX.md` and `project-docs/ARCHITECTURE.md` for orientation on structural tasks.
- For project description/content work, read `project-docs/PROJECT_WRITING_GUIDE.md`.
- Do not overwrite, revert, or clean up unrelated user changes.

## Core Commands
- `npm run dev`: start local Vite dev server.
- `npm run build`: create production build in `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run ESLint checks.
- `npm run i18n:check`: validate key alignment between `src/i18n/locales/en/*.json` and `src/i18n/locales/it/*.json`.
- `npm run data:refresh`: refresh static snapshots in `public/data`.

## Validation Rules
- Run `npm run i18n:check` after any translation key, i18n dictionary, project copy, nav copy, or SEO copy change.
- Run `npm run lint` after JavaScript/JSX changes unless the task is clearly documentation-only.
- Run `npm run build` after route/layout/provider changes, release notes UI changes, or project-preview behavior changes.
- Do not run `npm run data:refresh` unless static snapshots intentionally need regeneration.
- For documentation-only changes, a build is not required; verify file presence and links instead.

## Repository Map
- `src/app/`: app providers, routing, layout shell, SEO/meta helpers.
- `src/app/layout/`: header, footer, navigation toggles, release notes modal, layout wrappers.
- `src/app/routing/appDefinitions.js`: pages, route definitions, breadcrumb contexts.
- `src/contexts/`: theme and breadcrumb providers.
- `src/features/`: shared cross-page UI features.
- `src/pages/`: route-level pages and page-specific modules.
- `src/pages/projects/projectsPages/`: project catalog, detail sections, selectors, technology config.
- `src/hooks/`: reusable hooks.
- `src/i18n/`: EN/IT dictionaries and i18n setup.
- `src/styles/`: theme configuration.
- `src/config/brandIcons.js`: brand icon registry.
- `scripts/`: operational scripts for i18n, release notes, and static data.
- `.github/workflows/`: deploy and manual data/release workflows.
- `public/data/`: generated static runtime snapshots.
- `release-notes/`: generated release notes and payload artifacts.
- `project-docs/`: compact agent memory and writing guidance.

## Architecture Rules
- Keep routing and breadcrumb configuration centralized in `src/app/routing/appDefinitions.js`.
- Keep global providers in `src/app/AppProviders.jsx`; avoid adding provider logic inside page components unless it is page-scoped.
- Keep route rendering in `src/app/AppRoutes.jsx`; avoid duplicating route lists elsewhere.
- Keep project data in `projects.js` and derived presentation logic in `projectSelectors.js`.
- Prefer existing hooks, contexts, and helper modules before introducing new abstractions.
- Keep static runtime data as snapshots; avoid adding browser runtime calls where the current design expects generated JSON.

## File Size and Creation Rules
- Keep one clear responsibility per file; do not mix UI, domain logic, data access, and infrastructure in the same unit.
- Target files under 300 lines.
- Treat 500 lines as the hard maximum for normal source files.
- Consider splitting near 400 lines when it improves readability, testability, or ownership.
- Avoid tiny repetitive files; do not add files under about 40 lines unless the separation is clearly justified.
- Reuse before creating: search existing components, hooks, helpers, config, and services first.
- Create new files only when responsibility is distinct, code is reusable, an existing file is becoming hard to read, or extraction materially improves clarity.
- Do not create trivial wrappers, duplicate helpers, one-off abstractions, or file moves that make navigation harder.
- Refactor incrementally and preserve public APIs unless there is a strong reason to change them.
- When making structural changes, explain why files were created or reused; if reuse was not possible, state why.

## React and UI Conventions
- Follow the existing MUI-based component style and `sx` usage.
- Keep route pages in `src/pages`; keep reusable cross-page pieces in `src/features`.
- Use existing layout, theme, language, and breadcrumb contexts rather than bypassing them.
- Preserve accessibility attributes and keyboard behavior when changing interactive UI.
- Avoid unrelated visual redesigns while implementing functional changes.

## i18n and Content Rules
- This portfolio is bilingual; every user-facing copy change must be represented in both `src/i18n/locales/en/` and `src/i18n/locales/it/`.
- Page copy lives in `src/i18n/locales/{en,it}/pages/*.json` (assembled into the `pages` namespace via `src/i18n/buildPagesNamespace.js`).
- Keep translation keys aligned; validate with `npm run i18n:check`.
- Avoid hard-coded user-facing strings in components unless they are already local, technical fallback text.
- Project descriptions should follow `project-docs/PROJECT_WRITING_GUIDE.md`.
- For project copy, emphasize problem, decision, trade-off, result, and learning rather than listing technologies only.

## Projects Area Rules
- Add or edit project config in `src/pages/projects/projectsPages/projects.js`.
- Keep stable project IDs because routes, breadcrumbs, i18n keys, and detail pages depend on them.
- Add matching i18n keys under `pages.projects.<projectId>` in both EN and IT dictionaries.
- Keep preview, live URL, GitHub URL, CTA labels, category, technologies, and roadmap IDs coherent.
- Use `projectSelectors.js` for derived models instead of duplicating transformation logic in components.

## Release Notes and Static Data
- Treat `.github/workflows/deploy.yml` as the main release/deploy pipeline.
- Release notes tooling lives in `scripts/release-notes/`.
- Static data generation lives in `scripts/static-data/refresh-static-data.mjs`.
- `public/data/exercises.json` and `public/data/release-notes.json` are runtime inputs; shape changes can break UI.
- Generated release-note markdown and payloads live under `release-notes/`; avoid manual churn unless the task is specifically about releases.

## Documentation Rules
- Keep `project-docs/INDEX.md` and `project-docs/ARCHITECTURE.md` compact and useful for future agents.
- Update `project-docs/CURRENT_STATE.md` after notable structural, workflow, or documentation changes.
- Update `project-docs/NEXT_STEPS.md` when new follow-up work is discovered or completed.
- Add new project-writing guidance to `project-docs/PROJECT_WRITING_GUIDE.md`, not the README.
- Keep README focused on human setup, features, architecture summary, and operational usage.

## Safety and Git Hygiene
- Never run destructive git commands unless the user explicitly asks and approves.
- Do not amend commits unless explicitly requested.
- Do not remove generated files, `.DS_Store` files, or existing artifacts as drive-by cleanup.
- If unrelated files are modified, leave them alone.
- If a task requires touching high-impact areas such as workflows, release scripts, or static snapshots, inspect the full flow before editing.

## Completion Checklist
- Confirm changed files with `git status --short`.
- Run the checks required by the type of change.
- Mention any checks that were skipped and why.
- Summarize the user-facing result and the files changed.
