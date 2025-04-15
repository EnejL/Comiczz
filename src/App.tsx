import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import Grid from './components/Grid';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Breadcrumbs />
      <Grid />
    </div>
  );
}
