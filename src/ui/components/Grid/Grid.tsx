import { ReactNode } from 'react';
import styles from './Grid.module.css';

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Grid = ({ children, cols = 6, className = '' }: GridProps) => {
  return (
    <div className={`${styles.container} ${styles[`cols${cols}`]} ${className}`}>
      {children}
    </div>
  );
};

interface GridItemProps {
  children: ReactNode;
  className?: string;
}

export const GridItem = ({ children, className = '' }: GridItemProps) => {
  return (
    <div className={`${styles.item} ${className}`}>
      {children}
    </div>
  );
}; 