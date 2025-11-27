export default function Card({ className='', children, ...props }) {
    return (
        <article
            className={`rounded-xl p-4 border border-white/10 shadow-soft
                  bg-[linear-gradient(180deg,theme(colors.card)_94%,rgba(0,229,255,.06)),theme(colors.card)]
                  transition-transform hover:-translate-y-[2px] ${className}`}
            {...props}
        >
            {children}
        </article>
    )
}