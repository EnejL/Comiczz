import { Superhero } from '../types/superhero';
import { useEffect } from 'react';

interface HeroDialogProps {
  hero: Superhero;
  open: boolean;
  onClose: () => void;
}

export const HeroDialog = ({ hero, open, onClose }: HeroDialogProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog" onClick={onClose}>
      <div className="dialog-content" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{hero.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-full transition-fast"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              src={hero.image.url}
              alt={hero.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <section>
              <h3 className="text-lg font-bold mb-2">Biography</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm"><span className="font-bold">Real Name:</span> {hero.biography['full-name']}</p>
                <p className="text-sm"><span className="font-bold">Publisher:</span> {hero.biography.publisher}</p>
                <p className="text-sm"><span className="font-bold">Alignment:</span> {hero.biography.alignment}</p>
                <p className="text-sm"><span className="font-bold">First Appearance:</span> {hero.biography['first-appearance']}</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Appearance</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm"><span className="font-bold">Gender:</span> {hero.appearance.gender}</p>
                <p className="text-sm"><span className="font-bold">Race:</span> {hero.appearance.race}</p>
                <p className="text-sm"><span className="font-bold">Height:</span> {hero.appearance.height[1]}</p>
                <p className="text-sm"><span className="font-bold">Weight:</span> {hero.appearance.weight[1]}</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-2">Powerstats</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-sm"><span className="font-bold">Intelligence:</span> {hero.powerstats.intelligence}</p>
                <p className="text-sm"><span className="font-bold">Strength:</span> {hero.powerstats.strength}</p>
                <p className="text-sm"><span className="font-bold">Speed:</span> {hero.powerstats.speed}</p>
                <p className="text-sm"><span className="font-bold">Durability:</span> {hero.powerstats.durability}</p>
                <p className="text-sm"><span className="font-bold">Power:</span> {hero.powerstats.power}</p>
                <p className="text-sm"><span className="font-bold">Combat:</span> {hero.powerstats.combat}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}; 