export const Breadcrumbs = () => {
  return (
    <nav className="container py-4">
      <div className="flex items-center gap-2">
        <a href="/" className="text-primary hover:underline">Home</a>
        <span className="text-secondary">/</span>
        <span className="text-disabled">Browse</span>
      </div>
    </nav>
  );
}; 