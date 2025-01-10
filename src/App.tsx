import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PublicGoodSection from "@/components/PublicGoodSection";
import DistributionSection from "@/components/DistributionSection";
import ProgressTracker from "@/components/ProgressTracker";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import { useActiveSection } from '@/hooks/useActiveSection';
import { useEffect } from 'react';

function App() {
  const { activeSection, setActiveSection } = useActiveSection();
  useScrollSnap({ onSectionChange: setActiveSection });

  // Handle initial scroll
  useEffect(() => {
    const hash = window.location.hash;
    const sectionId = hash ? hash.split('?')[0].slice(1) : 'home';
    const element = document.getElementById(sectionId);
    if (element) {
      // Use requestAnimationFrame to ensure the scroll happens after the page is fully loaded
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'instant' });
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white">
      <Header />
      <div className="snap-container">
        <section id="home" className="section-content">
          <HeroSection />
        </section>
        <section id="public-good" className="section-content">
          <PublicGoodSection />
        </section>
        <section id="distribution" className="section-content">
          <DistributionSection />
        </section>
        <section id="progress" className="section-content">
          <ProgressTracker />
        </section>
      </div>
    </div>
  );
}

export default App;