import { Card, CardContent, CardMedia, Typography, Box, LinearProgress, Skeleton } from '@mui/material';
import { Superhero } from '../types/superhero';

interface HeroCardProps {
  hero?: Superhero;
  isLoading?: boolean;
}

export const HeroCard = ({ hero, isLoading = false }: HeroCardProps) => {
  if (isLoading) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={24} />
          <Box sx={{ mt: 2 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Skeleton variant="text" height={20} />
                <Skeleton variant="rectangular" height={10} />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (!hero) return null;

  const powerStats = [
    { name: 'Intelligence', value: parseInt(hero.powerstats.intelligence) || 0 },
    { name: 'Strength', value: parseInt(hero.powerstats.strength) || 0 },
    { name: 'Speed', value: parseInt(hero.powerstats.speed) || 0 },
  ];

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={hero.image.url}
        alt={hero.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hero.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {hero.biography.publisher}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {powerStats.map((stat) => (
            <Box key={stat.name} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {stat.name}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stat.value}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}; 