import { useState } from 'react';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import Grid from './components/Grid';
import { PublisherFilter } from './types/filters';

export default function App() {
  const [currentFilter, setCurrentFilter] = useState<PublisherFilter>('All');

  return (
    <div className="app">
      <Header 
        currentFilter={currentFilter} 
        onFilterChange={setCurrentFilter} 
      />
      <Breadcrumbs currentFilter={currentFilter} />
      <Grid publisherFilter={currentFilter} />
    </div>
  );
}
