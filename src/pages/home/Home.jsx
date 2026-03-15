import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
    const { t } = useTranslation('pages.home');
    const hero = t('hero', { returnObjects: true });
    const heroParagraphs = Array.isArray(hero) ? hero : [];

    return (
        <>
            <Stack
                component="section"
                sx={{
                    mt: { xs: 10, md: 14 },
                }}
                gap={1.25}
            >
                <Typography
                    color="text.primary"
                    variant="h5"
                >
                    {t('welcome')}
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
                    sx={{ mt: 0.25 }}
                >
                    {`Software Developer ${t('and')} Delivery Expert`}
                </Typography>
                <Stack direction="row" sx={{ pt: 1 }}>
                    <Button
                        component={RouterLink}
                        to="/projects"
                        variant="contained"
                        sx={{
                            transition: "0.25s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6,
                            },
                        }}
                    >
                        {t('primaryCta')}
                    </Button>
                </Stack>
            </Stack>
            <Stack
                component="section"
                sx={{ marginTop: { xs: "1.75rem", md: "2.25rem" } }}
                width={{ xs: "100%", md: "70%", lg: "60%" }}
                maxWidth="740px"
                gap={1.5}
            >
                {
                    heroParagraphs.map((paragraph, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{ lineHeight: 1.75 }}
                        >
                            {paragraph}
                        </Typography>
                    ))
                }
            </Stack>
        </>
    )
}
