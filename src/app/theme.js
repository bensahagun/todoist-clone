export const themeSettings = {
  palette: {
    primary: {
      main: '#db4c3f',
      dark: '#d1332b',
    },
    secondary: {
      main: '#212121',
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
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#db4c3f',
      },
    },
  },
};
