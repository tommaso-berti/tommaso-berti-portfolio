import Stack from "@mui/material/Stack";
import { useBreadcrumb } from "../../contexts/BreadCrumbContext.jsx";
import { useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation.js";
import CodexPaneSection from "./CodexPaneSection.jsx";
import Typography from "@mui/material/Typography";

export default function About() {
    const { t } = useTranslation();
    const { setBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumb(prev => ({
            ...prev,
            projects: {
                type: "path",
                items: [
                    {title: "CodexPane", label: "codexpane"},
                    {title: "GamesLog", label: "gameslog"},
                    {title: "Portfolio", label: "portfolio"}
                ],
            }
        }));
    }, [setBreadcrumb]);

    return (
        <Stack id="about" component="article">
            <Typography variant="h3">
                Projects
            </Typography>
            <CodexPaneSection />
        </Stack>
    );
}