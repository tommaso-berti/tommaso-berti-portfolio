# Studi ed Esperienze — Interactive Demo

Questo file contiene il codice esatto della demo interattiva approvata per la sezione **“Studi ed Esperienze”** del portfolio.

## Obiettivo per Codex

Integrare **solo questa sezione** nel progetto esistente, mantenendo:

- stile NASA / Starfield light già usato nel portfolio;
- palette avorio / navy / grigi tecnici;
- micro-accenti arancio, blu e verde;
- timeline verticale;
- filtri `Tutto / Esperienze / Formazione`;
- card espandibili/collassabili;
- micro-tipografia tecnica/monospace;
- comportamento responsive;
- animazioni leggere e non invasive;
- nessuna modifica alle altre sezioni della pagina.

Codex può adattare il markup a React + MUI + TypeScript mantenendo **lo stesso risultato visivo e interattivo**.

## Demo HTML/CSS/JS

```html
<div id="tb-exp-demo" class="w-full min-w-0">
  <style>
    #tb-exp-demo{
      --ink:#17232d;
      --muted:#687078;
      --paper:#f6f2e9;
      --card:#fbf8f1;
      --line:#cfc8bb;
      --line-strong:#aeb5ba;
      --blue:#356c92;
      --orange:#d97738;
      --green:#66856d;
      --red:#aa675f;
      font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      color:var(--ink)
    }

    #tb-exp-demo *{
      box-sizing:border-box
    }

    #tb-exp-demo .mono{
      font-family:"SFMono-Regular",Consolas,"Liberation Mono",monospace;
      letter-spacing:.08em;
      text-transform:uppercase
    }

    #tb-exp-demo .section{
      border-top:1px solid var(--line);
      border-bottom:1px solid var(--line);
      padding:28px 0 10px
    }

    #tb-exp-demo .head{
      display:flex;
      align-items:flex-end;
      justify-content:space-between;
      gap:20px;
      margin-bottom:28px
    }

    #tb-exp-demo .eyebrow{
      font-size:11px;
      font-weight:700;
      color:#62696f;
      display:flex;
      align-items:center;
      gap:9px;
      margin-bottom:8px
    }

    #tb-exp-demo .eyebrow::before{
      content:"";
      width:26px;
      height:1px;
      background:var(--orange)
    }

    #tb-exp-demo h2{
      font-size:clamp(32px,5vw,48px);
      line-height:1.02;
      letter-spacing:-.045em;
      margin:0;
      font-weight:760
    }

    #tb-exp-demo .controls{
      display:flex;
      gap:4px;
      padding:4px;
      border:1px solid var(--line);
      background:rgba(246,242,233,.6);
      border-radius:4px;
      flex-wrap:wrap
    }

    #tb-exp-demo .filter{
      appearance:none;
      border:0;
      background:transparent;
      color:#6b7074;
      padding:8px 11px;
      font-size:10px;
      font-weight:700;
      cursor:pointer;
      border-radius:2px;
      min-height:34px;
      transition:background .18s ease,color .18s ease,transform .18s ease
    }

    #tb-exp-demo .filter:hover{
      color:var(--ink)
    }

    #tb-exp-demo .filter:active{
      transform:translateY(1px)
    }

    #tb-exp-demo .filter.active{
      background:var(--ink);
      color:#f8f5ed
    }

    #tb-exp-demo .filter:focus-visible,
    #tb-exp-demo .entry-toggle:focus-visible{
      outline:2px solid var(--blue);
      outline-offset:2px
    }

    #tb-exp-demo .timeline{
      position:relative
    }

    #tb-exp-demo .entry{
      display:grid;
      grid-template-columns:118px 30px minmax(0,1fr);
      position:relative;
      transition:opacity .2s ease,transform .2s ease;
      margin-bottom:12px
    }

    #tb-exp-demo .entry.hidden{
      display:none
    }

    #tb-exp-demo .year{
      font-size:11px;
      font-weight:700;
      color:#656b70;
      text-align:right;
      padding:20px 14px 0 0;
      white-space:nowrap
    }

    #tb-exp-demo .rail{
      position:relative;
      display:flex;
      justify-content:center
    }

    #tb-exp-demo .rail::before{
      content:"";
      position:absolute;
      top:28px;
      bottom:-20px;
      width:1px;
      background:linear-gradient(to bottom,var(--line-strong),var(--line))
    }

    #tb-exp-demo .entry:last-child .rail::before{
      bottom:50%
    }

    #tb-exp-demo .node{
      position:relative;
      z-index:2;
      width:9px;
      height:9px;
      border-radius:50%;
      margin-top:23px;
      background:#9a9fa3;
      border:1px solid #7d8388;
      box-shadow:0 0 0 5px var(--paper)
    }

    #tb-exp-demo .entry[data-current="true"] .node{
      background:var(--green);
      border-color:#4e6e57
    }

    #tb-exp-demo .entry[data-type="study"] .node{
      background:#7c8d99;
      border-color:#657782
    }

    #tb-exp-demo .card{
      position:relative;
      background:rgba(251,248,241,.72);
      border:1px solid var(--line);
      border-radius:4px;
      overflow:hidden;
      transition:border-color .2s ease,background .2s ease,transform .2s ease
    }

    #tb-exp-demo .card::before{
      content:"";
      position:absolute;
      left:0;
      top:0;
      bottom:0;
      width:2px;
      background:transparent;
      transition:background .2s ease
    }

    #tb-exp-demo .entry[data-type="work"] .card:hover::before,
    #tb-exp-demo .entry.open[data-type="work"] .card::before{
      background:var(--orange)
    }

    #tb-exp-demo .entry[data-type="study"] .card:hover::before,
    #tb-exp-demo .entry.open[data-type="study"] .card::before{
      background:var(--blue)
    }

    #tb-exp-demo .card:hover{
      background:var(--card);
      border-color:#b7b0a5
    }

    #tb-exp-demo .entry.open .card{
      background:var(--card);
      border-color:#aeb4b7
    }

    #tb-exp-demo .entry-toggle{
      width:100%;
      appearance:none;
      border:0;
      background:transparent;
      text-align:left;
      color:inherit;
      padding:16px 16px 14px;
      cursor:pointer;
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      gap:16px;
      align-items:start
    }

    #tb-exp-demo .meta{
      display:flex;
      align-items:center;
      gap:9px;
      flex-wrap:wrap;
      margin-bottom:6px;
      font-size:9px;
      font-weight:700;
      color:#7a7f83
    }

    #tb-exp-demo .kind{
      display:inline-flex;
      align-items:center;
      gap:5px
    }

    #tb-exp-demo .kind::before{
      content:"";
      width:4px;
      height:4px;
      border-radius:50%;
      background:var(--orange)
    }

    #tb-exp-demo .entry[data-type="study"] .kind::before{
      background:var(--blue)
    }

    #tb-exp-demo .current{
      padding:3px 6px;
      background:#6c886e;
      color:white;
      border-radius:2px;
      letter-spacing:.07em
    }

    #tb-exp-demo .title{
      font-size:15px;
      font-weight:730;
      line-height:1.3;
      letter-spacing:-.01em;
      margin:0
    }

    #tb-exp-demo .plus{
      width:28px;
      height:28px;
      border:1px solid var(--line);
      display:grid;
      place-items:center;
      border-radius:2px;
      font-family:monospace;
      font-size:17px;
      color:#697078;
      transition:transform .25s ease,border-color .2s ease,color .2s ease;
      background:rgba(255,255,255,.25)
    }

    #tb-exp-demo .entry.open .plus{
      transform:rotate(45deg);
      color:var(--ink);
      border-color:#9da4a8
    }

    #tb-exp-demo .details{
      display:grid;
      grid-template-rows:0fr;
      transition:grid-template-rows .28s cubic-bezier(.2,.8,.2,1)
    }

    #tb-exp-demo .entry.open .details{
      grid-template-rows:1fr
    }

    #tb-exp-demo .details-inner{
      overflow:hidden
    }

    #tb-exp-demo .details-content{
      padding:0 16px 17px 16px;
      margin-left:0;
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      gap:20px;
      border-top:1px solid transparent;
      opacity:0;
      transform:translateY(-5px);
      transition:opacity .2s ease,transform .28s ease,border-color .2s ease
    }

    #tb-exp-demo .entry.open .details-content{
      opacity:1;
      transform:none;
      border-top-color:#ddd7cc;
      padding-top:13px
    }

    #tb-exp-demo .desc{
      margin:0;
      color:#646c72;
      font-size:13px;
      line-height:1.65;
      max-width:66ch
    }

    #tb-exp-demo .coords{
      align-self:end;
      display:flex;
      flex-direction:column;
      gap:4px;
      text-align:right;
      color:#8a8e91;
      font-size:8px;
      white-space:nowrap
    }

    #tb-exp-demo .footer-line{
      display:flex;
      align-items:center;
      gap:12px;
      margin:22px 0 8px;
      color:#8a8e92;
      font-size:8px
    }

    #tb-exp-demo .footer-line::before,
    #tb-exp-demo .footer-line::after{
      content:"";
      height:1px;
      background:var(--line);
      flex:1
    }

    @media(max-width:650px){
      #tb-exp-demo .head{
        align-items:flex-start;
        flex-direction:column;
        margin-bottom:22px
      }

      #tb-exp-demo .controls{
        width:100%
      }

      #tb-exp-demo .filter{
        flex:1
      }

      #tb-exp-demo .entry{
        grid-template-columns:20px minmax(0,1fr);
        gap:7px;
        margin-bottom:14px
      }

      #tb-exp-demo .year{
        grid-column:2;
        text-align:left;
        padding:0 0 6px 0;
        font-size:10px
      }

      #tb-exp-demo .rail{
        grid-column:1;
        grid-row:1 / span 2
      }

      #tb-exp-demo .node{
        margin-top:26px
      }

      #tb-exp-demo .rail::before{
        top:31px;
        bottom:-28px
      }

      #tb-exp-demo .card{
        grid-column:2
      }

      #tb-exp-demo .details-content{
        grid-template-columns:1fr
      }

      #tb-exp-demo .coords{
        text-align:left;
        flex-direction:row;
        gap:12px
      }
    }

    @media(prefers-reduced-motion:reduce){
      #tb-exp-demo *{
        transition:none!important
      }
    }
  </style>

  <section class="section" aria-labelledby="exp-title">
    <div class="head">
      <div>
        <div class="eyebrow mono">Development log / Career archive</div>
        <h2 id="exp-title">Studi ed Esperienze</h2>
      </div>

      <div class="controls" role="group" aria-label="Filtra esperienze">
        <button class="filter mono active" type="button" data-filter="all">Tutto</button>
        <button class="filter mono" type="button" data-filter="work">Esperienze</button>
        <button class="filter mono" type="button" data-filter="study">Formazione</button>
      </div>
    </div>

    <div class="timeline">
      <article class="entry open" data-type="work" data-current="true">
        <div class="year mono">2021—present</div>

        <div class="rail">
          <span class="node"></span>
        </div>

        <div class="card">
          <button class="entry-toggle" type="button" aria-expanded="true">
            <div>
              <div class="meta mono">
                <span>EXP-01</span>
                <span class="kind">Employment</span>
                <span class="current">Attuale</span>
              </div>

              <h3 class="title">
                Kubix Link (A Lectra Company) — Dipendente full-time
              </h3>
            </div>

            <span class="plus" aria-hidden="true">+</span>
          </button>

          <div class="details">
            <div class="details-inner">
              <div class="details-content">
                <p class="desc">
                  Contribuisco a soluzioni digitali PLM/PIM per il settore moda.
                  Il mio ruolo coinvolge collaborazione trasversale tra team e
                  processi dati in cloud.
                </p>

                <div class="coords mono">
                  <span>MODE / FULL-TIME</span>
                  <span>STATUS / ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="entry" data-type="work">
        <div class="year mono">2019—2020</div>

        <div class="rail">
          <span class="node"></span>
        </div>

        <div class="card">
          <button class="entry-toggle" type="button" aria-expanded="false">
            <div>
              <div class="meta mono">
                <span>EXP-02</span>
                <span class="kind">Collaboration</span>
              </div>

              <h3 class="title">
                DeFra Web — Collaboratore
              </h3>
            </div>

            <span class="plus" aria-hidden="true">+</span>
          </button>

          <div class="details">
            <div class="details-inner">
              <div class="details-content">
                <p class="desc">
                  Ho gestito contenuti web utilizzando piattaforme CMS e mi sono
                  occupato di backup periodici, aggiornamenti di cataloghi,
                  migrazioni, incontri con i clienti e documentazione.
                </p>

                <div class="coords mono">
                  <span>MODE / COLLAB</span>
                  <span>AREA / WEB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="entry" data-type="work">
        <div class="year mono">2018—present</div>

        <div class="rail">
          <span class="node"></span>
        </div>

        <div class="card">
          <button class="entry-toggle" type="button" aria-expanded="false">
            <div>
              <div class="meta mono">
                <span>EXP-03</span>
                <span class="kind">Association</span>
              </div>

              <h3 class="title">Art.Ap</h3>
            </div>

            <span class="plus" aria-hidden="true">+</span>
          </button>

          <div class="details">
            <div class="details-inner">
              <div class="details-content">
                <p class="desc">
                  Ho lavorato come guida durante due mostre temporanee e mi sono
                  occupato della gestione del sito ufficiale dell’associazione,
                  assistenza ai visitatori e aggiornamento dei contenuti.
                </p>

                <div class="coords mono">
                  <span>AREA / WEB + EVENTS</span>
                  <span>STATUS / ONGOING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="entry" data-type="study">
        <div class="year mono">2018—2020</div>

        <div class="rail">
          <span class="node"></span>
        </div>

        <div class="card">
          <button class="entry-toggle" type="button" aria-expanded="false">
            <div>
              <div class="meta mono">
                <span>EDU-01</span>
                <span class="kind">University</span>
              </div>

              <h3 class="title">
                Informatica — Università di Venezia (Veneto, Italia)
              </h3>
            </div>

            <span class="plus" aria-hidden="true">+</span>
          </button>

          <div class="details">
            <div class="details-inner">
              <div class="details-content">
                <p class="desc">
                  Proseguendo gli studi a Venezia mi sono concentrato su
                  architetture di sistemi, database e sviluppo web, partecipando
                  a progetti accademici e attività pratiche.
                </p>

                <div class="coords mono">
                  <span>TRACK / COMPUTER SCIENCE</span>
                  <span>LOC / VENEZIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="entry" data-type="study">
        <div class="year mono">2016—2018</div>

        <div class="rail">
          <span class="node"></span>
        </div>

        <div class="card">
          <button class="entry-toggle" type="button" aria-expanded="false">
            <div>
              <div class="meta mono">
                <span>EDU-02</span>
                <span class="kind">University</span>
              </div>

              <h3 class="title">
                Ingegneria Informatica — Università di Padova (Veneto, Italia)
              </h3>
            </div>

            <span class="plus" aria-hidden="true">+</span>
          </button>

          <div class="details">
            <div class="details-inner">
              <div class="details-content">
                <p class="desc">
                  Durante i primi due anni universitari a Padova ho studiato le
                  basi dell’ingegneria informatica e della progettazione di
                  algoritmi, lavorando in laboratorio su esercitazioni pratiche
                  e progetti.
                </p>

                <div class="coords mono">
                  <span>TRACK / ENGINEERING</span>
                  <span>LOC / PADOVA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="entry" data-type="study">
        <div class="year mono">2016</div>

        <div class="rail">
          <span class="node"></span>
        </div>

        <div class="card">
          <button class="entry-toggle" type="button" aria-expanded="false">
            <div>
              <div class="meta mono">
                <span>EDU-03</span>
                <span class="kind">Diploma</span>
              </div>

              <h3 class="title">
                Diploma di Liceo Scientifico
              </h3>
            </div>

            <span class="plus" aria-hidden="true">+</span>
          </button>

          <div class="details">
            <div class="details-inner">
              <div class="details-content">
                <p class="desc">
                  Ho completato il Liceo Scientifico, acquisendo solide basi in
                  matematica, fisica e informatica e sviluppando un approccio
                  analitico alla risoluzione dei problemi.
                </p>

                <div class="coords mono">
                  <span>LEVEL / DIPLOMA</span>
                  <span>YEAR / 2016</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div class="footer-line mono" aria-hidden="true">
      <span>Archive // 06 records</span>
    </div>
  </section>

  <script>
    (() => {
      const root = document.getElementById('tb-exp-demo');

      if (!root || root.dataset.ready === '1') {
        return;
      }

      root.dataset.ready = '1';

      const filters = [...root.querySelectorAll('.filter')];
      const entries = [...root.querySelectorAll('.entry')];

      filters.forEach((btn) => {
        btn.addEventListener('click', () => {
          filters.forEach((b) => {
            b.classList.toggle('active', b === btn);
          });

          const filter = btn.dataset.filter;

          entries.forEach((entry) => {
            entry.classList.toggle(
              'hidden',
              filter !== 'all' && entry.dataset.type !== filter
            );
          });
        });
      });

      root.querySelectorAll('.entry-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
          const entry = btn.closest('.entry');
          const open = !entry.classList.contains('open');

          entry.classList.toggle('open', open);
          btn.setAttribute('aria-expanded', String(open));
        });
      });
    })();
  </script>
</div>
```

## Nota di integrazione

Nel progetto reale:

- riutilizzare i token/theme già presenti invece di duplicare colori se esistono;
- trasformare ogni entry in dati/config se la timeline è già data-driven;
- mantenere accessibilità con `aria-expanded`;
- mantenere `prefers-reduced-motion`;
- non aggiungere nuove sezioni o contenuti attorno a questa timeline;
- preservare l’aspetto compatto della demo;
- non trasformare il componente in una timeline generica MUI: deve mantenere il carattere tecnico/NASA della preview.
