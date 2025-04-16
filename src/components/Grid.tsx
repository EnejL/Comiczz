import React, { useState, useEffect, useRef } from 'react';
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
  const initialLoadCompleted = useRef(false);

  const loadMoreHeroes = async () => {
    // Prevent multiple simultaneous loads
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const batchSize = 20;
      const responses = await getHeroesBatch(currentStartId, batchSize);

      // Log the raw API responses
      console.log('Superhero API Responses:', responses);

      const newHeroes = responses
        .filter(response => response.response === 'success')
        .map(hero => ({
          ...hero,
          uuid: generateUUID()
        })) as HeroWithUUID[];

      // Log the processed heroes with UUIDs
      console.log('Processed heroes with UUIDs:', newHeroes);

      setHeroes(prev => [...prev, ...newHeroes]);
      setCurrentStartId(currentStartId + batchSize);
    } catch (err) {
      setError('Failed to load heroes. Please try again.');
      console.error('Error loading heroes:', err);
    } finally {
      setLoading(false);
      initialLoadCompleted.current = true;
    }
  };

  // Initial load effect
  useEffect(() => {
    if (!initialLoadCompleted.current) {
      loadMoreHeroes();
    }
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
      {heroes.length === 0 && !loading && !error && (
        <div className="no-heroes-message">No heroes loaded. Click "Load More" to begin.</div>
      )}
      <div className="load-more-container">
        <button className="button button-submit" onClick={loadMoreHeroes} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default Grid;
