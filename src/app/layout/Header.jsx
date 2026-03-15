import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import BreadCrumbs from '../../features/BreadCrumbs.jsx';
import FriendlyNav from "../../features/FriendlyNav.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";
import LanguageToggle from "./LanguageToggle.jsx";
import { Box, ButtonBase, Typography } from "@mui/material";
import { APP_VERSION } from '../../lib/version.js';
import { useState } from "react";
import ReleaseNotesModal from "./ReleaseNotesModal.jsx";


export default function Header() {
    const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);

    return (
        <Container
            component="header"
            maxWidth="xl"
            sx={{
                position: 'fixed',
                top: { xs: 8, md: 12 },
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100
            }}
        >
            <Box
                sx={{
                    minHeight: "4.25rem",
                    width: "100%",
                    px: { xs: 1.2, md: 1.5 },
                    py: { xs: "0.45rem", md: "0.55rem" },
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "16px",
                    backgroundColor: "background.paper",
                    backgroundImage: (theme) =>
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(125,196,172,0.14), rgba(20,32,28,0.7) 45%, rgba(20,32,28,0.9))"
                            : "linear-gradient(135deg, rgba(47,122,98,0.13), rgba(248,251,249,0.8) 46%, rgba(248,251,249,0.95))",
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 10px 30px rgba(5, 12, 10, 0.5)"
                            : "0 10px 24px rgba(18, 32, 28, 0.14)",
                    backdropFilter: "blur(10px)",
                    "::before": {
                        content: "\"\"",
                        position: "absolute",
                        inset: 0,
                        borderRadius: "16px",
                        pointerEvents: "none",
                        border: "1px solid",
                        borderColor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(125,196,172,0.25)"
                                : "rgba(47,122,98,0.2)",
                    },
                    position: "relative",
                    "& .MuiBreadcrumbs-separator": {
                        opacity: 0.5,
                    },
                    "& .MuiTypography-h5": {
                        fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                        letterSpacing: "0.01em",
                    },
                }}
            >
                <Stack spacing={0.7}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ minHeight: { xs: 44, md: 48 } }}
                    >
                        <BreadCrumbs />
                        <Stack
                            direction="row"
                            alignItems="center"
                            sx={{
                                pl: 1.25,
                                ml: 1,
                                borderLeft: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <ButtonBase
                                onClick={() => setIsReleaseModalOpen(true)}
                                sx={{
                                    borderRadius: 2,
                                    px: 1.1,
                                    py: 0.35,
                                    mr: 1.25,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    fontFamily: '"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                        boxShadow: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "0 0 0 1px rgba(125,196,172,0.28), 0 6px 18px rgba(125,196,172,0.14)"
                                                : "0 0 0 1px rgba(47,122,98,0.24), 0 6px 18px rgba(47,122,98,0.12)",
                                    },
                                }}
                                aria-label="Open release notes"
                            >
                                <Typography
                                    sx={{
                                        lineHeight: 1,
                                        fontWeight: 600,
                                        letterSpacing: "0.01em",
                                    }}
                                    variant="subtitle2"
                                    color="text.secondary"
                                >
                                    {`v${APP_VERSION}`}
                                </Typography>
                            </ButtonBase>
                            <LanguageToggle />
                            <DarkModeToggle />
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            borderTop: "1px solid",
                            borderColor: "divider",
                            pt: 0.7,
                        }}
                    >
                        <FriendlyNav />
                    </Box>
                </Stack>
                <ReleaseNotesModal
                    open={isReleaseModalOpen}
                    onClose={() => setIsReleaseModalOpen(false)}
                />
            </Box>
        </Container>
    )
}
