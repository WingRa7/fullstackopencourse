import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#9ba9ff',
      light: '#AFBAFF',
      dark: '#6C76B2',
    },
    secondary: {
      main: '#e0c3fc',
      light: '#E6CFFC',
      dark: '#9C88B0',
    },
    warning: {
      main: '#ff9639',
      dark: '#e6532d',
      light: '#fce0c3',
    },
    error: {
      main: '#ff4f36',
      dark: '#c22f1f',
      light: '#ffccc1',
    },
    success: {
      main: '#9dea54',
      dark: '#3b8b27',
      light: '#dffcc3',
    },
    info: {
      main: '#463dbd',
      dark: '#260383',
      light: '#c4c3fc',
    },
    background: {
      paper: '#ffffff',
      default: '#fafbfc',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'primary.dark',
            color: 'white',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#f5f7fa',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
    },
    MuiTypography: {},
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': {
            color: 'primary.light',
          },
        },
      },
    },
    MuiIconButton: {},
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  },
})

export default theme
