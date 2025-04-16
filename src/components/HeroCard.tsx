import { useState } from 'react';
import { Superhero } from '../types/superhero';
import { Modal } from './Modal';
import { Button } from './Button';
import '../styles/Card.css';

interface HeroCardProps {
  hero: Superhero;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <div className="card">
        <div className="card-image-container">
          <img
            src={hero.image.url}
            alt={hero.name}
            loading="lazy"
            className="card-image"
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