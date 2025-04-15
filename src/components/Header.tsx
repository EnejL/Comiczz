import { AppBar, Container, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'black', mb: 2 }}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          ComicZZ
        </Typography>
      </Container>
    </AppBar>
  );
}; 