export default function Button({ variant='primary', className='', children, ...props }) {
    const base = "inline-block px-4 py-2 rounded-[10px] font-semibold transition";
    const variants = {
        primary: "bg-accent text-[#041116] border border-transparent shadow-neon hover:brightness-105 active:translate-y-[1px]",
        ghost:   "border border-white/20 text-text hover:bg-white/5",
        link:    "underline decoration-accent/40 underline-offset-4 hover:decoration-accent px-0 py-0"
    }
    return (
        <a className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </a>
    )
}