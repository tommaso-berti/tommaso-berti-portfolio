export default function GlitchTitle({ children }) {
    const text = typeof children === 'string' ? children : '';
    return (
        <h1 className="glitch text-[clamp(28px,6vw,56px)] font-extrabold tracking-[-.02em]" data-text={text}>
            {children}
        </h1>
    )
}