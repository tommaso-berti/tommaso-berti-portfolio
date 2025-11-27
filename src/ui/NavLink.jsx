export default function NavLink({ href, children }) {
    return (
        <a href={href} className="px-3 py-2 rounded-lg text-muted hover:text-text hover:bg-white/5 focus-visible:focus-ring">
            {children}
        </a>
    )
}