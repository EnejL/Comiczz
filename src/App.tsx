import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { HeroGrid } from './components/HeroGrid';

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
        <Container maxWidth="xl">
          <HeroGrid />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
