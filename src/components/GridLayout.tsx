import { ReactNode } from 'react';

interface GridLayoutProps {
  children: ReactNode;
}

export const GridLayout = ({ children }: GridLayoutProps) => {
  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  );
}; 