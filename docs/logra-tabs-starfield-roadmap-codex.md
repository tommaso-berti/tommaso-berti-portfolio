# Logra Project Tabs + Starfield/NASA Roadmap

## Obiettivo

Implementare nella pagina dettaglio progetto del portfolio il sistema di tab mostrato nella preview allegata, mantenendo lo stile già esistente dell'applicazione:

- estetica editoriale/tecnica;
- background chiaro puntinato;
- palette navy + accenti rosso/arancio/giallo/blu;
- label tecniche in font monospazio uppercase;
- bordi sottili;
- hover discreti;
- niente componenti MUI lasciati con stile standard;
- roadmap reinterpretata come **mission track / constellation path**, coerente con il tema Starfield/NASA del portfolio.

La demo deve essere considerata **riferimento visivo e comportamentale**.  
Codex può adattare struttura e componentizzazione allo stack reale del progetto, mantenendo però l'aspetto finale.

## Elementi da implementare

### Tab principali

- `01 PANORAMICA`
- `02 SISTEMA`
- `03 INTERFACCIA`
- `04 LOG DI SVILUPPO`

Comportamento:

- tab attiva con fondo navy;
- sottile accent line specifica per sezione;
- piccolo indicatore di stato;
- hover con leggero sollevamento;
- mantenere la numerazione tecnica.

### Tab secondarie / filtri

Per la sezione Tecnologie:

- evitare il semplice underline standard;
- usare una navigazione più editoriale e tecnica;
- indicatore attivo sottile;
- stato hover leggero;
- rimanere visivamente subordinata alle tab principali.

### Controlli locali

Per pulsanti come:

- `LAYERED`
- `SCAN`
- `FOCUS PREVIEW`

usare la stessa famiglia visiva:

- bordo tecnico;
- mono uppercase;
- stato attivo pieno navy;
- micro-hover.

### Roadmap

La roadmap deve sembrare una **mission timeline** e non un normale stepper.

Caratteristiche:

- nodi orbitali;
- linea di collegamento tipo costellazione / mission path;
- label `NODE 01`, `NODE 02`, ecc.;
- stato `completed`, `current focus`, `planned`;
- card descrittiva sotto;
- effetti molto sobri;
- niente estetica sci-fi eccessiva;
- mantenere leggibilità e coerenza con il resto del portfolio.

---

