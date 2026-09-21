# Project Detail Page Design Specification

**Project:** tommasoberti.com  
**Purpose:** Visual/UX specification for project detail pages  
**Primary reference page:** `/projects/logra`  
**Target implementation:** Existing React + TypeScript + Material UI (MUI) project  
**Status:** Source of truth for project-detail redesign

---

# 1. Objective

Redesign individual project pages so they remain fully coherent with the main portfolio visual language.

Current problem:

> Project detail pages feel too flat and generic compared with the NASA-punk / space-exploration identity of the main portfolio.

The project page must not look like:

- a generic article;
- a plain case study;
- title + paragraphs + screenshots;
- a standard MUI documentation page;
- a SaaS product page disconnected from the portfolio theme.

The intended feeling is:

> Each project page is a technical mission dossier inside the same exploration system as the main portfolio.

The theme must remain professional and readable.

---

# 2. Stack constraints

Keep the existing stack exactly as it is.

Use:

- React
- TypeScript
- Material UI / MUI
- existing router
- existing project data
- existing API / backend integration
- existing build system

Do not introduce:

- Tailwind
- shadcn
- Bootstrap
- Chakra
- another component library
- another CSS framework
- unnecessary animation libraries
- Three.js / WebGL for this page unless already present and genuinely needed

Prefer:

- MUI
- CSS
- inline SVG
- existing icon system
- lightweight React interactions

---

# 3. Relationship with other design documents

Read these documents together:

```text
docs/portfolio-redesign-spec.md
docs/portfolio-motion-spec.md
```

This file extends them specifically for **project detail pages**.

Priority:

1. preserve real project content and functionality;
2. follow the global portfolio visual system;
3. follow this project-detail specification;
4. use the approved interactive reference implementation in this file.

---

# 4. Core concept

A project page should be presented as a **mission dossier**.

The page is divided into technical modules rather than ordinary content blocks.

Suggested page language:

```text
PROJECT ARCHIVE
MISSION XX
APPLICATION MODULE
MISSION BRIEF
SYSTEM ARCHITECTURE
INTERFACE SYSTEM
DEVELOPMENT LOG
PROJECT CHANNEL
```

Space terminology should enhance personality without hurting clarity.

Do not replace understandable labels with obscure sci-fi language.

---

# 5. Visual language

Primary theme:

- light mode;
- warm off-white / ivory surfaces;
- dark navy / charcoal text;
- technical blue;
- orange;
- yellow;
- muted red;
- thin technical borders;
- very subtle grain;
- compact monospace labels;
- mission identifiers;
- industrial rectangular controls;
- aerospace instrument framing.

Use the same palette already defined in the main redesign spec.

Reference colors:

```text
#F4F0E6
#E9E4D8
#182128
#347CB2
#DF733D
#D0AB3D
#C94F4A
#668A69
```

---

# 6. Overall page structure

Recommended high-level structure:

```text
PROJECT HEADER
↓
PROJECT HERO / MISSION INTRO
↓
INTERACTIVE APPLICATION VISUAL
↓
PROJECT TELEMETRY STRIP
↓
PROJECT MODULE NAVIGATION
↓
MISSION BRIEF / SYSTEM / INTERFACE / DEVELOPMENT LOG
↓
PROJECT CTA / EXTERNAL LINKS
```

Avoid one long undifferentiated article.

---

# 7. Project header

At the top of the page show a compact breadcrumb / archive context.

Example:

```text
PROJECT ARCHIVE / LOGRA / MISSION 04
```

Right side:

```text
● PROJECT ONLINE
```

or another real state if appropriate.

Keep this thin and understated.

---

# 8. Hero section

Desktop layout:

```text
LEFT
Project identity / copy / actions

RIGHT
Interactive project visual
```

Suggested ratio:

```text
45% / 55%
```

Mobile:

stack vertically.

---

# 9. Hero content

Recommended structure:

```text
MISSION 04 // PRODUCTIVITY SYSTEM

LOGRA.
MAKE PROGRESS VISIBLE.
```

