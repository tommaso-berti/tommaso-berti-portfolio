# About / Personnel File Design Specification

**Project:** tommasoberti.com  
**Page:** About / Chi sono  
**Purpose:** Redesign the About page so it is as distinctive and themed as the rest of the portfolio.  
**Target stack:** Existing React + TypeScript + Material UI (MUI) application.  
**Status:** Source of truth for the About page redesign.

---

# 1. Objective

The About page must not feel like a generic portfolio biography.

Current problem:

> The page is visually flatter and less personalized than the rest of the NASA-punk / Starfield-inspired portfolio.

The new page should feel like opening a **Personnel File / Explorer Profile** inside the same portfolio universe.

It must remain professional and easy to understand.

The visitor should leave the page understanding:

- who Tommaso is as a developer;
- what he builds;
- how he approaches software;
- the breadth of his technical interests;
- what makes the portfolio personally his.

---

# 2. Visual concept

Primary concept:

```text
PERSONNEL FILE / TB-01 / EXPLORATION UNIT
```

Visual language:

- light NASA-punk;
- warm off-white / ivory surfaces;
- dark navy / charcoal typography;
- technical blue;
- orange;
- yellow;
- muted red;
- compact technical labels;
- subtle engineering geometry;
- mission identifiers;
- thin industrial borders;
- restrained motion;
- very subtle grain.

The page should feel like:

> A software developer profile designed as an aerospace personnel dossier.

It must NOT feel like:

- a résumé template;
- a generic "About me" page;
- a game HUD;
- a cyberpunk UI;
- a dashboard full of fake metrics;
- an overly theatrical sci-fi experience.

---

# 3. Stack constraints

Keep the existing stack.

Use:

- React;
- TypeScript;
- MUI;
- current routing;
- current theme architecture;
- existing portfolio content.

Do not introduce:

- Tailwind;
- shadcn;
- another UI framework;
- Three.js;
- heavy animation libraries;
- unnecessary dependencies.

The interactive prototype in this file is reference material only.

Translate it into the existing React + TypeScript + MUI architecture.

---

# 4. Page structure

Recommended structure:

```text
PERSONNEL FILE HEADER

HERO
├── Profile statement
├── Stack / identity tags
├── Contact / project actions
└── Identity visualization

PROFILE TELEMETRY

PROFILE MODULES
├── 01 Identity
├── 02 How I Work
├── 03 Development Log
└── 04 Beyond Code

FINAL PERSONAL STATEMENT / CTA
```

---

# 5. Header

Use a thin technical context bar.

Reference:

```text
PERSONNEL FILE / TB-01 / EXPLORATION UNIT

PROFILE VERIFIED
```

Do not make it dominant.

---

# 6. Hero

Desktop:

```text
LEFT: developer statement
RIGHT: identity module
```

Primary headline reference:

```text
I BUILD
USEFUL SYSTEMS.
```

This is stronger and more personal than a generic:

```text
About me
```

Supporting copy should describe the developer as someone who works across:

- interfaces;
- dashboards;
- APIs;
- automation;
- infrastructure;
- complete product flows.

Do not fill the hero with a long biography.

---

# 7. Identity visualization

The right side should contain an original technical identity visualization.

Reference elements:

- circular TB core;
- subtle orbital ellipses;
- project / interest nodes;
- small technical readouts;
- four-color portfolio rail.

Example labels:

```text
NODE TB-01
SOFTWARE SYSTEMS

SIGNAL NOMINAL
REMOTE CAPABLE

INTEREST VECTOR
SPACE / GAMING
```

This should replace a generic profile card.

If a real portrait is later desired, the visualization can frame it without changing the page architecture.

---

# 8. Core tags

Use small technical tokens such as:

```text
REACT
TYPESCRIPT
MUI
NODE.JS
PRODUCT THINKING
```

Use only technologies / descriptors that are accurate.

Do not use oversized SaaS-style pills.

---

# 9. Profile telemetry strip

Below the hero, use a compact data strip.

Reference:

```text
BASE             ITALY
PRIMARY STACK    TS / REACT
APPROACH         BUILD & ITERATE
STATUS           AVAILABLE
```

Use real data.

Do not invent fake productivity percentages or technical metrics.

Mobile:

2 columns.

---

# 10. Profile modules

The About page should not be one large vertical wall of copy.

Use four selectable modules:

