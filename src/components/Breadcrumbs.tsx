import { Breadcrumbs as MuiBreadcrumbs, Container, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const Breadcrumbs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Comics</Typography>
      </MuiBreadcrumbs>
    </Container>
  );
}; 