Project name should be large.

Secondary line may use the primary technical accent.

Supporting copy should explain:

- what the product is;
- what problem it solves;
- why it exists.

Keep hero copy concise.

---

# 10. Project actions

Primary action:

```text
LAUNCH PROJECT →
```

Secondary action:

```text
VIEW SOURCE
```

or existing real project actions.

Do not replace real links.

Do not create fake buttons in production.

Use the actual live URL / GitHub / demo actions already supported by the current site.

---

# 11. Technology chips

Use a compact row beneath the hero copy.

Example:

```text
REACT
TYPESCRIPT
MUI
RESPONSIVE UI
```

These should be technical tags, not large colorful pills.

Use real project technologies only.

---

# 12. Interactive application visual

This is the most important feature of the redesigned detail page.

Do not place a plain screenshot directly on the page.

Instead, place project screenshots / mock application states **inside a technical aerospace-style frame**.

The frame should include:

- technical header;
- small status labels;
- subtle orbital / system geometry;
- technical readouts;
- colored rail;
- application preview.

Example frame label:

```text
LOGRA // APPLICATION MODULE
BUILD NOMINAL
```

Technical readouts:

```text
NODE LG-04
UI LINK 100%
SIGNAL LOCKED
```

---

# 13. Application preview interaction

For Logra, the preview should support tabs such as:

```text
DASHBOARD
TASKS
INSIGHTS
PLANNER
```

Production implementation should show:

- real screenshots;
- real UI previews;
- existing project mockups;
- or lightweight faithful recreations.

Do not invent product features that do not exist.

If the repository already contains screenshots, reuse them.

The interactive preview should change state smoothly.

Recommended transition:

```text
200–300ms
opacity / translateY
```

---

# 14. Technical orbit decoration

Around or behind the application preview, use subtle project-specific technical geometry.

For example:

- elliptical orbit line;
- one project marker;
- one status point;
- very light system axes.

This is decorative.

Do not make the project screenshot unreadable.

Do not create heavy dashboard clutter.

---

# 15. Project telemetry strip

Immediately after the hero, use a compact four-column strip.

Example:

```text
PROJECT TYPE     WEB APP
PRIMARY ROLE     PRODUCT
INTERFACE        MUI
STATUS           ACTIVE
```

This can be project-specific.

Possible fields:

- project type;
- role;
- stack;
- release status;
- platform;
- architecture;
- year.

Use real data.

Do not invent metrics.

Mobile:

2 columns.

---

# 16. Project module navigation

Below the hero/telemetry strip, provide compact technical navigation.

Reference layout:

```text
01 OVERVIEW
02 SYSTEM
03 INTERFACE
04 DEVELOPMENT LOG
```

This may be implemented as:

- tabs;
- segmented controls;
- router sub-sections;
- in-page section selection.

Keep it lightweight.

Active module:

- dark background;
- light text.

---

# 17. Module 01 — Mission Brief

Visual label:

```text
01 // MISSION BRIEF
```

Purpose:

Explain the project at a high level.

Suggested structure:

```text
PRIMARY OBJECTIVE

Turn progress into a system.

Short explanatory copy.
```

Right side:

compact feature list.

For Logra, possible examples:

```text
GOAL TRACKING
TASK MANAGEMENT
PROGRESS INSIGHTS
PLANNING
```

Only keep features actually present in the project.

---

# 18. Module 02 — System Architecture

Visual label:

```text
02 // SYSTEM ARCHITECTURE
```

Do not show a boring stack list.

Represent the application as a technical system.

Possible visualization:

- central product core;
- frontend node;
- API node;
- persistence/data node;
- analytics node;
- external integration node.

Use CSS / SVG / MUI.

Do not add a graph library unless already used.

The visualization should be schematic, not misleading.

---

# 19. Module 03 — Interface System

Visual label:

```text
03 // INTERFACE SYSTEM
```

Use this section to showcase real application states.

