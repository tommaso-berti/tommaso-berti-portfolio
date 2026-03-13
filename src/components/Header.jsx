import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import BreadCrumbs from '../features/BreadCrumbs.jsx';
import DarkModeToggle from "./DarkModeToggle.jsx";
import LanguageToggle from "./LanguageToggle.jsx";
import { ButtonBase, Typography } from "@mui/material";
import { APP_VERSION } from '../lib/version.js';
import { useState } from "react";
import ReleaseNotesModal from "./ReleaseNotesModal.jsx";


export default function Header() {
    const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);

    return (
        <Container
            component="header"
            maxWidth="lg"
            disableGutters
            sx={{
                height: '4rem',
                width: '100%',
                display: 'flex',
                position: 'fixed',
                borderBottom: '1px solid',
                borderColor: 'divider',
                paddingY: '1rem',
                justifyContent: 'space-between',
                backgroundColor: "background.paper",
                zIndex: 100
            }}
        >
            <BreadCrumbs />
            <Stack direction="row" alignItems="center">
                <ButtonBase
                    onClick={() => setIsReleaseModalOpen(true)}
                    sx={{
                        borderRadius: 1,
                        px: 0.5,
                        mr: 1,
                    }}
                    aria-label="Open release notes"
                >
                    <Typography
                        sx={{
                            lineHeight: 1,
                            fontWeight: 500,
                        }}
                        variant="subtitle2"
                        color="textSecondary"
                    >
                        {`v${APP_VERSION}`}
                    </Typography>
                </ButtonBase>
                <LanguageToggle />
                <DarkModeToggle />
            </Stack>
            <ReleaseNotesModal
                open={isReleaseModalOpen}
                onClose={() => setIsReleaseModalOpen(false)}
            />
        </Container>
    )
}
