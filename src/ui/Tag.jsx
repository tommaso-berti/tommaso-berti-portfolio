export default function Tag({ children }) {
    return (
        <span className="mono text-xs px-2 py-1 rounded-full border border-white/20 text-muted">
      #{children}
    </span>
    )
}