For Logra:

```text
Dashboard
Tasks
Insights
Planner
```

Prefer selectable interface previews.

Do not dump four screenshots vertically without framing.

Screens should appear inside the same technical project frame.

---

# 20. Module 04 — Development Log

Visual label:

```text
04 // DEVELOPMENT LOG
```

Instead of a generic case-study wall of text, use a concise phased development log.

Example:

```text
01 DISCOVERY
Problem / motivation

02 PROTOTYPE
UX / early interaction

03 BUILD
React / MUI / implementation

04 ITERATE
Refinement / lessons
```

Use actual development information where available.

Do not invent chronology.

---

# 21. Project-specific identity

Each project detail page should share the same system but allow a small project-specific variation.

Examples:

- different mission number;
- different accent;
- different project patch;
- different orbit geometry;
- different app-preview content;
- different system diagram.

Do not completely redesign every page.

The system must remain recognizably part of the same portfolio.

---

# 22. Reusable components

Prefer reusable components such as:

```text
ProjectDetailShell
ProjectMissionHeader
ProjectHero
ProjectApplicationModule
ProjectTelemetryStrip
ProjectModuleTabs
MissionBriefModule
SystemArchitectureModule
InterfaceModule
DevelopmentLogModule
ProjectChannelCTA
```

Use naming consistent with the existing repository.

Do not duplicate page-specific CSS unnecessarily.

---

# 23. Motion

Follow:

```text
docs/portfolio-motion-spec.md
```

Use subtle motion only.

Recommended:

- orbit line slow rotation;
- selected interface state transition;
- module panel swap;
- status dot pulse;
- button rail / press feedback.

Avoid:

- giant page transitions;
- parallax overload;
- constant motion everywhere;
- glow-heavy effects.

---

# 24. Responsive behavior

Desktop:

```text
Hero: 2 columns
Project visual: large
Telemetry: 4 columns
Module content: 2 columns when useful
```

Tablet:

```text
Reduce spacing
Maintain two columns where possible
```

Mobile:

```text
Hero: single column
Visual below copy
Telemetry: 2 columns
Module content: single column
Tabs wrap
No horizontal page scrolling
```

---

# 25. Accessibility

Preserve or improve:

- semantic headings;
- keyboard navigation;
- button semantics;
- focus states;
- form/link accessibility;
- reduced motion;
- readable text;
- contrast.

Application preview tabs must be keyboard accessible.

---

# 26. Real data rule

Before changing `/projects/logra`:

1. inspect the current page;
2. inspect Logra content;
3. inspect real screenshots/assets;
4. inspect real links;
5. inspect technology data;
6. inspect existing reusable project components.

Do not invent:

- technologies;
- features;
- project history;
- metrics;
- links;
- project status.

The approved demo below contains conceptual placeholder content.

Use real repository content wherever available.

---

# 27. Approved Logra interactive reference

The following code is the approved visual/interaction prototype.

Important:

**Do not paste this directly into production.**

Translate it into the existing:

- React
- TypeScript
- MUI
- router
- data layer

The prototype defines:

- composition;
- hierarchy;
- interaction style;
- visual framing;
- spacing;
- project-detail theme.

