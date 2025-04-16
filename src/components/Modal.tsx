import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Superhero } from '../types/superhero';
import '../styles/Modal.css';

interface ModalProps {
  hero: Superhero;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ hero, open, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // Handle empty or null values
  const formatValue = (value: string | null | undefined) => {
    if (!value || value === '-' || value === 'null') {
      return 'Unknown';
    }
    return value;
  };

  if (!open) return null;

  // Biography fields to display
  const biographyFields = [
    { key: 'full-name' as const, label: 'Full Name' },
    { key: 'alter-egos' as const, label: 'Alter Egos' },
    { key: 'place-of-birth' as const, label: 'Place of Birth' },
    { key: 'first-appearance' as const, label: 'First Appearance' },
    { key: 'publisher' as const, label: 'Publisher' },
    { key: 'alignment' as const, label: 'Alignment' }
  ];

  // Power stats to display
  const powerStats = [
    { key: 'intelligence' as const, label: 'Intelligence' },
    { key: 'strength' as const, label: 'Strength' },
    { key: 'speed' as const, label: 'Speed' },
    { key: 'durability' as const, label: 'Durability' },
    { key: 'power' as const, label: 'Power' },
    { key: 'combat' as const, label: 'Combat' }
  ];

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="modal-content">
          <div className="modal-body">
            <img 
              src={hero.image.url} 
              alt={hero.name} 
              className="modal-image"
            />
            <div className="modal-details">
              <h2 className="modal-title">{hero.name}</h2>
              
              <div className="biography-section">
                {biographyFields.map(field => (
                  <div className="biography-item" key={field.key}>
                    <span className="biography-label">{field.label}:</span>
                    <span className="biography-value">
                      {formatValue(hero.biography[field.key])}
                    </span>
                  </div>
                ))}
              </div>

              <h3>Power Stats</h3>
              <div className="power-stats">
                {powerStats.map(stat => (
                  <div className="power-stat" key={stat.key}>
                    <span className="power-stat-label">{stat.label}:</span>
                    <div className="power-stat-bar-container">
                      <div 
                        className="power-stat-bar"
                        style={{ width: `${hero.powerstats[stat.key]}%` }}
                      ></div>
                      <span className="power-stat-value">
                        {hero.powerstats[stat.key]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}; 