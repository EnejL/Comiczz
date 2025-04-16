import '../styles/Breadcrumbs.css';
import { PublisherFilter } from '../types/filters';

interface BreadcrumbsProps {
  currentFilter: PublisherFilter;
}

export const Breadcrumbs = ({ currentFilter }: BreadcrumbsProps) => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs-list container">
        <li className="breadcrumbs-item">
          <a href="/" className="breadcrumbs-link">Home</a>
        </li>
        <li className="breadcrumbs-item">
          <span className="breadcrumbs-link">&gt; Comics</span>
        </li>
        {currentFilter !== 'All' && (
          <li className="breadcrumbs-item">
            <span className="breadcrumbs-link">&gt; {currentFilter}</span>
          </li>
        )}
      </ul>
    </nav>
  );
}; 