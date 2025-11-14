import Box from '@mui/material/Box'
import profilePic from '../assets/images/profilepicture.jpeg';
import { useTranslation } from "../hooks/useTranslation.js";
import Typography from '@mui/material/Typography';

export default function Home() {
    const { t } = useTranslation();

    return (
        <Box
            component="main"
            sx={{
                paddingY: '2rem',
                height: '100%'
            }}
        >
            <Box
                component="section"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                }}
            >
                <Typography
                    color="text.primary"
                    variant="h5"
                >
                    Hello, I am
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
            </Box>
            <Box
                component="section"
                sx={{marginTop: '2rem'}}
                width={'50%'}
            >
                <Typography
                    variant="body1"
                >
                    {t('hero')}
                </Typography>
            </Box>
        </Box>
    )
}