# Celestial Project Map — Codex Implementation Brief

## Goal

Implement the **Celestial Project Map** component in my portfolio.

The component is a light-mode, minimal, NASA-punk / Starfield-inspired interactive project map where:

- the developer core is in the center;
- each project is represented as a small celestial body;
- projects orbit around the core on different 3D orbital planes;
- the scene must feel genuinely three-dimensional rather than like a flat 2D solar system;
- planets must visually pass in front of and behind the central core;
- apparent scale should change slightly with depth;
- the composition should remain airy, technical, elegant, and minimal.

Use the preview implementation included below as the visual and interaction reference.

## Important design direction

The portfolio visual language is:

- light mode;
- warm off-white / ivory background;
- navy / charcoal typography;
- technical blue, orange, yellow, muted red accents;
- NASA-punk / space-exploration aesthetic;
- strong inspiration from the visual language of Starfield;
- minimal, clean, technical;
- no heavy dashboard feeling;
- no large invasive panels;
- lots of visual breathing room.

Avoid:

- front-facing circular 2D orbits;
- flat top-down solar-system layouts;
- thick orbit lines;
- large legends;
- excessive labels;
- lots of decorative motion;
- glossy sci-fi UI;
- overly game-like controls.

## Main interaction requirements

The map must support:

1. Slow continuous orbital motion.
2. Project selection by clicking/tapping a celestial body.
3. A selected state for the corresponding orbit/body.
4. A small details area for the selected project.
5. Subtle viewpoint movement from pointer movement.
6. Pause / play.
7. Reset viewpoint.
8. Full-screen / immersive mode.
9. A scalable orbit helper / factory that makes adding future projects easy.

All motion should feel slow, precise, technical, restrained, and smooth.

Respect `prefers-reduced-motion`.

## Architecture requirement

The project map must be easy to scale.

Adding a new project should ideally require only adding project data such as:

```ts
{
  id: "new-project",
  name: "New Project",
  description: "Short description",
  accent: "#...",
}
```

Orbit geometry should be derived automatically when explicit orbit parameters are missing.

Create a reusable helper equivalent to:

```ts
createOrbitConfig(project, index)
```

It should calculate sensible defaults for:

- orbit radius;
- phase;
- orbital speed;
- X tilt;
- Y tilt;
- Z tilt;
- planet size;
- accent / visual variant.

Explicit values in project data should always be able to override generated values.

The implementation must avoid orbit overlap becoming visually repetitive as the number of projects grows.

A golden-angle-based distribution is acceptable.

## Technology choice

The interactive preview below is written using SVG + vanilla JavaScript because it was convenient for prototyping.

**You are explicitly allowed to replace the rendering technology if another approach is more appropriate or performant for the actual portfolio.**

For example, you may choose:

- React + SVG;
- Canvas;
- Three.js;
- React Three Fiber;
- another lightweight rendering approach already compatible with the project.

Choose a different technology **only if it materially improves** performance, maintainability, 3D depth handling, responsive behavior, animation quality, or scalability.

Do **not** introduce a large dependency just because it is available. Prefer the simplest implementation that reproduces the visual result reliably. If the current project already uses a suitable animation/rendering library, prefer reusing it.

## Full-screen mode

Implement an immersive/full-screen mode.

Preferred behavior:

- on supported desktop browsers, use the native Fullscreen API when appropriate;
- provide a graceful expanded in-page fallback when browser fullscreen is unavailable or undesirable;
- include an exit control;
- preserve selected project and current animation state;
- avoid layout jumps.

The component must also work normally embedded inside the portfolio page.

## Responsive behavior

Desktop is the main visual target, but mobile/tablet must remain usable.

On narrower screens:

- preserve the celestial composition;
- reduce persistent labels if necessary;
- allow the selected-project details to move below the scene or become more compact;
- do not let UI controls cover the central core;
- touch selection must work without hover;
- do not require dragging as the only interaction.

## Accessibility

- Project bodies must be keyboard-selectable where practical.
- Selected project state should be exposed semantically.
- Buttons must be real buttons.
- Focus indicators must remain visible.
- Motion pause must be available.
- Respect `prefers-reduced-motion`.

## Visual depth

