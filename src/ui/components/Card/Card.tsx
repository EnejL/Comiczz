import { ReactNode } from 'react';
import styles from './Card.module.css';

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
  const classes = [
    styles.card,
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage = ({ src, alt, className = '' }: CardImageProps) => (
  <img className={`${styles.image} ${className}`} src={src} alt={alt} />
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = '' }: CardContentProps) => (
  <div className={`${styles.content} ${className}`}>
    {children}
  </div>
);

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

export const CardActions = ({ children, className = '' }: CardActionsProps) => (
  <div className={`${styles.actions} ${className}`}>
    {children}
  </div>
); 