import React from 'react';
import '../styles/FadingCard.css';

const FadingCard: React.FC = () => {
  return (
    <div className="card fading-card">
      <div className="card-image-container">
        <div className="fading-image pulse-animation"></div>
      </div>
      <div className="card-content">
        <div className="fading-title pulse-animation"></div>
        <div className="fading-text pulse-animation"></div>
        <div className="fading-button pulse-animation"></div>
      </div>
    </div>
  );
};

export default FadingCard; 