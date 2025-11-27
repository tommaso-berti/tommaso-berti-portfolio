export default function Grid({ children }) {
    return (
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {children}
        </div>
    )
}