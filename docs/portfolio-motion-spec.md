# Portfolio Motion System Specification

**Project:** tommasoberti.com  
**Owner:** Tommaso Berti  
**Purpose:** Motion and interaction specification for the NASA-punk / space-exploration portfolio redesign  
**Target implementation:** Existing React + TypeScript + Material UI (MUI) project  
**Status:** Source of truth for animations and micro-interactions

---

# 1. Purpose

This document defines the approved motion language for the portfolio redesign.

It complements the main visual specification:

```text
docs/portfolio-redesign-spec.md
```

Read both documents together.

The main visual specification defines:

- visual identity;
- colors;
- layouts;
- pages;
- reusable components;
- responsive behavior;
- MUI theme architecture.

This motion specification defines:

- animations;
- micro-interactions;
- loading states;
- status transitions;
- telemetry behavior;
- orbital movement;
- hover/focus motion;
- panel transitions;
- interaction timing.

The visual direction is:

> NASA-punk / space exploration instrumentation with restrained Starfield-inspired motion.

The motion must feel:

- precise;
- technical;
- intentional;
- engineered;
- calm;
- premium.

It must **not** feel like:

- cyberpunk;
- gaming RGB;
- sci-fi HUD overload;
- arcade UI;
- flashy landing-page motion;
- excessive glassmorphism;
- particle spam.

---

# 2. Stack constraints

Do not change the existing technology stack.

Use:

- React
- TypeScript
- Material UI / MUI
- existing routing
- existing theme system
- CSS / CSS-in-JS
- inline SVG
- native browser APIs

Do not add animation libraries unless already present and justified.

Prefer:

- CSS transitions;
- CSS keyframes;
- SVG transforms;
- React state;
- MUI transitions only where useful.

Avoid adding:

- Framer Motion
- GSAP
- Three.js
- WebGL
- Lottie

unless already installed and genuinely necessary.

The approved prototype below intentionally uses plain HTML/CSS/JS because it was built as a standalone interactive demo.

Production code must translate the behavior into React + TypeScript + MUI.

---

# 3. Core motion principles

## 3.1 Precision over spectacle

Animations should resemble:

- instrumentation;
- navigation systems;
- system status;
- docking sequences;
- telemetry;
- orbital mechanics;
- spacecraft UI.

They should not look like decorative marketing animations.

---

## 3.2 Slow ambient motion

Ambient movement should generally be slow.

Recommended ranges:

```text
Orbital rotation:
10–24 seconds

Status pulse:
1.6–2.5 seconds

Scanner sweep:
2.5–4.5 seconds

Subtle background movement:
15–30 seconds
```

Avoid fast continuous animation.

---

## 3.3 Fast interface feedback

Direct user interactions should feel responsive.

Recommended ranges:

```text
Button press:
80–160 ms

Hover/focus transition:
150–250 ms

Panel swap:
200–350 ms

Filter selection:
150–250 ms

Drawer/accordion:
220–380 ms

Page section entrance:
200–400 ms
```

---

## 3.4 Motion easing

Prefer restrained easing such as:

```text
ease
ease-out
cubic-bezier(.2,.75,.2,1)
```

Avoid exaggerated spring/bounce behavior for this portfolio.

---

# 4. Reduced motion

All non-essential animation must respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential motion */
}
```

When reduced motion is requested:

- stop orbit rotation;
- stop scanner rotation;
- disable repeated pulses;
- remove decorative transitions;
- preserve readable final states;
- preserve functional interaction.

Do not hide information when animation is disabled.

---

# 5. Orbital navigation animation

The orbital map is one of the signature visual elements.

Use an inline SVG containing:

- circular orbit paths;
- ellipse;
- cross-axis;
- trajectory arcs;
- markers;
- planet;
- optional satellite marker.

## Motion

Suggested behavior:

- main orbital ellipse rotates slowly clockwise;
- secondary trajectory rotates more slowly counter-clockwise;
- satellite/status marker pulses slightly;
- planet remains mostly static.

Example timing:

```text
Main orbit:
12–18s linear infinite

