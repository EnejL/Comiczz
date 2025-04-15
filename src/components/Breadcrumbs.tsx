import '../styles/Breadcrumbs.css';

export const Breadcrumbs = () => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs-list container">
        <li className="breadcrumbs-item">
          <a href="/" className="breadcrumbs-link">Home</a>
        </li>
        <li className="breadcrumbs-item">
          <span className="breadcrumbs-link">&gt; Comics</span>
        </li>
      </ul>
    </nav>
  );
}; 