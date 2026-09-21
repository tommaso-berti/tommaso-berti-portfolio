# Portfolio Redesign Specification

**Project:** tommasoberti.com  
**Owner:** Tommaso Berti  
**Purpose:** Complete visual redesign of the existing software developer portfolio  
**Status:** Design specification / source of truth  
**Target implementation:** Existing project only — React + TypeScript + Material UI (MUI)

---

# 1. Objective

Redesign the existing portfolio into a distinctive **space-exploration / NASA-punk inspired interface**, with strong visual inspiration from the design language associated with *Starfield*, while remaining:

- original;
- professional;
- readable;
- accessible;
- lightweight;
- appropriate for a software developer selling his services.

The result must **not** look like:

- a generic SaaS landing page;
- a generic Material UI template;
- a dark cyberpunk dashboard;
- an RGB gaming website;
- a direct clone of Starfield;
- a videogame fan site.

The intended feeling is:

> **Modern software developer portfolio presented like an aerospace exploration system.**

The design should communicate personality immediately:

- software development;
- space exploration;
- PC / technology enthusiasm;
- engineering;
- precision;
- experimentation.

The visual theme must remain secondary to usability.

A visitor who has never played Starfield must still immediately understand:

1. who Tommaso is;
2. what he does;
3. what projects he built;
4. what technologies he uses;
5. what services he offers;
6. how to contact him.

---

# 2. Non-negotiable technology constraints

The current technology stack must remain unchanged.

Use the technologies already present in the repository.

Expected primary stack:

- React
- TypeScript
- Material UI / MUI
- existing router
- existing build tooling
- existing API / backend architecture, if any

## Do not introduce

Unless already present and strictly required:

- Tailwind CSS
- shadcn/ui
- Bootstrap
- Chakra UI
- Ant Design
- another component library
- another CSS framework
- Three.js
- WebGL libraries
- large animation libraries
- unnecessary dependencies

Prefer:

- MUI components
- MUI theme
- `sx`
- styled components using the existing MUI setup
- CSS
- SVG
- native browser APIs
- lightweight React state

All visual effects shown in this specification must be achievable using the existing stack.

---

# 3. Git / implementation strategy

Implement the redesign in a dedicated branch.

Recommended branch:

```text
feat/starfield-portfolio-redesign
```

Do **not** preserve the old portfolio as a second public design/theme.

Git history already preserves the previous design.

The new design becomes the production design once reviewed and merged.

The application should, however, be architected so that additional color themes can be added later without redesigning components.

Possible future themes:

- `explorationLight` — default
- `deepSpaceDark` — optional future theme
- `engineeringLight` — optional future variation

The old portfolio theme is **not** one of these themes.

---

# 4. Primary design direction

## Core concept

The default portfolio must use a **LIGHT space exploration interface**.

The aesthetic is inspired by:

- aerospace instrumentation;
- NASA hardware;
- printed spacecraft manuals;
- mission patches;
- orbital maps;
- scientific diagrams;
- utilitarian technical interfaces;
- retro-futuristic engineering;
- clean exploration UI.

The site should feel tactile and engineered rather than glossy and decorative.

---

# 5. Color system

The primary theme is **not dark mode**.

Avoid large black / navy backgrounds.

## Main colors

### Background / paper

```text
background.default: #F3F0E7
background.secondary: #ECE8DC
background.paper: #F7F3EA
background.panel: #F1EDE3
```

These should feel like:

- warm technical paper;
- spacecraft interior surfaces;
- engineering manuals;
- slightly aged off-white material.

### Main text

```text
text.primary: #17202A
text.secondary: #555A5B
text.muted: #747873
```

Primary text should be very dark navy / charcoal, not pure black.

### Technical blue

```text
accent.blue: #347CB2
```

Used for:

- active navigation;
- orbital lines;
- important technical indicators;
- selected states;
- headings or selected words;
- technical interface accents.

### Orange

```text
accent.orange: #DF733D
```

Used sparingly for:

- mission identifiers;
- trajectory sections;
- card markers;
- warning / energetic details.

### Yellow

```text
accent.yellow: #D0AB3D
```

Used for:

- mission bars;
- secondary project categories;
- instrumentation details.

### Muted red

```text
accent.red: #C94F4A
```

Used sparingly for:

- multi-color mission rails;
- important instrumentation details;
- project/category identifiers.

### Status green

```text
status.success: #668A69
```

Used only for:

- online;
- ready;
- available;
- successful status indicators.

---

# 6. Signature color rail

A recurring visual motif should be a small horizontal four-color rail:

```text
RED | ORANGE | YELLOW | BLUE
```

Example:

```text
#C94F4A
#DF733D
#D0AB3D
#347CB2
```

This motif can appear:

- under the TB logo;
- below navigation modules;
- in mission patches;
- inside project/system cards;
- in selected page dividers.

Do not overuse it.

It is a visual signature, not decoration everywhere.

---

# 7. Typography

Typography should feel:

- modern;
- technical;
- slightly aerospace;
- highly readable.

Do not use an excessively futuristic novelty font.

If the existing project already has a suitable font, reuse it.

Otherwise prefer a clean sans-serif already available in the project.

## Hierarchy

### Large headings

Characteristics:

- very large;
- bold;
- tight tracking;
- short statements;
- mostly uppercase when used as hero statements.

Example:

```text
BUILD.
EXPLORE.
IMPROVE.
```

or:

```text
BUILDING FOR
THE NEXT ORBIT.
```

### Technical labels

Use a monospace font or monospace stack for:

- mission IDs;
- section numbers;
- coordinates;
- system status;
- telemetry;
- small interface labels.

Example:

```text
02 // MISSION ARCHIVE
TB-DEV // EXPLORATION LOG 2026
NODE TB-01
SIGNAL NOMINAL
```

Technical labels should be small and letter-spaced.

They must **not** replace readable headings.

---

# 8. Global page structure

The portfolio should behave like a normal multi-page site or routed single-page application.

Primary pages:

```text
01 HOME
02 PROJECTS
03 ABOUT
04 SERVICES
05 CONTACT
```