Secondary orbit:
18–24s linear infinite
```

Do not spin the entire graphic.

The interface should feel like a navigation instrument.

---

# 6. Scanner interaction

A scanner/radar-style module can be used in selected areas, especially:

- project visualization;
- decorative home module;
- interactive easter egg;
- system/status section.

The scanner should contain:

- technical grid;
- circular range indicator;
- rotating sweep line;
- target markers.

## Interaction example

Button:

```text
RUN SCAN
```

States:

```text
IDLE
SCANNING
3 CONTACTS LOCKED
```

Optional secondary action:

```text
CLEAR CONTACTS
```

This type of interaction should remain decorative and not replace real UI functionality.

---

# 7. Telemetry bars

Telemetry bars can visually communicate activity.

They may represent:

- build system;
- API availability;
- uptime;
- active services;
- current technology indicators.

Avoid pretending these are real metrics unless the data is actually real.

For decorative telemetry, use generic labels clearly presented as UI flavor.

## Motion

Bars may subtly fluctuate.

Recommended behavior:

```text
40% → 100% → 40%
2.5–4 seconds
```

Each bar may use a small timing offset.

Do not animate constantly across the entire site.

Use only in one or two focused modules.

---

# 8. Boot sequence animation

The portfolio may include a technical boot sequence.

This works especially well:

- once on the home page;
- inside a system panel;
- as a small entrance sequence.

Example:

```text
[01] UI subsystem ........ READY
[02] API gateway ......... READY
[03] telemetry link ...... ONLINE
[04] portfolio shell ..... READY
[05] mission profile ..... TOMMASO BERTI
```

Reveal one line at a time.

Suggested delay:

```text
250–400ms per line
```

Do not block the page while this runs.

Content must already be usable.

The sequence is decorative.

---

# 9. Docking animation

A subtle docking metaphor may be used for:

- opening a project detail;
- connecting to contact;
- selecting a tool;
- visual demonstration area.

Example interaction:

```text
INITIATE DOCK
```

State progression:

```text
STANDBY
APPROACH
DOCKED
```

Example supporting text:

```text
DISTANCE 084m // ALIGNMENT NOMINAL
DISTANCE 018m // MAG-LOCK ARMED
HARD DOCK CONFIRMED // LINK STABLE
```

Production use should remain tasteful.

Do not turn ordinary navigation into confusing spacecraft terminology.

---

# 10. Mission selector transition

Project selection should feel like changing mission focus.

When selecting a project card:

- selected card moves upward by approximately 1–3 px;
- border becomes stronger;
- small progress rail may animate;
- detail panel changes with a short fade/slide;
- technical label updates.

Example:

```text
MISSION 01
WattDaCar
```

Selected project detail:

```text
EV SYSTEMS // ACTIVE
Battery, charging and trip intelligence.
```

Recommended transition:

```text
250–350ms
```

---

# 11. Buttons

Buttons should have precise mechanical feedback.

## Hover/focus

Possible effects:

- bottom rail slides from left to right;
- border darkens;
- 1px vertical translation;
- text remains stable.

## Active state

Small press:

```css
.interactive:active {
  transform: scale(0.97);
}
```

or:

```css
.interactive:active {
  transform: translateY(1px);
}
```

Do not combine multiple exaggerated effects.

## Primary buttons

Examples:

```text
VIEW PROJECT
ESTABLISH UPLINK
EXPLORE PROJECTS
```

Dark background with light text.

## Secondary buttons

Light technical surface with thin border.

---

# 12. Status indicators

Status indicators should be compact.

Examples:

```text
● ONLINE
● AVAILABLE
● NOMINAL
● READY
```

Pulse only the dot, not the full label.

Use green sparingly.

Suggested animation:

```text
opacity .4 → 1 → .4
1.8–2.3s
```

---

# 13. Panel transitions

When changing content in place:

- do not hard cut;
- do not animate entire page;
- animate only the content panel.

Preferred motion:

```text
opacity: .35 → 1
translateY: 4–6px → 0
```

Duration:

```text
220–340ms
```

Use for:

- project detail;
- mission selector;
- filters;
- system status;
- small content swaps.

---

# 14. Page transitions

If the existing router supports safe transition behavior, use restrained transitions between pages.

Possible:

```text
opacity .4 → 1
translateY 5px → 0
```

Do not delay routing.

Do not create full-screen cinematic transitions.

Navigation must remain fast.

---

# 15. Header interactions

The active navigation item may animate using:

- thin blue underline;
- short sliding indicator;
- color transition.

Avoid pill-based navigation unless already part of the design.

The header must remain lightweight.

---

# 16. Project card interactions

On hover:

```text
translateY(-2px)
stronger border
```

Optional:

- colored mission strip extends slightly;
- project code becomes darker.

No glow.

No large scaling.

---

# 17. Motion density

Not every element should move.

Suggested balance:

## Home

Can contain:

- orbital animation;
- one status pulse;
- subtle CTA feedback.

## Projects

Can contain:

- project card hover;
- mission selector transition;
- filter transition.

## About

Mostly static.

Optional:

- subtle timeline reveal.

## Services

Mostly static.

Optional:

- small card hover;
- technical strip motion.

## Contact

Mostly static.

Optional:

- communication/status indicator;
- form success transition.

The portfolio should never feel constantly animated.

---

# 18. Mobile behavior

On mobile:

- reduce continuous animation;
- reduce orbit size;
- avoid complex pointer-based behavior;
- do not depend on hover;
- keep controls at least approximately 44 px high;
- avoid animation that causes layout shifts.

Touch feedback should work via:

- press;
- selection;
- explicit controls.

---

# 19. Performance

Animations should primarily use:

```text
transform
opacity
```

Avoid repeatedly animating:

```text
width
height
top
left
box-shadow
filter
```

when a transform alternative exists.

Exceptions are acceptable for tiny UI elements.

Avoid large blur animations.

Keep SVG simple.

---

# 20. Accessibility

Interactive animations must:

- have proper buttons;
- support keyboard use;
- preserve visible focus;
- not rely on color only;
- not hide functional text;
- respect reduced motion.

Decorative SVG should use:

```text
aria-hidden="true"
```

where appropriate.

Functional visualizations should have meaningful accessible labels.

---

# 21. Suggested React components

Translate the approved demo into reusable React components.

Possible components:

```text
OrbitalNavigator
ActiveScanner
TelemetryPanel
BootSequence
DockingIndicator
MissionSelector
StatusIndicator
SpaceButton
MotionPanel
```

Use names consistent with the existing codebase.

---

# 22. Suggested hooks / state

Do not over-engineer.

Possible local hooks:

```text
useReducedMotion
useBootSequence
```

Most animations can remain CSS-driven.

React state should only control:

- selected mission;
- scan state;
- docking state;
- open/closed interaction;
- filter state;
- current panel data.

Do not continuously update React state for animation frames if CSS can handle the animation.

---

# 23. MUI integration

Prefer MUI primitives:

```text
Box
Stack
Button
Paper
Typography
Chip
```

and the existing theme.

Animations may be defined through:

- theme style overrides;
- `sx`;
- styled components;
- CSS keyframes.

Centralize reusable motion tokens where useful.

Example conceptual tokens:

```ts
motion.fast = 160
motion.normal = 260
motion.slow = 420
motion.orbit = 14000
motion.scan = 3400
```

Adapt this to the existing architecture.

---

# 24. Production rule

The interactive prototype below is a **reference implementation only**.

Do not paste it directly into the React application.

Instead:

- inspect the behavior;
- identify reusable interactions;
- rebuild them with React + TypeScript + MUI;
- use actual project data;
- use the real router;
- preserve accessibility;
- preserve current business logic.

---

# 25. Approved interactive motion prototype

The following is the exact approved interactive prototype used during design exploration.

```html
<div id="tb-motion" class="w-full">
<style>
#tb-motion{font-family:Arial,Helvetica,sans-serif;color:#17202a;--paper:#f4f0e6;--paper2:#eae5d9;--ink:#17202a;--muted:#747671;--line:#c7c1b6;--blue:#347cb2;--orange:#df733d;--yellow:#d0ab3d;--red:#c94f4a;--green:#668a69}
#tb-motion *{box-sizing:border-box}
#tb-motion .shell{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:22px;background:linear-gradient(180deg,#f7f3ea,#ebe6da)}
#tb-motion .grain{position:absolute;inset:0;pointer-events:none;opacity:.09;background-image:radial-gradient(circle,#26323a 0 .5px,transparent .7px);background-size:14px 14px}
#tb-motion .top{position:relative;z-index:2;padding:15px 18px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
#tb-motion .brand{display:flex;align-items:center;gap:11px}.mark{width:43px;height:43px;border:2px solid var(--ink);border-radius:50%;display:grid;place-items:center;font-weight:900;position:relative}.mark:after{content:"";position:absolute;bottom:-7px;width:34px;height:5px;border-radius:999px;background:linear-gradient(90deg,var(--red) 0 25%,var(--orange) 25% 50%,var(--yellow) 50% 75%,var(--blue) 75%)}
#tb-motion .brandTitle{font-size:12px;font-weight:900;letter-spacing:.12em}.brandSub{font-size:8px;color:#7b7d77;letter-spacing:.15em;margin-top:3px}
#tb-motion .controls{display:flex;gap:7px;flex-wrap:wrap}.ctrl{min-height:39px;padding:0 11px;border:1px solid #aaa69c;background:#f7f3e9;font-size:8px;font-weight:900;letter-spacing:.11em}.ctrl[aria-pressed="true"]{background:#17202a;color:white;border-color:#17202a}
#tb-motion .intro{position:relative;z-index:1;padding:24px 20px 8px}.eyebrow{font-size:9px;font-weight:900;letter-spacing:.17em;color:#777a75}.intro h2{font-size:clamp(30px,5vw,52px);line-height:.95;margin:7px 0 10px;letter-spacing:-.05em}.intro p{font-size:13px;line-height:1.6;color:#616662;max-width:760px}
#tb-motion .grid{position:relative;z-index:1;padding:14px 20px 20px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
#tb-motion .panel{border:1px solid #bbb7ac;background:#f1ede3;min-width:0;overflow:hidden;position:relative}.panelHead{padding:10px 12px;border-bottom:1px solid #bbb7ac;display:flex;justify-content:space-between;gap:10px;align-items:center}.panelTitle{font-size:9px;font-weight:900;letter-spacing:.14em}.panelState{font-size:8px;font-weight:800;letter-spacing:.1em;color:#777b77}
#tb-motion .orbitBox{position:relative;min-height:280px;display:grid;place-items:center;overflow:hidden}.orbitSvg{width:90%;max-width:330px;height:auto}.ol{stroke:#9ca09c;stroke-width:1;fill:none}.ob{stroke:var(--blue);stroke-width:2;fill:none}.oo{stroke:var(--orange);stroke-width:4;fill:none;stroke-linecap:round}.oy{stroke:var(--yellow);stroke-width:4;fill:none;stroke-linecap:round}.planet{position:absolute;width:92px;height:92px;border-radius:50%;background:radial-gradient(circle at 35% 28%,#fbf1d2 0 5%,#b7b8b0 25%,#76868e 54%,#43545c 83%);box-shadow:inset -18px -11px 24px rgba(0,0,0,.28)}
#tb-motion .satellite{position:absolute;width:11px;height:11px;border:2px solid #17202a;background:#f7f3ea;transform:translate(-50%,-50%);border-radius:2px;left:50%;top:50%}.satellite:after{content:"";position:absolute;width:18px;height:4px;background:var(--blue);left:-6px;top:2px;z-index:-1}
#tb-motion .spin{animation:spin 12s linear infinite;transform-origin:200px 200px}.counter{animation:spinBack 19s linear infinite;transform-origin:200px 200px}.pulse{animation:pulse 1.9s ease-in-out infinite}
#tb-motion .scanPanel{padding:14px}.scope{height:190px;border:1px solid #a9a69c;background:linear-gradient(#efebe0,#e5e0d4);position:relative;overflow:hidden}.scopeGrid{position:absolute;inset:0;background-image:linear-gradient(rgba(95,105,110,.11) 1px,transparent 1px),linear-gradient(90deg,rgba(95,105,110,.11) 1px,transparent 1px);background-size:24px 24px}.sweep{position:absolute;left:50%;top:50%;width:43%;height:2px;background:linear-gradient(90deg,var(--blue),transparent);transform-origin:left center;animation:sweep 3.4s linear infinite}.scopeRing{position:absolute;left:50%;top:50%;width:120px;height:120px;border:1px solid #858c8e;border-radius:50%;transform:translate(-50%,-50%)}.scopeRing:before{content:"";position:absolute;inset:28px;border:1px solid #a6a6a0;border-radius:50%}.blip{position:absolute;width:7px;height:7px;border-radius:50%;background:var(--orange);box-shadow:0 0 0 5px rgba(223,115,61,.09);animation:blip 2.1s ease-in-out infinite}.b1{left:62%;top:31%}.b2{left:34%;top:66%;animation-delay:.7s}.b3{left:74%;top:71%;animation-delay:1.2s}
#tb-motion .scanActions{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.action{min-height:38px;padding:0 11px;border:1px solid #aaa69c;background:#f7f3ea;font-size:8px;font-weight:900;letter-spacing:.1em}.action.primary{background:#17202a;color:white;border-color:#17202a}
#tb-motion .telemetry{padding:14px}.metric{display:grid;grid-template-columns:92px 1fr 42px;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid #ccc7bc}.metric:last-child{border-bottom:0}.mlabel{font-size:8px;font-weight:900;letter-spacing:.11em;color:#777a75}.track{height:6px;background:#d5d0c5;overflow:hidden}.fill{height:100%;transform-origin:left center;animation:meter 2.8s ease-in-out infinite;background:var(--blue)}.metric:nth-child(2) .fill{background:var(--orange);animation-delay:.35s}.metric:nth-child(3) .fill{background:var(--yellow);animation-delay:.7s}.metric:nth-child(4) .fill{background:var(--green);animation-delay:1s}.mval{font-size:10px;font-weight:900;text-align:right}
#tb-motion .boot{padding:14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;line-height:1.9;color:#687078;min-height:190px}.bootLine{opacity:.22;transform:translateY(4px)}.bootLine.live{animation:bootIn .45s ease forwards}.ok{color:var(--green)}.warn{color:var(--orange)}.blue{color:var(--blue)}
#tb-motion .dockArea{padding:14px;min-height:230px;position:relative}.dockTrack{height:130px;border:1px solid #aaa69c;background:linear-gradient(90deg,#ece7db,#f6f2e8);position:relative;overflow:hidden}.ship{position:absolute;left:8%;top:50%;width:66px;height:30px;transform:translateY(-50%);transition:left 1.15s cubic-bezier(.2,.75,.2,1),transform .35s ease}.ship:before{content:"";position:absolute;left:0;top:7px;width:44px;height:16px;background:#25333c;clip-path:polygon(0 50%,25% 0,100% 0,100% 100%,25% 100%)}.ship:after{content:"";position:absolute;right:0;top:4px;width:24px;height:22px;border:2px solid var(--blue);background:#f3efe4}.dock{position:absolute;right:7%;top:50%;width:48px;height:78px;border:3px solid #555f64;border-left-width:8px;transform:translateY(-50%);background:repeating-linear-gradient(to bottom,#d9d4c8 0 8px,#f3efe4 8px 16px)}.dockLine{position:absolute;left:17%;right:15%;top:50%;height:1px;border-top:1px dashed #8d918e}.docked .ship{left:72%;transform:translateY(-50%) scale(.96)}.dockStatus{margin-top:9px;font-size:9px;font-weight:900;letter-spacing:.12em;color:#777a75}
#tb-motion .missionArea{padding:14px}.missionTabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.missionBtn{position:relative;text-align:left;min-height:94px;padding:11px;border:1px solid #aaa69c;background:#f6f2e8;overflow:hidden}.missionBtn:before{content:"";position:absolute;left:-1px;top:-1px;width:5px;height:38px;background:#aaa}.missionBtn:nth-child(1):before{background:var(--blue)}.missionBtn:nth-child(2):before{background:var(--orange)}.missionBtn:nth-child(3):before{background:var(--yellow)}.missionBtn[aria-pressed="true"]{border-color:#17202a;box-shadow:inset 0 0 0 1px #17202a;transform:translateY(-2px)}.missionCode{font-size:7px;font-weight:900;letter-spacing:.11em;color:#797b76}.missionName{font-size:14px;font-weight:900;margin-top:17px}.missionCursor{height:3px;margin-top:12px;background:#d0cbc0;overflow:hidden}.missionCursor span{display:block;height:100%;width:0;background:#17202a}.missionBtn[aria-pressed="true"] .missionCursor span{animation:load 1.1s ease forwards}
#tb-motion .detailSwap{margin-top:8px;border:1px solid #b7b3a8;background:#ebe6da;padding:12px;min-height:74px}.detailSwap.animate{animation:panelSwap .32s ease}.detailKicker{font-size:8px;font-weight:900;letter-spacing:.12em;color:#777a75}.detailTitle{font-size:16px;font-weight:900;margin-top:5px}
#tb-motion .buttonDemo{padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px}.spaceButton{position:relative;min-height:48px;border:1px solid #8e918d;background:#f7f3ea;font-size:9px;font-weight:900;letter-spacing:.1em;overflow:hidden}.spaceButton.dark{background:#17202a;color:white;border-color:#17202a}.spaceButton:active{transform:scale(.97)}.spaceButton .edge{position:absolute;bottom:0;left:0;width:0;height:4px;background:var(--blue);transition:width .35s ease}.spaceButton:hover .edge,.spaceButton:focus-visible .edge{width:100%}.spaceButton.dark .edge{background:var(--orange)}
#tb-motion .footer{position:relative;z-index:1;border-top:1px solid var(--line);padding:12px 18px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:8px;font-weight:900;letter-spacing:.11em;color:#83837d}
#tb-motion.paused *{animation-play-state:paused!important}
@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinBack{to{transform:rotate(-360deg)}}@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}@keyframes sweep{to{transform:rotate(360deg)}}@keyframes blip{0%,100%{opacity:.25;transform:scale(.75)}45%{opacity:1;transform:scale(1.15)}}@keyframes meter{0%,100%{transform:scaleX(.42)}50%{transform:scaleX(1)}}@keyframes bootIn{to{opacity:1;transform:none}}@keyframes load{to{width:100%}}@keyframes panelSwap{0%{opacity:.35;transform:translateY(5px)}100%{opacity:1;transform:none}}
@media(max-width:760px){#tb-motion .grid{grid-template-columns:1fr}#tb-motion .missionTabs{grid-template-columns:1fr}#tb-motion .buttonDemo{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){#tb-motion *{animation:none!important;transition:none!important}}
</style>

<div class="shell">
<div class="grain"></div>
<div class="top">
  <div class="brand"><div class="mark">TB</div><div><div class="brandTitle">MOTION SYSTEMS LAB</div><div class="brandSub">NASA-PUNK INTERACTION PROTOTYPE</div></div></div>
  <div class="controls"><button type="button" class="ctrl" id="pauseBtn" aria-pressed="false">PAUSE MOTION</button><button type="button" class="ctrl" id="restartBtn">RESTART SEQUENCE</button></div>
</div>

<div class="intro"><div class="eyebrow">TB-DEV // MOTION LANGUAGE TEST</div><h2>SPACE UI,<br><span style="color:var(--blue)">IN MOTION.</span></h2><p>A collection of interactions designed to feel like aerospace instrumentation rather than decorative website animation.</p></div>

<div class="grid">
  <section class="panel">
    <div class="panelHead"><span class="panelTitle">01 // ORBITAL NAVIGATION</span><span class="panelState pulse">● TRACKING</span></div>
    <div class="orbitBox">
      <svg class="orbitSvg" viewBox="0 0 400 400" aria-label="Animated orbital navigation"><circle class="ol" cx="200" cy="200" r="154"/><circle class="ol" cx="200" cy="200" r="112"/><circle class="ol" cx="200" cy="200" r="70"/><line class="ol" x1="45" y1="200" x2="355" y2="200"/><line class="ol" x1="200" y1="45" x2="200" y2="355"/><g class="spin"><ellipse class="ob" cx="200" cy="200" rx="150" ry="59" transform="rotate(-16 200 200)"/><circle cx="330" cy="165" r="4" fill="#347cb2"/></g><g class="counter"><path class="oo" d="M78 291 A154 154 0 0 0 133 337"/><path class="oy" d="M140 340 A154 154 0 0 0 191 354"/></g></svg>
      <div class="planet"></div><div class="satellite pulse"></div>
    </div>
  </section>

  <section class="panel">
    <div class="panelHead"><span class="panelTitle">02 // ACTIVE SCANNER</span><span class="panelState" id="scanState">IDLE</span></div>
    <div class="scanPanel"><div class="scope"><div class="scopeGrid"></div><div class="scopeRing"></div><div class="sweep"></div><span class="blip b1"></span><span class="blip b2"></span><span class="blip b3"></span></div><div class="scanActions"><button type="button" class="action primary" id="scanBtn">RUN SCAN</button><button type="button" class="action" id="clearBtn">CLEAR CONTACTS</button></div></div>
  </section>

  <section class="panel">
    <div class="panelHead"><span class="panelTitle">03 // TELEMETRY FLOW</span><span class="panelState">LIVE DATA</span></div>
    <div class="telemetry"><div class="metric"><div class="mlabel">CPU LOAD</div><div class="track"><div class="fill" style="width:78%"></div></div><div class="mval">34%</div></div><div class="metric"><div class="mlabel">API LINK</div><div class="track"><div class="fill" style="width:91%"></div></div><div class="mval">91%</div></div><div class="metric"><div class="mlabel">BUILD PIPE</div><div class="track"><div class="fill" style="width:66%"></div></div><div class="mval">66%</div></div><div class="metric"><div class="mlabel">UPTIME</div><div class="track"><div class="fill" style="width:98%"></div></div><div class="mval">99.9</div></div></div>
  </section>

  <section class="panel">
    <div class="panelHead"><span class="panelTitle">04 // BOOT SEQUENCE</span><span class="panelState" id="bootState">READY</span></div>
    <div class="boot" id="bootBox"><div class="bootLine">[01] UI subsystem ........ <span class="ok">READY</span></div><div class="bootLine">[02] API gateway ......... <span class="ok">READY</span></div><div class="bootLine">[03] telemetry link ..... <span class="blue">ONLINE</span></div><div class="bootLine">[04] portfolio shell .... <span class="ok">READY</span></div><div class="bootLine">[05] mission profile .... <span class="warn">TOMMASO BERTI</span></div></div>
  </section>

  <section class="panel">
    <div class="panelHead"><span class="panelTitle">05 // DOCKING MOTION</span><span class="panelState" id="dockState">STANDBY</span></div>
    <div class="dockArea" id="dockArea"><div class="dockTrack"><div class="dockLine"></div><div class="ship"></div><div class="dock"></div></div><div class="scanActions"><button type="button" class="action primary" id="dockBtn">INITIATE DOCK</button><button type="button" class="action" id="undockBtn">UNDOCK</button></div><div class="dockStatus" id="dockStatus">DISTANCE 084m // ALIGNMENT NOMINAL</div></div>
  </section>

  <section class="panel">
    <div class="panelHead"><span class="panelTitle">06 // MISSION SELECTOR</span><span class="panelState">INTERACTIVE</span></div>
    <div class="missionArea"><div class="missionTabs"><button type="button" class="missionBtn" data-mission="watt" aria-pressed="true"><div class="missionCode">MISSION 01</div><div class="missionName">WattDaCar</div><div class="missionCursor"><span></span></div></button><button type="button" class="missionBtn" data-mission="loci" aria-pressed="false"><div class="missionCode">MISSION 02</div><div class="missionName">Loci</div><div class="missionCursor"><span></span></div></button><button type="button" class="missionBtn" data-mission="vps" aria-pressed="false"><div class="missionCode">MISSION 03</div><div class="missionName">VPS Radar</div><div class="missionCursor"><span></span></div></button></div><div class="detailSwap" id="detailSwap"><div class="detailKicker" id="detailKicker">EV SYSTEMS // ACTIVE</div><div class="detailTitle" id="detailTitle">Battery, charging and trip intelligence.</div></div></div>
  </section>

  <section class="panel">
    <div class="panelHead"><span class="panelTitle">07 // CONTROL FEEDBACK</span><span class="panelState">BUTTON SYSTEM</span></div>
    <div class="buttonDemo"><button type="button" class="spaceButton">OPEN PROJECT<div class="edge"></div></button><button type="button" class="spaceButton dark">ESTABLISH UPLINK<div class="edge"></div></button><button type="button" class="spaceButton">VIEW SYSTEM<div class="edge"></div></button><button type="button" class="spaceButton dark">RUN DIAGNOSTIC<div class="edge"></div></button></div>
  </section>

  <section class="panel">
    <div class="panelHead"><span class="panelTitle">08 // STATUS LANGUAGE</span><span class="panelState pulse">● NOMINAL</span></div>
    <div class="telemetry"><div class="metric"><div class="mlabel">AVAILABLE</div><div class="track"><div class="fill" style="width:88%;background:var(--green)"></div></div><div class="mval">YES</div></div><div class="metric"><div class="mlabel">DEPLOY</div><div class="track"><div class="fill" style="width:72%;background:var(--blue)"></div></div><div class="mval">LIVE</div></div><div class="metric"><div class="mlabel">SIGNAL</div><div class="track"><div class="fill" style="width:94%;background:var(--orange)"></div></div><div class="mval">LOCK</div></div></div>
  </section>
</div>

<div class="footer"><span>TB // MOTION SYSTEM</span><span>PRECISION OVER SPECTACLE</span><span>LIGHT NASA-PUNK UI</span></div>
</div>

<script>
(()=>{
const root=document.getElementById('tb-motion');if(!root||root.dataset.ready)return;root.dataset.ready='1';
const pauseBtn=root.querySelector('#pauseBtn');
pauseBtn.addEventListener('click',()=>{const paused=root.classList.toggle('paused');pauseBtn.setAttribute('aria-pressed',String(paused));pauseBtn.textContent=paused?'RESUME MOTION':'PAUSE MOTION';});
const bootLines=[...root.querySelectorAll('.bootLine')];let timers=[];
function boot(){timers.forEach(clearTimeout);timers=[];bootLines.forEach(x=>x.classList.remove('live'));root.querySelector('#bootState').textContent='BOOTING';bootLines.forEach((line,i)=>timers.push(setTimeout(()=>{line.classList.add('live');if(i===bootLines.length-1)root.querySelector('#bootState').textContent='SYSTEM READY';},i*320)));}
root.querySelector('#restartBtn').addEventListener('click',boot);boot();
const scanState=root.querySelector('#scanState');const blips=[...root.querySelectorAll('.blip')];root.querySelector('#scanBtn').addEventListener('click',()=>{scanState.textContent='SCANNING';blips.forEach(b=>b.style.display='block');setTimeout(()=>scanState.textContent='3 CONTACTS LOCKED',1200);});root.querySelector('#clearBtn').addEventListener('click',()=>{blips.forEach(b=>b.style.display='none');scanState.textContent='CONTACTS CLEARED';});
const dockArea=root.querySelector('#dockArea'),dockState=root.querySelector('#dockState'),dockStatus=root.querySelector('#dockStatus');root.querySelector('#dockBtn').addEventListener('click',()=>{dockState.textContent='APPROACH';dockStatus.textContent='DISTANCE 018m // MAG-LOCK ARMED';dockArea.classList.add('docked');setTimeout(()=>{dockState.textContent='DOCKED';dockStatus.textContent='HARD DOCK CONFIRMED // LINK STABLE';},1100);});root.querySelector('#undockBtn').addEventListener('click',()=>{dockArea.classList.remove('docked');dockState.textContent='STANDBY';dockStatus.textContent='DISTANCE 084m // ALIGNMENT NOMINAL';});
const missionData={watt:['EV SYSTEMS // ACTIVE','Battery, charging and trip intelligence.'],loci:['TOOL PLATFORM // ACTIVE','A modular command center for useful digital tools.'],vps:['INFRASTRUCTURE // ACTIVE','Services, domains, ports and VPS visibility.']};root.querySelectorAll('[data-mission]').forEach(btn=>btn.addEventListener('click',()=>{root.querySelectorAll('[data-mission]').forEach(x=>x.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');const d=missionData[btn.dataset.mission],box=root.querySelector('#detailSwap');root.querySelector('#detailKicker').textContent=d[0];root.querySelector('#detailTitle').textContent=d[1];box.classList.remove('animate');void box.offsetWidth;box.classList.add('animate');}));
})();
</script>
</div>
```

---

# 26. Where to use each animation in the real portfolio

Recommended mapping:

## Home

Use:

- `OrbitalNavigator`
- subtle status pulse
- optional short boot sequence
- primary button edge animation

Do not use scanner + docking + telemetry all at once in the hero.

---

## Projects

Use:

- mission selector transition
- project card hover
- selected project rail animation
- optional scanner-inspired project preview

---

## About

Use very little motion.

Possible:

- timeline items reveal once;
- mission patch small entrance.

---

## Services

Use:

- card border/rail feedback;
- subtle state transition.

Avoid constant animation.

---

## Contact

Use:

- status indicator;
- optional "uplink established" success transition after successful form submission.

Do not replace actual form behavior.

---

# 27. Animation priority

If implementation time is limited, prioritize in this order:

```text
1. Orbital navigation
2. Mission/project selector
3. Button/control feedback
4. Status pulse
5. Panel transitions
6. Boot sequence
7. Scanner
8. Docking interaction
9. Decorative telemetry
```

The first five are the most important for the production portfolio.

Scanner/docking are optional personality elements.

---

# 28. Codex instruction

When implementing the portfolio motion system:

1. Read `docs/portfolio-redesign-spec.md`.
2. Read this file completely.
3. Inspect the current React/MUI architecture.
4. Translate the approved prototype into reusable React + TypeScript + MUI components.
5. Do not paste the prototype directly into production.
6. Do not add new animation frameworks without a strong reason.
7. Preserve the current stack and existing functionality.
8. Keep motion restrained and professional.
9. Respect `prefers-reduced-motion`.
10. Verify mobile behavior and performance.
11. Run all existing lint, typecheck, test and build commands after implementation.

The final result should feel like:

> **A professional developer portfolio with the motion language of aerospace instrumentation.**

Not:

> **A videogame HUD pasted onto a website.**
