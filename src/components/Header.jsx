import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 10,
                backgroundColor: 'background.paper',
                color: 'text.primary',
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2.5,
                height: 'var(--header-h)',
            }}
        >
            Header
        </Box>
    )
}