Keep the existing routing architecture if one exists.

Each page should have its own visual composition while sharing the same design system.

Do not create one huge scrolling page unless that is already the site's architecture.

---

# 9. Header / navigation

The main header should include:

## Left

Original TB identity mark.

The mark should be:

- circular;
- technical;
- reminiscent of a mission patch / aerospace seal;
- original;
- made with CSS or SVG;
- simple enough to work at small sizes.

Suggested construction:

- outer circular border;
- inner `TB`;
- small multicolor rail beneath;
- subtle technical ring.

Do **not** reproduce:

- Starfield logo;
- Constellation logo;
- NASA logo;
- Bethesda assets.

## Center / right

Navigation:

```text
01 HOME
02 PROJECTS
03 ABOUT
04 SERVICES
05 CONTACT
```

Active item:

- dark text;
- thin blue underline;
- no large pill;
- restrained feedback.

Header should feel like an instrument panel, not a conventional SaaS navbar.

---

# 10. Home page

The home page is the strongest identity page.

## Layout

Desktop:

```text
LEFT: content / identity
RIGHT: celestial navigation module
```

Approximate ratio:

```text
55% / 45%
```

Mobile:

stack vertically.

---

## 10.1 Hero content

Technical label:

```text
TB-DEV // EXPLORATION LOG 2026
```

Possible hero title:

```text
BUILD.
EXPLORE.
IMPROVE.
```

or:

```text
BUILDING FOR
THE NEXT ORBIT.
```

At least one word/line may use the technical blue accent.

Supporting text should clearly describe the real work.

Example direction:

> I'm Tommaso Berti, a software developer building web applications, dashboards, APIs and automation tools. Practical systems, clean interfaces and solid architecture.

Do not sacrifice clarity for space terminology.

---

## 10.2 Hero CTAs

Primary:

```text
VIEW SELECTED BUILDS →
```

Secondary:

```text
OPEN COMMS
```

or use existing real CTA labels if clearer.

Buttons should be:

- rectangular;
- slightly industrial;
- very small border radius;
- dark primary button;
- light outlined secondary.

Avoid:

- giant rounded SaaS pills;
- gradient buttons;
- neon glow.

---

# 11. Celestial navigation visual

The right side of the home hero should contain an original interactive visual.

This is one of the main signature elements.

## Appearance

A light technical panel containing:

- multiple circular orbit lines;
- vertical and horizontal axis;
- elliptical orbit;
- planet or celestial body;
- orbit markers;
- trajectory arcs;
- technical labels;
- system status;
- multicolor rail.

Example labels:

```text
CELESTIAL DEVELOPMENT MAP
NODE TB-01
ORBIT 067°
SIGNAL NOMINAL
EARTH SYSTEMS
```

## Implementation

Prefer inline SVG.

Do not use WebGL.

Suggested SVG primitives:

- `<circle>`
- `<ellipse>`
- `<line>`
- `<path>`

## Motion

Very subtle:

- slow orbital rotation;
- small marker movement;
- slight instrument pulse.

No large spinning animations.

Respect:

```text
prefers-reduced-motion
```

---

# 12. Stats / telemetry strip

Below or near the home hero, show a compact instrumentation row.

Example:

```text
PRIMARY STACK    TS
PROJECT TYPE     WEB
SYSTEMS          API
STATUS           READY
```

Use:

- small uppercase label;
- large value;
- borders between columns;
- paper/panel background.

On mobile:

2-column layout.

---

# 13. Projects page

Visual concept:

```text
02 // MISSION ARCHIVE
SELECTED PROJECTS
```

Do not present projects as generic gradient cards.

Projects should feel like entries in a mission archive.

---

## 13.1 Project filtering

If the existing project data supports categories, provide compact filters.

Example:

```text
ALL
WEB APPS
INFRA
AUTOMATION
```

Active filter:

- dark background;
- light text.

Do not add fake filtering if the actual project set is too small.

---

## 13.2 Project card

Each card should include:

```text
MISSION 01 // EV PLATFORM
WattDaCar

Short project description.

REACT
TYPESCRIPT
MUI
...
```

Visual features:

- off-white card;
- thin grey border;
- narrow vertical category strip on left;
- small technical identifier;
- project name;
- concise copy;
- small tech chips.

Category color examples:

```text
Web application → blue
Infrastructure → yellow
Automation → orange
Experimental → red
```

Hover:

- very small vertical movement;
- slightly stronger border;
- no glow.

---

# 14. Real project content

Always inspect the actual repository/project data first.

Do not invent portfolio projects when real project information exists.

Known conceptual examples from the design exploration include:

## WattDaCar

Presentation direction:

```text
MISSION 01 // EV SYSTEMS
```

Focus:

- EV data;
- battery;
- charging;
- consumption;
- trips;
- vehicle information.

## Loci

Presentation direction:

```text
MISSION 02 // TOOL PLATFORM
```

Focus:

- modular personal tool hub;
- multiple utilities;
- coherent product system.

## VPS Radar

Presentation direction:

```text
MISSION 03 // INFRASTRUCTURE
```

Focus:

- VPS visibility;
- services;
- projects;
- domains;
- ports;
- read-only monitoring.

These names/descriptions are examples from the approved visual concept.

Before implementation, verify what currently exists in the real portfolio.

---

# 15. Project detail interaction

When a project is selected, show a more detailed module below or beside the cards.

Example:

```text
WattDaCar // EV Intelligence Platform

A dashboard-oriented product focused on making
vehicle information understandable...

REACT
TYPESCRIPT
MUI
NODE.JS
```

This module can animate subtly when changing selection.

Do not create modal overload.

---

# 16. About page

Visual concept:

```text
03 // PERSONNEL FILE
ABOUT TOMMASO
```

The page should combine:

- professional developer profile;
- technical personal identity;
- restrained space-exploration visual language.

## Suggested desktop structure

```text
LEFT
Profile module

RIGHT
Development philosophy / timeline
```

---

## 16.1 Profile module

Can include:

- original TB mission patch;
- name;
- role;
- short profile;
- compact facts.

