import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import GlitchTitle from '../ui/GlitchTitle.jsx'
import Grid from '../ui/Grid.jsx'
import NavLink from '../ui/NavLink.jsx'
import SectionTitle from '../ui/SectionTitle.jsx'
import Tag from '../ui/Tag.jsx'
import TerminalCard from '../ui/TerminalCard.jsx'

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
            </main>

            {/* FOOTER --------------------------------------------------------------- */}
            <footer className="px-6 py-6 border-t border-white/10 text-sm text-muted">
                © {new Date().getFullYear()} Tuonome · design system demo
            </footer>
        </div>
    )
}
