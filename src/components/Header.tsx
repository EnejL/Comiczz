import '../styles/Header.css';
import whooshLogo from '../assets/whoosh_logo.png';
import { PublisherFilter, publisherFilters } from '../types/filters';

interface HeaderProps {
  currentFilter: PublisherFilter;
  onFilterChange: (filter: PublisherFilter) => void;
}

export const Header = ({ currentFilter, onFilterChange }: HeaderProps) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo">
            <img src={whooshLogo} alt="Whoosh Logo" />
          </div>
          <nav className="header-nav">
            <ul className="nav-list">
              {publisherFilters.map(filter => (
                <li key={filter} className="nav-item">
                  <button 
                    className={`nav-link ${currentFilter === filter ? 'active' : ''}`}
                    onClick={() => onFilterChange(filter)}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}; 