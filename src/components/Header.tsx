import '../styles/Header.css';
import whooshLogo from '../assets/whoosh_logo.png';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-logo">
          <img src={whooshLogo} alt="Whoosh Logo" />
        </div>
      </div>
    </header>
  );
}; 