Depth is one of the most important parts of the component.

The map should communicate depth through a combination of:

- inclined orbital planes;
- perspective;
- foreground/background ordering;
- slight planet scale variation;
- subtle orbit contrast variation;
- occlusion around the central core.

### Orbit rendering

Avoid a hard binary transition between “back” and “front”. The previous versions looked wrong because the orbit suddenly changed tone halfway around the ellipse.

The current preview uses many small orbit segments and calculates their style from depth. Preserve this concept or improve it.

The transition must be gradual.

For example:

```ts
frontness = smoothstep(-transitionRange, transitionRange, depth)
```

Then interpolate:

```ts
opacity
strokeWidth
strokeColor
```

This creates a continuous front/back transition rather than a visible seam.

## Central Developer Core

The center represents the developer / system origin.

Current concept: **minimal Dyson-shell-inspired developer core**.

It should feel like:

- a luminous stellar sphere;
- surrounded by a very subtle technical shell / swarm structure;
- spherical rather than “Saturn-like”;
- elegant and minimal;
- technical rather than illustrative.

Avoid:

- giant rings;
- obvious Saturn silhouette;
- crosshair / targeting-reticle appearance;
- cartoon sun;
- overly detailed megastructure.

The preview below is the latest accepted direction.

# Reference interactive prototype

The following code represents the latest preview.

Use it as the main reference for composition, orbit behavior, depth interpolation, project selection, orbit generation, pause/reset controls, expandable mode, and styling.

You do **not** need to preserve the exact implementation if you can reproduce it more cleanly in the real project.

