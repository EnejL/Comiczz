import React from 'react';
import '../styles/Spinner.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium',
  color
}) => {
  return (
    <div className={`spinner-container spinner-${size}`}>
      <div 
        className="spinner" 
        style={color ? { borderTopColor: color } : undefined}
      ></div>
    </div>
  );
}; 