import { Dialog, DialogContent, IconButton, Box, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Superhero } from '../types/superhero';

interface HeroDialogProps {
  hero: Superhero;
  open: boolean;
  onClose: () => void;
}

export const HeroDialog = ({ hero, open, onClose }: HeroDialogProps) => {
  const powerStats = [
    { name: 'Intelligence', value: parseInt(hero.powerstats.intelligence) || 0 },
    { name: 'Strength', value: parseInt(hero.powerstats.strength) || 0 },
    { name: 'Speed', value: parseInt(hero.powerstats.speed) || 0 },
    { name: 'Durability', value: parseInt(hero.powerstats.durability) || 0 },
    { name: 'Power', value: parseInt(hero.powerstats.power) || 0 },
    { name: 'Combat', value: parseInt(hero.powerstats.combat) || 0 }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: '90vh' }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: '#DD2C2C',
          zIndex: 1
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
        <Grid container sx={{ flexGrow: 1 }}>
          {/* Left side - Image */}
          <Grid item xs={12} md={3.6} sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={hero.image.url}
              alt={hero.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
          </Grid>
          
          {/* Right side - Info */}
          <Grid item xs={12} md={8.4}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {hero.name}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Power Stats
              </Typography>
              {powerStats.map((stat) => (
                <Box key={stat.name} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    {stat.name}: {stat.value}
                  </Typography>
                </Box>
              ))}

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Biography
              </Typography>
              <Typography variant="body1">
                Full Name: {hero.biography['full-name']}
              </Typography>
              <Typography variant="body1">
                Publisher: {hero.biography.publisher}
              </Typography>
              <Typography variant="body1">
                First Appearance: {hero.biography['first-appearance']}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Work
              </Typography>
              <Typography variant="body1">
                Occupation: {hero.work.occupation || 'Unknown'}
              </Typography>
              <Typography variant="body1">
                Base: {hero.work.base || 'Unknown'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}; 