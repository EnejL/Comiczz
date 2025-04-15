import { Card, CardContent, CardMedia, Typography, Box, Button, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Superhero } from '../types/superhero';
import { HeroDialog } from './HeroDialog';

interface HeroCardProps {
  hero?: Superhero;
  isLoading?: boolean;
}

export const HeroCard = ({ hero, isLoading = false }: HeroCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={24} />
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="rectangular" height={36} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (!hero) return null;

  return (
    <>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="200"
          image={hero.image.url}
          alt={hero.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5" component="div">
            {hero.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {hero.biography.publisher}
          </Typography>
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setIsDialogOpen(true)}
              sx={{
                bgcolor: '#DD2C2C',
                color: 'white',
                '&:hover': {
                  bgcolor: '#B22424',
                },
              }}
            >
              More Info
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {hero && (
        <HeroDialog
          hero={hero}
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}; 