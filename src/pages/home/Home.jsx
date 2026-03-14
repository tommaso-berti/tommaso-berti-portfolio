import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

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
                gap={1}
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
                >
                    {`Software Developer ${t('and')} Delivery Expert`}
                </Typography>
            </Stack>
            <Stack
                component="section"
                sx={{ marginTop: { xs: "1.5rem", md: "2rem" } }}
                width={{ xs: "100%", md: "72%", lg: "62%" }}
                maxWidth="760px"
                gap={1.25}
            >
                {
                    heroParagraphs.map((paragraph, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                        >
                            {paragraph}
                        </Typography>
                    ))
                }
            </Stack>
        </>
    )
}
