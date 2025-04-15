import { HeroCard } from './HeroCard';
import { Superhero, SuperheroResponse } from '../types/superhero';
import { useEffect, useState, useRef } from 'react';
import { getHeroesBatch } from '../services/superheroApi';

const BATCH_SIZE = 10;
const INITIAL_START_ID = 1;

interface HeroWithIndex extends Superhero {
  uniqueIndex: number;
}

function isValidHero(response: SuperheroResponse): response is Superhero {
  return (
    response.response === 'success' &&
    typeof response.id === 'string' &&
    typeof response.name === 'string' &&
    response.powerstats !== undefined &&
    response.biography !== undefined &&
    response.appearance !== undefined &&
    response.work !== undefined &&
    response.connections !== undefined &&
    response.image !== undefined
  );
}

export const HeroGrid = () => {
  const [heroes, setHeroes] = useState<HeroWithIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStartId, setCurrentStartId] = useState(INITIAL_START_ID);
  const [loadedHeroIds, setLoadedHeroIds] = useState<Set<string>>(new Set());
  const uniqueIndexCounter = useRef(0);

  useEffect(() => {
    loadMoreHeroes();
  }, []);

  const loadMoreHeroes = async () => {
    try {
      setLoading(true);
      const responses = await getHeroesBatch(currentStartId, BATCH_SIZE);
      const validHeroes = responses.filter(isValidHero);
      
      // Filter out duplicates and add unique index
      const newHeroes = validHeroes
        .filter(hero => !loadedHeroIds.has(hero.id))
        .map(hero => {
          uniqueIndexCounter.current += 1;
          return {
            ...hero,
            uniqueIndex: uniqueIndexCounter.current
          };
        });

      // Update loaded hero IDs
      setLoadedHeroIds(new Set([...Array.from(loadedHeroIds), ...newHeroes.map(h => h.id)]));

      setHeroes(prevHeroes => [...prevHeroes, ...newHeroes]);
      setCurrentStartId(prev => prev + BATCH_SIZE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load heroes');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container py-4">
        <p className="text-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {heroes.map(hero => (
          <HeroCard key={`hero-${hero.uniqueIndex}`} hero={hero} />
        ))}
      </div>
      {loading && (
        <div className="text-center py-4">
          <p>Loading heroes...</p>
        </div>
      )}
      {!loading && heroes.length > 0 && (
        <div className="text-center py-4">
          <button
            onClick={loadMoreHeroes}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-fast"
          >
            Load More Heroes
          </button>
        </div>
      )}
    </div>
  );
}; 