```html
<div id="logra-detail" class="w-full">
<style>
#logra-detail{font-family:Arial,Helvetica,sans-serif;color:#182128;--paper:#f4f0e6;--paper2:#e9e4d8;--ink:#182128;--muted:#747873;--line:#c7c1b6;--blue:#347cb2;--orange:#df733d;--yellow:#d0ab3d;--red:#c94f4a;--green:#668a69}
#logra-detail *{box-sizing:border-box}
#logra-detail .shell{position:relative;overflow:hidden;border:1px solid var(--line);background:linear-gradient(180deg,#f8f4eb,#ebe6da)}
#logra-detail .grain{position:absolute;inset:0;pointer-events:none;opacity:.055;background-image:radial-gradient(circle,#27323a 0 .55px,transparent .7px);background-size:15px 15px}
#logra-detail .top{position:relative;z-index:4;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:14px 17px;border-bottom:1px solid var(--line)}
#logra-detail .crumb{font-size:8px;font-weight:900;letter-spacing:.14em;color:#7a7d78}.crumb strong{color:#29343b}.online{display:flex;align-items:center;gap:7px;font-size:8px;font-weight:900;letter-spacing:.13em;color:#737773}.online i{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pulse 2s ease-in-out infinite}
#logra-detail .hero{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,.92fr) minmax(340px,1.08fr);gap:30px;padding:30px 24px 24px;align-items:center}
#logra-detail .eyebrow{font-size:9px;font-weight:900;letter-spacing:.17em;color:#747873;text-transform:uppercase}
#logra-detail h1{font-size:clamp(48px,8vw,78px);line-height:.86;letter-spacing:-.06em;margin:9px 0 17px;font-weight:900}.heroBlue{color:var(--blue)}
#logra-detail .lead{font-size:14px;line-height:1.68;color:#5c6260;max-width:570px}.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}.primary,.secondary{min-height:44px;padding:0 15px;font-size:8px;font-weight:900;letter-spacing:.12em}.primary{border:1px solid var(--ink);background:var(--ink);color:#fff}.secondary{border:1px solid #aaa69c;background:#f8f4eb;color:var(--ink)}
#logra-detail .identity{display:flex;gap:9px;flex-wrap:wrap;margin-top:25px}.token{padding:5px 7px;border:1px solid #aaa69c;background:#f8f4eb;font-size:7px;font-weight:900;letter-spacing:.1em;color:#666c6c}
#logra-detail .visual{position:relative;min-height:355px;border:1px solid #b7b2a7;background:#ece7db;overflow:hidden}.visualHead{height:38px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid #bbb6ab;font-size:8px;font-weight:900;letter-spacing:.13em;color:#717570}.orbit{position:absolute;left:50%;top:51%;width:330px;height:136px;border:1px solid rgba(82,94,99,.44);border-radius:50%;transform:translate(-50%,-50%) rotate(-13deg);animation:orbit 18s linear infinite}.orbit:after{content:"";position:absolute;width:8px;height:8px;border-radius:50%;background:var(--orange);left:82%;top:10%;box-shadow:0 0 0 5px rgba(223,115,61,.08)}
#logra-detail .screen{position:absolute;left:50%;top:51%;width:min(78%,400px);transform:translate(-50%,-50%);border:1px solid #555f65;background:#121b22;box-shadow:0 18px 34px rgba(23,32,42,.15)}.screenTop{height:26px;border-bottom:1px solid #34414a;display:flex;align-items:center;gap:5px;padding:0 8px}.screenTop i{width:5px;height:5px;border-radius:50%;background:#63717a}.screenBody{padding:12px;color:#dce5e8;min-height:190px}.screenNav{display:flex;gap:5px;margin-bottom:10px}.screenNav button{border:1px solid #394952;background:#18242c;color:#899ba6;padding:5px 8px;font-size:7px;font-weight:800;letter-spacing:.08em}.screenNav button[aria-pressed="true"]{background:#2f78b0;color:white;border-color:#2f78b0}.mockGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.mockCard{border:1px solid #2f3d46;background:#172129;padding:9px;min-height:48px}.mockLabel{font-size:6px;letter-spacing:.1em;color:#738892}.mockValue{font-size:16px;font-weight:900;margin-top:5px}.mockLarge{margin-top:7px;border:1px solid #2f3d46;background:#172129;padding:10px;height:76px;display:flex;align-items:flex-end;gap:4px}.bar{flex:1;background:#4b7390}.bar:nth-child(2){height:65%}.bar:nth-child(3){height:43%}.bar:nth-child(4){height:84%}.bar:nth-child(5){height:58%}.bar:nth-child(6){height:92%}
#logra-detail .read1,#logra-detail .read2,#logra-detail .read3{position:absolute;font-size:7px;font-weight:900;letter-spacing:.11em;color:#757974}.read1{left:14px;top:54px}.read2{right:14px;top:58px}.read3{right:14px;bottom:18px}
#logra-detail .rail{display:grid;grid-template-columns:repeat(4,1fr);height:7px}.rail span:nth-child(1){background:var(--red)}.rail span:nth-child(2){background:var(--orange)}.rail span:nth-child(3){background:var(--yellow)}.rail span:nth-child(4){background:var(--blue)}
#logra-detail .stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#c8c3b8;border-top:1px solid #c8c3b8;border-bottom:1px solid #c8c3b8}.stat{background:#f2eee5;padding:13px 16px}.statLabel{font-size:7px;font-weight:900;letter-spacing:.12em;color:#7e7f78}.statValue{font-size:14px;font-weight:900;margin-top:5px}
#logra-detail .body{position:relative;z-index:2;padding:24px}.tabs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:15px}.tabs button{min-height:38px;padding:0 11px;border:1px solid #aaa69c;background:#f6f2e9;font-size:8px;font-weight:900;letter-spacing:.11em}.tabs button[aria-pressed="true"]{background:#17202a;color:white;border-color:#17202a}
#logra-detail .module{border:1px solid #bab6ab;background:#f1ede4;min-height:245px}.moduleHead{padding:10px 12px;border-bottom:1px solid #bab6ab;display:flex;justify-content:space-between;gap:12px;font-size:8px;font-weight:900;letter-spacing:.12em;color:#777a75}.moduleBody{padding:18px}.moduleBody.swap{animation:swap .28s ease}.moduleGrid{display:grid;grid-template-columns:1.05fr .95fr;gap:18px}.moduleTitle{font-size:27px;font-weight:900;letter-spacing:-.035em;margin:4px 0 8px}.moduleText{font-size:12px;line-height:1.65;color:#666b68;max-width:58ch}.featureList{display:grid;gap:1px;background:#c8c3b8;border:1px solid #c8c3b8}.feature{background:#f7f3ea;padding:11px;display:flex;justify-content:space-between;gap:10px}.feature span:first-child{font-size:9px;font-weight:900;letter-spacing:.08em}.feature span:last-child{font-size:8px;color:#7b7e79;font-weight:800}
#logra-detail .systemMap{position:relative;height:170px;border:1px solid #bbb6ab;background:#ebe6da;overflow:hidden}.systemMap:before,.systemMap:after{content:"";position:absolute;left:50%;top:50%;border:1px solid #9ca19d;border-radius:50%;transform:translate(-50%,-50%)}.systemMap:before{width:220px;height:80px;transform:translate(-50%,-50%) rotate(-13deg)}.systemMap:after{width:140px;height:52px;transform:translate(-50%,-50%) rotate(18deg)}.core{position:absolute;left:50%;top:50%;width:52px;height:52px;border-radius:50%;transform:translate(-50%,-50%);background:var(--blue);border:7px solid #f5f1e7;outline:1px solid #777}.node{position:absolute;width:22px;height:22px;border-radius:50%;border:4px solid #f5f1e7;outline:1px solid #777}.n1{left:22%;top:30%;background:var(--orange)}.n2{right:19%;top:57%;background:var(--yellow)}.n3{left:33%;bottom:10%;background:var(--red)}
#logra-detail .footerCta{margin-top:14px;border:1px solid #b8b4a9;background:#ece7dc;padding:16px;display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}.footerCta strong{font-size:17px}.footerCta span{font-size:9px;color:#777a75;letter-spacing:.09em}
@keyframes orbit{to{transform:translate(-50%,-50%) rotate(347deg)}}@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}@keyframes swap{from{opacity:.35;transform:translateY(5px)}to{opacity:1;transform:none}}
@media(max-width:760px){#logra-detail .hero{grid-template-columns:1fr;padding:24px 16px 18px}.visual{min-height:320px}.stats{grid-template-columns:repeat(2,1fr)}.body{padding:16px}.moduleGrid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){#logra-detail *{animation:none!important;transition:none!important}}
</style>

<div class="shell">
<div class="grain"></div>
<div class="top"><div class="crumb">PROJECT ARCHIVE / <strong>LOGRA</strong> / MISSION 04</div><div class="online"><i></i>PROJECT ONLINE</div></div>

<section class="hero">
  <div>
    <div class="eyebrow">MISSION 04 // PRODUCTIVITY SYSTEM</div>
    <h1>LOGRA.<br><span class="heroBlue">MAKE PROGRESS VISIBLE.</span></h1>
    <div class="lead">A productivity-focused application designed to turn goals, tasks and progress into a clear system. The project detail itself becomes part of the portfolio's space-exploration language instead of falling back to a generic case-study page.</div>
    <div class="actions"><button type="button" class="primary" id="launchBtn">LAUNCH PROJECT →</button><button type="button" class="secondary" id="diagBtn">RUN PROJECT DIAGNOSTIC</button></div>
    <div class="identity"><span class="token">REACT</span><span class="token">TYPESCRIPT</span><span class="token">MUI</span><span class="token">RESPONSIVE UI</span></div>
  </div>
  <div class="visual">
    <div class="visualHead"><span>LOGRA // APPLICATION MODULE</span><span>BUILD NOMINAL</span></div>
    <div class="orbit"></div>
    <div class="screen">
      <div class="screenTop"><i></i><i></i><i></i></div>
      <div class="screenBody">
        <div class="screenNav"><button type="button" data-demo="dashboard" aria-pressed="true">DASHBOARD</button><button type="button" data-demo="tasks" aria-pressed="false">TASKS</button><button type="button" data-demo="insights" aria-pressed="false">INSIGHTS</button><button type="button" data-demo="planner" aria-pressed="false">PLANNER</button></div>
        <div id="screenContent"><div class="mockGrid"><div class="mockCard"><div class="mockLabel">ACTIVE</div><div class="mockValue">08</div></div><div class="mockCard"><div class="mockLabel">DONE</div><div class="mockValue">24</div></div><div class="mockCard"><div class="mockLabel">FOCUS</div><div class="mockValue">81%</div></div></div><div class="mockLarge"><span class="bar" style="height:34%"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div></div>
      </div>
    </div>
    <span class="read1">NODE LG-04</span><span class="read2">UI LINK 100%</span><span class="read3">SIGNAL LOCKED</span>
    <div class="rail"><span></span><span></span><span></span><span></span></div>
  </div>
</section>

<div class="stats"><div class="stat"><div class="statLabel">PROJECT TYPE</div><div class="statValue">WEB APP</div></div><div class="stat"><div class="statLabel">PRIMARY ROLE</div><div class="statValue">PRODUCT</div></div><div class="stat"><div class="statLabel">INTERFACE</div><div class="statValue">MUI</div></div><div class="stat"><div class="statLabel">STATUS</div><div class="statValue" style="color:var(--green)">ACTIVE</div></div></div>

<div class="body">
  <div class="tabs"><button type="button" data-tab="overview" aria-pressed="true">01 OVERVIEW</button><button type="button" data-tab="system" aria-pressed="false">02 SYSTEM</button><button type="button" data-tab="interface" aria-pressed="false">03 INTERFACE</button><button type="button" data-tab="journey" aria-pressed="false">04 DEVELOPMENT LOG</button></div>
  <section class="module"><div class="moduleHead"><span id="moduleCode">01 // MISSION BRIEF</span><span>LOGRA SYSTEM FILE</span></div><div class="moduleBody" id="moduleBody"></div></section>
  <div class="footerCta"><div><strong>PROJECT CHANNEL READY.</strong><br><span>The real page could keep your existing live/GitHub actions here.</span></div><button type="button" class="primary" id="footerAction">OPEN PROJECT →</button></div>
</div>
</div>

<script>
(()=>{
const root=document.getElementById('logra-detail');if(!root||root.dataset.ready)return;root.dataset.ready='1';
const moduleBody=root.querySelector('#moduleBody'),moduleCode=root.querySelector('#moduleCode');
const views={
 overview:{code:'01 // MISSION BRIEF',html:'<div class="moduleGrid"><div><div class="eyebrow">PRIMARY OBJECTIVE</div><div class="moduleTitle">Turn progress into a system.</div><div class="moduleText">The project page should explain why Logra exists before diving into implementation details. Keep the copy concise, then let the interface preview and technical modules carry the story.</div></div><div class="featureList"><div class="feature"><span>GOAL TRACKING</span><span>CORE SYSTEM</span></div><div class="feature"><span>TASK MANAGEMENT</span><span>WORKFLOW</span></div><div class="feature"><span>PROGRESS INSIGHTS</span><span>ANALYTICS</span></div><div class="feature"><span>PLANNING</span><span>ORGANIZATION</span></div></div></div>'},
 system:{code:'02 // SYSTEM ARCHITECTURE',html:'<div class="moduleGrid"><div><div class="eyebrow">SYSTEM MAP</div><div class="moduleTitle">One core, connected modules.</div><div class="moduleText">Instead of a plain technology list, represent the application architecture like a mission system: a central product core connected to interface, data and planning subsystems.</div></div><div class="systemMap"><div class="core"></div><div class="node n1"></div><div class="node n2"></div><div class="node n3"></div></div></div>'},
 interface:{code:'03 // INTERFACE SYSTEM',html:'<div class="moduleGrid"><div><div class="eyebrow">DESIGN PRINCIPLE</div><div class="moduleTitle">Useful before decorative.</div><div class="moduleText">Show the real application screens inside technical frames rather than dropping screenshots onto the page. Dashboard, Tasks, Insights and Planner can each become a selectable interface module.</div></div><div class="featureList"><div class="feature"><span>DASHBOARD</span><span>OVERVIEW</span></div><div class="feature"><span>TASKS</span><span>EXECUTION</span></div><div class="feature"><span>INSIGHTS</span><span>FEEDBACK</span></div><div class="feature"><span>PLANNER</span><span>ROADMAP</span></div></div></div>'},
 journey:{code:'04 // DEVELOPMENT LOG',html:'<div class="moduleGrid"><div><div class="eyebrow">BUILD SEQUENCE</div><div class="moduleTitle">From idea to working product.</div><div class="moduleText">Use a compact development log instead of a generic wall of case-study text. Each phase can expose the problem, implementation choice and what changed in the product.</div></div><div class="featureList"><div class="feature"><span>01 DISCOVERY</span><span>PROBLEM</span></div><div class="feature"><span>02 PROTOTYPE</span><span>UX</span></div><div class="feature"><span>03 BUILD</span><span>REACT / MUI</span></div><div class="feature"><span>04 ITERATE</span><span>REFINEMENT</span></div></div></div>'}
 };
 function selectTab(key){root.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===key)));moduleCode.textContent=views[key].code;moduleBody.innerHTML=views[key].html;moduleBody.classList.remove('swap');void moduleBody.offsetWidth;moduleBody.classList.add('swap')}
 root.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>selectTab(b.dataset.tab)));selectTab('overview');
 const demo={dashboard:'<div class="mockGrid"><div class="mockCard"><div class="mockLabel">ACTIVE</div><div class="mockValue">08</div></div><div class="mockCard"><div class="mockLabel">DONE</div><div class="mockValue">24</div></div><div class="mockCard"><div class="mockLabel">FOCUS</div><div class="mockValue">81%</div></div></div><div class="mockLarge"><span class="bar" style="height:34%"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div>',tasks:'<div class="featureList" style="background:#26343d;border-color:#26343d"><div class="feature" style="background:#172129;color:#dce5e8;border:0"><span>Finish portfolio redesign</span><span>ACTIVE</span></div><div class="feature" style="background:#172129;color:#dce5e8;border:0"><span>Review project data</span><span>QUEUED</span></div><div class="feature" style="background:#172129;color:#dce5e8;border:0"><span>Deploy preview</span><span>NEXT</span></div></div>',insights:'<div class="mockLarge" style="height:150px"><span class="bar" style="height:44%"></span><span class="bar" style="height:65%"></span><span class="bar" style="height:51%"></span><span class="bar" style="height:82%"></span><span class="bar" style="height:72%"></span><span class="bar" style="height:94%"></span></div>',planner:'<div class="mockGrid"><div class="mockCard"><div class="mockLabel">MON</div><div class="mockValue">3</div></div><div class="mockCard"><div class="mockLabel">WED</div><div class="mockValue">5</div></div><div class="mockCard"><div class="mockLabel">FRI</div><div class="mockValue">2</div></div></div><div class="mockLarge" style="height:80px"><span class="bar" style="height:55%"></span><span class="bar" style="height:70%"></span><span class="bar" style="height:40%"></span><span class="bar" style="height:85%"></span></div>'};
 root.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>{root.querySelectorAll('[data-demo]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));root.querySelector('#screenContent').innerHTML=demo[b.dataset.demo]}));
 root.querySelector('#launchBtn').addEventListener('click',e=>{e.currentTarget.textContent='PROJECT LINK READY'});
 root.querySelector('#footerAction').addEventListener('click',e=>{e.currentTarget.textContent='CHANNEL READY'});
 root.querySelector('#diagBtn').addEventListener('click',e=>{e.currentTarget.textContent='SYSTEM NOMINAL ✓';setTimeout(()=>e.currentTarget.textContent='RUN PROJECT DIAGNOSTIC',1700)});
})();
</script>
</div>
```

