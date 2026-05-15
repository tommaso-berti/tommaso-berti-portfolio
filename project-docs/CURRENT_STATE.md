# CURRENT STATE

Snapshot as of 2026-05-15.

## Confirmed
- `AGENTS.md` is now present in repo root.
- `project-docs/` memory docs are now present.
- App stack and scripts in `package.json` are aligned with README.
- Route/breadcrumb source is centralized in `src/app/routing/appDefinitions.js`.
- Release-note and static-data pipelines exist in scripts and GitHub workflows.
- i18n runtime now uses `i18next` + `react-i18next` with locale namespaces under `src/i18n/locales/{it,en}`.
- Legacy custom language context/hook have been removed in favor of `i18n.changeLanguage` and `useTranslation`.

## Known Gaps
- No explicit automated test suite (unit/integration/e2e) found in tracked layout.
- Some `.DS_Store` files are tracked in source folders.

## Operational Notes
- `npm run lint` and `npm run i18n:check` are the main quick safety checks.
- `npm run data:refresh` regenerates static JSON consumed at runtime.
