import { createTheme } from '@mui/material/styles';

export const makeTheme = (mode) =>
    createTheme({
        palette: { mode },
        typography: {  fontFamily: '"Roboto", "Avenir", "Helvetica", "Arial", sans-serif', },
        components: {},
    });

export default makeTheme;