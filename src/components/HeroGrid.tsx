import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GridLayout } from './GridLayout';
import { HeroCard } from './HeroCard';
import { Superhero } from '../types/superhero';
import { getHeroesBatch } from '../services/superheroApi';

const BATCH_SIZE = 5; // Reduced batch size
const TOTAL_HEROES = 731;

export const HeroGrid = () => {
  const [heroes, setHeroes] = useState<Superhero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextStartId, setNextStartId] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreHeroes = async () => {
    try {
      if (!hasMore || isLoadingMore) return;

      setIsLoadingMore(true);
      const results = await getHeroesBatch(nextStartId, BATCH_SIZE);
      
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

      setHeroes(prev => [...prev, ...validHeroes]);
      setNextStartId(prev => prev + BATCH_SIZE);
      
      // Check if we've reached the end
      if (nextStartId + BATCH_SIZE >= TOTAL_HEROES) {
        setHasMore(false);
      }

      // Log batch information
      console.group(`Loaded Batch (${nextStartId} - ${nextStartId + BATCH_SIZE - 1})`);
      console.log('Valid heroes in batch:', validHeroes.length);
      console.log('Total heroes loaded:', heroes.length + validHeroes.length);
      console.groupEnd();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load heroes');
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMoreHeroes();
  }, []);

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Try refreshing the page or wait a few minutes before trying again.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {isLoading && heroes.length === 0 && (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
            Loading initial heroes...
          </Typography>
        </Box>
      )}
      <InfiniteScroll
        dataLength={heroes.length}
        next={loadMoreHeroes}
        hasMore={hasMore}
        loader={
          <Box sx={{ width: '100%', my: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LinearProgress sx={{ width: '200px', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Loading more heroes... ({heroes.length} loaded)
            </Typography>
          </Box>
        }
        endMessage={
          <Typography variant="body2" sx={{ textAlign: 'center', my: 2, color: 'text.secondary' }}>
            You've seen all available heroes! ({heroes.length} total)
          </Typography>
        }
      >
        <GridLayout>
          {heroes.map(hero => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </GridLayout>
      </InfiniteScroll>
    </>
  );
}; 