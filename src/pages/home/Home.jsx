import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Home() {
    const { t } = useTranslation('pages.home');
    const hero= t('hero', { returnObjects: true });

    return (
        <>
            <Stack
                component="section"
                sx={{
                    mt: 16,
                }}
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
                sx={{marginTop: '2rem'}}
                width={'50%'}
                gap={1}
            >
                {
                    hero.map((paragraph, index) => (
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