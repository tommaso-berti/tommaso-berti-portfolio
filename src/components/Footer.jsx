import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTranslation } from "../hooks/useTranslation.js";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <Container
            component="footer"
            maxWidth="lg"
            disableGutters
            sx={{
                position: 'fixed',
                bottom: '2rem',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                padding: '0.2rem',
                display: 'inline-flex',
                zIndex: 100
            }}
        >
            <Stack
                direction='row'
                gap={1}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '1rem',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
                    backgroundColor: "background.paper",
                    transition: "0.25s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                    },
                }}
            >
                <Tooltip title="GitHub">
                    <IconButton
                        aria-label="GitHub"
                        component="a"
                        href="https://github.com/tommaso-berti"
                        target="_blank"
                        rel="noopener noreferrer"
                        size='large'
                    >
                        <GitHubIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="LinkedIn">
                    <IconButton
                        aria-label="LinkedIn"
                        component="a"
                        href="https://www.linkedin.com/in/tommasoberti/"
                        target="_blank"
                        rel="noopener noreferrer"
                        size='large'
                    >
                        <LinkedInIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Gmail">
                    <IconButton
                        aria-label="Email"
                        component="a"
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=tommaso.berti.15@gmail.com&su=We%20are%20interested%20in%20you"
                        target="_blank"
                        rel="noopener noreferrer"
                        size='large'
                    >
                        <EmailIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={t('pages.home.tooltipResume')}>
                    <IconButton
                        aria-label="PDF"
                        component="a"
                        href="../../public/Curriculum_Tommaso_Berti.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        size='large'
                    >
                        <DescriptionIcon fontSize="inherit"/>
                    </IconButton>
                </Tooltip>
            </Stack>
        </Container>
    )
}