# Project Detail — Layered Application Module

## Obiettivo

Integrare nella pagina di dettaglio progetto il componente di anteprima già approvato visivamente.

L'implementazione deve mantenere questa logica:

- stesso stile light NASA-punk / Starfield già presente nel portfolio;
- palette avorio / navy / linee tecniche sottili / microtesti monospace;
- rail inferiore rosso / arancio / giallo / blu;
- pannello `PROJECT SURVEY` sovrapposto alla preview;
- stato normale: Survey sopra, Preview sotto;
- la Preview deve essere volutamente sfalsata in basso e a destra;
- hover sulla Preview: Preview sale in primo piano;
- contemporaneamente il Survey scende dietro e si sposta leggermente;
- su touch, un tap sulla Preview produce lo stesso effetto;
- mantenere i tre controlli:
  - `Layered`
  - `Scan`
  - `Focus preview`
- `Layered` = stato normale con Survey sopra e Preview sotto;
- `Scan` = Survey protagonista, Preview più arretrata;
- `Focus preview` = Survey nascosto e Preview quasi a pieno box;
- niente stile SaaS generico;
- niente pill generiche;
- niente card Material standard;
- adattare i dati al progetto reale;
- se la preview reale è un iframe o un componente esistente, inserirla nella cornice mantenendo stacking e comportamento.

Se nel progetto è già presente Framer Motion, Codex può sostituire le transition CSS con `motion` mantenendo lo stesso risultato visivo.

---

## Codice demo approvato

