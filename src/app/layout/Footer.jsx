import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { useTranslation } from "../../hooks/useTranslation.js";
import { getStaticCvPdfPath } from "../../pages/cv/cvPdf.utils.js";

export default function Footer() {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const staticCvPdfPath = getStaticCvPdfPath(language);
    return (
        <Container
            component="footer"
            maxWidth="xl"
            sx={{
                position: 'fixed',
                left: "50%",
                transform: "translateX(-50%)",
                bottom: { xs: "1rem", md: "1.5rem" },
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                padding: '0.35rem',
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
                    borderRadius: '999px',
                    boxShadow: 1,
                    backgroundColor: "background.paper",
                    backgroundImage: (theme) =>
                        theme.palette.mode === "dark"
                            ? "linear-gradient(160deg, rgba(125,196,172,0.11), rgba(20,32,28,0.86) 58%)"
                            : "linear-gradient(160deg, rgba(47,122,98,0.1), rgba(248,251,249,0.94) 58%)",
                    backdropFilter: "blur(8px)",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: (theme) =>
                            theme.palette.mode === "dark"
                                ? "0 8px 24px rgba(125,196,172,0.18)"
                                : "0 8px 20px rgba(47,122,98,0.16)",
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
                        href={staticCvPdfPath}
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
