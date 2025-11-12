import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BreadCrumbs from './BreadCrumbs.jsx';
import DarkModeToggle from "./DarkModeToggle.jsx";

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
            <DarkModeToggle />
        </Box>
    )
}