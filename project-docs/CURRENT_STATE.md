# CURRENT STATE

Snapshot as of 2026-09-25.

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
- SEO: per-project and public-route meta in `SeoMetaManager`, JSON-LD (`Person` + `WebSite`), `public/robots.txt`, `public/sitemap.xml`, hreflang alternate links.
- Dedicated `NotFound` page for unknown routes; Blog route remains available but hidden from primary nav (`showInNav: false`).
- Profile images use WebP + JPEG fallback via `ProfileImage`; Google Fonts load asynchronously in `index.html`.
- `MiniWebappPreview` defers iframe loading with Intersection Observer when `deferLoad` is enabled.
- Prettier (`npm run format`) and `jsconfig.json` (JS editor checks) are configured.
- Legacy custom language context/hook removed in favor of `i18n.changeLanguage` and `useTranslation`.
- The portfolio uses the aerospace-inspired exploration design system: `explorationLight` is the default palette and the persisted dark toggle uses a matching deep-space variant.
- `/services` is a localized public route; shared mission UI primitives live in `src/features/mission-ui/`.
- `/systems` is a localized public route at navigation position 05, covering AI-assisted development, personal VPS infrastructure, client environment boundaries, and daily tools; its AI workflow and infrastructure views are interactive and theme-aware.
- `/style` is a localized, unlisted direct route that demonstrates the current theme tokens, typography, controls, surfaces, diagrams, and motion in the active theme; SEO marks it `noindex, nofollow`.
- Shared mission styling now exposes the existing monospace stack and panel entrance timing through the MUI theme; Services and Systems reuse the same numbered section heading and static panel surface. `/style` shows both shared patterns and the updated font/motion tokens.
- `/services` uses six numbered, localized `SRV-01`–`SRV-06` sections that feed the document scroll rail; its interactive Starfield capability matrix includes technical schematics, telemetry, tags, hover/focus-driven expansion, and light/dark theme tokens.
- Motion uses CSS/MUI only, is limited to instrumentation-style feedback, and honours `prefers-reduced-motion`.
- The home hero uses `CelestialProjectMap`: a catalog-derived SVG project map with generated orbit geometry, accessible selection, moving project cards/CTAs, reduced-motion support, and fullscreen fallback.
- The home celestial map keeps its original hero panel dimensions, with a measured zoom and a compact technical control toolbar anchored at the top right.
- Every project detail route now uses a shared mission-dossier treatment with real links/content, localized technical labels, and an opt-in live application preview; no project screenshots or product metrics were invented.
- Project application modules use `LayeredApplicationPreview`: the e-commerce detail combines the deferred live iframe with layered survey/preview states, responsive touch/keyboard focus, and localized technical telemetry.
- Project detail and About module navigation share the same mission-tab treatment, with localized labels and responsive active-state styling; project details also include editorial technology filters and a constellation roadmap with keyboard-accessible node selection.
- The Projects archive filters now reuse the same mission-tab component as project details and About, with localized labels and category-specific accent colors.
- The Projects archive promotes a selected card before its grid-mate when needed, so the expanded dossier opens without leaving a small companion card above it.
- The global layout uses a flex-column shell with a growing main region, keeping the footer at the viewport bottom without trailing whitespace on short pages.
- The fixed header keeps the horizontal primary navigation and uses a lightly marked shell with corner brackets plus a borderless mission-control cluster linking to the customizable CV and opening localized language/theme popovers; the footer shows the latest published version, whose button opens release notes.
- MUI Paper and Card surfaces share a site-wide 4px corner radius from the theme, including page-specific cards and panels.
- The shared layout adds a localized technical closure line between every page body and the global footer, reusing the former Contact-page treatment.
- The layout exposes a thin, localized desktop document scroll rail outside the main content width; its dots map one-to-one to top-level page sections, use an offset below the fixed header, and update when content size changes. The active dot and progress line follow the reached section, and the rail stays hidden where viewport space is insufficient. About remains a localized personnel-file page with six accessible modules in a shared container, including dedicated technical and certification tabs, while preserving `/about#…` destinations.
- About prioritizes the `Education & experience` module before `How I work`; the former uses a localized NASA/starfield career archive with work/education filters and expandable timeline entries while preserving the `#study-and-experience` anchor.
- About identity now includes a localized, non-editable personnel credential derived from CV/Bio data, with base, personality, Bio, and personnel-system fields embedded directly in the card, reduced separators, a transparent portrait PNG with WebP/JPEG fallback, and transparent light/dark variants of the supplied personnel signature; the five-tab technical blueprint panel uses the original ISS, Artemis, LSO, Saturn V, and Dyson Sphere drawings with accessible technology-node selection.
- The home certifications block follows the local starfield demo structure with a mission hero, a data-driven archive map showing certification counts by subject area, compact real-data status metrics beneath the hero/map row, credential dossiers, technical stack chips, and complete-archive CTA.
- Home's primary and certification CTAs use the shared animated blue action rail instead of hover lift/shadow; `SpaceButton` supports an optional per-instance rail accent while preserving its existing defaults elsewhere.
- About's `How I work` module uses a localized three-phase process panel with selectable phase cards, focus chips, telemetry, and responsive theme-aware SVG schematics.
- About's `Beyond code` module uses a localized three-card hobby panel with personal telemetry, tags, a route legend, responsive layout, and light/dark theme support.
- The Contact page uses a responsive communications rail, technical field labels, topic selection, message counter, completion progress, reset action, and truthful `mailto` handoff status with shared MUI mission UI and bilingual content.
- The Projects Exercises tab uses vertical repository cards, theme-token accent bars, metadata, GitHub action, repository stats, language bars, legends, responsive layout, and bilingual labels; filtering remains out of scope until GitHub data exposes reliable categories.
- Shared page rails now use `MissionRail` across Home, About, Services, Projects, and Contact, separating the orange page index from the eyebrow label and aligning optional metadata opposite it. SectionHeader page titles and the About hero also use the same reduced demo-aligned scale as Contact.
- The `/cv` page uses a localized, sticky CV control deck, technical accent rail and dot texture, profile/portrait header, timeline, and responsive skills/projects layout. Main projects and certifications come from shared page data; compact density shows the same three featured certifications as Home. Existing bilingual CV data, PDF actions, visibility controls, dark theme, and A4 print rules remain in place; styling reuses app typography and palette tokens.

## Known Gaps

- Blog route is still a placeholder page (hidden from nav, reachable at `/blog`).
- Client-side SEO still depends on JS for dynamic meta; static `index.html` is Italian-first fallback only.
- No full TypeScript migration (project remains JS with `jsconfig.json` for editor support).

## Operational Notes

- `npm run lint`, `npm run i18n:check`, `npm test`, and `npm run test:e2e` are local safety checks.
- `npm run build:analyze` writes `dist/bundle-stats.html` for bundle inspection.
- `npm run data:refresh` regenerates static JSON consumed at runtime.