```text
<div id="celestial-scalable" class="w-full min-w-0">
<style>
#celestial-scalable{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172534}
#celestial-scalable *{box-sizing:border-box}
#celestial-scalable .stage{position:relative;width:100%;min-height:560px;overflow:hidden;border:1px solid rgba(42,53,63,.16);border-radius:18px;background:linear-gradient(145deg,#f8f4eb,#f2eee4 58%,#ece8df);transition:min-height .45s cubic-bezier(.2,.8,.2,1),border-radius .35s ease}
#celestial-scalable .stage.expanded{min-height:760px;border-radius:12px}
#celestial-scalable .stage:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.28;background-image:linear-gradient(rgba(29,42,54,.027) 1px,transparent 1px),linear-gradient(90deg,rgba(29,42,54,.027) 1px,transparent 1px);background-size:44px 44px;mask-image:linear-gradient(to bottom,rgba(0,0,0,.8),transparent 84%)}
#celestial-scalable svg{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y}
#celestial-scalable .top{position:absolute;z-index:10;top:18px;left:20px;right:20px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;pointer-events:none}
#celestial-scalable .eyebrow{font-size:10px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#344454}
#celestial-scalable .hint{margin-top:4px;font-size:9px;letter-spacing:.09em;color:#858a88}
#celestial-scalable .actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:7px;pointer-events:auto}
#celestial-scalable button{font:inherit}
#celestial-scalable .action{min-height:42px;padding:0 13px;border-radius:999px;border:1px solid rgba(29,42,54,.14);background:rgba(250,247,239,.76);backdrop-filter:blur(8px);color:#344454;font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:background .18s ease,transform .18s ease}
@media(hover:hover) and (pointer:fine){#celestial-scalable .action:hover{background:#fffaf1;transform:translateY(-1px)}}
#celestial-scalable .action:focus-visible,#celestial-scalable .project-chip:focus-visible{outline:2px solid var(--viz-accent);outline-offset:2px}
#celestial-scalable .orbit-segment{fill:none;stroke-linecap:round;vector-effect:non-scaling-stroke}
#celestial-scalable .planet-label{font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;fill:#293847;paint-order:stroke;stroke:#f4f0e6;stroke-width:4px;stroke-linejoin:round}
#celestial-scalable .planet-code{font-size:7px;letter-spacing:.18em;fill:#8a8d89;paint-order:stroke;stroke:#f4f0e6;stroke-width:3px}
#celestial-scalable .planet-hit{cursor:pointer}
#celestial-scalable .planet-halo{fill:none;stroke-width:1.2;opacity:0;transition:opacity .18s ease;vector-effect:non-scaling-stroke}
#celestial-scalable .planet-hit.selected .planet-halo{opacity:.72}
#celestial-scalable .core-label{font-size:8px;font-weight:800;letter-spacing:.21em;fill:#2b3a49}
#celestial-scalable .core-sub{font-size:7px;letter-spacing:.16em;fill:#979a95}
#celestial-scalable .bottom{position:absolute;z-index:10;left:20px;right:20px;bottom:18px;display:flex;align-items:flex-end;justify-content:space-between;gap:14px;pointer-events:none}
#celestial-scalable .info{max-width:420px;padding:11px 14px;border-left:2px solid var(--accent,#4c78a8);background:linear-gradient(90deg,rgba(249,246,238,.94),rgba(249,246,238,.48),transparent);backdrop-filter:blur(5px)}
#celestial-scalable .info-kicker{font-size:8px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#898d89}
#celestial-scalable .info-title{margin-top:3px;font-size:18px;font-weight:760;letter-spacing:-.02em;color:#172534}
#celestial-scalable .info-meta{margin-top:5px;font-size:10px;line-height:1.45;color:#6c7479}
#celestial-scalable .chips{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px;max-width:400px;pointer-events:auto}
#celestial-scalable .project-chip{min-height:34px;padding:0 10px;border-radius:999px;border:1px solid rgba(29,42,54,.12);background:rgba(249,246,238,.72);backdrop-filter:blur(8px);color:#626c73;font-size:8px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
#celestial-scalable .project-chip[aria-pressed="true"]{background:#fffaf1;color:#172534;border-color:rgba(29,42,54,.28)}
#celestial-scalable .factory-note{position:absolute;z-index:6;right:21px;top:74px;text-align:right;font-size:7px;line-height:1.55;letter-spacing:.13em;text-transform:uppercase;color:#a0a29d;pointer-events:none}
@media(max-width:620px){#celestial-scalable .stage{min-height:530px;border-radius:14px}#celestial-scalable .stage.expanded{min-height:700px}#celestial-scalable .top{top:14px;left:14px;right:14px}#celestial-scalable .hint,.factory-note{display:none!important}#celestial-scalable .bottom{left:14px;right:14px;bottom:14px;display:block}#celestial-scalable .info{max-width:none;margin-bottom:10px}#celestial-scalable .chips{justify-content:flex-start;max-width:none}#celestial-scalable .action{min-height:38px;padding:0 10px}}
</style>

<div class="stage" id="stage">
  <div class="top">
    <div>
      <div class="eyebrow" id="mapTitle">Celestial Project Map // 04 nodes</div>
      <div class="hint">pointer changes viewpoint · orbit parameters generated automatically</div>
    </div>
    <div class="actions">
      <button type="button" class="action" id="addBtn">+ Orbit</button>
      <button type="button" class="action" id="pauseBtn">Pause</button>
      <button type="button" class="action" id="expandBtn" aria-pressed="false">Full screen</button>
      <button type="button" class="action" id="resetBtn">Reset</button>
    </div>
  </div>

  <div class="factory-note">Orbit factory<br>radius · phase · tilt · velocity<br>auto generated</div>

  <svg viewBox="0 0 920 600" role="img" aria-label="Interactive scalable celestial project map">
    <defs>
      <radialGradient id="cs-core" cx="34%" cy="28%" r="76%"><stop offset="0%" stop-color="#fffdf4"/><stop offset="30%" stop-color="#f4dfaa"/><stop offset="67%" stop-color="#d9aa50"/><stop offset="100%" stop-color="#9a6d2d"/></radialGradient>
      <radialGradient id="cs-halo"><stop offset="0%" stop-color="#d8aa4c" stop-opacity=".20"/><stop offset="48%" stop-color="#d8aa4c" stop-opacity=".07"/><stop offset="100%" stop-color="#d8aa4c" stop-opacity="0"/></radialGradient>
      <radialGradient id="cs-blue" cx="30%" cy="25%" r="78%"><stop offset="0%" stop-color="#e2ecf1"/><stop offset="48%" stop-color="#7394ad"/><stop offset="100%" stop-color="#2d4c61"/></radialGradient>
      <radialGradient id="cs-orange" cx="30%" cy="25%" r="78%"><stop offset="0%" stop-color="#f1e4d5"/><stop offset="48%" stop-color="#c88550"/><stop offset="100%" stop-color="#6f432b"/></radialGradient>
      <radialGradient id="cs-yellow" cx="30%" cy="25%" r="78%"><stop offset="0%" stop-color="#f3ebcf"/><stop offset="48%" stop-color="#c9a343"/><stop offset="100%" stop-color="#746026"/></radialGradient>
      <radialGradient id="cs-red" cx="30%" cy="25%" r="78%"><stop offset="0%" stop-color="#efddd7"/><stop offset="48%" stop-color="#b86d63"/><stop offset="100%" stop-color="#693e3c"/></radialGradient>
      <radialGradient id="cs-green" cx="30%" cy="25%" r="78%"><stop offset="0%" stop-color="#e5ebe1"/><stop offset="48%" stop-color="#7f9981"/><stop offset="100%" stop-color="#3e5546"/></radialGradient>
      <radialGradient id="cs-slate" cx="30%" cy="25%" r="78%"><stop offset="0%" stop-color="#e3e6e6"/><stop offset="48%" stop-color="#879294"/><stop offset="100%" stop-color="#465255"/></radialGradient>
      <filter id="cs-shadow" x="-100%" y="-100%" width="300%" height="300%"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#25313c" flood-opacity=".12"/></filter>
      <filter id="cs-blur" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <g id="orbitLayer"></g>
    <g id="backBodies"></g>
    <g id="coreLayer"></g>
    <g id="frontBodies"></g>
  </svg>

  <div class="bottom">
    <div class="info" id="info" style="--accent:#4c78a8" aria-live="polite">
      <div class="info-kicker">Selected project</div>
      <div class="info-title">WattDaCar</div>
      <div class="info-meta">EV telemetry · charging intelligence · vehicle data platform</div>
    </div>
    <div class="chips" id="chips"></div>
  </div>
</div>

<script>
(()=>{
const root=document.getElementById('celestial-scalable');if(!root||root.dataset.ready==='1')return;root.dataset.ready='1';
const NS='http://www.w3.org/2000/svg';
const orbitLayer=root.querySelector('#orbitLayer'),backBodies=root.querySelector('#backBodies'),frontBodies=root.querySelector('#frontBodies'),coreLayer=root.querySelector('#coreLayer');
const info=root.querySelector('#info'),chips=root.querySelector('#chips'),stage=root.querySelector('#stage'),title=root.querySelector('#mapTitle');
const pauseBtn=root.querySelector('#pauseBtn'),resetBtn=root.querySelector('#resetBtn'),expandBtn=root.querySelector('#expandBtn'),addBtn=root.querySelector('#addBtn');
const center={x:460,y:294},cameraDistance=780,focal=720;
const palette=[['#4c78a8','url(#cs-blue)'],['#c97a3d','url(#cs-orange)'],['#d7a72c','url(#cs-yellow)'],['#b45a52','url(#cs-red)'],['#6f8d72','url(#cs-green)'],['#748487','url(#cs-slate)']];
const seedProjects=[
{name:'WattDaCar',meta:'EV telemetry · charging intelligence · vehicle data platform'},
{name:'Loci',meta:'Personal tool hub · modular utilities · productivity system'},
{name:'VPS Radar',meta:'Infrastructure observability · read-only server intelligence'},
{name:'Workflow Tools',meta:'Automation utilities · developer workflows · operational helpers'}
];
const extraNames=['Telemetry Lab','Atlas Tools','Signal Stack','Nova UI','Orbit API','Data Forge'];
let projects=[],selected=null,paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches,baseTime=performance.now(),pausedAt=0,yaw=-8,pitch=7,targetYaw=-8,targetPitch=7,expanded=false;
const orbitSets=new Map(),bodyEls=new Map();
const rad=d=>d*Math.PI/180,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t;
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const make=(tag,attrs={})=>{const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));return el};
const rx=(p,a)=>{const c=Math.cos(a),s=Math.sin(a);return{x:p.x,y:p.y*c-p.z*s,z:p.y*s+p.z*c}};
const ry=(p,a)=>{const c=Math.cos(a),s=Math.sin(a);return{x:p.x*c+p.z*s,y:p.y,z:-p.x*s+p.z*c}};
const rz=(p,a)=>{const c=Math.cos(a),s=Math.sin(a);return{x:p.x*c-p.y*s,y:p.x*s+p.y*c,z:p.z}};

function createOrbitConfig(data,index){
  const golden=137.507764;
  const color=palette[index%palette.length];
  const radius=150+index*56;
  const wave=Math.sin((index+1)*1.91);
  const wave2=Math.cos((index+1)*1.37);
  return{
    id:data.id||`project-${index+1}`,
    name:data.name||`Project ${String(index+1).padStart(2,'0')}`,
    code:`NODE ${String(index+1).padStart(2,'0')}`,
    meta:data.meta||'New project · automatically generated orbital parameters',
    radius:data.radius??radius,
    phase:data.phase??rad((index*golden)%360),
    speed:data.speed??(.000052/(1+index*.23)),
    tiltX:data.tiltX??(18+wave*25),
    tiltY:data.tiltY??(wave2*17),
    tiltZ:data.tiltZ??(((index*43)%72)-36),
    size:data.size??Math.max(11,17-index*.7),
    accent:data.accent||color[0],
    fill:data.fill||color[1]
  };
}

function addProjectOrbit(data){
  const p=createOrbitConfig(data,projects.length);
  projects.push(p);
  const orbitGroup=make('g');
  orbitLayer.appendChild(orbitGroup);
  const segments=[];
  for(let i=0;i<118;i++){const path=make('path',{class:'orbit-segment'});orbitGroup.appendChild(path);segments.push(path)}
  orbitSets.set(p.id,segments);
  const g=make('g',{class:'planet-hit',tabindex:'0',role:'button','aria-label':p.name});
  const halo=make('circle',{r:p.size+9,class:'planet-halo',stroke:p.accent});
  const body=make('circle',{r:p.size,fill:p.fill,stroke:'#253746','stroke-width':'.8',filter:'url(#cs-shadow)'});
  const detail=make('path',{d:`M ${-p.size*.72} ${-p.size*.2} Q 0 ${p.size*.2} ${p.size*.72} ${-p.size*.18}`,fill:'none',stroke:'rgba(255,255,255,.42)','stroke-width':'1'});
  const label=make('text',{x:p.size+12,y:-3,class:'planet-label'});label.textContent=p.name;
  const code=make('text',{x:p.size+12,y:10,class:'planet-code'});code.textContent=p.code;
  g.append(halo,body,detail,label,code);
  g.addEventListener('click',()=>selectProject(p));
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectProject(p)}});
  bodyEls.set(p.id,g);
  const chip=document.createElement('button');chip.type='button';chip.className='project-chip';chip.dataset.id=p.id;chip.textContent=p.name;chip.addEventListener('click',()=>selectProject(p));chips.appendChild(chip);
  title.textContent=`Celestial Project Map // ${String(projects.length).padStart(2,'0')} nodes`;
  if(!selected)selectProject(p);
  return p;
}

