import { useTranslation } from "../hooks/useTranslation.js";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useBreadcrumb } from "../contexts/BreadcrumbContext.jsx";
import {useEffect} from "react";

export default function Home() {
    const { t } = useTranslation();
    const { setBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumb(prev => ({
            ...prev,
            home: {
                type: "path",
                items: [
                    { title: t("projects"), label: "projects" },
                    { title: t("about"), label: "about" },
                    { title: t("blog"), label: "blog" },
                    { title: t("example-style"), label: "example-style" }
                ],
            },
        }));
    }, [setBreadcrumb]);

    return (
        <>
            <Stack
                component="section"
            >
                <Typography
                    color="text.primary"
                    variant="h5"
                >
                    Hi, I am
                </Typography>
                <Typography
                    color="text.primary"
                    variant="h2"
                    fontWeight="bold"
                >
                    Tommaso Berti
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="h6"
                >
                    Software Developer and Delivery Expert
                </Typography>
            </Stack>
            <Stack
                component="section"
                sx={{marginTop: '2rem'}}
                width={'50%'}
                gap={1}
            >
                <Typography
                    variant="body1"
                >
                    {t('pages.home.hero1')}
                </Typography>
                <Typography
                    variant="body1"
                >
                    {t('pages.home.hero2')}
                </Typography>
                <Typography
                    variant="body1"
                >
                    {t('pages.home.hero3')}
                </Typography>
            </Stack>
        </>
    )
}