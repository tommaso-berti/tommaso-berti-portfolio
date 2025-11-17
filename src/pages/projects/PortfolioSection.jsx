import MiniWebappPreview from "../../components/MiniWebappPreview.jsx";
import ProjectSection from "./ProjectSection.jsx";

export default function CodexPaneSection() {
    return (
        <ProjectSection
            overline="Main Project · Portfolio"
            title="Portfolio"
            description="Un ambiente interattivo per lavorare con il codice nel browser."
            primaryAction={{
                label: "Apri preview grande",
                href: "https://www.tommasoberti.com",
            }}
            secondaryAction={{
                label: "Apri sito",
                href: "https://www.tommasoberti.com",
            }}
            id={'portfolio'}
            technologies={['React', 'Vite', 'HTML', 'CSS', 'MUI', 'JS']}
            preview={
                <MiniWebappPreview
                    url="https://www.tommasoberti.com"
                    title="CodexPane"
                    overlayLabel="Live Preview"
                    width="100%"
                    height={360}
                    scale={0.8}
                />
            }
        />
    );
}
