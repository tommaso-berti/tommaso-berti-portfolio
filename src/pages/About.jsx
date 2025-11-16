import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useBreadcrumb } from "../contexts/BreadcrumbContext.jsx";
import { useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation.js";

export default function About() {
    const { t } = useTranslation();
    const { setBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumb(prev => ({
            ...prev,
            about: {
                type: "hash",
                items: [
                    {title: "Bio", label: "bio"},
                    {title: "Hobby", label: "hobby"},
                    {title: "TechSkills", label: "techskills"}
                ],
            }
        }));
    }, [setBreadcrumb]);

    return (
        <Box
            component="section"
        >
            <Typography
                variant="h3"
            >
                {t('pages.about.bio')}
            </Typography>
        </Box>
    )
}