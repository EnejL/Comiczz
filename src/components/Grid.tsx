import React, { useState, useEffect } from 'react';
import { Superhero } from '../types/superhero';
import { getHeroesBatch } from '../services/superheroApi';
import { HeroCard } from './HeroCard';
import '../styles/Grid.css';

// UUID generator
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

interface HeroWithUUID extends Superhero {
  uuid: string;
}

const Grid: React.FC = () => {
  const [heroes, setHeroes] = useState<HeroWithUUID[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStartId, setCurrentStartId] = useState(1);

  const loadMoreHeroes = async () => {
    setLoading(true);
    setError(null);
    try {
      const batchSize = 20;
      const responses = await getHeroesBatch(currentStartId, batchSize);

      const newHeroes = responses
        .filter(response => response.response === 'success')
        .map(hero => ({
          ...hero,
          uuid: generateUUID() // Guaranteed unique
        })) as HeroWithUUID[];

      setHeroes(prev => [...prev, ...newHeroes]);
      setCurrentStartId(currentStartId + batchSize);
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
          <HeroCard key={hero.uuid} hero={hero} />
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
