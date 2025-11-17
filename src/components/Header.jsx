import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import BreadCrumbs from './BreadCrumbs.jsx';
import DarkModeToggle from "./DarkModeToggle.jsx";
import LanguageToggle from "./LanguageToggle.jsx";

export default function Header() {
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
                justifyContent: 'space-between'
            }}
        >
            <BreadCrumbs />
            <Stack direction="row">
                <LanguageToggle />
                <DarkModeToggle />
            </Stack>
        </Container>
    )
}