function orbitPoint(p,a){let q={x:p.radius*Math.cos(a),y:0,z:p.radius*Math.sin(a)};q=rx(q,rad(p.tiltX));q=rz(q,rad(p.tiltZ));q=ry(q,rad(p.tiltY));return q}
function cam(p){let q=ry(p,rad(yaw));q=rx(q,rad(pitch));return q}
function proj(p){const q=cam(p);const s=focal/Math.max(260,cameraDistance-q.z);return{x:center.x+q.x*s,y:center.y+q.y*s,z:q.z,scale:s}}

seedProjects.forEach(p=>addProjectOrbit(p));

const halo=make('circle',{cx:center.x,cy:center.y,r:64,fill:'url(#cs-halo)'});
const glow=make('circle',{cx:center.x,cy:center.y,r:27,fill:'#e5b95d',opacity:'.18',filter:'url(#cs-blur)'});
const star=make('circle',{cx:center.x,cy:center.y,r:20,fill:'url(#cs-core)',stroke:'#9a7837','stroke-width':'.75',filter:'url(#cs-shadow)'});
const hi=make('circle',{cx:center.x-6,cy:center.y-7,r:5,fill:'rgba(255,255,255,.32)'});
const shell=make('circle',{cx:center.x,cy:center.y,r:39,fill:'none',stroke:'rgba(80,78,71,.30)','stroke-width':'.8','stroke-dasharray':'4 5'});
const ring1=make('ellipse',{cx:center.x,cy:center.y,rx:37,ry:13,fill:'none',stroke:'rgba(98,84,55,.42)','stroke-width':'1','stroke-dasharray':'12 7'});
const ring2=make('ellipse',{cx:center.x,cy:center.y,rx:37,ry:13,fill:'none',stroke:'rgba(98,84,55,.28)','stroke-width':'.85','stroke-dasharray':'7 9',transform:`rotate(58 ${center.x} ${center.y})`});
const ring3=make('ellipse',{cx:center.x,cy:center.y,rx:37,ry:13,fill:'none',stroke:'rgba(98,84,55,.22)','stroke-width':'.8','stroke-dasharray':'6 10',transform:`rotate(-58 ${center.x} ${center.y})`});
const mer=make('ellipse',{cx:center.x,cy:center.y,rx:13,ry:37,fill:'none',stroke:'rgba(89,94,94,.22)','stroke-width':'.8','stroke-dasharray':'8 9'});
const coreText=make('text',{x:center.x,y:center.y+59,'text-anchor':'middle',class:'core-label'});coreText.textContent='TB // DYSON CORE';
const coreSub=make('text',{x:center.x,y:center.y+72,'text-anchor':'middle',class:'core-sub'});coreSub.textContent='DEVELOPER SYSTEM';
coreLayer.append(halo,glow,star,hi,shell,ring1,ring2,ring3,mer,coreText,coreSub);

