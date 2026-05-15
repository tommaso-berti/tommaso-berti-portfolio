# CURRENT STATE

Snapshot as of 2026-05-15.

## Confirmed
- `AGENTS.md` is present in repo root.
- `project-docs/` memory docs are present.
- App stack and scripts in `package.json` are aligned with README.
- Route/breadcrumb source is centralized in `src/app/routing/appDefinitions.js`.
- Release-note and static-data pipelines exist in scripts and GitHub workflows.
- i18n runtime uses `i18next` + `react-i18next` with locale namespaces under `src/i18n/locales/{it,en}`.
- Page copy lives in `locales/{en,it}/pages/*.json`; projects copy is split into `pages/projects/shared.json` plus one file per project id, merged at runtime via `buildProjectsNamespace.js`.
- Initial bundle loads only the active language; `pages.projects` is lazy-loaded on Projects routes via `useEnsureProjectsI18n`.
- GitHub Actions workflow `.github/workflows/ci.yml` runs lint, i18n check, tests, and build on push/PR.
- Vitest smoke tests cover routing resolution, i18n namespace builders, and project selectors.
- SEO: per-project meta in `SeoMetaManager`, `public/robots.txt`, `public/sitemap.xml`, hreflang alternate links.
- Legacy custom language context/hook removed in favor of `i18n.changeLanguage` and `useTranslation`.

## Known Gaps
- Blog route remains a placeholder page in navigation.
- Client-side SEO still depends on JS for dynamic meta; static `index.html` is Italian-first fallback only.

## Operational Notes
- `npm run lint`, `npm run i18n:check`, and `npm test` are quick local safety checks.
- `npm run build:analyze` writes `dist/bundle-stats.html` for bundle inspection.
- `npm run data:refresh` regenerates static JSON consumed at runtime.
