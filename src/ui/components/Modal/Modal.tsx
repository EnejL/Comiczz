import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Modal = ({
  open,
  onClose,
  children,
  fullWidth = false,
  className = ''
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={`${styles.modal} ${fullWidth ? styles.fullWidth : ''} ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ✕
        </button>
        {children}
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
  <div className={`${styles.header} ${className}`}>
    {children}
  </div>
);

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className = '' }: ModalContentProps) => (
  <div className={`${styles.content} ${className}`}>
    {children}
  </div>
);

interface ModalActionsProps {
  children: ReactNode;
  className?: string;
}

export const ModalActions = ({ children, className = '' }: ModalActionsProps) => (
  <div className={`${styles.actions} ${className}`}>
    {children}
  </div>
); 