```html
<div id="tb-layered-module" class="w-full min-w-0 py-2">
<style>
#tb-layered-module{
  --ivory:#f1ede3;
  --ivory2:#eae4d7;
  --paper:#f7f3e9;
  --navy:#111b28;
  --text:#5f666a;
  --line:#b9b5aa;
  --line-soft:#d3cec2;
  --red:#c94d46;
  --orange:#e17436;
  --yellow:#d4aa3a;
  --blue:#2d779d;
  --green:#77967d;
  color:var(--navy);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
#tb-layered-module *{box-sizing:border-box}
#tb-layered-module .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}

#tb-layered-module .module{
  border:1px solid var(--line);
  background:rgba(234,228,215,.62);
  position:relative;
  overflow:hidden;
}
#tb-layered-module .module-head{
  height:43px;
  border-bottom:1px solid var(--line);
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:14px;
  padding:0 14px;
  font-size:9px;
  font-weight:700;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:#5f6364;
}
#tb-layered-module .online{display:flex;align-items:center;gap:7px;white-space:nowrap}
#tb-layered-module .online i{width:6px;height:6px;background:var(--green);border-radius:50%}

#tb-layered-module .viewport{
  position:relative;
  height:430px;
  overflow:hidden;
  background-color:var(--ivory2);
  background-image:radial-gradient(circle,rgba(17,27,40,.07) .6px,transparent .7px);
  background-size:12px 12px;
}
#tb-layered-module .orb{position:absolute;border:1px solid rgba(17,27,40,.11);border-radius:50%;pointer-events:none}
#tb-layered-module .orb.a{width:590px;height:205px;right:-290px;top:218px;transform:rotate(8deg)}
#tb-layered-module .orb.b{width:360px;height:360px;right:-185px;top:108px}

#tb-layered-module .scanner{
  position:absolute;
  z-index:5;
  left:19px;
  top:19px;
  width:196px;
  background:rgba(241,237,227,.95);
  border:1px solid #aaa79e;
  border-left:3px solid var(--navy);
  box-shadow:6px 9px 0 rgba(17,27,40,.045),0 6px 15px rgba(17,27,40,.08);
  backdrop-filter:blur(7px);
  transition:
    transform .42s cubic-bezier(.2,.8,.2,1),
    opacity .3s ease,
    box-shadow .42s ease,
    filter .3s ease;
}
#tb-layered-module .scanner:after{
  content:"";
  position:absolute;
  right:-9px;
  bottom:-9px;
  width:18px;
  height:18px;
  border-right:1px solid #9c9a93;
  border-bottom:1px solid #9c9a93;
  opacity:.75;
}
#tb-layered-module .scanner-head{padding:11px 11px 9px;border-bottom:1px solid #b8b5ab}
#tb-layered-module .scanner-code{font-size:7px;letter-spacing:.17em;color:#696d6e;text-transform:uppercase;margin-bottom:5px}
#tb-layered-module .scanner-name{font-size:16px;line-height:1;font-weight:700;letter-spacing:-.035em;margin-bottom:3px}
#tb-layered-module .scanner-sub{font-size:7px;color:#6e7374;letter-spacing:.07em}
#tb-layered-module .tabs{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #b8b5ab}
#tb-layered-module .tab{
  position:relative;
  border:0;
  border-right:1px solid #c5c1b7;
  background:transparent;
  height:28px;
  color:#737676;
  font-size:6px;
  font-weight:700;
  letter-spacing:.11em;
  text-transform:uppercase;
  cursor:pointer;
}
#tb-layered-module .tab:last-child{border-right:0}
#tb-layered-module .tab.active{color:var(--navy);background:rgba(17,27,40,.035)}
#tb-layered-module .tab.active:after{content:"";position:absolute;height:2px;bottom:-1px;left:7px;right:7px;background:var(--blue)}
#tb-layered-module .scan-body{padding:8px 8px 10px}
#tb-layered-module .survey{display:flex;justify-content:space-between;font-size:6px;letter-spacing:.09em;text-transform:uppercase;color:#6a6f70;margin:0 1px 5px}
#tb-layered-module .progress{height:3px;background:#cfcbbf;margin-bottom:8px;overflow:hidden}
#tb-layered-module .progress span{display:block;height:100%;background:#727c82;width:76%;transition:width .3s ease}
#tb-layered-module .data-row{display:grid;grid-template-columns:44% 56%;min-height:21px;border-bottom:1px solid #cbc7bc;font-size:6px;text-transform:uppercase;letter-spacing:.035em}
#tb-layered-module .data-row span{display:flex;align-items:center;padding:0 5px;min-width:0}
#tb-layered-module .data-row span:first-child{background:rgba(17,27,40,.055);color:#656a6c}
#tb-layered-module .data-row span:last-child{justify-content:flex-end;text-align:right;color:var(--navy);font-weight:600}
#tb-layered-module .resource-label{font-size:6px;letter-spacing:.1em;color:#696d6e;text-transform:uppercase;margin-top:10px}
#tb-layered-module .resources{display:flex;gap:4px;margin-top:5px}
#tb-layered-module .resource{width:25px;height:25px;border:1px solid #aaa89f;display:grid;place-items:center;font-size:6px;font-weight:700;background:rgba(247,244,236,.5)}

#tb-layered-module .preview{
  position:absolute;
  z-index:3;
  left:174px;
  right:24px;
  top:59px;
  bottom:47px;
  border:1px solid #aaa79e;
  background:var(--paper);
  box-shadow:9px 12px 0 rgba(17,27,40,.055),0 12px 22px rgba(17,27,40,.10);
  overflow:hidden;
  cursor:pointer;
  transition:
    left .48s cubic-bezier(.2,.8,.2,1),
    top .48s cubic-bezier(.2,.8,.2,1),
    right .48s cubic-bezier(.2,.8,.2,1),
    bottom .48s cubic-bezier(.2,.8,.2,1),
    transform .48s cubic-bezier(.2,.8,.2,1),
    box-shadow .4s ease;
}
#tb-layered-module .preview:before{
  content:"";
  position:absolute;
  left:0;right:0;top:0;height:3px;
  background:linear-gradient(90deg,var(--red) 0 25%,var(--orange) 25% 50%,var(--yellow) 50% 75%,var(--blue) 75% 100%);
  z-index:4;
}
#tb-layered-module .preview-top{
  height:31px;
  border-bottom:1px solid var(--line-soft);
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:3px 10px 0;
  background:#efebe1;
}
#tb-layered-module .window-id{font-size:6px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#676c6e}
#tb-layered-module .window-status{display:flex;align-items:center;gap:5px;font-size:6px;letter-spacing:.1em;text-transform:uppercase;color:#676c6e}
#tb-layered-module .window-status i{width:5px;height:5px;border-radius:50%;background:var(--green)}
#tb-layered-module .preview-screen{
  height:calc(100% - 31px);
  position:relative;
  display:grid;
  place-items:center;
  padding:28px;
  background-color:#f1eee6;
  background-image:
    linear-gradient(rgba(17,27,40,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(17,27,40,.03) 1px,transparent 1px);
  background-size:28px 28px;
}
#tb-layered-module .preview-screen:after{
  content:"";
  position:absolute;
  width:300px;
  height:108px;
  border:1px solid rgba(17,27,40,.08);
  border-radius:50%;
  right:-96px;
  bottom:5px;
  transform:rotate(7deg);
}
#tb-layered-module .preview-content{text-align:left;width:min(100%,390px);position:relative;z-index:2}
#tb-layered-module .preview-eyebrow{display:flex;align-items:center;gap:8px;font-size:6px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:#686d6f;margin-bottom:12px}
#tb-layered-module .preview-eyebrow:before{content:"";width:25px;height:1px;background:#7f8383}
#tb-layered-module .preview-title{font-size:clamp(20px,3vw,30px);font-weight:750;letter-spacing:-.05em;line-height:.96;margin:0 0 10px;color:var(--navy)}
#tb-layered-module .preview-copy{font-size:9px;line-height:1.62;color:#636a6d;margin:0 0 16px;max-width:330px}
#tb-layered-module .preview-action{height:34px;border:1px solid var(--navy);background:var(--navy);color:var(--paper);font-size:7px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:0 12px;cursor:pointer}
#tb-layered-module .preview-label{
  position:absolute;
  right:12px;
  bottom:11px;
  z-index:3;
  border-top:1px solid #9d9c96;
  border-bottom:1px solid #9d9c96;
  padding:6px 0 5px 21px;
  min-width:110px;
  font-size:6px;
  font-weight:700;
  letter-spacing:.14em;
  text-transform:uppercase;
  color:#5d6264;
  text-align:right;
}
#tb-layered-module .preview-label:before{content:"";position:absolute;left:0;top:50%;width:13px;height:1px;background:var(--navy)}
#tb-layered-module .preview-label:after{content:"";position:absolute;left:10px;top:calc(50% - 2px);width:5px;height:5px;border-radius:50%;background:var(--blue)}

#tb-layered-module .telemetry{
  position:absolute;
  left:19px;
  right:18px;
  bottom:16px;
  display:flex;
  justify-content:space-between;
  gap:18px;
  font-size:7px;
  font-weight:700;
  letter-spacing:.12em;
  text-transform:uppercase;
  color:#676b6c;
}
#tb-layered-module .rail{height:5px;display:grid;grid-template-columns:repeat(4,1fr)}
#tb-layered-module .rail i:nth-child(1){background:var(--red)}
#tb-layered-module .rail i:nth-child(2){background:var(--orange)}
#tb-layered-module .rail i:nth-child(3){background:var(--yellow)}
#tb-layered-module .rail i:nth-child(4){background:var(--blue)}

#tb-layered-module .controls{display:flex;justify-content:flex-end;gap:5px;margin-top:8px;flex-wrap:wrap}
#tb-layered-module .mode{height:32px;border:1px solid #aaa79e;background:transparent;color:#606567;font-size:7px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;padding:0 10px;cursor:pointer}
#tb-layered-module .mode.active{background:var(--navy);color:var(--paper);border-color:var(--navy)}

/* Hover/tap: preview comes to foreground, survey visibly falls behind. */
#tb-layered-module .viewport.preview-front .preview{
  z-index:8;
  left:145px;
  top:35px;
  transform:translateY(-2px);
  box-shadow:11px 15px 0 rgba(17,27,40,.06),0 18px 30px rgba(17,27,40,.15);
}
#tb-layered-module .viewport.preview-front .scanner{
  z-index:2;
  transform:translate(-8px,26px) scale(.975);
  filter:saturate(.78);
  box-shadow:3px 5px 0 rgba(17,27,40,.03);
  opacity:.82;
}

#tb-layered-module .viewport.focus .scanner{transform:translate(-220px,-24px);opacity:0}
#tb-layered-module .viewport.focus .preview{z-index:8;left:26px;right:26px;top:27px;bottom:48px;transform:none}
#tb-layered-module .viewport.scan .preview{left:210px;top:76px;z-index:2}
#tb-layered-module .viewport.scan .scanner{z-index:7;transform:none;opacity:1;filter:none}
#tb-layered-module .scanline{position:absolute;z-index:9;left:0;right:0;height:1px;top:0;background:var(--blue);opacity:0;pointer-events:none}
#tb-layered-module .viewport.scan .scanline{opacity:.43;animation:tb-layer-scan 3.5s linear infinite}
@keyframes tb-layer-scan{from{top:0}to{top:100%}}

#tb-layered-module button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}

@media(hover:hover) and (pointer:fine){
  #tb-layered-module .preview:hover{z-index:8}
}

@media(max-width:680px){
  #tb-layered-module .viewport{height:590px}
  #tb-layered-module .scanner{left:12px;right:12px;width:auto;top:12px}
  #tb-layered-module .preview{left:30px;right:12px;top:272px;bottom:47px}
  #tb-layered-module .viewport.preview-front .preview{left:12px;right:12px;top:238px}
  #tb-layered-module .viewport.preview-front .scanner{transform:translateY(23px) scale(.975)}
  #tb-layered-module .viewport.scan .preview{left:30px;right:12px;top:290px}
  #tb-layered-module .viewport.focus .scanner{transform:translateY(-245px);opacity:0}
  #tb-layered-module .viewport.focus .preview{left:12px;right:12px;top:20px;bottom:48px}
}

@media(prefers-reduced-motion:reduce){
  #tb-layered-module *,
  #tb-layered-module *:before,
  #tb-layered-module *:after{
    animation:none!important;
    transition-duration:.001ms!important;
  }
}
</style>

<section class="module">
  <header class="module-head mono">
    <span>ECOMMERCE-REST-API // MODULO APPLICAZIONE</span>
    <span class="online"><i></i>BUILD PRONTO</span>
  </header>

  <div class="viewport" id="layered-viewport">
    <div class="orb a"></div>
    <div class="orb b"></div>
    <div class="scanline"></div>

    <aside class="scanner">
      <div class="scanner-head">
        <div class="scanner-code mono">PROJECT SURVEY // NODE 05</div>
        <div class="scanner-name">E-commerce API</div>
        <div class="scanner-sub mono">FULL-STACK APPLICATION SYSTEM</div>
      </div>

      <div class="tabs mono">
        <button type="button" class="tab active" data-tab="survey">Survey</button>
        <button type="button" class="tab" data-tab="stack">Stack</button>
        <button type="button" class="tab" data-tab="deploy">Deploy</button>
      </div>

      <div class="scan-body">
        <div class="survey mono">
          <span>Survey</span>
          <span id="layered-pct">76%</span>
        </div>

        <div class="progress">
          <span id="layered-progress"></span>
        </div>

        <div id="layered-data"></div>

        <div class="resource-label mono">
          Resources [ 4/4 ]
        </div>

        <div class="resources mono">
          <div class="resource">R</div>
          <div class="resource">V</div>
          <div class="resource">M</div>
          <div class="resource">API</div>
        </div>
      </div>
    </aside>

    <section
      class="preview"
      id="layered-preview"
      tabindex="0"
      aria-label="Project application preview"
    >
      <div class="preview-top mono">
        <span class="window-id">
          APP PREVIEW // NODE-05
        </span>

        <span class="window-status">
          <i></i>READY
        </span>
      </div>

      <div class="preview-screen">
        <div class="preview-content">
          <div class="preview-eyebrow mono">
            Application module
          </div>

          <h3 class="preview-title">
            E-commerce REST API
          </h3>

          <p class="preview-copy">
            La preview reale resta il contenuto principale,
            incorniciata nello stesso linguaggio tecnico del portfolio.
          </p>

          <button
            type="button"
            class="preview-action"
            id="layered-load"
          >
            Carica anteprima →
          </button>
        </div>

        <div class="preview-label mono">
          Preview interattiva
        </div>
      </div>
    </section>

    <div class="telemetry mono">
      <span>NODO ECOMMERCE-REST-API</span>
      <span id="layered-status">
        LINK PUBBLICO DISPONIBILE
      </span>
    </div>
  </div>

  <div class="rail">
    <i></i><i></i><i></i><i></i>
  </div>
</section>

<div class="controls mono">
  <button type="button" class="mode active" data-mode="layered">
    Layered
  </button>

  <button type="button" class="mode" data-mode="scan">
    Scan
  </button>

  <button type="button" class="mode" data-mode="focus">
    Focus preview
  </button>
</div>

<script>
(() => {
  const root = document.getElementById('tb-layered-module');

  if (!root || root.dataset.ready === '1') return;

  root.dataset.ready = '1';

  const viewport = root.querySelector('#layered-viewport');
  const preview = root.querySelector('#layered-preview');
  const data = root.querySelector('#layered-data');
  const progress = root.querySelector('#layered-progress');
  const pct = root.querySelector('#layered-pct');
  const status = root.querySelector('#layered-status');
  const load = root.querySelector('#layered-load');

  let mode = 'layered';
  let touchFront = false;

  const tabData = {
    survey: {
      p: '76%',
      w: '76%',
      s: 'LINK PUBBLICO DISPONIBILE',
      rows: [
        ['TYPE', 'FULL-STACK'],
        ['SCOPE', 'E-COMMERCE'],
        ['AUTH', 'SESSION'],
        ['API', 'REST'],
        ['STATUS', 'READY']
      ]
    },

    stack: {
      p: '92%',
      w: '92%',
      s: 'STACK PROFILE // VERIFIED',
      rows: [
        ['CLIENT', 'REACT'],
        ['BUNDLER', 'VITE'],
        ['ROUTER', 'REACT ROUTER'],
        ['UI', 'MUI'],
        ['LANG', 'JAVASCRIPT']
      ]
    },

    deploy: {
      p: '100%',
      w: '100%',
      s: 'DEPLOY NODE // ONLINE',
      rows: [
        ['TARGET', 'VPS'],
        ['CHANNEL', 'PUBLIC'],
        ['BUILD', 'READY'],
        ['SOURCE', 'AVAILABLE'],
        ['HEALTH', 'NOMINAL']
      ]
    }
  };

  function setTab(name) {
    const d = tabData[name] || tabData.survey;

    pct.textContent = d.p;
    progress.style.width = d.w;
    status.textContent = d.s;
    data.innerHTML = '';

    d.rows.forEach(([k, v]) => {
      const row = document.createElement('div');
      row.className = 'data-row mono';

      const a = document.createElement('span');
      const b = document.createElement('span');

      a.textContent = k;
      b.textContent = v;

      row.append(a, b);
      data.append(row);
    });

    root
      .querySelectorAll('.tab')
      .forEach(btn =>
        btn.classList.toggle(
          'active',
          btn.dataset.tab === name
        )
      );
  }

  root
    .querySelectorAll('.tab')
    .forEach(btn =>
      btn.addEventListener(
        'click',
        () => setTab(btn.dataset.tab)
      )
    );

  function applyMode(next) {
    mode = next;
    touchFront = false;

    viewport.classList.remove(
      'scan',
      'focus',
      'preview-front'
    );

    if (next === 'scan') {
      viewport.classList.add('scan');
    }

    if (next === 'focus') {
      viewport.classList.add('focus');
    }

    root
      .querySelectorAll('.mode')
      .forEach(btn =>
        btn.classList.toggle(
          'active',
          btn.dataset.mode === next
        )
      );
  }

  root
    .querySelectorAll('.mode')
    .forEach(btn =>
      btn.addEventListener(
        'click',
        () => applyMode(btn.dataset.mode)
      )
    );

  preview.addEventListener(
    'pointerenter',
    event => {
      if (
        event.pointerType === 'mouse' &&
        mode === 'layered'
      ) {
        viewport.classList.add('preview-front');
      }
    }
  );

  preview.addEventListener(
    'pointerleave',
    event => {
      if (
        event.pointerType === 'mouse' &&
        mode === 'layered'
      ) {
        viewport.classList.remove('preview-front');
      }
    }
  );

  preview.addEventListener(
    'click',
    event => {
      if (event.target.closest('button')) return;
      if (mode !== 'layered') return;

      touchFront = !touchFront;

      viewport.classList.toggle(
        'preview-front',
        touchFront
      );
    }
  );

  preview.addEventListener(
    'focus',
    () => {
      if (mode === 'layered') {
        viewport.classList.add('preview-front');
      }
    }
  );

  preview.addEventListener(
    'blur',
    event => {
      if (
        mode === 'layered' &&
        !preview.contains(event.relatedTarget)
      ) {
        viewport.classList.remove('preview-front');
      }
    }
  );

  load.addEventListener(
    'click',
    event => {
      event.stopPropagation();

      load.disabled = true;
      load.textContent = 'Preview attiva';

      status.textContent =
        'PREVIEW SESSION // ACTIVE';
    }
  );

  setTab('survey');
})();
</script>
</div>
```

