# CURRENT STATE

Snapshot as of 2026-09-21.

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
- The portfolio uses the aerospace-inspired exploration design system: `explorationLight` is the default palette and the persisted dark toggle uses a matching deep-space variant.
- `/services` is a localized public route; shared mission UI primitives live in `src/features/mission-ui/`.
- `/services` uses an interactive Starfield capability matrix: localized service cards expose technical schematics, telemetry, tags, keyboard-accessible expansion, and light/dark theme tokens.
- Motion uses CSS/MUI only, is limited to instrumentation-style feedback, and honours `prefers-reduced-motion`.
- The home hero uses `CelestialProjectMap`: a catalog-derived SVG project map with generated orbit geometry, accessible selection, moving project cards/CTAs, reduced-motion support, and fullscreen fallback.
- The home celestial map keeps its original hero panel dimensions, with a measured zoom and a compact technical control toolbar anchored at the top right.
- Every project detail route now uses a shared mission-dossier treatment with real links/content, localized technical labels, and an opt-in live application preview; no project screenshots or product metrics were invented.
- Project application modules use `LayeredApplicationPreview`: the e-commerce detail combines the deferred live iframe with layered survey/preview states, responsive touch/keyboard focus, and localized technical telemetry.
- Project detail and About module navigation share the same mission-tab treatment, with localized labels and responsive active-state styling; project details also include editorial technology filters and a constellation roadmap with keyboard-accessible node selection.
- The Projects archive filters now reuse the same mission-tab component as project details and About, with localized labels and category-specific accent colors.
- The Projects archive promotes a selected card before its grid-mate when needed, so the expanded dossier opens without leaving a small companion card above it.
- The global layout uses a flex-column shell with a growing main region, keeping the footer at the viewport bottom without trailing whitespace on short pages.
- The fixed header keeps the horizontal primary navigation and uses a lightly marked shell with corner brackets plus a borderless mission-control cluster for release notes, language, and theme; language/theme expose localized click-outside/Escape-safe popovers with restrained motion.
- The layout now exposes a thin, localized desktop document scroll rail outside the main content width on every page; its dots target explicit page sections, supports keyboard-accessible step controls, and uses only start/end dots with a full bar when the document does not scroll. It stays hidden where viewport space is insufficient. About remains a localized personnel-file page with six accessible modules in a shared container, including dedicated technical and certification tabs, while preserving `/about#…` destinations.
- About prioritizes the `Education & experience` module before `How I work`; the former uses a localized NASA/starfield career archive with work/education filters and expandable timeline entries while preserving the `#study-and-experience` anchor.
- About identity now includes a localized, non-editable personnel credential derived from CV/Bio data, with base, personality, Bio, and personnel-system fields embedded directly in the card, reduced separators, a transparent portrait PNG with WebP/JPEG fallback, and transparent light/dark variants of the supplied personnel signature; the five-tab technical blueprint panel uses the original ISS, Artemis, LSO, Saturn V, and Dyson Sphere drawings with accessible technology-node selection.
- The home certifications block follows the local starfield demo structure with a mission hero, archive HUD, status strip, credential dossiers, technical stack chips, and complete-archive CTA, while preserving real certification data, links, translations, and tooltips.

## Known Gaps
- Blog route is still a placeholder page (hidden from nav, reachable at `/blog`).
- Client-side SEO still depends on JS for dynamic meta; static `index.html` is Italian-first fallback only.
- No full TypeScript migration (project remains JS with `jsconfig.json` for editor support).

## Operational Notes
- `npm run lint`, `npm run i18n:check`, `npm test`, and `npm run test:e2e` are local safety checks.
- `npm run build:analyze` writes `dist/bundle-stats.html` for bundle inspection.
- `npm run data:refresh` regenerates static JSON consumed at runtime.