function selectProject(p){selected=p;info.style.setProperty('--accent',p.accent);info.querySelector('.info-title').textContent=p.name;info.querySelector('.info-meta').textContent=p.meta;bodyEls.forEach((el,id)=>el.classList.toggle('selected',id===p.id));chips.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===p.id)))}
selectProject(projects[0]);

function renderOrbit(p){const segs=orbitSets.get(p.id),n=segs.length;for(let i=0;i<n;i++){const a1=i/n*Math.PI*2,a2=(i+1)/n*Math.PI*2,q1=proj(orbitPoint(p,a1)),q2=proj(orbitPoint(p,a2)),z=(q1.z+q2.z)/2,depth=smooth(-165,165,z),active=selected&&selected.id===p.id;const opacity=lerp(active?.29:.22,active?.53:.39,depth),width=lerp(active?1:.9,active?1.27:1.07,depth),gray=lerp(146,94,depth),path=segs[i];path.setAttribute('d',`M ${q1.x.toFixed(2)} ${q1.y.toFixed(2)} L ${q2.x.toFixed(2)} ${q2.y.toFixed(2)}`);path.setAttribute('opacity',opacity.toFixed(3));path.setAttribute('stroke-width',width.toFixed(3));path.setAttribute('stroke',active?p.accent:`rgb(${gray.toFixed(0)},${(gray+7).toFixed(0)},${(gray+10).toFixed(0)})`)}}
function elapsed(now){return paused?pausedAt:now-baseTime}
function frame(now){yaw+=(targetYaw-yaw)*.035;pitch+=(targetPitch-pitch)*.035;const t=elapsed(now);projects.forEach(p=>{renderOrbit(p);const pt=proj(orbitPoint(p,p.phase+t*p.speed)),g=bodyEls.get(p.id),s=clamp(pt.scale,.70,1.28);g.setAttribute('transform',`translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) scale(${s.toFixed(3)})`);(pt.z>=0?frontBodies:backBodies).appendChild(g)});if(!paused||Math.abs(targetYaw-yaw)>.05||Math.abs(targetPitch-pitch)>.05)requestAnimationFrame(frame)}
const wake=()=>requestAnimationFrame(frame);

