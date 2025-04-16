import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Superhero } from '../types/superhero';
import { getHeroesBatch } from '../services/superheroApi';
import { HeroCard } from './HeroCard';
import { PublisherFilter } from '../types/filters';
import { Spinner } from './Spinner';
import FadingCard from './FadingCard';
import '../styles/Grid.css';

// UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};

interface HeroWithUUID extends Superhero {
  uuid: string;
}

interface GridProps {
  publisherFilter: PublisherFilter;
}

const Grid: React.FC<GridProps> = ({ publisherFilter }) => {
  const [heroes, setHeroes] = useState<HeroWithUUID[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<HeroWithUUID[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStartId, setCurrentStartId] = useState(1);
  const initialLoadCompleted = useRef(false);
  
  // Derive initialLoad from heroes length
  const initialLoad = heroes.length === 0;

  const loadMoreHeroes = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const batchSize = 20;
      const responses = await getHeroesBatch(currentStartId, batchSize);

      const newHeroes = responses
        .filter(response => response.response === 'success')
        .map(hero => ({
          ...hero,
          uuid: generateUUID()
        })) as HeroWithUUID[];

      setHeroes(prev => [...prev, ...newHeroes]);
      setCurrentStartId(currentStartId + batchSize);
    } catch (err) {
      setError('Failed to load heroes. Please try again.');
      console.error('Error loading heroes:', err);
    } finally {
      setLoading(false);
      initialLoadCompleted.current = true;
    }
  }, [loading, currentStartId]);

  // Apply publisher filter whenever heroes or publisherFilter changes
  useEffect(() => {
    if (publisherFilter === 'All') {
      setFilteredHeroes(heroes);
    } else if (publisherFilter === 'Marvel Comics' || publisherFilter === 'DC Comics') {
      setFilteredHeroes(
        heroes.filter(hero => 
          hero.biography?.publisher === publisherFilter
        )
      );
    } else {
      setFilteredHeroes(
        heroes.filter(hero => 
          hero.biography?.publisher !== 'Marvel Comics' && 
          hero.biography?.publisher !== 'DC Comics'
        )
      );
    }
  }, [heroes, publisherFilter]);

  // Initial load
  useEffect(() => {
    if (!initialLoadCompleted.current) {
      loadMoreHeroes();
    }
  }, [loadMoreHeroes]);

  // Create fading cards for loading state
  const renderFadingCards = useMemo(() => 
    Array(8).fill(0).map((_, index) => (
      <FadingCard key={`fading-card-${index}`} />
    ))
  , []);

  // Generate empty state message
  const emptyStateMessage = useMemo(() => {
    if (heroes.length === 0) {
      return "No heroes loaded. Click \"Load More\" to begin.";
    }
    return `No ${publisherFilter !== 'All' ? publisherFilter : ''} heroes found.`;
  }, [heroes.length, publisherFilter]);

  return (
    <div className="grid-container">
      <div className="grid">
        {filteredHeroes.map((hero) => (
          <HeroCard key={hero.uuid} hero={hero} />
        ))}
        {loading && renderFadingCards}
      </div>
      
      {loading && (
        <div className="spinner-wrapper">
          <Spinner size="large" />
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      {filteredHeroes.length === 0 && !loading && !error && (
        <div className="no-heroes-message">
          {emptyStateMessage}
        </div>
      )}
      
      {!initialLoad && (
        <div className="load-more-container">
          <button className="button button-submit" onClick={loadMoreHeroes} disabled={loading}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Grid;