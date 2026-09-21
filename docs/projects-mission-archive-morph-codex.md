# Projects — Mission Archive Morph

## Obiettivo

Adattare la pagina `/projects` del portfolio mantenendo lo stile visivo già definito nel progetto.

Comportamento richiesto:

- le project card partono compatte;
- al click, la card selezionata si espande inline;
- la card stessa diventa il dossier del progetto;
- niente accordion MUI standard;
- niente dettaglio separato sotto la lista;
- le altre card restano visibili ma leggermente de-enfatizzate;
- click sulla stessa card o su `Collapse` richiude il dossier;
- click su un'altra card chiude quella precedente e apre la nuova;
- il morph deve essere fluido e mantenere continuità visiva;
- preservare il linguaggio grafico "mission archive / technical dossier" già usato nel portfolio;
- mantenere ivory/off-white, linee tecniche sottili, tipografia editoriale + monospace, rail laterale colorata, orbital signature, telemetry e composizione asimmetrica;
- adattare dati, componenti, routing e design token reali già presenti nel progetto invece di copiare valori hardcoded se esistono equivalenti.

Codex può usare la tecnologia/strategia di animazione già presente nel repository.  
Se Framer Motion è già disponibile, può essere preferibile usare `layout`, `layoutId`, `AnimatePresence` e spring controllate invece dell'implementazione FLIP vanilla della demo.

---

## Demo di riferimento

