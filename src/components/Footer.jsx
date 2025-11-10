import Box from '@mui/material/Box';

export default function Footer() {
    return (
        <Box
            component='footer'
            sx={{
                position: 'fixed',
                bottom: 0,
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
                height: 'var(--footer-h)',
            }}
        >
            Footer
        </Box>
    )
}