---

# 28. Production translation examples

Prototype:

```html
<div class="visual">
```

Production:

```tsx
<ProjectApplicationModule project={project} />
```

Prototype:

```html
<button data-tab="system">
```

Production:

```text
<Tabs value={activeModule} onChange={...}>
```

or the existing MUI pattern already used by the project.

Prototype:

```css
:root {
  --blue: #347CB2;
}
```

Production:

use centralized MUI theme tokens.

Prototype screenshot mockup:

replace with real project images / real project UI data.

---

# 29. Generalize to all project pages

Do not create a one-off Logra-only page if the repository uses a shared project-detail route.

Prefer a shared structure driven by project data.

Conceptual data model:

```ts
interface ProjectDetailConfig {
  missionCode: string;
  category: string;
  tagline: string;
  summary: string;
  status?: string;
  technologies: string[];
  heroMedia?: ProjectMedia[];
  telemetry?: ProjectTelemetryItem[];
  modules?: ProjectModule[];
  accent?: 'blue' | 'orange' | 'yellow' | 'red';
}
```

Adapt to existing types rather than forcing this exact interface.

Each project should reuse the same themed shell.

---

# 30. Implementation sequence for Codex

1. Inspect current `/projects/logra`.
2. Inspect shared project-detail components.
3. Inspect real project data / screenshots.
4. Identify what can become reusable.
5. Implement themed project-detail shell.
6. Implement Logra first.
7. Compare with this approved reference.
8. Preserve existing content and links.
9. Validate responsive behavior.
10. Run lint/typecheck/test/build.
11. Only then generalize to other project pages.

---

# 31. Definition of done

The Logra detail page is complete when:

- it clearly belongs to the same portfolio visual system;
- it no longer looks like a flat generic project page;
- the hero uses the mission-dossier composition;
- project media is inside a themed technical frame;
- the telemetry strip is present where real data supports it;
- project content is organized into themed modules;
- existing live/GitHub actions still work;
- real screenshots/content are preserved;
- responsive/mobile layouts work;
- animations remain restrained;
- MUI theme tokens are reused;
- no new UI framework was introduced;
- lint/typecheck/build pass.

The visual benchmark is:

> **The project page should feel like opening the technical file for one mission inside the portfolio universe.**
