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
- GitHub Actions workflow `.github/workflows/ci.yml` runs lint, i18n check, unit tests, build, and Playwright e2e on push/PR.
- Vitest smoke tests cover routing resolution, i18n namespace builders, and project selectors.
- Playwright e2e covers home, navigation, 404, language toggle, and hidden blog nav.
- SEO: per-project meta in `SeoMetaManager`, JSON-LD (`Person` + `WebSite`), `public/robots.txt`, `public/sitemap.xml`, hreflang alternate links.
- Dedicated `NotFound` page for unknown routes; Blog route remains available but hidden from primary nav (`showInNav: false`).
- Profile images use WebP + JPEG fallback via `ProfileImage`; Google Fonts load asynchronously in `index.html`.
- `MiniWebappPreview` defers iframe loading with Intersection Observer when `deferLoad` is enabled.
- Prettier (`npm run format`) and `jsconfig.json` (JS editor checks) are configured.
- Legacy custom language context/hook removed in favor of `i18n.changeLanguage` and `useTranslation`.

## Known Gaps
- Blog route is still a placeholder page (hidden from nav, reachable at `/blog`).
- Client-side SEO still depends on JS for dynamic meta; static `index.html` is Italian-first fallback only.
- No full TypeScript migration (project remains JS with `jsconfig.json` for editor support).

## Operational Notes
- `npm run lint`, `npm run i18n:check`, `npm test`, and `npm run test:e2e` are local safety checks.
- `npm run build:analyze` writes `dist/bundle-stats.html` for bundle inspection.
- `npm run data:refresh` regenerates static JSON consumed at runtime.
