import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { HeroGrid } from './components/HeroGrid';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Breadcrumbs />
        <HeroGrid />
      </Box>
    </ThemeProvider>
  );
}
