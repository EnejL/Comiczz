import { ReactNode, useEffect, useState, useRef } from 'react';
import { Superhero, SuperheroResponse } from '../types/superhero';
import { getHeroesBatch } from '../services/superheroApi';
import { HeroCard } from './HeroCard';
import '../styles/Grid.css';

const BATCH_SIZE = 10;
const INITIAL_START_ID = 1;

interface HeroWithIndex extends Superhero {
  uniqueIndex: number;
  batchIndex: number;
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

export const Grid = () => {
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
      
      const newHeroes = validHeroes
        .filter(hero => !loadedHeroIds.has(hero.id))
        .map(hero => {
          uniqueIndexCounter.current += 1;
          return {
            ...hero,
            uniqueIndex: uniqueIndexCounter.current,
            batchIndex: currentStartId
          };
        });

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
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="grid">
        {heroes.map((hero) => {
          console.log('Hero data:', hero);
          return (
            <HeroCard
              key={`${hero.id}-${hero.batchIndex}`}
              hero={hero}
            />
          );
        })}
      </div>
      {loading && (
        <div className="loading-message">
          <p>Loading heroes...</p>
        </div>
      )}
      {!loading && heroes.length > 0 && (
        <div className="load-more-container">
          <button
            onClick={loadMoreHeroes}
            className="button button-submit"
          >
            Load More Heroes
          </button>
        </div>
      )}
    </div>
  );
};

interface GridItemProps {
  children: ReactNode;
  className?: string;
}

export const GridItem = ({ children, className = '' }: GridItemProps) => {
  return <div className={className}>{children}</div>;
}; 