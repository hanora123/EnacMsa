import { createTheme } from '@mui/material/styles';

// Get the current language from localStorage or default to English
const currentLanguage = localStorage.getItem('language') || 'en';
const direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';

// Set the HTML dir attribute based on the current language
document.documentElement.dir = direction;
document.documentElement.lang = currentLanguage;

// Create a theme instance with government-style design
const theme = createTheme({
  direction, // This will set the direction for Material-UI components
  palette: {
    primary: {
      main: '#1a3a6e', // Deep blue - common in government sites
      light: '#4764a1',
      dark: '#00163e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c8102e', // Red accent for important actions
      light: '#ff5157',
      dark: '#900007',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: direction === 'rtl' ? 
      '"Tajawal", "Roboto", "Arial", sans-serif' : 
      '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;