import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import GlitchTitle from '../ui/GlitchTitle.jsx'
import Grid from '../ui/Grid.jsx'
import NavLink from '../ui/NavLink.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Tag from '../ui/Tag.jsx'
import TerminalCard from '../ui/TerminalCard.jsx'


import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_CHARSET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+-_?';

function TextShuffle({
                         text,
                         duration = 2000,          // più lento
                         trigger = 'mount',        // 'mount' | 'hover' | 'visible'
                         charset = DEFAULT_CHARSET,
                         className = '',
                     }) {
    const ref = useRef(null);
    const [widths, setWidths] = useState([]); // larghezze px per ogni char finale
    const [state, setState] = useState('idle'); // 'idle' | 'scrambling' | 'done'
    const [out, setOut] = useState(() => text.split(''));
    const [vars, setVars] = useState(() =>
        Array.from({ length: text.length }, () => ({}))
    );
    const planRef = useRef(null);
    const rafRef = useRef(0);

    // Misura per-char PRIMA del paint per evitare flash/fisarmonica
    useLayoutEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        const cs = getComputedStyle(el);

        const meas = document.createElement('span');
        meas.style.position = 'absolute';
        meas.style.left = '-9999px';
        meas.style.top = '-9999px';
        meas.style.whiteSpace = 'pre';
        meas.style.fontFamily = cs.fontFamily;
        meas.style.fontWeight = cs.fontWeight;
        meas.style.fontSize = cs.fontSize;
        meas.style.letterSpacing = cs.letterSpacing;
        meas.style.textTransform = cs.textTransform;
        document.body.appendChild(meas);

        const arr = text.split('').map((ch) => {
            meas.textContent = ch === ' ' ? '\u00A0' : ch;
            const w = Math.ceil(meas.getBoundingClientRect().width);
            return Math.max(w, 1);
        });

        document.body.removeChild(meas);
        setWidths(arr);
    }, [text]);

    const start = useMemo(() => {
        function run() {
            if (!ref.current) return;
            if (widths.length !== text.length) return; // aspetta misura

            cancelAnimationFrame(rafRef.current);
            const target = text.split('');
            const n = target.length;
            const now = performance.now();
            const T = Math.max(500, duration);

            // finestra per-char (più lunga/morbida)
            const plan = Array.from({ length: n }, () => {
                const s = Math.random() * 0.30;          // inizio
                const w = 0.55 + Math.random() * 0.35;   // durata scramble
                const e = Math.min(0.99, s + w);
                return { s, e };
            });
            planRef.current = { start: now, T, plan, target };

            setState('scrambling');
            setOut(Array(n).fill(''));
            setVars(Array.from({ length: n }, () => ({})));

            const tick = () => {
                const p = planRef.current; if (!p) return;
                const t = (performance.now() - p.start) / p.T; // 0..1
                let done = true;
                const nextOut = new Array(n);
                const nextVars = new Array(n);

                for (let i = 0; i < n; i++) {
                    const { s, e } = p.plan[i];
                    const final = p.target[i];
                    const wpx = widths[i] ? widths[i] + 'px' : undefined;

                    if (t <= s) {
                        nextOut[i] = '';
                        nextVars[i] = { '--w': wpx, '--op': 0, '--tx': '0px', '--ty': '8px', '--rot': '8deg' };
                        done = false; continue;
                    }
                    if (t >= e) {
                        nextOut[i] = final === ' ' ? '\u00A0' : final;
                        nextVars[i] = { '--w': wpx, '--op': 1, '--tx': '0px', '--ty': '0px', '--rot': '0deg' };
                        continue;
                    }

                    // fase scramble
                    done = false;
                    const prog = (t - s) / (e - s); // 0..1
                    const c = charset[(Math.random() * charset.length) | 0] || '';
                    nextOut[i] = final === ' ' ? '\u00A0' : c;

                    const jitter = 10 * (1 - prog);
                    const dx = (Math.random() - 0.5) * 2 * jitter;
                    const dy = (Math.random() - 0.5) * 2 * jitter;
                    const rot = (Math.random() - 0.5) * 12 * (1 - prog);

                    nextVars[i] = {
                        '--w': wpx,
                        '--op': 0.85,
                        '--tx': `${dx.toFixed(1)}px`,
                        '--ty': `${dy.toFixed(1)}px`,
                        '--rot': `${rot.toFixed(1)}deg`,
                    };
                }

                setOut(nextOut);
                setVars(nextVars);
                if (!done) {
                    rafRef.current = requestAnimationFrame(tick);
                } else {
                    setState('done');
                }
            };

            rafRef.current = requestAnimationFrame(tick);
        }
        return run;
    }, [text, duration, charset, widths]);

    // trigger: mount
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setState('done');
            setOut(text.split(''));
            setVars(Array.from({ length: text.length }, () => ({ '--op': 1 })));
            return;
        }
        if (trigger === 'mount' && widths.length === text.length) start();
    }, [text, trigger, widths, start]);

    // trigger: hover/focus
    useEffect(() => {
        if (trigger !== 'hover' || !ref.current) return;
        const el = ref.current;
        const on = () => start();
        el.addEventListener('mouseenter', on);
        el.addEventListener('focus', on, true);
        return () => {
            el.removeEventListener('mouseenter', on);
            el.removeEventListener('focus', on, true);
        };
    }, [trigger, start]);

    // trigger: visibile in viewport
    useEffect(() => {
        if (trigger !== 'visible' || !ref.current) return;
        const el = ref.current;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { start(); io.disconnect(); } },
            { threshold: 0.6 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [trigger, start]);

    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    const ready = widths.length === text.length;

    return (
        <span
            ref={ref}
            className={`text-shuffle ${className}`}
            data-state={state}
            aria-label={text}
        >
      {/* Ghost invisibile: occupa spazio prima dell'animazione */}
            {(state === 'idle' || !ready) ? (
                <span className="text-shuffle__ghost" aria-hidden="true">{text}</span>
            ) : (
                out.map((ch, i) => (
                    <span
                        key={i}
                        className="text-shuffle__char"
                        aria-hidden="true"
                        style={vars[i]}
                    >
            {ch || '\u00A0'}
          </span>
                ))
            )}
    </span>
    );
}

