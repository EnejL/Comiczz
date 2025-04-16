import { ReactNode, useEffect } from 'react';
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

  // Helper function to handle empty or null values
  const formatValue = (value: string | null | undefined) => {
    if (!value || value === '-' || value === 'null') {
      return 'Unknown';
    }
    return value;
  };

  if (!open) return null;

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
                <div className="biography-item">
                  <span className="biography-label">Full Name:</span>
                  <span className="biography-value">{formatValue(hero.biography['full-name'])}</span>
                </div>
                <div className="biography-item">
                  <span className="biography-label">Alter Egos:</span>
                  <span className="biography-value">{formatValue(hero.biography['alter-egos'])}</span>
                </div>
                <div className="biography-item">
                  <span className="biography-label">Place of Birth:</span>
                  <span className="biography-value">{formatValue(hero.biography['place-of-birth'])}</span>
                </div>
                <div className="biography-item">
                  <span className="biography-label">First Appearance:</span>
                  <span className="biography-value">{formatValue(hero.biography['first-appearance'])}</span>
                </div>
                <div className="biography-item">
                  <span className="biography-label">Publisher:</span>
                  <span className="biography-value">{formatValue(hero.biography.publisher)}</span>
                </div>
                <div className="biography-item">
                  <span className="biography-label">Alignment:</span>
                  <span className="biography-value">{formatValue(hero.biography.alignment)}</span>
                </div>
              </div>

              <h3>Power Stats</h3>
              <div className="power-stats">
                <div className="power-stat">
                  <span className="power-stat-label">Intelligence:</span>
                  <div className="power-stat-bar-container">
                    <div 
                      className="power-stat-bar"
                      style={{ width: `${hero.powerstats.intelligence}%` }}
                    ></div>
                    <span className="power-stat-value">{hero.powerstats.intelligence}</span>
                  </div>
                </div>
                <div className="power-stat">
                  <span className="power-stat-label">Strength:</span>
                  <div className="power-stat-bar-container">
                    <div 
                      className="power-stat-bar"
                      style={{ width: `${hero.powerstats.strength}%` }}
                    ></div>
                    <span className="power-stat-value">{hero.powerstats.strength}</span>
                  </div>
                </div>
                <div className="power-stat">
                  <span className="power-stat-label">Speed:</span>
                  <div className="power-stat-bar-container">
                    <div 
                      className="power-stat-bar"
                      style={{ width: `${hero.powerstats.speed}%` }}
                    ></div>
                    <span className="power-stat-value">{hero.powerstats.speed}</span>
                  </div>
                </div>
                <div className="power-stat">
                  <span className="power-stat-label">Durability:</span>
                  <div className="power-stat-bar-container">
                    <div 
                      className="power-stat-bar"
                      style={{ width: `${hero.powerstats.durability}%` }}
                    ></div>
                    <span className="power-stat-value">{hero.powerstats.durability}</span>
                  </div>
                </div>
                <div className="power-stat">
                  <span className="power-stat-label">Power:</span>
                  <div className="power-stat-bar-container">
                    <div 
                      className="power-stat-bar"
                      style={{ width: `${hero.powerstats.power}%` }}
                    ></div>
                    <span className="power-stat-value">{hero.powerstats.power}</span>
                  </div>
                </div>
                <div className="power-stat">
                  <span className="power-stat-label">Combat:</span>
                  <div className="power-stat-bar-container">
                    <div 
                      className="power-stat-bar"
                      style={{ width: `${hero.powerstats.combat}%` }}
                    ></div>
                    <span className="power-stat-value">{hero.powerstats.combat}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

export const ModalHeader = ({ children, className = '' }: ModalHeaderProps) => (
  <div className={`modal-title ${className}`}>{children}</div>
);

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className = '' }: ModalContentProps) => (
  <div className={`modal-content ${className}`}>{children}</div>
);

interface ModalActionsProps {
  children: ReactNode;
  className?: string;
}

export const ModalActions = ({ children, className = '' }: ModalActionsProps) => (
  <div className={`modal-actions ${className}`}>{children}</div>
); 