pauseBtn.textContent=paused?'Play':'Pause';
pauseBtn.addEventListener('click',()=>{if(paused){paused=false;baseTime=performance.now()-pausedAt;pauseBtn.textContent='Pause';wake()}else{pausedAt=performance.now()-baseTime;paused=true;pauseBtn.textContent='Play'}});
resetBtn.addEventListener('click',()=>{targetYaw=-8;targetPitch=7;selectProject(projects[0]);wake()});
expandBtn.addEventListener('click',()=>{expanded=!expanded;stage.classList.toggle('expanded',expanded);expandBtn.textContent=expanded?'Exit full':'Full screen';expandBtn.setAttribute('aria-pressed',String(expanded));setTimeout(wake,460)});
addBtn.addEventListener('click',()=>{if(projects.length>=10){addBtn.textContent='Max 10';addBtn.disabled=true;return}const i=projects.length-4;const name=extraNames[i%extraNames.length]+(i>=extraNames.length?` ${i+1}`:'');const p=addProjectOrbit({name,meta:'Auto-generated orbital slot · scalable project node'});selectProject(p);wake()});
stage.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=stage.getBoundingClientRect(),nx=((e.clientX-r.left)/r.width-.5)*2,ny=((e.clientY-r.top)/r.height-.5)*2;targetYaw=-8+nx*13;targetPitch=7-ny*8;if(paused)wake()});
stage.addEventListener('pointerleave',()=>{targetYaw=-8;targetPitch=7;if(paused)wake()});
requestAnimationFrame(frame);
})();
</script>
</div>
```

# Expected production structure

Adapt to the existing project conventions rather than forcing this exact structure, but a clean version could look like:

```txt
components/
  celestial-project-map/
    CelestialProjectMap.tsx
    CelestialCore.tsx
    ProjectBody.tsx
    ProjectDetails.tsx
    orbitMath.ts
    orbitFactory.ts
    types.ts
