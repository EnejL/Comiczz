import { HeroGrid } from './components/HeroGrid';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ThemeProvider } from './ui/theme/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface">
        <Header />
        <Breadcrumbs />
        <HeroGrid />
      </div>
    </ThemeProvider>
  );
}
