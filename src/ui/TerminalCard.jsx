export default function TerminalCard({ lines=[] }) {
    return (
        <div className="rounded-xl p-4 border border-[rgba(0,229,255,.25)] scanlines shadow-inner">
            {lines.map((l, i) => (
                <div key={i} className="mono text-[#b9ffef]">
                    {i===0 ? <><span className="text-accent">$</span> {l}</> : l}
                </div>
            ))}
        </div>
    )
}