```text
01 IDENTITY
02 HOW I WORK
03 DEVELOPMENT LOG
04 BEYOND CODE
```

This turns the page into a small interactive profile system.

The interaction must work on click/tap, not hover only.

Panel changes should use subtle fade / vertical motion.

---

# 11. Identity module

Purpose:

Explain the actual developer profile.

Reference headline:

```text
Developer first.
Product thinker always.
```

The section should explain that Tommaso likes building complete software experiences rather than disconnected screens.

Suggested supporting system list:

```text
FRONTEND SYSTEMS
REACT / TYPESCRIPT / MUI

BACKEND & APIs
NODE / EXPRESS

AUTOMATION
WORKFLOWS / TOOLS

INFRASTRUCTURE
DEPLOY / VPS / SERVICES
```

Verify all labels against the current portfolio and repository.

---

# 12. How I Work module

This is more valuable than a generic skills progress-bar section.

Use three clear operating principles.

Reference:

```text
01 // CLARITY
Understand the problem.

02 // SYSTEM
Build the whole flow.

03 // ITERATION
Improve through use.
```

Each item should be concise.

Avoid vague adjectives like:

- passionate;
- creative;
- hardworking;
- problem solver;

unless supported by concrete content.

---

# 13. Development Log

Use a technical timeline instead of a career-text wall.

Reference structure:

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

This should explain how the developer's approach evolved through real projects.

If the current About page contains real career or education milestones, preserve them and integrate them into this visual language rather than discarding them.

Do not invent history.

---

# 14. Beyond Code

This is where the page becomes more personal.

Potential topics already relevant to the portfolio identity:

```text
SPACE & EXPLORATION
PC GAMING
TECHNOLOGY PROJECTS
```

These interests should not be random decoration.

Explain briefly how they influence:

- interface taste;
- experimentation;
- systems thinking;
- interaction design;
- visual identity.

Keep it concise and professional.

---

# 15. Final statement

Close the page with a small statement that represents the way Tommaso thinks about software.

Reference:

```text
GOOD SOFTWARE SHOULD FEEL OBVIOUS.

Clear architecture.
Useful interfaces.
Less friction.
```

Include a clear CTA:

```text
EXPLORE PROJECTS →
```

or another existing portfolio action.

---

# 16. Motion

Follow `docs/portfolio-motion-spec.md`.

Recommended motion:

- extremely slow orbital line;
- subtle status pulse;
- module panel transition;
- small control feedback.

Avoid:

- floating everything;
- large parallax;
- neon glow;
- particle backgrounds;
- continuous aggressive movement.

Respect `prefers-reduced-motion`.

---

# 17. Responsive behavior

Desktop:

```text
Hero: 2 columns
Telemetry: 4 columns
Profile modules: 2-column content where useful
```

Mobile:

```text
Hero: single column
Identity visualization below text
Telemetry: 2 columns
Modules: single column
Interest cards: single column
No horizontal scrolling
```

---

# 18. Reusable components

Possible conceptual components:

```text
PersonnelHeader
AboutHero
IdentityModule
ProfileTelemetry
ProfileModuleTabs
CoreProfilePanel
OperatingPrinciples
DevelopmentLog
PersonalSignals
AboutCTA
```

Adapt naming and structure to the existing repository.

Do not reorganize the entire codebase just for this page.

---

# 19. Content rules

Before implementation:

1. inspect the current About page;
2. preserve real biographical information;
3. preserve current contact links;
4. verify real technologies;
5. verify real availability wording if present;
6. use real career / education information where available.

The prototype contains some conceptual copy.

Do not blindly copy placeholder facts into production.

---

# 20. Approved interactive reference

The following is the approved visual/interaction reference.

Do not paste it directly into production.

Translate it to React + TypeScript + MUI while preserving its hierarchy, visual language, module system, and restrained interactions.

