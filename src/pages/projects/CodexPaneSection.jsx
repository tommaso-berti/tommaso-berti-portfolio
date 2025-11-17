import MiniWebappPreview from "../../components/MiniWebappPreview.jsx";
import ProjectSection from "../../components/ProjectSection.jsx";

export default function CodexPaneSection() {
    return (
        <ProjectSection
            overline="Side Project · Webapp"
            title="CodexPane"
            description="Un ambiente interattivo per lavorare con il codice nel browser."
            primaryAction={{ label: "Apri preview grande" }}
            secondaryAction={{
                label: "Apri sito",
                href: "https://www.codexpane.tommasoberti.com",
            }}
            technologies={['React', 'Vite', 'HTML', 'CSS', 'MUI', 'JS', 'minisearch']}
            preview={
                <MiniWebappPreview
                    url="https://www.codexpane.tommasoberti.com"
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