Possible facts, only if true and already supported by the real site:

```text
BASE
ITALY

PRIMARY STACK
REACT / TYPESCRIPT / MUI

INTEREST
SPACE / GAMING

APPROACH
BUILD & ITERATE
```

Do not invent personal facts.

---

## 16.2 Development log

Present philosophy / experience as a development log.

Example structure:

```text
PHASE 01
Build useful things

PHASE 02
Make them clear

PHASE 03
Connect the system

PHASE 04
Iterate
```

This can be replaced with real chronological work experience if the current portfolio contains it.

Real professional experience must take precedence over decorative copy.

---

# 17. Services page

Visual concept:

```text
04 // CAPABILITIES
WHAT I CAN BUILD
```

Use the real services already represented by the portfolio.

Likely groups:

```text
Web Applications
Dashboards
APIs & Integrations
Automation Tools
```

Each service card should have:

- numeric / system identifier;
- title;
- concise explanation;
- small three-color technical strip.

Avoid generic marketing claims.

Focus on concrete capabilities.

---

# 18. Contact page

Visual concept:

```text
05 // COMMUNICATION UPLINK
LET'S BUILD SOMETHING.
```

Space terminology may add personality, but form usability is more important.

Normal field labels must remain clear:

```text
Name
Email
Message
```

Optional secondary technical labels may be added visually:

```text
CALLSIGN / NAME
EMAIL CHANNEL
MISSION BRIEF
```

but accessibility labels must remain normal and understandable.

## Layout

Desktop:

```text
LEFT
Contact channels / intro

RIGHT
Contact form
```

Contact channels might include existing real links for:

- Email
- LinkedIn
- GitHub

Preserve existing working form logic.

Do not replace actual contact behavior with mock behavior.

---

# 19. Technology / stack section

Visual concept:

```text
03 // DEVELOPMENT SYSTEMS
```

or equivalent based on page placement.

Use compact engineering modules.

Example technologies:

```text
React
TypeScript
MUI
Node.js
Databases
APIs
Git
Cloud / DevOps
```

Only include technologies genuinely represented in the real portfolio.

Each module may include:

- simple icon;
- technology name;
- small subsystem label.

Example:

```text
React
FRONTEND

TypeScript
TYPE SYSTEM

MUI
INTERFACE

Node.js
APIs / TOOLS
```

Do not use fake percentage skill meters such as "React 95%".

---

# 20. Mission patch design system

Create a reusable component such as:

```text
MissionPatch
```

Possible props:

```ts
interface MissionPatchProps {
  label?: string;
  code?: string;
  variant?: 'blue' | 'orange' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
}
```

Patch characteristics:

- circular;
- strong border;
- central geometric mark;
- colored bands;
- technical identity;
- original shapes.

Use patches for identity and selected sections, not everywhere.

---

# 21. Reusable components

Prefer reusable MUI/React components instead of page-specific repeated markup.

Potential architecture:

```text
components/
  BrandMark/
  TechnicalLabel/
  ColorRail/
  MissionPatch/
  OrbitalMap/
  TelemetryStrip/
  MissionCard/
  ProjectDetail/
  CapabilityCard/
  SystemPanel/
  SectionHeader/
```

Names may follow the existing repository conventions.

Do not reorganize the entire repository unless necessary.

---

# 22. MUI theme architecture

Do not hardcode the entire palette inside page components.

Use the existing MUI theme setup.

Suggested conceptual design tokens:

```text
palette.background.default
palette.background.paper

palette.text.primary
palette.text.secondary

custom.space.blue
custom.space.orange
custom.space.yellow
custom.space.red
custom.space.green

custom.space.border
custom.space.paperSecondary
```

Adapt the exact structure to the project's existing MUI typing.

If custom palette extensions are used, extend MUI's TypeScript theme interfaces correctly.

---

# 23. Future theme support

Architect the visual system so the palette can be swapped later.

Suggested conceptual structure:

```text
src/
  theme/
    tokens/
      explorationLight.ts
      deepSpaceDark.ts
    createAppTheme.ts
    ThemeProvider.tsx
```

Do not force this exact folder structure if the project already has a theme architecture.

## Default theme

```text
explorationLight
```

The production redesign should initially use the light theme.

## Possible future selector

A theme selector may later allow:

```text
Exploration Light
Deep Space Dark
```

Both themes must use the **same layouts and components**.

Do not maintain:

```text
Old Portfolio
New Portfolio
```

as theme options.

---

# 24. Responsive behavior

Responsive design is mandatory.

## Desktop

Allow:

- wide two-column hero;
- large orbital visual;
- 3-column project grid;
- technical instrumentation.

## Tablet

Reduce:

- typography;
- orbit size;
- spacing.

Use 2-column structures where useful.

## Mobile

Do not shrink the desktop layout.

Recompose it.

Required:

- hero becomes single column;
- text first;
- orbital module second;
- projects become one column;
- technical stats become 2 columns;
- header navigation must remain usable;
- no horizontal page scrolling;
- metadata should wrap cleanly;
- orbit graphics must remain legible.

Avoid tiny text below 8–9 px.

Touch targets should remain accessible.

---

# 25. Motion principles

Animations should feel like instrumentation.

Allowed examples:

- slow orbital movement;
- active trajectory animation;
- subtle status pulse;
- small hover translation;
- section fade/slide;
- selected mission transition;
- navigation indicator movement.

Avoid:

- huge parallax;
- constant floating cards;
- excessive bounce;
- RGB pulses;
- neon glow;
- large particles;
- distracting star animations.