```html
<div id="portfolio-project-morph" class="w-full min-w-0 py-3">
<style>
#portfolio-project-morph{
  --viz-card:#f3f0e7;
  --viz-panel:#ece8dc;
  --viz-text:#17202a;
  --viz-muted:#56606b;
  --viz-border:rgba(23,32,42,.18);
  --viz-series-2:#347cb2;
  --viz-series-3:#df733d;
  --viz-series-4:#d0ab3d;
  --viz-series-5:#668a69;
  --paper:color-mix(in srgb,var(--viz-card) 94%,#e9dfc6 6%);
  --paper-2:color-mix(in srgb,var(--viz-panel) 96%,#eadfca 4%);
  --ink:var(--viz-text);
  --muted:var(--viz-muted);
  --line:color-mix(in srgb,var(--viz-border) 78%,transparent);
  --line-soft:color-mix(in srgb,var(--viz-border) 44%,transparent);
  color:var(--ink);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
#portfolio-project-morph *{box-sizing:border-box}
#portfolio-project-morph .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}
#portfolio-project-morph .archive-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin:4px 0 18px}
#portfolio-project-morph .archive-kicker{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
#portfolio-project-morph .archive-title{margin:0;font-size:clamp(24px,4vw,40px);line-height:.95;letter-spacing:-.055em;font-weight:540}
#portfolio-project-morph .archive-code{font-size:9px;line-height:1.5;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-align:right}
#portfolio-project-morph .archive-rule{height:1px;background:var(--line);margin-bottom:12px;position:relative}
#portfolio-project-morph .archive-rule:before{content:"";position:absolute;left:0;top:-2px;width:46px;height:5px;border-left:1px solid var(--line);border-right:1px solid var(--line)}
#portfolio-project-morph .project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;align-items:start}
#portfolio-project-morph .project-card{--accent:var(--viz-series-2);position:relative;min-width:0;border:1px solid var(--line);background:var(--paper);overflow:hidden;transition:border-color .35s ease,opacity .35s ease,background-color .35s ease}
#portfolio-project-morph .project-card:nth-child(2){--accent:var(--viz-series-3)}
#portfolio-project-morph .project-card:nth-child(3){--accent:var(--viz-series-4)}
#portfolio-project-morph .project-card:nth-child(4){--accent:var(--viz-series-5)}
#portfolio-project-morph .project-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--accent);transform:scaleY(.32);transform-origin:top;transition:transform .55s cubic-bezier(.16,.84,.2,1),opacity .35s ease;opacity:.75}
#portfolio-project-morph .project-card.is-open{grid-column:1/-1;border-color:color-mix(in srgb,var(--accent) 45%,var(--line));background:var(--paper-2)}
#portfolio-project-morph .project-card.is-open:before{transform:scaleY(1);opacity:1}
#portfolio-project-morph .project-grid.has-open .project-card:not(.is-open){opacity:.58}
#portfolio-project-morph .card-trigger{width:100%;border:0;background:transparent;color:inherit;padding:0;text-align:left;cursor:pointer;display:block}
#portfolio-project-morph .card-trigger:focus-visible,#portfolio-project-morph .dossier-action:focus-visible,#portfolio-project-morph .close-action:focus-visible{outline:2px solid var(--accent);outline-offset:-4px}
#portfolio-project-morph .card-shell{display:grid;grid-template-columns:minmax(0,1fr) 74px;gap:18px;padding:15px 16px 16px 18px;min-height:152px}
#portfolio-project-morph .project-topline{display:flex;align-items:center;gap:9px;font-size:8px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
#portfolio-project-morph .tiny-line{display:inline-block;width:24px;height:1px;background:var(--line)}
#portfolio-project-morph .project-main{align-self:end}
#portfolio-project-morph .project-name{font-size:clamp(21px,3vw,31px);letter-spacing:-.055em;line-height:.95;font-weight:540;margin:0 0 8px;transition:font-size .5s cubic-bezier(.16,.84,.2,1)}
#portfolio-project-morph .is-open .project-name{font-size:clamp(34px,6vw,62px)}
#portfolio-project-morph .project-desc{margin:0;color:var(--muted);font-size:11px;line-height:1.55;max-width:36rem}
#portfolio-project-morph .mission-mark{align-self:center;justify-self:end;width:60px;height:60px;border-radius:50%;border:1px solid var(--line);position:relative;display:grid;place-items:center;transition:width .5s cubic-bezier(.16,.84,.2,1),height .5s cubic-bezier(.16,.84,.2,1),transform .5s cubic-bezier(.16,.84,.2,1)}
#portfolio-project-morph .mission-mark:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 7px color-mix(in srgb,var(--accent) 9%,transparent)}
#portfolio-project-morph .mission-mark:after{content:"";position:absolute;width:78%;height:26%;border:1px solid var(--line);border-radius:50%;transform:rotate(-24deg)}
#portfolio-project-morph .is-open .mission-mark{width:82px;height:82px;transform:rotate(12deg)}
#portfolio-project-morph .details-wrap{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .58s cubic-bezier(.16,.84,.2,1),opacity .25s ease}
#portfolio-project-morph .is-open .details-wrap{grid-template-rows:1fr;opacity:1;transition-delay:0s,.12s}
#portfolio-project-morph .details-clip{overflow:hidden;min-height:0}
#portfolio-project-morph .dossier{margin:0 16px 16px 18px;border-top:1px solid var(--line);padding-top:16px;display:grid;grid-template-columns:minmax(0,1.12fr) minmax(250px,.88fr);gap:34px}
#portfolio-project-morph .section-label{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
#portfolio-project-morph .mission-copy{font-size:13px;line-height:1.68;margin:0;max-width:46rem}
#portfolio-project-morph .tech-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}
#portfolio-project-morph .tech-cell{padding-top:9px;border-top:1px solid var(--line-soft)}
#portfolio-project-morph .tech-key{font-size:7px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);margin-bottom:5px}
#portfolio-project-morph .tech-value{font-size:10px;line-height:1.4}
#portfolio-project-morph .visual-panel{position:relative;min-height:185px;border-left:1px solid var(--line);padding-left:18px;display:flex;flex-direction:column;justify-content:space-between}
#portfolio-project-morph .orbit-stage{position:relative;min-height:128px;overflow:hidden}
#portfolio-project-morph .orbit-stage .axis-h,#portfolio-project-morph .orbit-stage .axis-v{position:absolute;background:var(--line-soft)}
#portfolio-project-morph .orbit-stage .axis-h{left:0;right:0;top:50%;height:1px}
#portfolio-project-morph .orbit-stage .axis-v{top:0;bottom:0;left:50%;width:1px}
#portfolio-project-morph .orbit{position:absolute;left:50%;top:50%;border:1px solid var(--line);border-radius:50%;transform:translate(-50%,-50%) rotate(-16deg)}
#portfolio-project-morph .orbit.o1{width:142px;height:52px}
#portfolio-project-morph .orbit.o2{width:98px;height:98px;transform:translate(-50%,-50%) rotate(32deg)}
#portfolio-project-morph .orbit-core{position:absolute;left:50%;top:50%;width:16px;height:16px;transform:translate(-50%,-50%);border-radius:50%;background:color-mix(in srgb,var(--accent) 15%,var(--paper));border:1px solid var(--accent)}
#portfolio-project-morph .orbit-node{position:absolute;left:calc(50% + 58px);top:calc(50% - 14px);width:7px;height:7px;border-radius:50%;background:var(--accent)}
#portfolio-project-morph .telemetry{border-top:1px solid var(--line-soft);padding-top:9px;display:grid;grid-template-columns:1fr auto;gap:12px;font-size:7px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}
#portfolio-project-morph .actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
#portfolio-project-morph .dossier-action,#portfolio-project-morph .close-action{min-height:40px;padding:0 13px;border-radius:0;font-size:8px;letter-spacing:.13em;text-transform:uppercase;cursor:pointer}
#portfolio-project-morph .dossier-action{border:1px solid color-mix(in srgb,var(--accent) 65%,var(--line));background:color-mix(in srgb,var(--accent) 8%,transparent);color:var(--ink)}
#portfolio-project-morph .close-action{border:1px solid var(--line);background:transparent;color:var(--muted)}
#portfolio-project-morph .status-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--accent);margin-right:5px;vertical-align:1px}
#portfolio-project-morph .live-feedback{min-height:16px;margin-top:9px;font-size:9px;letter-spacing:.04em;color:var(--muted)}

@media(hover:hover) and (pointer:fine){
  #portfolio-project-morph .project-card:not(.is-open):hover{border-color:color-mix(in srgb,var(--accent) 50%,var(--line))}
  #portfolio-project-morph .project-card:not(.is-open):hover .mission-mark{transform:rotate(10deg)}
  #portfolio-project-morph .project-card:not(.is-open):hover:before{transform:scaleY(.58)}
}

@media(max-width:640px){
  #portfolio-project-morph .archive-head{align-items:flex-start;flex-direction:column;gap:10px}
  #portfolio-project-morph .archive-code{text-align:left}
  #portfolio-project-morph .project-grid{grid-template-columns:1fr}
  #portfolio-project-morph .project-card.is-open{grid-column:auto}
  #portfolio-project-morph .card-shell{grid-template-columns:minmax(0,1fr) 58px}
  #portfolio-project-morph .dossier{grid-template-columns:1fr;gap:20px}
  #portfolio-project-morph .visual-panel{border-left:0;border-top:1px solid var(--line);padding:16px 0 0}
  #portfolio-project-morph .tech-grid{grid-template-columns:1fr}
}

@media(prefers-reduced-motion:reduce){
  #portfolio-project-morph *,
  #portfolio-project-morph *:before,
  #portfolio-project-morph *:after{
    transition-duration:.001ms!important;
    animation-duration:.001ms!important;
  }
}
</style>

<div class="archive-head">
  <div>
    <div class="archive-kicker mono">Portfolio archive / selected missions</div>
    <h2 class="archive-title">Projects</h2>
  </div>
  <div class="archive-code mono">
    ARCHIVE // 04 ENTRIES<br>
    LOCAL SECTOR 01 — 2026
  </div>
</div>

<div class="archive-rule"></div>

<div class="project-grid" aria-label="Portfolio projects">

  <article class="project-card" data-slug="logra">
    <button type="button" class="card-trigger" aria-expanded="false">
      <div class="card-shell">
        <div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0">
          <div class="project-topline mono">
            <span>PRJ–01</span>
            <span class="tiny-line"></span>
            <span>Productivity system</span>
          </div>

          <div class="project-main">
            <h3 class="project-name">Logra</h3>
            <p class="project-desc">
              A focused workspace for planning, progress and personal productivity.
            </p>
          </div>
        </div>

        <div class="mission-mark" aria-hidden="true"></div>
      </div>
    </button>

    <div class="details-wrap">
      <div class="details-clip">
        <div class="dossier">

          <div>
            <div class="section-label mono">01 / Mission brief</div>

            <p class="mission-copy">
              Logra brings projects, tasks, planning and insights into a single
              operational space. The interface is intentionally restrained:
              less dashboard, more instrument — context stays visible without
              becoming noise.
            </p>

            <div class="tech-grid">
              <div class="tech-cell">
                <div class="tech-key mono">Role</div>
                <div class="tech-value">Design + Development</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">System</div>
                <div class="tech-value">React · TypeScript · MUI</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">State</div>
                <div class="tech-value">
                  <span class="status-dot"></span>Active mission
                </div>
              </div>
            </div>

            <div class="actions">
              <button type="button" class="dossier-action">
                Open mission dossier →
              </button>
              <button type="button" class="close-action">
                Collapse
              </button>
            </div>
          </div>

          <div class="visual-panel">
            <div>
              <div class="section-label mono">Orbital signature</div>

              <div class="orbit-stage">
                <div class="axis-h"></div>
                <div class="axis-v"></div>
                <div class="orbit o1"></div>
                <div class="orbit o2"></div>
                <div class="orbit-core"></div>
                <div class="orbit-node"></div>
              </div>
            </div>

            <div class="telemetry mono">
              <span>NODE 01 / LOGRA</span>
              <span>SYS.OK</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </article>


  <article class="project-card" data-slug="loci">
    <button type="button" class="card-trigger" aria-expanded="false">
      <div class="card-shell">
        <div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0">
          <div class="project-topline mono">
            <span>PRJ–02</span>
            <span class="tiny-line"></span>
            <span>Tool ecosystem</span>
          </div>

          <div class="project-main">
            <h3 class="project-name">Loci</h3>
            <p class="project-desc">
              A modular home for compact utilities and larger connected tools.
            </p>
          </div>
        </div>

        <div class="mission-mark" aria-hidden="true"></div>
      </div>
    </button>

    <div class="details-wrap">
      <div class="details-clip">
        <div class="dossier">

          <div>
            <div class="section-label mono">02 / Mission brief</div>

            <p class="mission-copy">
              Loci is a personal multi-tool environment where small utilities
              and larger API-powered modules share the same system. Each tool
              remains independent while the surrounding product language stays
              coherent.
            </p>

            <div class="tech-grid">
              <div class="tech-cell">
                <div class="tech-key mono">Role</div>
                <div class="tech-value">Product + Engineering</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">System</div>
                <div class="tech-value">React · Node · TypeScript</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">State</div>
                <div class="tech-value">
                  <span class="status-dot"></span>Development
                </div>
              </div>
            </div>

            <div class="actions">
              <button type="button" class="dossier-action">
                Open mission dossier →
              </button>
              <button type="button" class="close-action">
                Collapse
              </button>
            </div>
          </div>

          <div class="visual-panel">
            <div>
              <div class="section-label mono">Orbital signature</div>

              <div class="orbit-stage">
                <div class="axis-h"></div>
                <div class="axis-v"></div>
                <div class="orbit o1"></div>
                <div class="orbit o2"></div>
                <div class="orbit-core"></div>
                <div class="orbit-node"></div>
              </div>
            </div>

            <div class="telemetry mono">
              <span>NODE 02 / LOCI</span>
              <span>BUILD.ACTIVE</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </article>


  <article class="project-card" data-slug="wattdacar">
    <button type="button" class="card-trigger" aria-expanded="false">
      <div class="card-shell">
        <div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0">
          <div class="project-topline mono">
            <span>PRJ–03</span>
            <span class="tiny-line"></span>
            <span>EV telemetry</span>
          </div>

          <div class="project-main">
            <h3 class="project-name">WattDaCar</h3>
            <p class="project-desc">
              Vehicle data translated into a quiet, useful ownership interface.
            </p>
          </div>
        </div>

        <div class="mission-mark" aria-hidden="true"></div>
      </div>
    </button>

    <div class="details-wrap">
      <div class="details-clip">
        <div class="dossier">

          <div>
            <div class="section-label mono">03 / Mission brief</div>

            <p class="mission-copy">
              WattDaCar turns battery, charging, efficiency and trip telemetry
              into an interface built for actual ownership decisions rather
              than raw data inspection.
            </p>

            <div class="tech-grid">
              <div class="tech-cell">
                <div class="tech-key mono">Role</div>
                <div class="tech-value">Full-stack</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">Focus</div>
                <div class="tech-value">Telemetry · UX · Data</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">State</div>
                <div class="tech-value">
                  <span class="status-dot"></span>Active mission
                </div>
              </div>
            </div>

            <div class="actions">
              <button type="button" class="dossier-action">
                Open mission dossier →
              </button>
              <button type="button" class="close-action">
                Collapse
              </button>
            </div>
          </div>

          <div class="visual-panel">
            <div>
              <div class="section-label mono">Orbital signature</div>

              <div class="orbit-stage">
                <div class="axis-h"></div>
                <div class="axis-v"></div>
                <div class="orbit o1"></div>
                <div class="orbit o2"></div>
                <div class="orbit-core"></div>
                <div class="orbit-node"></div>
              </div>
            </div>

            <div class="telemetry mono">
              <span>NODE 03 / WDC</span>
              <span>LINK.STABLE</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </article>


  <article class="project-card" data-slug="vps-radar">
    <button type="button" class="card-trigger" aria-expanded="false">
      <div class="card-shell">
        <div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0">
          <div class="project-topline mono">
            <span>PRJ–04</span>
            <span class="tiny-line"></span>
            <span>Infrastructure</span>
          </div>

          <div class="project-main">
            <h3 class="project-name">VPS Radar</h3>
            <p class="project-desc">
              A read-only view over services, resources, projects and infrastructure risk.
            </p>
          </div>
        </div>

        <div class="mission-mark" aria-hidden="true"></div>
      </div>
    </button>

    <div class="details-wrap">
      <div class="details-clip">
        <div class="dossier">

          <div>
            <div class="section-label mono">04 / Mission brief</div>

            <p class="mission-copy">
              VPS Radar presents infrastructure as a navigable technical snapshot.
              It deliberately avoids operational controls: the system observes
              projects, resources, ports, services and risks without mutating the server.
            </p>

            <div class="tech-grid">
              <div class="tech-cell">
                <div class="tech-key mono">Role</div>
                <div class="tech-value">Architecture + UI</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">System</div>
                <div class="tech-value">React · Express · TS</div>
              </div>

              <div class="tech-cell">
                <div class="tech-key mono">Mode</div>
                <div class="tech-value">
                  <span class="status-dot"></span>Read only
                </div>
              </div>
            </div>

            <div class="actions">
              <button type="button" class="dossier-action">
                Open mission dossier →
              </button>
              <button type="button" class="close-action">
                Collapse
              </button>
            </div>
          </div>

          <div class="visual-panel">
            <div>
              <div class="section-label mono">Orbital signature</div>

              <div class="orbit-stage">
                <div class="axis-h"></div>
                <div class="axis-v"></div>
                <div class="orbit o1"></div>
                <div class="orbit o2"></div>
                <div class="orbit-core"></div>
                <div class="orbit-node"></div>
              </div>
            </div>

            <div class="telemetry mono">
              <span>NODE 04 / VPS</span>
              <span>READ.ONLY</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </article>

</div>

<div class="live-feedback mono" aria-live="polite"></div>

<script>
(() => {
  const root = document.getElementById('portfolio-project-morph');

  if (!root || root.dataset.ready === '1') return;

  root.dataset.ready = '1';

  const grid = root.querySelector('.project-grid');
  const cards = [...root.querySelectorAll('.project-card')];
  const feedback = root.querySelector('.live-feedback');

  const reduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const snap = () =>
    new Map(cards.map(card => [card, card.getBoundingClientRect()]));

  function flip(first) {
    if (reduced) return;

    cards.forEach(card => {
      const a = first.get(card);
      const b = card.getBoundingClientRect();

      if (!a || !b.width || !b.height) return;

      const dx = a.left - b.left;
      const dy = a.top - b.top;
      const sx = a.width / b.width;
      const sy = a.height / b.height;

      card.animate(
        [
          {
            transformOrigin: 'top left',
            transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})`
          },
          {
            transformOrigin: 'top left',
            transform: 'translate(0,0) scale(1,1)'
          }
        ],
        {
          duration: 560,
          easing: 'cubic-bezier(.16,.84,.2,1)'
        }
      );
    });
  }

  function openCard(target) {
    const first = snap();

    cards.forEach(card => {
      const active = card === target;

      card.classList.toggle('is-open', active);

      card
        .querySelector('.card-trigger')
        .setAttribute('aria-expanded', String(active));
    });

    grid.classList.toggle('has-open', !!target);

    requestAnimationFrame(() => flip(first));
  }

  cards.forEach(card => {
    const trigger = card.querySelector('.card-trigger');
    const close = card.querySelector('.close-action');
    const action = card.querySelector('.dossier-action');

    trigger.addEventListener('click', () => {
      const wasOpen = card.classList.contains('is-open');

      openCard(wasOpen ? null : card);

      feedback.textContent = wasOpen
        ? 'MISSION COLLAPSED'
        : `${card.dataset.slug.toUpperCase()} // DOSSIER EXPANDED`;
    });

    close.addEventListener('click', () => {
      openCard(null);
      feedback.textContent = 'MISSION COLLAPSED';
      trigger.focus();
    });

    action.addEventListener('click', () => {
      feedback.textContent =
        `ROUTE PREVIEW // /projects/${card.dataset.slug}`;
    });
  });
})();
</script>

