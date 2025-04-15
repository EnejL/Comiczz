import { Grid, Container } from '@mui/material';
import { ReactNode } from 'react';

interface GridLayoutProps {
  children: ReactNode;
}

export const GridLayout = ({ children }: GridLayoutProps) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {Array.isArray(children) ? 
          children.map((child, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              {child}
            </Grid>
          )) : 
          <Grid item xs={12} sm={6} md={4} lg={2}>
            {children}
          </Grid>
        }
      </Grid>
    </Container>
  );
}; 