All animation must respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential motion */
}
```

---

# 26. Background texture

The light surfaces should not feel completely flat.

A very subtle technical texture may be used.

Examples:

- sparse micro-dot grain;
- thin grid;
- technical printed-paper texture.

Opacity should remain extremely low.

Do not introduce bitmap textures unless necessary.

Prefer CSS patterns.

---

# 27. Borders and radius

The visual language should be more industrial than modern-SaaS.

Use:

- thin borders;
- squared or almost squared cards;
- small corner radius.

Suggested:

```text
buttons: 2–6 px radius
cards: 0–8 px radius
large modules: 8–16 px where appropriate
```

Avoid turning every component into a rounded pill/card.

---

# 28. Icons

Prefer:

1. icons already used in the repository;
2. existing icon library;
3. simple custom SVG;
4. CSS geometry.

Do not add a new icon library just for the redesign.

Space-specific decorative graphics should preferably be custom SVG/CSS.

---

# 29. Logo / identity rules

The new TB logo must be original.

Allowed inspiration:

- aerospace seals;
- mission patches;
- spacecraft technical marks;
- orbital geometry.

Not allowed:

- copy of Starfield wordmark;
- copy of Constellation emblem;
- copy of NASA meatball/worm logo;
- Bethesda branding.

The TB logo must be recognizable outside of the space theme.

---

# 30. Copywriting principle

Space vocabulary should act as a secondary layer.

Good:

```text
02 // MISSION ARCHIVE
Selected Projects
```

Good:

```text
05 // COMMUNICATION UPLINK
Contact Me
```

Bad:

```text
INITIATE QUANTUM TELEMETRY MATRIX
```

Do not make normal website actions confusing.

Professional clarity always wins.

---

# 31. Accessibility

Must preserve or improve:

- semantic HTML;
- keyboard navigation;
- focus indicators;
- contrast;
- form labels;
- alt text;
- reduced motion;
- usable navigation;
- readable typography.

Decorative SVG must be ignored by screen readers where appropriate.

Interactive SVG elements must only exist if they have proper keyboard behavior.

---

# 32. SEO and existing functionality

Do not break:

- current page URLs;
- metadata;
- OpenGraph;
- sitemap;
- analytics;
- contact form;
- API calls;
- downloadable CV;
- external links;
- project links;
- localization;
- current deployment configuration.

If any of these exist, preserve them.

The redesign is primarily visual / UX.

---

# 33. Implementation workflow for Codex

Before changing code:

1. inspect the repository;
2. inspect `package.json`;
3. inspect routing;
4. inspect current MUI theme;
5. inspect all pages;
6. inspect project/content data;
7. inspect existing shared components;
8. inspect responsive behavior;
9. inspect current contact logic;
10. inspect lint/test/build commands.

Then propose a short implementation plan.

After that, implement incrementally.

Recommended order:

```text
1. Theme tokens
2. Global layout
3. Header
4. BrandMark
5. SectionHeader / TechnicalLabel
6. OrbitalMap
7. Home
8. Projects
9. About
10. Services
11. Contact
12. Responsive
13. Motion
14. Accessibility
15. Cleanup
```

Do not blindly rewrite all files.

---

# 34. Validation

Before considering the redesign complete, run all existing project validation commands.

At minimum, if available:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Use the actual package manager and scripts defined by the repository.

Fix introduced errors.

Do not silence TypeScript / ESLint issues merely to pass validation.

---

# 35. Definition of done

The redesign is complete when:

- the current stack is unchanged;
- the site clearly feels space-exploration inspired;
- the default theme is light;
- the site does not feel like a generic MUI template;
- all current pages are redesigned coherently;
- all real content remains available;
- desktop and mobile work properly;
- existing application logic works;
- contact behavior works;
- accessibility remains good;
- lint/typecheck/build pass;
- code uses reusable components;
- design values are centralized in the MUI theme;
- no official Starfield assets/logos have been copied;
- the site has a unique visual identity associated with Tommaso Berti.

---

# 36. Visual reference summary

When implementing, imagine the following visual hierarchy:

```text
OFF-WHITE ENGINEERING SURFACE
        ↓
VERY DARK NAVY TYPOGRAPHY
        ↓
THIN GREY TECHNICAL BORDERS
        ↓
BLUE ORBITAL / NAVIGATION ACCENTS
        ↓
ORANGE + YELLOW + RED MISSION DETAILS
        ↓
CIRCULAR ORBITAL GEOMETRY
        ↓
MISSION PATCH IDENTITY
        ↓
