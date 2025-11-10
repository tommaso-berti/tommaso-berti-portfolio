import { createTheme } from '@mui/material/styles';

export const makeTheme = (mode) =>
    createTheme({
        palette: { mode },
        typography: { fontFamily: 'var(--font-family)' },
        components: {},
    });

export default makeTheme;