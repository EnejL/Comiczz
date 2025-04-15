import { ReactNode } from 'react';
import '../styles/Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  className = '',
  loading = false,
  onClick
}: CardProps) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {loading ? (
        <div className="card-loading">Loading...</div>
      ) : (
        children
      )}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage = ({ src, alt, className = '' }: CardImageProps) => (
  <img src={src} alt={alt} className={`card-image ${className}`} />
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`card-content ${className}`}>{children}</div>
);

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

export const CardActions = ({ children, className = '' }: CardActionsProps) => (
  <div className={`card-actions ${className}`}>{children}</div>
); 