SMALL MONOSPACE SYSTEM LABELS
```

The site should feel like:

> **A software developer portfolio designed by an aerospace interface team.**

Not:

> A game-themed portfolio.

---

# 37. Codex instruction

When this file conflicts with generic assumptions about how a developer portfolio should look, **follow this specification**.

When this file conflicts with actual existing functionality or verified project content, **preserve the real functionality/content and adapt the visual design around it**.

Do not invent personal information, professional experience, services, or project details.

If a visual idea from this specification would require replacing the project's stack or adding a heavy dependency, implement a simpler version using the existing stack instead.



---

# 38. Approved interactive demo reference

The following code is the **approved interactive visual prototype** created during the design exploration.

It is intentionally implemented as self-contained HTML/CSS/JavaScript because it was built as an interactive prototype inside ChatGPT.

## Important implementation rule

**Do not copy this prototype into production as-is.**

Codex must use it as a **visual and behavioral reference** and translate its concepts into the existing application architecture using:

- React
- TypeScript
- Material UI / MUI
- the existing router
- the existing theme system
- existing application data and logic

The prototype is useful for understanding:

- exact light-theme direction;
- page hierarchy;
- spacing;
- color relationships;
- TB brand mark;
- navigation treatment;
- hero composition;
- orbital map;
- technical labels;
- mission archive project cards;
- project filtering;
- personnel/about layout;
- capability/service cards;
- communication/contact layout;
- responsive behavior;
- motion restraint;
- interaction intent.

When the prose specification and this prototype differ slightly, interpret them together.

The prose specification defines architecture, maintainability and constraints.

The prototype defines the intended **visual result and interaction feel**.

## Translation examples

Prototype:

```html
<div class="projectCard">
```

Production should become something conceptually similar to:

```tsx
<MissionCard project={project} />
```

using MUI.

Prototype CSS variables such as:

```css
:root {
  --blue: #347CB2;
  --orange: #DF733D;
}
```

must become centralized MUI theme tokens rather than repeated literal values.

Prototype page switching using:

```text
showPage(...)
```

must **not** replace the application's existing router.

Use the real router and URLs.

The mock contact form submission in this prototype must **not** replace the real site's contact implementation.

Use real repository content and functionality.

---

## 38.1 Full interactive prototype source

```text
<div id="tb-multipage" class="w-full">
<style>
#tb-multipage{font-family:Arial,Helvetica,sans-serif;color:#17202a;--paper:#f3f0e7;--paper2:#ece8dc;--ink:#17202a;--muted:#71746f;--line:#c5c0b5;--blue:#347cb2;--orange:#df733d;--yellow:#d0ab3d;--red:#c94f4a;--green:#668a69}
#tb-multipage *{box-sizing:border-box}
#tb-multipage .app{border:1px solid #c9c4b8;border-radius:22px;overflow:hidden;background:linear-gradient(180deg,#f7f3ea,#ece7db);position:relative}
#tb-multipage .noise{position:absolute;inset:0;pointer-events:none;opacity:.1;background-image:radial-gradient(circle,#30363a 0 .5px,transparent .7px);background-size:14px 14px;mask-image:linear-gradient(90deg,black,transparent 80%)}
#tb-multipage .topbar{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;padding:16px 18px;border-bottom:1px solid var(--line);background:rgba(247,243,234,.92)}
#tb-multipage .brand{display:flex;align-items:center;gap:12px}.logo{width:43px;height:43px;border:2px solid var(--ink);border-radius:50%;display:grid;place-items:center;font-weight:900;position:relative}.logo:after{content:"";position:absolute;width:34px;height:5px;bottom:-7px;border-radius:999px;background:linear-gradient(90deg,var(--red) 0 25%,var(--orange) 25% 50%,var(--yellow) 50% 75%,var(--blue) 75%)}
#tb-multipage .brandName{font-size:13px;font-weight:900;letter-spacing:.11em}.brandSub{font-size:8px;letter-spacing:.16em;color:#817f77;margin-top:3px}
#tb-multipage .nav{display:flex;flex-wrap:wrap;gap:3px}.nav button{min-height:40px;padding:0 10px;border:0;border-bottom:2px solid transparent;background:transparent;font-size:9px;font-weight:800;letter-spacing:.12em;color:#747873}.nav button[aria-pressed="true"]{color:#17202a;border-color:var(--blue)}
#tb-multipage .page{display:none;position:relative;z-index:2;padding:26px 20px 22px}.page.active{display:block;animation:pageIn .22s ease}.eyebrow{font-size:9px;font-weight:900;letter-spacing:.16em;color:#7a7c78;text-transform:uppercase}.title{font-size:clamp(34px,6vw,66px);line-height:.92;letter-spacing:-.05em;font-weight:900;margin:8px 0 16px}.blue{color:var(--blue)}.orange{color:var(--orange)}
#tb-multipage .heroGrid{display:grid;grid-template-columns:1.05fr .95fr;gap:24px;align-items:center}.lead{font-size:15px;line-height:1.7;color:#555a5b;max-width:620px}.buttonRow{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}.btnDark,.btnLight{min-height:44px;padding:0 16px;border-radius:2px;font-size:9px;font-weight:900;letter-spacing:.12em}.btnDark{background:#17202a;color:#f8f5ec;border:1px solid #17202a}.btnLight{background:#f5f1e7;color:#222c33;border:1px solid #aaa69c}
#tb-multipage .spacePanel{border:1px solid #b9b5aa;background:#ebe7dc;min-height:330px;position:relative;overflow:hidden}.panelHead{display:flex;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #bbb7ad;font-size:8px;font-weight:900;letter-spacing:.14em;color:#747773}.orbitArea{position:relative;min-height:288px;display:grid;place-items:center}.orbitArea svg{width:86%;max-width:360px;height:auto}.ol{stroke:#9ca09d;stroke-width:1;fill:none}.ob{stroke:var(--blue);stroke-width:2;fill:none}.oo{stroke:var(--orange);stroke-width:4;fill:none;stroke-linecap:round}.planet{position:absolute;width:105px;height:105px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#fbf3d9 0 5%,#b4b5ae 23%,#75848b 54%,#44545d 82%);box-shadow:inset -20px -12px 28px rgba(0,0,0,.3)}.read{position:absolute;font-size:8px;font-weight:800;letter-spacing:.1em;color:#747975}.r1{top:18px;left:16px}.r2{right:15px;top:18px}.r3{bottom:18px;right:15px}.r4{bottom:18px;left:16px}.rail{display:flex;height:7px}.rail span{flex:1}.rail span:nth-child(1){background:var(--red)}.rail span:nth-child(2){background:var(--orange)}.rail span:nth-child(3){background:var(--yellow)}.rail span:nth-child(4){background:var(--blue)}
#tb-multipage .homeStats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#c1bdb2;border:1px solid #c1bdb2;margin-top:18px}.homeStats>div{background:#f2eee4;padding:13px}.statLabel{font-size:8px;font-weight:800;letter-spacing:.11em;color:#86847e}.statValue{font-size:20px;font-weight:900;margin-top:4px}
#tb-multipage .sectionHead{display:flex;align-items:end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:15px}.sectionTitle{font-size:29px;font-weight:900;letter-spacing:-.035em;margin-top:4px}.smallNote{font-size:8px;font-weight:800;letter-spacing:.11em;color:#7c7c77}
#tb-multipage .filterRow{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}.filterRow button{min-height:37px;padding:0 11px;border:1px solid #aaa69c;background:#f2eee4;font-size:8px;font-weight:900;letter-spacing:.1em}.filterRow button[aria-pressed="true"]{background:#17202a;color:white;border-color:#17202a}
#tb-multipage .projectGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.projectCard{position:relative;text-align:left;border:1px solid #bbb7ad;background:#f1ede3;padding:15px;min-width:0}.projectCard.hidden{display:none}.projectCard:before{content:"";position:absolute;left:-1px;top:-1px;width:6px;height:44px;background:var(--blue)}.projectCard[data-kind="app"]:before{background:var(--blue)}.projectCard[data-kind="infra"]:before{background:var(--yellow)}.projectCard[data-kind="automation"]:before{background:var(--orange)}.projectTag{font-size:8px;font-weight:900;letter-spacing:.12em;color:#7c7e7a}.projectCard h3{font-size:19px;margin:24px 0 7px}.projectCard p{font-size:12px;line-height:1.55;color:#6c6e6a;margin:0 0 14px}.projectMeta{display:flex;gap:5px;flex-wrap:wrap}.chip{padding:5px 7px;border:1px solid #aaa69c;background:#faf6ec;font-size:7px;font-weight:900;letter-spacing:.08em}
#tb-multipage .projectDetail{margin-top:11px;border:1px solid #aaa69c;background:#e9e4d8;padding:15px;display:grid;grid-template-columns:1fr auto;gap:16px}.projectDetail h3{font-size:18px;margin:0 0 6px}.projectDetail p{font-size:12px;color:#686b68;line-height:1.6;margin:0;max-width:740px}
#tb-multipage .aboutGrid{display:grid;grid-template-columns:.85fr 1.15fr;gap:14px}.profilePanel,.timelinePanel,.serviceCard,.contactPanel{border:1px solid #bbb7ad;background:#f1ede3}.profilePanel{padding:18px}.profilePatch{width:110px;height:110px;border-radius:50%;border:8px solid #f6f2e9;outline:1px solid #878985;background:radial-gradient(circle at center,#2e78b0 0 28%,#164c74 29% 46%,#f3bd3f 47% 54%,#dc6f3a 55% 62%,#c84c47 63% 70%,#17202a 71%);display:grid;place-items:center;color:white;font-size:26px;font-weight:900;margin-bottom:18px}.profilePanel h2{font-size:28px;margin:0 0 8px}.profilePanel p{font-size:13px;line-height:1.65;color:#626764}.facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#c4c0b5;margin-top:17px}.facts div{background:#f5f1e7;padding:11px}.factLabel{font-size:7px;font-weight:900;letter-spacing:.1em;color:#84837d}.factValue{font-size:11px;font-weight:800;margin-top:4px}.timelinePanel{padding:16px}.timelineItem{display:grid;grid-template-columns:78px 1fr;gap:12px;padding:13px 0;border-bottom:1px solid #cbc7bc}.timelineItem:last-child{border-bottom:0}.year{font-size:9px;font-weight:900;letter-spacing:.1em;color:var(--blue)}.timelineItem h3{font-size:15px;margin:0 0 5px}.timelineItem p{font-size:11px;line-height:1.55;color:#737570;margin:0}
#tb-multipage .serviceGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.serviceCard{padding:16px}.serviceIcon{width:38px;height:38px;border-radius:50%;border:1px solid #939690;display:grid;place-items:center;font-weight:900;margin-bottom:18px;background:#ebe7dd}.serviceCard h3{font-size:18px;margin:0 0 7px}.serviceCard p{font-size:12px;color:#6c6f6c;line-height:1.55;margin:0}.serviceStrip{display:flex;height:5px;margin-top:17px}.serviceStrip span{flex:1}.serviceStrip span:nth-child(1){background:var(--blue)}.serviceStrip span:nth-child(2){background:var(--yellow)}.serviceStrip span:nth-child(3){background:var(--orange)}
#tb-multipage .contactGrid{display:grid;grid-template-columns:.9fr 1.1fr;gap:12px}.contactPanel{padding:18px}.contactPanel h2{font-size:28px;margin:6px 0 10px}.contactPanel p{font-size:12px;line-height:1.6;color:#696c68}.channel{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #c8c4b9;padding:11px 0;font-size:10px}.channel strong{font-size:9px;letter-spacing:.1em}.form{border:1px solid #bbb7ad;background:#f1ede3;padding:16px}.field{margin-bottom:12px}.field label{display:block;font-size:8px;font-weight:900;letter-spacing:.11em;color:#777a75;margin-bottom:5px}.field input,.field textarea{width:100%;border:1px solid #aaa69c;background:#fbf7ee;padding:11px;font-size:14px;color:#17202a;outline:none}.field textarea{min-height:110px;resize:vertical}.formMsg{font-size:10px;color:var(--green);font-weight:800;min-height:18px;margin-top:9px}
#tb-multipage .footer{border-top:1px solid var(--line);padding:12px 18px;background:#efebe1;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:8px;font-weight:900;letter-spacing:.11em;color:#87857f}
@keyframes pageIn{from{opacity:.35;transform:translateY(4px)}to{opacity:1;transform:none}}
@media(hover:hover) and (pointer:fine){#tb-multipage .projectCard:hover,#tb-multipage .serviceCard:hover{transform:translateY(-2px);border-color:#7d817e}}
@media(max-width:760px){#tb-multipage .heroGrid,#tb-multipage .aboutGrid,#tb-multipage .contactGrid{grid-template-columns:1fr}#tb-multipage .projectGrid{grid-template-columns:1fr}#tb-multipage .serviceGrid{grid-template-columns:1fr}#tb-multipage .homeStats{grid-template-columns:repeat(2,1fr)}#tb-multipage .projectDetail{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){#tb-multipage *{animation:none!important;transition:none!important}}
</style>

<div class="app">
<div class="noise"></div>
<header class="topbar">
  <div class="brand"><div class="logo">TB</div><div><div class="brandName">TOMMASO BERTI</div><div class="brandSub">SOFTWARE DEVELOPMENT // EXPLORATION UNIT</div></div></div>
  <nav class="nav" aria-label="Portfolio pages">
    <button type="button" data-page="home" aria-pressed="true">01 HOME</button>
    <button type="button" data-page="projects" aria-pressed="false">02 PROJECTS</button>
    <button type="button" data-page="about" aria-pressed="false">03 ABOUT</button>
    <button type="button" data-page="services" aria-pressed="false">04 SERVICES</button>
    <button type="button" data-page="contact" aria-pressed="false">05 CONTACT</button>
  </nav>
</header>

<main>
<section class="page active" data-view="home">
  <div class="heroGrid">
    <div>
      <div class="eyebrow">TB-DEV // EXPLORATION LOG 2026</div>
      <h1 class="title">BUILD.<br>EXPLORE.<br><span class="blue">IMPROVE.</span></h1>
      <p class="lead">I build web applications, dashboards, APIs and automation tools. Practical software with clean interfaces, solid architecture and a visual language inspired by exploration technology.</p>
      <div class="buttonRow"><button type="button" class="btnDark" data-go="projects">EXPLORE PROJECTS →</button><button type="button" class="btnLight" data-go="contact">OPEN COMMS</button></div>
    </div>
    <div class="spacePanel">
      <div class="panelHead"><span>CELESTIAL DEVELOPMENT MAP</span><span>● ONLINE</span></div>
      <div class="orbitArea">
        <svg viewBox="0 0 400 400" role="img" aria-label="Orbital navigation display"><circle class="ol" cx="200" cy="200" r="154"/><circle class="ol" cx="200" cy="200" r="110"/><circle class="ol" cx="200" cy="200" r="70"/><line class="ol" x1="45" y1="200" x2="355" y2="200"/><line class="ol" x1="200" y1="45" x2="200" y2="355"/><ellipse class="ob" cx="200" cy="200" rx="150" ry="60" transform="rotate(-14 200 200)"/><path class="oo" d="M83 298 A154 154 0 0 0 138 339"/></svg>
        <div class="planet"></div><span class="read r1">NODE TB-01</span><span class="read r2">ORBIT 067°</span><span class="read r3">SIGNAL NOMINAL</span><span class="read r4">EARTH SYSTEMS</span>
      </div><div class="rail"><span></span><span></span><span></span><span></span></div>
    </div>
  </div>
  <div class="homeStats"><div><div class="statLabel">PRIMARY STACK</div><div class="statValue">TS</div></div><div><div class="statLabel">PROJECT TYPE</div><div class="statValue">WEB</div></div><div><div class="statLabel">SYSTEMS</div><div class="statValue">API</div></div><div><div class="statLabel">STATUS</div><div class="statValue" style="color:var(--green)">READY</div></div></div>
</section>

<section class="page" data-view="projects">
  <div class="sectionHead"><div><div class="eyebrow">02 // MISSION ARCHIVE</div><div class="sectionTitle">Selected projects</div></div><div class="smallNote">FILTER THE ARCHIVE</div></div>
  <div class="filterRow"><button type="button" data-filter="all" aria-pressed="true">ALL</button><button type="button" data-filter="app" aria-pressed="false">WEB APPS</button><button type="button" data-filter="infra" aria-pressed="false">INFRA</button><button type="button" data-filter="automation" aria-pressed="false">AUTOMATION</button></div>
  <div class="projectGrid">
    <button type="button" class="projectCard" data-kind="app" data-project="watt"><div class="projectTag">MISSION 01 // EV PLATFORM</div><h3>WattDaCar</h3><p>EV dashboard for battery, charging, efficiency, trips and vehicle information.</p><div class="projectMeta"><span class="chip">REACT</span><span class="chip">TS</span><span class="chip">MUI</span></div></button>
    <button type="button" class="projectCard" data-kind="app" data-project="loci"><div class="projectTag">MISSION 02 // TOOL HUB</div><h3>Loci</h3><p>Modular personal platform bringing multiple digital utilities into one product.</p><div class="projectMeta"><span class="chip">REACT</span><span class="chip">TS</span><span class="chip">API</span></div></button>
    <button type="button" class="projectCard" data-kind="infra" data-project="vps"><div class="projectTag">MISSION 03 // INFRA</div><h3>VPS Radar</h3><p>Read-only infrastructure console for projects, services, ports and domains.</p><div class="projectMeta"><span class="chip">REACT</span><span class="chip">NODE</span><span class="chip">EXPRESS</span></div></button>
    <button type="button" class="projectCard" data-kind="automation" data-project="auto"><div class="projectTag">MISSION 04 // AUTOMATION</div><h3>Workflow Tools</h3><p>Small purpose-built utilities designed to remove repetitive manual work.</p><div class="projectMeta"><span class="chip">NODE</span><span class="chip">APIs</span><span class="chip">JOBS</span></div></button>
  </div>
  <div class="projectDetail"><div><h3 id="pdTitle">Select a mission</h3><p id="pdText">Choose one of the project cards above to inspect its role, focus and technical direction.</p></div><div class="chips" id="pdChips"><span class="chip">ARCHIVE READY</span></div></div>
</section>

<section class="page" data-view="about">
  <div class="sectionHead"><div><div class="eyebrow">03 // PERSONNEL FILE</div><div class="sectionTitle">About Tommaso</div></div><div class="smallNote">DEVELOPER // BUILDER // SPACE ENTHUSIAST</div></div>
  <div class="aboutGrid">
    <div class="profilePanel"><div class="profilePatch">TB</div><h2>Software developer with a product mindset.</h2><p>I like building software that feels useful, coherent and finished. My work sits between frontend, backend, interfaces, APIs and automation — with a strong preference for practical systems over flashy complexity.</p><div class="facts"><div><div class="factLabel">BASE</div><div class="factValue">ITALY</div></div><div><div class="factLabel">PRIMARY STACK</div><div class="factValue">REACT / TS / MUI</div></div><div><div class="factLabel">INTEREST</div><div class="factValue">SPACE / GAMING</div></div><div><div class="factLabel">APPROACH</div><div class="factValue">BUILD & ITERATE</div></div></div></div>
    <div class="timelinePanel"><div class="eyebrow">DEVELOPMENT LOG</div><div class="timelineItem"><div class="year">PHASE 01</div><div><h3>Build useful things</h3><p>Start from an actual problem, not from technology for technology’s sake.</p></div></div><div class="timelineItem"><div class="year">PHASE 02</div><div><h3>Make them clear</h3><p>Interfaces should make software easier to understand, not harder.</p></div></div><div class="timelineItem"><div class="year">PHASE 03</div><div><h3>Connect the system</h3><p>APIs, backend logic and automation turn isolated screens into useful products.</p></div></div><div class="timelineItem"><div class="year">PHASE 04</div><div><h3>Iterate</h3><p>Ship, use, observe, improve. Repeat.</p></div></div></div>
  </div>
</section>

<section class="page" data-view="services">
  <div class="sectionHead"><div><div class="eyebrow">04 // CAPABILITIES</div><div class="sectionTitle">What I can build</div></div><div class="smallNote">SELECTED DEVELOPMENT SERVICES</div></div>
  <div class="serviceGrid"><div class="serviceCard"><div class="serviceIcon">01</div><h3>Web applications</h3><p>Responsive, maintainable applications built around real product workflows.</p><div class="serviceStrip"><span></span><span></span><span></span></div></div><div class="serviceCard"><div class="serviceIcon">02</div><h3>Dashboards</h3><p>Interfaces that turn data, states and operations into something readable and actionable.</p><div class="serviceStrip"><span></span><span></span><span></span></div></div><div class="serviceCard"><div class="serviceIcon">03</div><h3>APIs & integrations</h3><p>Backend services, external integrations and data flows that connect the product together.</p><div class="serviceStrip"><span></span><span></span><span></span></div></div><div class="serviceCard"><div class="serviceIcon">04</div><h3>Automation tools</h3><p>Small or large utilities that remove repetitive tasks and manual workflows.</p><div class="serviceStrip"><span></span><span></span><span></span></div></div></div>
  <div class="buttonRow"><button type="button" class="btnDark" data-go="contact">START A PROJECT →</button></div>
</section>

<section class="page" data-view="contact">
  <div class="sectionHead"><div><div class="eyebrow">05 // COMMUNICATION UPLINK</div><div class="sectionTitle">Let’s build something.</div></div><div class="smallNote">CHANNEL STATUS // OPEN</div></div>
  <div class="contactGrid">
    <div class="contactPanel"><h2>Open a channel.</h2><p>For freelance work, collaborations, product ideas or technical conversations.</p><div class="channel"><strong>EMAIL</strong><span>PRIMARY CHANNEL</span></div><div class="channel"><strong>LINKEDIN</strong><span>PROFESSIONAL NETWORK</span></div><div class="channel"><strong>GITHUB</strong><span>CODE ARCHIVE</span></div></div>
    <form class="form" id="contactForm"><div class="field"><label for="name">CALLSIGN / NAME</label><input id="name" name="name" required></div><div class="field"><label for="email">EMAIL CHANNEL</label><input id="email" name="email" type="email" required></div><div class="field"><label for="message">MISSION BRIEF</label><textarea id="message" name="message" required></textarea></div><button class="btnDark" type="submit">TRANSMIT MESSAGE →</button><div class="formMsg" id="formMsg" aria-live="polite"></div></form>
  </div>
</section>
</main>

<footer class="footer"><span>TB // SOFTWARE DEVELOPER</span><span>BUILD // EXPLORE // IMPROVE</span><span>BASED ON EARTH // AVAILABLE REMOTELY</span></footer>
</div>

<script>
(()=>{
const root=document.getElementById('tb-multipage');if(!root||root.dataset.ready)return;root.dataset.ready='1';
const pages=[...root.querySelectorAll('[data-view]')],nav=[...root.querySelectorAll('[data-page]')];
function showPage(name){pages.forEach(p=>p.classList.toggle('active',p.dataset.view===name));nav.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.page===name)));root.scrollIntoView({behavior:'smooth',block:'start'});}
nav.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));root.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.go)));
root.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');const f=btn.dataset.filter;root.querySelectorAll('.projectCard').forEach(card=>card.classList.toggle('hidden',f!=='all'&&card.dataset.kind!==f));}));
const pd={watt:{t:'WattDaCar // EV Intelligence Platform',d:'A product centered on battery, charging, consumption and trip information, with a dashboard-first approach designed for clarity.',c:['REACT','TYPESCRIPT','MUI','NODE.JS']},loci:{t:'Loci // Personal Tool Platform',d:'A modular hub designed to host multiple practical utilities under one coherent product language.',c:['REACT','TYPESCRIPT','MUI','APIs']},vps:{t:'VPS Radar // Infrastructure Console',d:'A read-only operational interface for services, projects, domains, ports and infrastructure state.',c:['REACT','TYPESCRIPT','EXPRESS','MUI']},auto:{t:'Workflow Tools // Automation Suite',d:'Small purpose-built automations designed to reduce repetitive operations and manual workflows.',c:['NODE.JS','APIs','AUTOMATION','JOBS']}};
root.querySelectorAll('[data-project]').forEach(card=>card.addEventListener('click',()=>{const d=pd[card.dataset.project];root.querySelector('#pdTitle').textContent=d.t;root.querySelector('#pdText').textContent=d.d;root.querySelector('#pdChips').innerHTML=d.c.map(x=>'<span class="chip">'+x+'</span>').join('');}));
root.querySelector('#contactForm').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget),name=String(fd.get('name')||'').trim(),email=String(fd.get('email')||'').trim(),message=String(fd.get('message')||'').trim(),out=root.querySelector('#formMsg');if(!name||!email||!message){out.textContent='Complete all mission fields before transmitting.';return;}out.textContent='Transmission simulated successfully. In the real site this would send your contact request.';e.currentTarget.reset();});
})();
</script>
</div>
```

---

# 39. Visual fidelity expectation for Codex

Codex should open/read section 38 before implementing the redesign.

The production result should preserve the following highly recognizable aspects of the prototype:

1. warm off-white engineering surfaces;
2. dark navy typography;
3. blue/orange/yellow/red technical accents;
4. circular TB mission-style identity;
5. numbered technical navigation;
6. large editorial hero typography;
7. celestial/orbital SVG instrumentation;
8. thin industrial borders;
9. compact monospace labels;
10. mission-style project archive;
11. flat/light project cards rather than glossy SaaS cards;
12. personnel-file treatment for About;
13. capability-system treatment for Services;
14. communication-uplink treatment for Contact;
15. restrained, precise interaction feedback;
16. responsive re-composition rather than simple scaling.

If the production result technically satisfies the written requirements but visually drifts back toward a generic MUI/SaaS portfolio, it should be considered **not faithful to this specification**.