```html
<div id="tb-about" class="w-full">
<style>
#tb-about{font-family:Arial,Helvetica,sans-serif;color:#182128;--paper:#f4f0e6;--paper2:#e9e4d8;--ink:#182128;--muted:#747873;--line:#c7c1b6;--blue:#347cb2;--orange:#df733d;--yellow:#d0ab3d;--red:#c94f4a;--green:#668a69}
#tb-about *{box-sizing:border-box}
#tb-about button{font:inherit}
#tb-about .page{position:relative;overflow:hidden;border:1px solid var(--line);background:linear-gradient(180deg,#f8f4eb,#ebe6da)}
#tb-about .grain{position:absolute;inset:0;pointer-events:none;opacity:.055;background-image:radial-gradient(circle,#27323a 0 .55px,transparent .7px);background-size:15px 15px}
#tb-about .top{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding:14px 17px;border-bottom:1px solid var(--line)}
#tb-about .code{font-size:8px;font-weight:900;letter-spacing:.15em;color:#777b76}
#tb-about .online{display:flex;gap:7px;align-items:center;font-size:8px;font-weight:900;letter-spacing:.12em;color:#737773}
#tb-about .online i{width:7px;height:7px;border-radius:50%;background:var(--green);animation:aboutPulse 2s ease-in-out infinite}
#tb-about .hero{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(330px,.95fr);gap:30px;align-items:center;padding:32px 24px 26px}
#tb-about .eyebrow{font-size:9px;font-weight:900;letter-spacing:.17em;color:#757973;text-transform:uppercase}
#tb-about h1{font-size:clamp(46px,7vw,78px);line-height:.88;letter-spacing:-.06em;margin:9px 0 18px}
#tb-about .blue{color:var(--blue)}
#tb-about .lead{max-width:620px;font-size:14px;line-height:1.68;color:#5e6461}
#tb-about .signal{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}
#tb-about .tag{border:1px solid #aaa69c;background:#f8f4eb;padding:6px 8px;font-size:7px;font-weight:900;letter-spacing:.1em;color:#656b69}
#tb-about .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}
#tb-about .btn{min-height:42px;padding:0 13px;border:1px solid #aaa69c;background:#f8f4eb;color:var(--ink);font-size:8px;font-weight:900;letter-spacing:.11em;cursor:pointer}
#tb-about .btn.primary{background:var(--ink);color:#fff;border-color:var(--ink)}
#tb-about .profile{position:relative;min-height:360px;border:1px solid #b9b4a9;background:#ece7dc;overflow:hidden}
#tb-about .profileHead{height:38px;border-bottom:1px solid #bbb6ab;padding:0 12px;display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:8px;font-weight:900;letter-spacing:.12em;color:#747873}
#tb-about .orbit1,#tb-about .orbit2,#tb-about .orbit3{position:absolute;left:50%;top:52%;border:1px solid rgba(93,103,106,.44);border-radius:50%;transform:translate(-50%,-50%)}
#tb-about .orbit1{width:250px;height:92px;transform:translate(-50%,-50%) rotate(-17deg);animation:aboutOrbit1 16s linear infinite}
#tb-about .orbit2{width:305px;height:126px;transform:translate(-50%,-50%) rotate(19deg)}
#tb-about .orbit3{width:190px;height:70px;transform:translate(-50%,-50%) rotate(43deg)}
#tb-about .avatar{position:absolute;left:50%;top:52%;width:132px;height:132px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 35% 28%,#fff1cf 0 5%,#b7bdb9 22%,#7f8f95 49%,#52626a 73%,#34444c 100%);border:8px solid #f3eee4;outline:1px solid #667178;box-shadow:0 12px 28px rgba(23,32,42,.12);display:grid;place-items:center;font-size:28px;font-weight:900;letter-spacing:-.06em}
#tb-about .avatar:after{content:"";position:absolute;inset:15px;border:1px solid rgba(255,255,255,.35);border-radius:50%}
#tb-about .node{position:absolute;width:16px;height:16px;border-radius:50%;border:4px solid #f2eee5;outline:1px solid #777}
#tb-about .n1{left:20%;top:38%;background:var(--blue)}
#tb-about .n2{right:17%;top:58%;background:var(--orange)}
#tb-about .n3{left:33%;bottom:15%;background:var(--yellow)}
#tb-about .read{position:absolute;font-size:7px;font-weight:900;letter-spacing:.11em;color:#777b76}
#tb-about .r1{left:13px;top:54px}.r2{right:13px;top:58px;text-align:right}.r3{right:13px;bottom:19px;text-align:right}
#tb-about .rail{display:grid;grid-template-columns:repeat(4,1fr);height:7px}.rail span:nth-child(1){background:var(--red)}.rail span:nth-child(2){background:var(--orange)}.rail span:nth-child(3){background:var(--yellow)}.rail span:nth-child(4){background:var(--blue)}
#tb-about .telemetry{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#c8c3b8;border-top:1px solid #c8c3b8;border-bottom:1px solid #c8c3b8}
#tb-about .cell{background:#f2eee5;padding:13px 15px}.cell small{display:block;font-size:7px;font-weight:900;letter-spacing:.12em;color:#7c7e78}.cell strong{display:block;font-size:14px;margin-top:5px}
#tb-about .body{position:relative;z-index:2;padding:23px}
#tb-about .tabs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px}
#tb-about .tabs button{min-height:39px;padding:0 11px;border:1px solid #aaa69c;background:#f7f3ea;font-size:8px;font-weight:900;letter-spacing:.1em;color:var(--ink);cursor:pointer}
#tb-about .tabs button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
#tb-about .module{border:1px solid #bbb6ab;background:#f1ede4;min-height:270px}
#tb-about .moduleHead{padding:10px 12px;border-bottom:1px solid #bbb6ab;display:flex;justify-content:space-between;gap:12px;font-size:8px;font-weight:900;letter-spacing:.12em;color:#777a75}
#tb-about .moduleBody{padding:18px}.moduleBody.swap{animation:aboutSwap .28s ease}
#tb-about .grid{display:grid;grid-template-columns:1.05fr .95fr;gap:18px}
#tb-about .title{font-size:28px;font-weight:900;letter-spacing:-.04em;margin:5px 0 8px}
#tb-about .text{font-size:12px;line-height:1.65;color:#656a67;max-width:60ch}
#tb-about .list{display:grid;gap:1px;background:#c8c3b8;border:1px solid #c8c3b8}
#tb-about .row{background:#f7f3ea;padding:11px;display:flex;justify-content:space-between;gap:10px;align-items:center}
#tb-about .row span:first-child{font-size:9px;font-weight:900;letter-spacing:.08em}
#tb-about .row span:last-child{font-size:8px;font-weight:800;color:#777b76;text-align:right}
#tb-about .principles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
#tb-about .principle{border:1px solid #b8b4a9;background:#f7f3ea;padding:14px;min-height:122px;position:relative;overflow:hidden}
#tb-about .principle:before{content:"";position:absolute;left:0;top:0;width:4px;height:40px;background:var(--blue)}
#tb-about .principle:nth-child(2):before{background:var(--orange)}#tb-about .principle:nth-child(3):before{background:var(--yellow)}
#tb-about .principle small{font-size:7px;font-weight:900;letter-spacing:.11em;color:#7b7d77}
#tb-about .principle strong{display:block;font-size:16px;margin-top:18px}
#tb-about .principle p{font-size:10px;line-height:1.5;color:#686d69;margin:6px 0 0}
#tb-about .timeline{display:grid;gap:0;border-left:1px solid #9ca29e;margin-left:8px;padding-left:20px}
#tb-about .step{position:relative;padding:0 0 18px}.step:last-child{padding-bottom:0}.step:before{content:"";position:absolute;left:-25px;top:3px;width:9px;height:9px;border-radius:50%;background:#f4f0e6;border:2px solid var(--blue)}
#tb-about .step small{font-size:7px;font-weight:900;letter-spacing:.1em;color:#7a7d78}.step strong{display:block;font-size:13px;margin-top:4px}.step p{font-size:10px;line-height:1.5;color:#696e6b;margin:4px 0 0}
#tb-about .interestGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
#tb-about .interest{border:1px solid #b8b4a9;background:#f7f3ea;padding:14px;min-height:126px}
#tb-about .interest .icon{font-size:25px}.interest strong{display:block;font-size:14px;margin-top:12px}.interest p{font-size:10px;line-height:1.5;color:#696e6b;margin:5px 0 0}
#tb-about .footer{margin-top:14px;border:1px solid #b8b4a9;background:#ece7dc;padding:15px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.footer strong{font-size:17px}.footer span{display:block;margin-top:4px;font-size:8px;letter-spacing:.09em;color:#777a75}
@keyframes aboutPulse{0%,100%{opacity:.4}50%{opacity:1}}@keyframes aboutOrbit1{to{transform:translate(-50%,-50%) rotate(343deg)}}@keyframes aboutSwap{from{opacity:.35;transform:translateY(5px)}to{opacity:1;transform:none}}
@media(max-width:760px){#tb-about .hero{grid-template-columns:1fr;padding:24px 16px 18px}.profile{min-height:315px}.telemetry{grid-template-columns:repeat(2,1fr)}.body{padding:16px}.grid{grid-template-columns:1fr}.principles,.interestGrid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){#tb-about *{animation:none!important;transition:none!important}}
</style>

<div class="page">
  <div class="grain"></div>
  <div class="top"><div class="code">PERSONNEL FILE / TB-01 / EXPLORATION UNIT</div><div class="online"><i></i>PROFILE VERIFIED</div></div>

  <section class="hero">
    <div>
      <div class="eyebrow">03 // PERSONNEL FILE</div>
      <h1>I BUILD<br><span class="blue">USEFUL SYSTEMS.</span></h1>
      <div class="lead">Software developer with a product mindset. I like turning real problems into clear, maintainable applications — from interfaces and dashboards to APIs, automation and infrastructure tools.</div>
      <div class="signal"><span class="tag">REACT</span><span class="tag">TYPESCRIPT</span><span class="tag">MUI</span><span class="tag">NODE.JS</span><span class="tag">PRODUCT THINKING</span></div>
      <div class="actions"><button type="button" class="btn primary" id="contactBtn">OPEN COMMS →</button><button type="button" class="btn" id="profileBtn">RUN PROFILE SCAN</button></div>
    </div>

    <div class="profile">
      <div class="profileHead"><span>IDENTITY MODULE // TOMMASO BERTI</span><span>EARTH BASED</span></div>
      <div class="orbit1"></div><div class="orbit2"></div><div class="orbit3"></div>
      <div class="avatar">TB</div>
      <span class="node n1"></span><span class="node n2"></span><span class="node n3"></span>
      <span class="read r1">NODE TB-01<br>SOFTWARE SYSTEMS</span>
      <span class="read r2">SIGNAL NOMINAL<br>REMOTE CAPABLE</span>
      <span class="read r3">INTEREST VECTOR<br>SPACE / GAMING</span>
      <div class="rail"><span></span><span></span><span></span><span></span></div>
    </div>
  </section>

  <div class="telemetry">
    <div class="cell"><small>BASE</small><strong>ITALY</strong></div>
    <div class="cell"><small>PRIMARY STACK</small><strong>TS / REACT</strong></div>
    <div class="cell"><small>APPROACH</small><strong>BUILD & ITERATE</strong></div>
    <div class="cell"><small>STATUS</small><strong style="color:var(--green)">AVAILABLE</strong></div>
  </div>

  <div class="body">
    <div class="tabs">
      <button type="button" data-tab="identity" aria-pressed="true">01 IDENTITY</button>
      <button type="button" data-tab="method" aria-pressed="false">02 HOW I WORK</button>
      <button type="button" data-tab="journey" aria-pressed="false">03 DEVELOPMENT LOG</button>
      <button type="button" data-tab="interests" aria-pressed="false">04 BEYOND CODE</button>
    </div>

    <section class="module">
      <div class="moduleHead"><span id="moduleCode">01 // CORE PROFILE</span><span>TB PERSONNEL RECORD</span></div>
      <div class="moduleBody" id="moduleBody"></div>
    </section>

    <div class="footer">
      <div><strong>GOOD SOFTWARE SHOULD FEEL OBVIOUS.</strong><span>Clear architecture. Useful interfaces. Less friction.</span></div>
      <button type="button" class="btn primary" id="projectsBtn">EXPLORE PROJECTS →</button>
    </div>
  </div>
</div>

<script>
(()=>{
const root=document.getElementById('tb-about');if(!root||root.dataset.ready)return;root.dataset.ready='1';
const body=root.querySelector('#moduleBody'),code=root.querySelector('#moduleCode');
const views={
identity:{code:'01 // CORE PROFILE',html:'<div class="grid"><div><div class="eyebrow">PROFILE SUMMARY</div><div class="title">Developer first. Product thinker always.</div><div class="text">I enjoy building complete software experiences, not isolated screens. I care about how the interface feels, how the data flows, how the system is maintained and whether the final product actually solves something useful.</div></div><div class="list"><div class="row"><span>FRONTEND SYSTEMS</span><span>REACT / TYPESCRIPT / MUI</span></div><div class="row"><span>BACKEND & APIs</span><span>NODE / EXPRESS</span></div><div class="row"><span>AUTOMATION</span><span>WORKFLOWS / TOOLS</span></div><div class="row"><span>INFRASTRUCTURE</span><span>DEPLOY / VPS / SERVICES</span></div></div></div>'},
method:{code:'02 // OPERATING PRINCIPLES',html:'<div><div class="eyebrow">HOW I WORK</div><div class="title">Build. Understand. Refine.</div><div class="principles"><div class="principle"><small>01 // CLARITY</small><strong>Understand the problem.</strong><p>I prefer knowing why something exists before deciding how it should look or work.</p></div><div class="principle"><small>02 // SYSTEM</small><strong>Build the whole flow.</strong><p>UI, data, API and infrastructure should feel like parts of one coherent product.</p></div><div class="principle"><small>03 // ITERATION</small><strong>Improve through use.</strong><p>I like shipping, testing the real experience and refining what creates friction.</p></div></div></div>'},
journey:{code:'03 // DEVELOPMENT LOG',html:'<div class="grid"><div><div class="eyebrow">BUILD HISTORY</div><div class="title">A portfolio built through projects.</div><div class="text">Rather than defining myself with a long list of adjectives, I prefer showing how I approach increasingly complete products: interfaces, APIs, automation, infrastructure and tools that solve problems I actually care about.</div></div><div class="timeline"><div class="step"><small>PHASE 01</small><strong>Build useful things</strong><p>Start from a real need, not from a technology.</p></div><div class="step"><small>PHASE 02</small><strong>Make them clear</strong><p>Reduce friction and make the interface understandable.</p></div><div class="step"><small>PHASE 03</small><strong>Connect the system</strong><p>APIs, data and infrastructure become part of the product.</p></div><div class="step"><small>PHASE 04</small><strong>Iterate</strong><p>Keep improving after the first working version.</p></div></div></div>'},
interests:{code:'04 // PERSONAL SIGNALS',html:'<div><div class="eyebrow">BEYOND CODE</div><div class="title">The things that shape the way I build.</div><div class="interestGrid"><div class="interest"><div class="icon">✦</div><strong>Space & exploration</strong><p>I like systems, discovery and the visual language of engineering and exploration.</p></div><div class="interest"><div class="icon">⌁</div><strong>PC gaming</strong><p>Games influence how I think about interaction, feedback and making digital products feel alive.</p></div><div class="interest"><div class="icon">⚙</div><strong>Technology projects</strong><p>I enjoy experimenting with tools, infrastructure and products beyond the minimum needed for a feature.</p></div></div></div>'}
};
function select(key){root.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===key)));code.textContent=views[key].code;body.innerHTML=views[key].html;body.classList.remove('swap');void body.offsetWidth;body.classList.add('swap')}
root.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.tab)));
root.querySelector('#profileBtn').addEventListener('click',e=>{e.currentTarget.textContent='PROFILE NOMINAL ✓';setTimeout(()=>e.currentTarget.textContent='RUN PROFILE SCAN',1600)});
root.querySelector('#contactBtn').addEventListener('click',e=>{e.currentTarget.textContent='COMMS READY ✓';setTimeout(()=>e.currentTarget.textContent='OPEN COMMS →',1500)});
root.querySelector('#projectsBtn').addEventListener('click',e=>{e.currentTarget.textContent='MISSION ARCHIVE READY ✓';setTimeout(()=>e.currentTarget.textContent='EXPLORE PROJECTS →',1500)});
select('identity');
})();
</script>
</div>
```

---

# 21. Production translation

Prototype:

```html
<div class="profile">
```

Conceptual production component:

```tsx
<IdentityModule profile={...} />
```

Prototype:

```html
<button data-tab="identity">
```

Production:

Use existing MUI button / tab patterns with React state.

Prototype CSS variables:

```text
--blue
--orange
--yellow
--red
```

Production:

Use existing centralized theme tokens from the main portfolio redesign.

---

# 22. Definition of done

The About page is complete when:

- it is immediately recognizable as part of the same NASA-punk / exploration portfolio;
- it no longer resembles a generic résumé / About template;
- the hero communicates a clear developer identity;
- the identity visualization feels original and personal;
- skills are presented as systems, not fake progress bars;
- working principles are concrete;
- personal interests are integrated tastefully;
- real content from the existing site is preserved;
- mobile layout is intentionally recomposed;
- reduced-motion behavior works;
- existing links and navigation still work;
- no new UI framework was introduced;
- lint / typecheck / tests / build pass.

The benchmark is:

> The visitor should feel like they opened Tommaso Berti's personnel file inside the same exploration system as the rest of the portfolio.