</div>
```

---

## Indicazioni per l'adattamento al progetto reale

1. **Non creare una nuova pagina o un nuovo design system.** Integrare questo comportamento nella pagina `/projects` esistente.

2. **Riutilizzare i dati reali dei progetti.** Le quattro card della demo sono soltanto esempi.

3. Il contenuto che attualmente viene mostrato sotto l'elenco deve essere spostato dentro la card espansa corrispondente.

4. La card compatta e la card espansa devono essere lo stesso componente/logical element, non due viste scollegate.

5. La transizione deve percepirsi come un vero **layout morph**:
   - posizione;
   - dimensione;
   - titolo;
   - mission mark;
   - contenuti interni;
   - card circostanti.

6. Se nel progetto è già presente **Framer Motion**, preferire una struttura simile a:
   - `motion.article layout`
   - `layoutId` dove utile;
   - `AnimatePresence`;
   - spring morbida e controllata;
   - nessuna animazione eccessivamente elastica.

7. Non introdurre una dipendenza nuova se il comportamento può essere ottenuto bene con lo stack già installato.

8. Il click su `Open mission dossier` deve continuare a portare alla route reale del progetto, ad esempio `/projects/logra`.

9. Mantenere piena accessibilità:
   - `button` reale per l'apertura;
   - `aria-expanded`;
   - focus visibile;
   - `prefers-reduced-motion`;
   - funzionamento touch senza dipendere dall'hover.

10. Desktop:
    - griglia a due colonne;
    - card selezionata `grid-column: 1 / -1`.

11. Mobile:
    - una colonna;
    - espansione verticale;
    - contenuto dossier impilato;
    - nessun overflow orizzontale.

12. Preservare il carattere grafico già usato nel portfolio:
    - mission archive;
    - technical dossier;
    - ivory/off-white;
    - navy/charcoal;
    - typography editoriale;
    - micro-label monospace;
    - linee sottili;
    - dettagli orbitali/telemetry;
    - niente stile dashboard SaaS generico;
    - niente card Material standard;
    - niente accordion standard.