```

Or consolidate files if the codebase favors smaller component counts.

Suggested types:

```ts
export type ProjectMapItem = {
  id: string;
  name: string;
  description: string;
  accent?: string;
  orbit?: Partial<OrbitConfig>;
};

export type OrbitConfig = {
  radius: number;
  phase: number;
  speed: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  size: number;
};
```

Suggested helper:

```ts
export function createOrbitConfig(
  project: ProjectMapItem,
  index: number
): OrbitConfig
```

# Performance notes

The component should remain smooth when more projects are added.

Please consider:

- avoid unnecessary React rerenders for every animation frame;
- animation state may live in refs or in the render engine rather than React state;
- pre-create reusable SVG segments instead of recreating them every frame;
- pause animation when the component is offscreen if practical;
- optionally use `IntersectionObserver`;
- respect reduced motion;
- avoid expensive blur/filter effects on large areas;
- test with at least 8–12 project bodies.

If SVG becomes inefficient as the map grows, Canvas / Three.js / React Three Fiber may be used instead.

# Integration requirements

Before coding:

1. inspect the existing portfolio architecture;
2. inspect the existing design tokens / theme;
3. reuse existing typography, colors, spacing and button patterns where appropriate;
4. do not create a visually isolated mini-app;
5. integrate it naturally into the existing page;
6. preserve existing routes and functionality.

Use actual project data from the portfolio rather than hardcoding demo projects once integrated.

Initially the component should support at least:

- WattDaCar
- Loci
- VPS Radar
- Workflow Tools

# Definition of done

The implementation is complete when:

- the map looks genuinely 3D;
- orbital planes are visibly different;
- project bodies pass in front of and behind the core;
- orbit depth transitions are smooth, with no obvious seam;
- planets subtly scale with depth;
- the Dyson-inspired developer core is centered and visually clean;
- clicking a project selects it;
- selected project details update;
- pointer movement subtly changes viewpoint;
- pause works;
- reset works;
- full-screen / immersive mode works;
- new projects can be added primarily through project data;
- automatic orbit generation works;
- responsive behavior is acceptable;
- reduced-motion behavior is implemented;
- implementation fits the rest of the portfolio;
- no heavy dashboard UI is introduced.

## Final instruction

Do not mechanically port the prototype.

Treat the prototype as the **approved visual/interaction reference**, then implement the cleanest production version that fits the existing codebase.

You may change the underlying rendering technology if you can clearly justify that it results in a more performant, maintainable, or reliable implementation while preserving the approved appearance and behavior.
