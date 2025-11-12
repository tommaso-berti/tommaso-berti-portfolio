import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BreadCrumbs from './Breadcrumbs.jsx';

export default function Header() {
    return (
        <Box
            component="header"
            sx={{
                width: '100%',
                display: 'block',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <BreadCrumbs />
        </Box>
    )
}