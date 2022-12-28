import { createTheme } from '@mui/material/styles';
import { fontWeight } from '@mui/system';
import colors from './theme';

const theme = createTheme({
  breakpoints: {
    values: {
      lg: 1400,
      md: 900,
      xl: 1560,
      sm: 560,
      xs: 340,
    },
  },
  palette: {
    primary: {
      main: colors.primary.default,
      dark: colors.primary.dark,
    },
    error: {
      main: colors.red.default,
      dark: colors.red.badge,
    },
    secondary: {
      main: colors.red.default,
      dark: colors.red.badge,
    },
    success: {
      main: colors.green.default,
    },
    grey: {
      A100: colors.grey.light,
      A200: colors.grey.lighter,
      A400: colors.grey.default,
      A700: colors.grey.input,
    },
    text: {
      primary: colors.black,
      disabled: colors.grey.default,
    },
  },
  typography: {
    h1: {
      fontSize: '2.25rem',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.125rem',
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.9375rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      color: colors.grey.default,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          fontSize: '1rem',
          textTransform: 'capitalize',
        },
      },
    },
  },
});

export default theme;
