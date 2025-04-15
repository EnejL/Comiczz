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

  if (!open) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="modal-content">
          <h2 className="modal-title">{hero.name}</h2>
          <div className="modal-body">
            <img 
              src={hero.image.url} 
              alt={hero.name} 
              className="modal-image"
            />
            <div className="modal-details">
              <h3>Biography</h3>
              <p>Full Name: {hero.biography['full-name']}</p>
              <p>Alter Egos: {hero.biography['alter-egos']}</p>
              <p>Place of Birth: {hero.biography['place-of-birth']}</p>
              <p>First Appearance: {hero.biography['first-appearance']}</p>
              <p>Publisher: {hero.biography.publisher}</p>
              <p>Alignment: {hero.biography.alignment}</p>

              <h3>Power Stats</h3>
              <div className="power-stats">
                <p>Intelligence: {hero.powerstats.intelligence}</p>
                <p>Strength: {hero.powerstats.strength}</p>
                <p>Speed: {hero.powerstats.speed}</p>
                <p>Durability: {hero.powerstats.durability}</p>
                <p>Power: {hero.powerstats.power}</p>
                <p>Combat: {hero.powerstats.combat}</p>
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