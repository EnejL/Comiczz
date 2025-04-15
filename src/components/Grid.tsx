import React, { useState, useEffect } from 'react';
import { Superhero } from '../types/superhero';
import { getHeroesBatch } from '../services/superheroApi';
import { HeroCard } from './HeroCard';
import '../styles/Grid.css';

interface HeroWithIndex extends Superhero {
  uniqueIndex: number;
}

const Grid: React.FC = () => {
  const [heroes, setHeroes] = useState<HeroWithIndex[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uniqueIndex, setUniqueIndex] = useState(0);

  const loadMoreHeroes = async () => {
    setLoading(true);
    setError(null);
    try {
      const startId = heroes.length + 1;
      const batchSize = 12;
      const responses = await getHeroesBatch(startId, batchSize);

      const newHeroes = responses.map((response) => {
        if (response.response === 'success') {
          return {
            ...response,
            uniqueIndex: uniqueIndex + 1
          };
        }
        return null;
      }).filter((hero): hero is HeroWithIndex => hero !== null);

      setHeroes(prev => [...prev, ...newHeroes]);
      setUniqueIndex(prev => prev + newHeroes.length);
    } catch (err) {
      setError('Failed to load heroes. Please try again.');
      console.error('Error loading heroes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreHeroes();
  }, []);

  return (
    <div className="grid-container">
      <div className="grid">
        {heroes.map((hero) => (
          <HeroCard key={`${hero.id}-${hero.uniqueIndex}`} hero={hero} />
        ))}
      </div>
      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="load-more-container">
        <button className="load-more-button" onClick={loadMoreHeroes} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default Grid; 