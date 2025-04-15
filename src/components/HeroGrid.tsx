import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { GridLayout } from './GridLayout';
import { HeroCard } from './HeroCard';
import { Superhero } from '../types/superhero';
import { getHeroById } from '../services/superheroApi';

// Initial set of hero IDs to display
const INITIAL_HERO_IDS = ['70', '620', '149', '332', '346', '659', '720', '732'];

export const HeroGrid = () => {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        setIsLoading(true);
        const heroPromises = INITIAL_HERO_IDS.map(id => getHeroById(id));
        const results = await Promise.all(heroPromises);
        
        const validHeroes = results
          .filter(result => 
            result.response === 'success' && 
            result.id &&
            result.name &&
            result.powerstats &&
            result.biography &&
            result.image
          )
          .map(hero => ({
            id: hero.id!,
            name: hero.name!,
            powerstats: hero.powerstats!,
            biography: hero.biography!,
            appearance: hero.appearance!,
            work: hero.work!,
            connections: hero.connections!,
            image: hero.image!
          }));

        setHeroes(validHeroes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load heroes');
      } finally {
        setIsLoading(false);
      }
    };

    loadHeroes();
  }, []);

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <GridLayout>
      {isLoading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <HeroCard key={`skeleton-${index}`} isLoading />
        ))
      ) : (
        heroes.map(hero => (
          <HeroCard key={hero.id} hero={hero} />
        ))
      )}
    </GridLayout>
  );
}; 