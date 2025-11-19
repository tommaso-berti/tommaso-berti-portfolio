import Stack from "@mui/material/Stack";
import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import ProjectsPreview from "./components/ProjectsPreview.jsx";
import MiniWebappPreview from "./components/MiniWebappPreview.jsx";

export default function About() {
    const { t } = useTranslation();

    return (
        <Stack id="projects" component="article">
            <Typography variant="h3">
                Projects
            </Typography>
            <ProjectsPreview
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
            <ProjectsPreview
                overline="Main Project · Webapp"
                title="CodexPane"
                description="Un ambiente interattivo per lavorare con il codice nel browser."
                primaryAction={{
                    label: "Apri preview grande",
                    href: "https://www.codexpane.tommasoberti.com",
                }}
                secondaryAction={{
                    label: "Apri sito",
                    href: "https://www.codexpane.tommasoberti.com",
                }}
                reversed={true}
                id={'codexpane'}
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
        </Stack>
    );
}