export default function ExampleStyle() {
    return (
        <div className="min-h-screen grid grid-rows-[auto,1fr,auto] font-[Roboto_Flex]">
            {/* HEADER */}
            <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/5">
                <a
                    href="#"
                    className="flex items-center gap-2 font-semibold no-underline text-text"
                >
                    <img src="/logo.svg" alt="" className="h-6 w-6" />
                    dev<span className="text-accent">/portfolio</span>
                </a>
                <nav className="flex gap-2">
                    <NavLink href="#colors">colors</NavLink>
                    <NavLink href="#buttons">buttons</NavLink>
                    <NavLink href="#cards">cards</NavLink>
                    <NavLink href="#glitch">glitch</NavLink>
                    <NavLink href="#terminal">terminal</NavLink>
                </nav>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10 w-full space-y-16">
                {/* 1. Palette ---------------------------------------------------------- */}
                <section id="colors">
                    <SectionTitle>/colors</SectionTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {[
                            ['bg', 'bg-bg'],
                            ['bg-elev', 'bg-bg-elev'],
                            ['text', 'bg-text'],
                            ['muted', 'bg-muted'],
                            ['accent', 'bg-accent'],
                            ['accent-2', 'bg-accent-2'],
                            ['card', 'bg-card'],
                        ].map(([name, cls]) => (
                            <div
                                key={name}
                                className={`rounded-xl p-3 border border-white/10 ${cls}`}
                            >
                                <div className="h-16 rounded-lg bg-current"></div>
                                <p className="mt-2 text-sm text-muted">--{name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Tipografia ------------------------------------------------------ */}
                <section id="typography">
                    <SectionTitle>/typography</SectionTitle>
                    <h1 className="text-4xl font-extrabold">Heading 1</h1>
                    <h2 className="text-2xl font-bold mt-2">Heading 2</h2>
                    <p className="text-muted mt-2">
                        Testo normale con <strong>accenti</strong>, <em>corsivo</em> e
                        codice <code className="mono text-accent">npm run dev</code>.
                    </p>
                </section>

                {/* 3. Buttons ---------------------------------------------------------- */}
                <section id="buttons">
                    <SectionTitle>/buttons</SectionTitle>
                    <div className="flex flex-wrap gap-3">
                        <Button href="#">Primary</Button>
                        <Button href="#" variant="ghost">
                            Ghost
                        </Button>
                        <Button href="#" variant="link">
                            Link style
                        </Button>
                    </div>
                </section>

                {/* 4. Cards ------------------------------------------------------------ */}
                <section id="cards">
                    <SectionTitle>/cards</SectionTitle>
                    <Grid>
                        <Card>
                            <h3 className="text-lg font-semibold">Card standard</h3>
                            <p className="text-muted">Card di esempio con testo e tag.</p>
                            <div className="flex gap-2 flex-wrap mt-2">
                                <Tag>React</Tag>
                                <Tag>Vite</Tag>
                                <Tag>Tailwind</Tag>
                            </div>
                        </Card>

                        <Card className="scanlines border-[rgba(0,229,255,.25)]">
                            <h3 className="text-lg font-semibold text-accent">Scanlined</h3>
                            <p className="text-muted">
                                Usa la classe <code className="mono">scanlines</code> per
                                l’effetto terminal.
                            </p>
                        </Card>

                        <Card className="bg-accent/10 border-accent/40">
                            <h3 className="text-lg font-semibold text-accent">Highlight</h3>
                            <p className="text-muted">
                                Variante accentata per evidenziare elementi.
                            </p>
                        </Card>
                    </Grid>
                </section>

                {/* 5. Glitch ----------------------------------------------------------- */}
                <section id="glitch">
                    <SectionTitle>/glitch</SectionTitle>
                    <GlitchTitle>Hover me for glitch effect</GlitchTitle>
                    <p className="text-muted mt-2 max-w-[60ch]">
                        Usa <code className="mono">.glitch</code> con{' '}
                        <code className="mono">data-text</code> per duplicare il testo.
                    </p>
                </section>

                {/* 6. Terminal --------------------------------------------------------- */}
                <section id="terminal">
                    <SectionTitle>/terminal</SectionTitle>
                    <TerminalCard
                        lines={[
                            'whoami',
                            '→ developer full-stack',
                            'stack: react, vite, tailwind',
                            'location: italia',
                            'status: disponibile Q1 2026',
                        ]}
                    />
                </section>

                {/* 7. Mesh decorativa -------------------------------------------------- */}
                <section id="hero-mesh" className="relative py-16">
                    <SectionTitle>/hero mesh</SectionTitle>
                    <p className="text-muted max-w-[60ch]">
                        Background sfumato con blur e maschera.
                    </p>
                    <div className="absolute inset-x-0 -bottom-20 h-[180px] blur-[60px] opacity-55 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent)]">
                        <div className="absolute left-1/5 top-0 w-[400px] h-[120px] rounded-full bg-accent/60"></div>
                        <div className="absolute right-1/5 top-0 w-[300px] h-[120px] rounded-full bg-[color:var(--color-accent-2,#ff3d81)]/60"></div>
                    </div>
                </section>

                <section id="text-shuffle">
                    <SectionTitle>/text reveal</SectionTitle>
                    <p className="text-muted max-w-[60ch]">
                        Lettere che appaiono mescolandosi e ruotando, poi rivelano la parola.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <TextShuffle text="Hello, world." trigger="mount" />
                        <TextShuffle text="Passa qui col mouse" trigger="hover" />
                        <TextShuffle text="Scroll to reveal" trigger="visible" />
                    </div>

                    <Card className="mt-4">
                        <h3 className="text-lg font-semibold">Dentro un Tag</h3>
                        <p className="text-muted">Funziona anche come child di altri componenti.</p>
                        <div className="mt-2 flex gap-2">
                            <Tag><TextShuffle text="Full-stack" trigger="hover" /></Tag>
                            <Tag><TextShuffle text="React" trigger="hover" /></Tag>
                            <Tag><TextShuffle text="Tailwind" trigger="hover" /></Tag>
                        </div>
                    </Card>
                </section>
            </main>

            {/* FOOTER --------------------------------------------------------------- */}
            <footer className="px-6 py-6 border-t border-white/10 text-sm text-muted">
                © {new Date().getFullYear()} Tuonome · design system demo
            </footer>
        </div>
    )
}