---

## Note per Codex

1. Non copiare necessariamente le CSS variables hardcoded se il progetto ha già token equivalenti.
2. Riusa font, spacing, border e palette già presenti nel portfolio.
3. Mantieni però identico il concetto di layering:
   - Survey sopra;
   - Preview sotto e sfalsata;
   - hover Preview => Preview sopra;
   - Survey arretra visivamente.
4. Il cambio di profondità deve sembrare intenzionale, non un semplice cambio di `z-index`.
5. Quando Preview sale:
   - aumenta leggermente la shadow;
   - spostala leggermente verso alto/sinistra;
   - Survey deve spostarsi in basso e leggermente a sinistra;
   - Survey può perdere leggermente saturazione/opacità.
6. Non nascondere completamente il Survey durante l'hover.
7. I tre stati `Layered`, `Scan`, `Focus preview` devono rimanere.
8. Su mobile/touch:
   - tap sulla Preview alterna `preview-front`;
   - non dipendere esclusivamente da `:hover`.
9. Mantieni `prefers-reduced-motion`.
10. La preview vera del progetto può essere iframe, screenshot/live preview, componente React o embed interno, ma deve entrare dentro `.preview-screen`.
11. I dati del Survey devono essere ricavati dai dati progetto già presenti nel repository.
12. Non duplicare dati hardcoded se esiste già un model/config dei progetti.
13. Il componente deve essere riutilizzabile tra tutte le pagine `/projects/:slug`.
14. La variante colore deve restare coerente con lo stile globale del portfolio e non diventare specifica per un singolo progetto.
