import { useState } from 'react';
import { Superhero } from '../types/superhero';
import { HeroDialog } from './HeroDialog';

interface HeroCardProps {
  hero: Superhero;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <>
      <div className="card" onClick={handleOpenDialog}>
        <div className="relative">
          <img
            src={hero.image.url}
            alt={hero.name}
            className="w-full h-48 object-cover rounded-t-lg"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
            <h3 className="text-white font-bold">{hero.name}</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              <span className="font-bold">Real Name:</span> {hero.biography['full-name']}
            </p>
            <p className="text-sm">
              <span className="font-bold">Publisher:</span> {hero.biography.publisher}
            </p>
          </div>
        </div>
      </div>

      <HeroDialog
        hero={hero}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}; 