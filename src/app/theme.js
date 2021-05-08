import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#db4c3f',
      dark: '#d1332b',
    },
    secondary: {
      main: '#ffffff',
      dark: '#333',
    },
  },
  typography: {
    fontSize: 12,
  },
  mixins: {
    toolbar: {
      minHeight: 44,
    },
  },
  custom: {
    sidebarWidth: 305,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          overflow: 'hidden',
        },
      },
    },
  },
});