## Preview completa

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Portfolio · Project tabs demo · Starfield roadmap</title>
<style>
  :root{
    --paper:#f2efe6;
    --paper-2:#ece8dd;
    --ink:#17232f;
    --ink-2:#5f6466;
    --line:rgba(23,35,47,.23);
    --line-strong:rgba(23,35,47,.48);
    --shadow:rgba(23,35,47,.12);
    --red:#cb4f45;
    --orange:#e47b39;
    --yellow:#d5b43b;
    --blue:#3b7ca4;
    --green:#709576;
    --deep-space:#dfe4ea;
    --mono:"SFMono-Regular",ui-monospace,Menlo,Consolas,monospace;
    --sans:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  }

  *{box-sizing:border-box}
  body{
    margin:0;
    min-height:100vh;
    color:var(--ink);
    font-family:var(--sans);
    background:
      radial-gradient(circle at 1px 1px, rgba(23,35,47,.11) 1px, transparent 1.1px) 0 0/18px 18px,
      linear-gradient(90deg, rgba(23,35,47,.035) 1px, transparent 1px) 0 0/96px 100%,
      var(--paper);
  }

  .page{
    width:min(1460px,calc(100% - 42px));
    margin:26px auto 70px;
  }

  .eyebrow{
    font:700 12px/1.2 var(--mono);
    letter-spacing:.18em;
    text-transform:uppercase;
    color:var(--ink-2);
  }

  .header{
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    gap:24px;
    padding:10px 2px 22px;
  }

  .header h1{
    margin:10px 0 0;
    font-size:clamp(34px,5vw,64px);
    letter-spacing:-.04em;
    line-height:.96;
  }

  .status{
    display:flex;
    align-items:center;
    gap:9px;
    font:700 11px/1 var(--mono);
    letter-spacing:.14em;
    text-transform:uppercase;
    color:var(--ink-2);
  }
  .status i{
    width:7px;height:7px;border-radius:50%;background:var(--green);
    box-shadow:0 0 0 4px rgba(112,149,118,.12);
  }

  .panel{
    border:1px solid var(--line);
    background:rgba(242,239,230,.80);
    box-shadow:0 16px 50px rgba(23,35,47,.05);
    backdrop-filter:blur(6px);
  }

  .tabs-shell{
    position:relative;
    padding:10px;
    border-bottom:1px solid var(--line);
    overflow:auto hidden;
    scrollbar-width:none;
  }
  .tabs-shell::-webkit-scrollbar{display:none}

  .mission-tabs{
    display:flex;
    gap:8px;
    min-width:max-content;
  }

  .mission-tab{
    --accent:var(--blue);
    position:relative;
    isolation:isolate;
    min-width:170px;
    height:54px;
    padding:0 18px;
    display:flex;
    align-items:center;
    gap:12px;
    border:1px solid var(--line-strong);
    background:rgba(242,239,230,.66);
    color:var(--ink);
    cursor:pointer;
    user-select:none;
    font:700 13px/1 var(--mono);
    letter-spacing:.10em;
    text-transform:uppercase;
    transition:
      transform .22s cubic-bezier(.2,.8,.2,1),
      border-color .22s ease,
      background .22s ease,
      color .22s ease,
      box-shadow .22s ease;
  }

  .mission-tab::before{
    content:"";
    position:absolute;
    left:-1px;right:-1px;bottom:-1px;
    height:3px;
    background:var(--accent);
    transform:scaleX(0);
    transform-origin:left;
    transition:transform .24s cubic-bezier(.2,.8,.2,1);
  }

  .mission-tab::after{
    content:"";
    position:absolute;
    width:9px;height:9px;
    right:8px;top:8px;
    border-top:1px solid currentColor;
    border-right:1px solid currentColor;
    opacity:.22;
    transition:opacity .2s ease, transform .2s ease;
  }

  .mission-tab:hover{
    transform:translateY(-2px);
    border-color:var(--ink);
    box-shadow:0 8px 18px rgba(23,35,47,.08);
  }
  .mission-tab:hover::before{transform:scaleX(.35)}
  .mission-tab:hover::after{opacity:.55;transform:translate(1px,-1px)}
  .mission-tab .num{opacity:.68}
  .mission-tab .pulse{
    width:5px;height:5px;border-radius:50%;
    background:currentColor;opacity:.22;margin-left:auto;
  }

  .mission-tab.active{
    background:var(--ink);
    color:var(--paper);
    border-color:var(--ink);
    box-shadow:0 8px 18px rgba(23,35,47,.18);
    transform:translateY(-1px);
  }
  .mission-tab.active::before{transform:scaleX(1)}
  .mission-tab.active::after{opacity:.55}
  .mission-tab.active .pulse{
    background:var(--accent);
    opacity:1;
    box-shadow:0 0 0 5px color-mix(in srgb,var(--accent) 18%, transparent);
  }

  .tab-content{
    min-height:430px;
    padding:36px 34px 42px;
  }
  .content-head{
    display:flex;
    justify-content:space-between;
    gap:30px;
    align-items:flex-start;
  }
  .content-head h2{
    margin:10px 0 8px;
    font-size:42px;
    letter-spacing:-.035em;
  }
  .content-head p{
    margin:0;
    max-width:780px;
    font-size:18px;
    line-height:1.65;
    color:#565d60;
  }

  .readout{
    min-width:220px;
    border-left:1px solid var(--line);
    padding-left:18px;
  }
  .readout .label{
    font:700 10px/1 var(--mono);
    letter-spacing:.17em;
    text-transform:uppercase;
    color:var(--ink-2);
  }
  .readout .value{
    margin-top:8px;
    font:700 13px/1.3 var(--mono);
    letter-spacing:.08em;
  }

  .subsection{
    margin-top:38px;
    padding-top:26px;
    border-top:1px solid var(--line);
  }
  .subsection h3{
    margin:0 0 16px;
    font-size:25px;
    letter-spacing:-.025em;
  }

  .filter-tabs{
    display:flex;
    gap:0;
    overflow:auto hidden;
    scrollbar-width:none;
    border-bottom:1px solid var(--line);
  }
  .filter-tabs::-webkit-scrollbar{display:none}
  .filter-tab{
    position:relative;
    flex:0 0 auto;
    border:0;
    background:transparent;
    color:#555b5d;
    padding:17px 22px 16px;
    font:650 15px/1 var(--sans);
    cursor:pointer;
    transition:color .2s ease, background .2s ease;
  }
  .filter-tab::before{
    content:"";
    position:absolute;
    left:22px;right:22px;bottom:-1px;
    height:2px;
    background:var(--ink);
    transform:scaleX(0);
    transform-origin:center;
    transition:transform .22s cubic-bezier(.2,.8,.2,1);
  }
  .filter-tab::after{
    content:"";
    position:absolute;
    top:50%;left:9px;
    width:4px;height:4px;border-radius:50%;
    background:var(--ink);
    opacity:0;
    transform:translateY(-50%) scale(.2);
    transition:.2s ease;
  }
  .filter-tab:hover{color:var(--ink);background:rgba(23,35,47,.035)}
  .filter-tab.active{color:var(--ink)}
  .filter-tab.active::before{transform:scaleX(1)}
  .filter-tab.active::after{opacity:.65;transform:translateY(-50%) scale(1)}

  .tech-grid{
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:18px;
    margin-top:20px;
  }
  .tech-card{
    border:1px solid var(--line);
    min-height:176px;
    padding:22px;
    background:rgba(242,239,230,.64);
    transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  }
  .tech-card:hover{
    transform:translateY(-3px);
    border-color:var(--line-strong);
    box-shadow:0 12px 22px rgba(23,35,47,.07);
  }
  .tech-title{
    display:flex;align-items:center;gap:12px;
    font-weight:750;font-size:17px;
  }
  .tech-icon{
    width:38px;height:38px;border-radius:50%;
    display:grid;place-items:center;
    border:1px solid var(--line);
    font:700 11px var(--mono);
    background:rgba(255,255,255,.45);
  }
  .tech-card p{color:#50565a;line-height:1.55;margin:18px 0 0}

  /* roadmap / starfield-nasa */
  .roadmap-wrap{
    position:relative;
    margin-top:10px;
    padding:26px 24px 20px;
    border:1px solid var(--line);
    background:
      radial-gradient(circle at 12% 24%, rgba(59,124,164,.06), transparent 22%),
      radial-gradient(circle at 78% 68%, rgba(213,180,59,.08), transparent 19%),
      radial-gradient(circle at 90% 22%, rgba(23,35,47,.05), transparent 18%),
      linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.06)),
      rgba(242,239,230,.62);
    overflow:hidden;
  }
  .roadmap-wrap::before{
    content:"";
    position:absolute;inset:0;
    background-image:
      radial-gradient(circle, rgba(23,35,47,.16) 1px, transparent 1.2px),
      radial-gradient(circle, rgba(23,35,47,.12) 1px, transparent 1.2px);
    background-size:84px 84px, 116px 116px;
    background-position:10px 12px, 40px 54px;
    opacity:.35;
    pointer-events:none;
  }
  .roadmap-header{
    position:relative;
    z-index:2;
    display:flex;
    justify-content:space-between;
    gap:16px;
    margin-bottom:22px;
    align-items:end;
  }
  .roadmap-meta{
    font:700 11px/1.2 var(--mono);
    letter-spacing:.16em;
    text-transform:uppercase;
    color:var(--ink-2);
  }
  .roadmap-legend{
    display:flex;gap:14px;flex-wrap:wrap;
    font:700 10px/1 var(--mono);
    letter-spacing:.12em;
    text-transform:uppercase;
    color:var(--ink-2);
  }
  .roadmap-legend span{
    display:flex;align-items:center;gap:7px;
  }
  .roadmap-legend i{
    width:8px;height:8px;border-radius:50%;display:inline-block;
  }
  .roadmap-legend .planned{background:#b4b4ae}
  .roadmap-legend .active{background:var(--blue)}
  .roadmap-legend .done{background:var(--green)}

  .constellation{
    position:relative;
    z-index:2;
    height:140px;
    margin-bottom:12px;
  }
  .constellation svg{
    position:absolute;inset:0;width:100%;height:100%;
  }

  .mission-points{
    position:absolute;inset:0;
    display:grid;
    grid-template-columns:repeat(5,1fr);
    align-items:center;
  }
  .mission-stop{
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:10px;
    background:transparent;
    border:0;
    cursor:pointer;
    color:#8c8d88;
    padding:0 8px;
    text-align:center;
  }
  .mission-stop .orbital{
    position:relative;
    width:66px;height:66px;border-radius:50%;
    display:grid;place-items:center;
    border:1px solid rgba(23,35,47,.22);
    background:rgba(255,255,255,.18);
    backdrop-filter:blur(3px);
    transition:transform .22s ease,border-color .22s ease, box-shadow .22s ease, background .22s ease;
  }
  .mission-stop .orbital::before{
    content:"";
    position:absolute;inset:6px;
    border-radius:50%;
    border:1px dashed rgba(23,35,47,.18);
  }
  .mission-stop .core{
    width:18px;height:18px;border-radius:50%;
    background:#b4b4ae;
    box-shadow:0 0 0 6px rgba(180,180,174,.12);
    transition:transform .22s ease, background .22s ease, box-shadow .22s ease;
  }
  .mission-stop .tag{
    font:700 11px/1 var(--mono);
    letter-spacing:.14em;
    text-transform:uppercase;
  }
  .mission-stop .ver{
    font:650 13px/1.1 var(--sans);
    color:var(--ink);
  }
  .mission-stop:hover .orbital{
    transform:translateY(-3px) scale(1.03);
    border-color:var(--ink);
    box-shadow:0 10px 18px rgba(23,35,47,.08);
  }

  .mission-stop[data-state="done"] .core{
    background:var(--green);
    box-shadow:0 0 0 8px rgba(112,149,118,.14);
  }
  .mission-stop[data-state="active"] .core{
    background:var(--blue);
    box-shadow:0 0 0 8px rgba(59,124,164,.18);
  }
  .mission-stop[data-state="active"] .orbital{
    border-color:rgba(59,124,164,.42);
    background:rgba(59,124,164,.06);
  }
  .mission-stop.active .orbital{
    transform:translateY(-4px) scale(1.04);
    border-color:var(--ink);
    box-shadow:0 12px 24px rgba(23,35,47,.10);
  }
  .mission-stop.active .core{
    transform:scale(1.1);
  }
  .mission-stop.active .tag{color:var(--ink)}

  .release-card{
    position:relative;
    z-index:2;
    margin:8px auto 0;
    width:min(900px,100%);
    border:1px solid var(--line);
    padding:26px 30px;
    background:rgba(242,239,230,.78);
    box-shadow:0 10px 22px rgba(23,35,47,.04);
  }
  .release-card .mini-head{
    display:flex;align-items:center;justify-content:space-between;gap:16px;
    margin-bottom:14px;
  }
  .release-card h4{margin:0;font-size:21px}
  .release-state{
    padding:8px 10px;
    border:1px solid var(--line);
    font:700 10px/1 var(--mono);
    letter-spacing:.14em;
    text-transform:uppercase;
    color:var(--ink-2);
  }
  .release-card ul{margin:0;padding-left:20px;color:#50565a;line-height:1.7}

  .control-row{
    display:flex;gap:8px;flex-wrap:wrap;margin-top:22px;
  }
  .control{
    position:relative;
    height:40px;padding:0 16px;
    border:1px solid var(--line-strong);
    background:transparent;color:var(--ink);
    font:700 11px var(--mono);
    letter-spacing:.12em;text-transform:uppercase;
    cursor:pointer;transition:.2s ease;
  }
  .control:hover{transform:translateY(-2px);border-color:var(--ink)}
  .control.active{background:var(--ink);color:var(--paper);box-shadow:0 6px 14px rgba(23,35,47,.16)}

  .accent-rail{
    height:5px;
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
  }
  .accent-rail span:nth-child(1){background:var(--red)}
  .accent-rail span:nth-child(2){background:var(--orange)}
  .accent-rail span:nth-child(3){background:var(--yellow)}
  .accent-rail span:nth-child(4){background:var(--blue)}

  .note{
    margin-top:18px;
    color:var(--ink-2);
    font:600 11px/1.6 var(--mono);
    letter-spacing:.08em;
    text-transform:uppercase;
  }

  @media (max-width:900px){
    .page{width:min(100% - 20px,1460px);margin-top:12px}
    .header{align-items:flex-start;flex-direction:column}
    .status{align-self:flex-end}
    .tab-content{padding:26px 18px 32px}
    .content-head{flex-direction:column}
    .readout{border-left:0;border-top:1px solid var(--line);padding:14px 0 0;width:100%}
    .tech-grid{grid-template-columns:1fr}
    .mission-tab{min-width:150px;height:50px}
    .constellation{height:auto}
    .mission-points{
      position:relative;
      display:flex;
      flex-direction:column;
      gap:18px;
      align-items:stretch;
    }
    .mission-stop{
      flex-direction:row;
      justify-content:flex-start;
      text-align:left;
      gap:14px;
    }
    .mission-stop .meta{
      display:flex;
      flex-direction:column;
      gap:6px;
      align-items:flex-start;
    }
    .constellation svg{display:none}
    .roadmap-header{flex-direction:column;align-items:flex-start}
  }

  @media (prefers-reduced-motion: reduce){
    *{transition:none!important;scroll-behavior:auto!important}
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div>
      <div class="eyebrow">PROJECT DETAIL // TAB SYSTEM</div>
      <h1>Logra — navigation study</h1>
    </div>
    <div class="status"><i></i> UI SYSTEM ONLINE</div>
  </div>

  <section class="panel">
    <div class="tabs-shell">
      <div class="mission-tabs" id="mainTabs">
        <button class="mission-tab active" data-tab="overview" style="--accent:var(--red)">
          <span class="num">01</span><span>PANORAMICA</span><span class="pulse"></span>
        </button>
        <button class="mission-tab" data-tab="system" style="--accent:var(--orange)">
          <span class="num">02</span><span>SISTEMA</span><span class="pulse"></span>
        </button>
        <button class="mission-tab" data-tab="interface" style="--accent:var(--yellow)">
          <span class="num">03</span><span>INTERFACCIA</span><span class="pulse"></span>
        </button>
        <button class="mission-tab" data-tab="devlog" style="--accent:var(--blue)">
          <span class="num">04</span><span>LOG DI SVILUPPO</span><span class="pulse"></span>
        </button>
      </div>
    </div>
    <div class="accent-rail"><span></span><span></span><span></span><span></span></div>

    <div class="tab-content" id="mainContent"></div>
  </section>

  <div class="note">
    Aggiornamento: la roadmap ora usa una lettura più “mission / constellation”, allineata al tema starfield / nasa ma senza perdere la sobrietà del dossier.
  </div>
</div>

<script>
const data = {
  overview: {
    index:"01 // BRIEF DI MISSIONE",
    title:"Logra",
    text:"La tab principale usa un linguaggio da console editoriale: geometria netta, numerazione tecnica, stato attivo scuro e una sottile linea-colore che richiama il sistema visivo orbitale senza trasformare la pagina in una UI sci-fi pesante.",
    read:"PROJECT / OVERVIEW",
    extra:`
      <div class="subsection">
        <h3>Sfide affrontate</h3>
        <div class="tech-grid">
          ${["Frontend / API allineati","Demo locale separata","Import CSV/XLSX"].map((x,i)=>`
          <article class="tech-card">
            <div class="tech-title"><span class="tech-icon">0${i+1}</span>${x}</div>
            <p>${[
              "Contratti condivisi, stati coerenti e superfici operative leggibili anche quando il prodotto cresce.",
              "Separazione visibile tra preview pubblica e sessioni reali, senza indebolire la credibilità della demo.",
              "Matching, override e normalizzazione progettati come flusso robusto e non come wizard fragile."
            ][i]}</p>
          </article>`).join("")}
        </div>
      </div>`
  },

  system: {
    index:"02 // ARCHITETTURA DEL SISTEMA",
    title:"Tecnologie",
    text:"Le tab secondarie diventano filtri tecnici coerenti con la navigazione principale: niente underline anonimo da componente standard, ma un indicatore più preciso e discreto, integrato nel linguaggio del dossier.",
    read:"STACK / FILTER VIEW",
    extra:`
      <div class="subsection">
        <div class="filter-tabs" id="filterTabs">
          ${["Tutte","Back-end / Runtime","Database","Frontend","Linguaggi / Markup","Strumenti"].map((t,i)=>`<button class="filter-tab ${i===0?"active":""}" data-filter="${t}">${t}</button>`).join("")}
        </div>
        <div class="tech-grid" id="techGrid"></div>
      </div>`
  },

  interface: {
    index:"03 // MODULO APPLICAZIONE",
    title:"Interfaccia",
    text:"I controlli locali seguono lo stesso principio: bottoni compatti in monospazio, stato attivo pieno, hover meccanico leggerissimo. Restano secondari rispetto alla tab principale ma appartengono chiaramente alla stessa famiglia.",
    read:"UI / INTERACTION MODE",
    extra:`
      <div class="subsection">
        <h3>Modalità anteprima</h3>
        <div class="control-row" id="previewControls">
          <button class="control active">LAYERED</button>
          <button class="control">SCAN</button>
          <button class="control">FOCUS PREVIEW</button>
        </div>
        <div class="release-card" id="previewPanel">
          <h4>Layered mode</h4>
          <ul>
            <li>Preview e Project Survey restano sovrapposti con profondità visiva controllata.</li>
            <li>Hover e focus portano in primo piano il modulo corretto.</li>
            <li>Nessun chip generico: il contesto è espresso tramite label tecniche e stato.</li>
          </ul>
        </div>
      </div>`
  },

  devlog: {
    index:"04 // LOG DI SVILUPPO",
    title:"Cosa ho imparato",
    text:"La roadmap viene reinterpretata come un tracciato di missione: nodi-orbita, collegamenti da costellazione, labeling tecnico e card di dettaglio. L'idea è evocare NASA / Starfield restando elegante e leggibile.",
    read:"ROADMAP / MISSION TRACK",
    extra:`
      <div class="subsection">
        <h3>Roadmap</h3>
        <div class="roadmap-wrap">
          <div class="roadmap-header">
            <div class="roadmap-meta">Mission timeline // orbital release path</div>
            <div class="roadmap-legend">
              <span><i class="done"></i> completed</span>
              <span><i class="active"></i> current focus</span>
              <span><i class="planned"></i> planned</span>
            </div>
          </div>

          <div class="constellation">
            <svg viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="route" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(23,35,47,.20)"/>
                  <stop offset="30%" stop-color="rgba(203,79,69,.30)"/>
                  <stop offset="55%" stop-color="rgba(228,123,57,.30)"/>
                  <stop offset="78%" stop-color="rgba(213,180,59,.34)"/>
                  <stop offset="100%" stop-color="rgba(59,124,164,.32)"/>
                </linearGradient>
              </defs>
              <path d="M80,85 C160,44 230,118 300,80 C368,46 438,46 500,80 C568,118 644,118 708,82 C786,38 848,48 920,80" fill="none" stroke="url(#route)" stroke-width="2.6" stroke-dasharray="5 8" />
              <path d="M80,85 300,80 500,80 708,82 920,80" fill="none" stroke="rgba(23,35,47,.10)" stroke-width="1" />
            </svg>

            <div class="mission-points" id="timeline">
              ${["v1.0.0","v2.0.0","v3.0.0","v4.0.0","v5.x"].map((v,i)=>`
                <button class="mission-stop ${i===0?"active":""}" data-step="${i}" data-state="${i===0?"active":i<3?"done":"planned"}">
                  <span class="orbital"><span class="core"></span></span>
                  <span class="meta">
                    <span class="tag">node 0${i+1}</span>
                    <span class="ver">${v}</span>
                  </span>
                </button>`).join("")}
            </div>
          </div>

          <div class="release-card" id="releaseCard"></div>
        </div>
      </div>`
  }
};

const techs = [
  ["React","Frontend","Card, filtri, pannelli dettaglio, guided tour e superfici impostazioni."],
  ["Vite","Frontend","Build tooling rapido e prevedibile per il ciclo di sviluppo."],
  ["React Router","Frontend","Routing scoped, aree protette e landing pubblica."],
  ["TypeScript","Linguaggi / Markup","Contratti condivisi tra web, API e package."],
  ["MUI","Frontend","Token tema, primitive accessibili e base componenti."],
  ["Framer Motion","Frontend","Transizioni di card, overlay e preview."],
  ["Node.js","Back-end / Runtime","Runtime API e servizi di supporto."],
  ["MongoDB","Database","Persistenza dati applicativi e query catalogo."],
  ["GitHub Actions","Strumenti","CI/CD, check automatici e deploy versionati."]
];

const releases = [
  {
    version:"v1.0.0",
    state:"current focus",
    bullets:[
      "Rilasciare il prodotto core con demo login, libreria giochi, status/progress e navigazione multi-sezione.",
      "Costruire una base operativa stabile per seed, bootstrap e gestione demo.",
      "Definire pattern di navigazione e gerarchie UI riutilizzabili."
    ]
  },
  {
    version:"v2.0.0",
    state:"completed",
    bullets:[
      "Consolidare ricerca avanzata, filtri e preferiti per il workflow reale dell’utente.",
      "Ridurre attrito operativo con UX più densa ma leggibile.",
      "Raffinare comportamenti di sorting e discovery."
    ]
  },
  {
    version:"v3.0.0",
    state:"completed",
    bullets:[
      "Introdurre import/export, matching, override e normalizzazione piattaforme.",
      "Rendere amministrazione e flussi di supporto più robusti.",
      "Separare logiche operative critiche dalla sola UI di facciata."
    ]
  },
  {
    version:"v4.0.0",
    state:"planned",
    bullets:[
      "Rendere la landing pubblica e la preview portfolio più autonome.",
      "Migliorare il racconto del progetto senza indebolire il prodotto reale.",
      "Potenziare i moduli descrittivi di sistema e interfaccia."
    ]
  },
  {
    version:"v5.x",
    state:"planned",
    bullets:[
      "Aprire a evoluzione modulare, osservabilità e rifinitura UX trasversale.",
      "Rendere il sistema più scalabile su domini e use case futuri.",
      "Curare performance, polish e consistenza visiva globale."
    ]
  }
];

function renderMain(key){
  const d = data[key];
  document.querySelectorAll(".mission-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===key));
  const root = document.getElementById("mainContent");
  root.innerHTML = `
    <div class="content-head">
      <div>
        <div class="eyebrow">${d.index}</div>
        <h2>${d.title}</h2>
        <p>${d.text}</p>
      </div>
      <div class="readout">
        <div class="label">CURRENT VIEW</div>
        <div class="value">${d.read}</div>
      </div>
    </div>
    ${d.extra}
  `;

  if(key==="system") initFilters();
  if(key==="interface") initPreview();
  if(key==="devlog") initTimeline();
}

function initFilters(){
  const grid=document.getElementById("techGrid");
  const buttons=[...document.querySelectorAll(".filter-tab")];

  function draw(filter){
    const list=filter==="Tutte"?techs:techs.filter(x=>x[1]===filter);
    grid.innerHTML=list.map((t,i)=>`
      <article class="tech-card">
        <div class="tech-title"><span class="tech-icon">${String(i+1).padStart(2,"0")}</span>${t[0]}</div>
        <p>${t[2]}</p>
      </article>`).join("");
  }
  draw("Tutte");
  buttons.forEach(btn=>btn.addEventListener("click",()=>{
    buttons.forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    draw(btn.dataset.filter);
  }));
}

function initPreview(){
  const labels={
    "LAYERED":["Layered mode",[
      "Preview e Project Survey restano sovrapposti con profondità visiva controllata.",
      "Hover e focus portano in primo piano il modulo corretto.",
      "Nessun chip generico: il contesto è espresso tramite label tecniche e stato."
    ]],
    "SCAN":["Scan mode",[
      "Riduce la gerarchia a una lettura tecnica essenziale.",
      "Evidenzia bordi, nodi e metadati senza cambiare il layout.",
      "Utile per mostrare struttura e relazioni tra componenti."
    ]],
    "FOCUS PREVIEW":["Focus preview",[
      "La preview diventa il livello dominante.",
      "Il Survey scivola dietro mantenendo la composizione a schede.",
      "Interazione pensata per demo pubblica e portfolio."
    ]]
  };
  const controls=[...document.querySelectorAll(".control")];
  controls.forEach(c=>c.addEventListener("click",()=>{
    controls.forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    const [title,items]=labels[c.textContent.trim()];
    document.getElementById("previewPanel").innerHTML=`<h4>${title}</h4><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul>`;
  }));
}

function initTimeline(){
  const buttons=[...document.querySelectorAll(".mission-stop")];
  const card=document.getElementById("releaseCard");
  function draw(i){
    const item=releases[i];
    card.innerHTML=`
      <div class="mini-head">
        <h4>${item.version}</h4>
        <div class="release-state">${item.state}</div>
      </div>
      <ul>${item.bullets.map(x=>`<li>${x}</li>`).join("")}</ul>
    `;
  }
  draw(0);
  buttons.forEach((b,i)=>b.addEventListener("click",()=>{
    buttons.forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    draw(i);
  }));
}

document.getElementById("mainTabs").addEventListener("click",e=>{
  const btn=e.target.closest(".mission-tab");
  if(btn) renderMain(btn.dataset.tab);
});

renderMain("devlog");
</script>
</body>
</html>
```

## Indicazioni per l'integrazione

- Riutilizzare i token/theme già presenti nel portfolio invece di duplicare valori quando possibile.
- Se il progetto usa React + MUI, convertire la demo in componenti React mantenendo fedelmente layout e interazioni.
- Non introdurre una nuova libreria solo per replicare questa UI se non necessaria.
- Per le animazioni usare preferibilmente CSS o Framer Motion se già presente.
- Mantenere supporto responsive.
- Mantenere `prefers-reduced-motion`.
- Non cambiare contenuti testuali reali della pagina salvo dove necessario per adattare la struttura.
- Non modificare le altre sezioni del portfolio fuori da questo scope.
