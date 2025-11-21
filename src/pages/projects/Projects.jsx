import Stack from "@mui/material/Stack";
import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from "@mui/material/Typography";
import ProjectsPreview from "./components/ProjectsPreview.jsx";
import MiniWebappPreview from "./components/MiniWebappPreview.jsx";

export default function About() {
    const { t } = useTranslation('pages.projects');

    return (
        <Stack id="projects" component="article">
            <Typography variant="h3">
                {t('title')}
            </Typography>
            <ProjectsPreview
                overline={t('portfolio.overline')}
                title={t('portfolio.title')}
                description={t('portfolio.description')}
                primaryAction={{
                    label: t('primaryAction'),
                    path: "portfolio",
                }}
                secondaryAction={{
                    label: t('secondaryAction'),
                    href: "https://www.tommasoberti.com",
                }}
                id={'portfolio'}
                technologies={['React', 'Vite', 'HTML', 'CSS', 'MUI', 'JS']}
                preview={
                    <MiniWebappPreview
                        url="https://www.tommasoberti.com"
                        title={t('portfolio.title')}
                        overlayLabel={t('live_preview')}
                        width="100%"
                        height={360}
                        scale={0.8}
                    />
                }
            />
            <ProjectsPreview
                overline={t('portfolio.overline')}
                title={t('portfolio.title')}
                description={t('portfolio.description')}
                primaryAction={{
                    label: t('primaryAction'),
                    path: "codexpane",
                }}
                secondaryAction={{
                    label: t('secondaryAction'),
                    href: "https://www.codexpane.tommasoberti.com",
                }}
                reversed={true}
                id={'codexpane'}
                technologies={['React', 'Vite', 'HTML', 'CSS', 'MUI', 'JS', 'minisearch']}
                preview={
                    <MiniWebappPreview
                        url="https://www.codexpane.tommasoberti.com"
                        title={t('codexPane.title')}
                        overlayLabel={t('live_preview')}
                        width="100%"
                        height={360}
                        scale={0.8}
                    />
                }
            />
        </Stack>
    );
}