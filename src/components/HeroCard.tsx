import { useState, useRef, useEffect } from 'react';
import { Superhero } from '../types/superhero';
import { Modal } from './Modal';
import { Button } from './Button';
import '../styles/Card.css';

interface HeroCardProps {
  hero: Superhero;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // Check if image is already cached by the client
    if (imageRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    console.warn(`Failed to load image for hero: ${hero.name}`);
    setImageLoaded(true); // Remove loading state even on error
  };

  return (
    <>
      <div className="card">
        <div className="card-image-container">
          {!imageLoaded && <div className="card-image-placeholder pulse-animation"></div>}
          <img
            ref={imageRef}
            src={hero.image.url}
            alt={hero.name}
            loading="lazy"
            className={`card-image ${imageLoaded ? 'card-image-loaded' : 'card-image-loading'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        <div className="card-content">
          <h3 className="card-title">{hero.name}</h3>
          <p className="card-text">
            {hero.biography.publisher}
          </p>
          <Button 
            variant="info" 
            onClick={handleOpenDialog}
          >
            More Info
          </Button>
        </div>
      </div>

      <Modal
        hero={hero}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}; 