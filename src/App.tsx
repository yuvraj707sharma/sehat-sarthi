import { useLenis } from './hooks/useLenis';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Solutions from './sections/Solutions';
import HowItWorks from './sections/HowItWorks';
import TechVision from './sections/TechVision';
import Team from './sections/Team';
import Footer from './sections/Footer';

export default function App() {
  useLenis();
  useScrollAnimation();

  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <Problem />
      <Solutions />
      <HowItWorks />
      <TechVision />
      <Team />
      <Footer />
    </div>
  );
}
