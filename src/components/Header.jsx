import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import BreadCrumbs from './BreadCrumbs.jsx';
import DarkModeToggle from "./DarkModeToggle.jsx";
import TranslateIcon from '@mui/icons-material/Translate';
import IconButton from '@mui/material/IconButton'

export default function Header() {
    return (
        <Box
            component="header"
            sx={{
                width: '100%',
                display: 'flex',
                borderBottom: '1px solid',
                borderColor: 'divider',
                paddingY: '1rem',
                justifyContent: 'space-between'
            }}
        >
            <BreadCrumbs />
            <Stack direction="row">
                <IconButton>
                    <TranslateIcon />
                </IconButton>
                <DarkModeToggle />
            </Stack>
        </Box>
    )
}