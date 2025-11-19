import { useTranslation } from "../../hooks/useTranslation.js";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Home() {
    const { t } = useTranslation();

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