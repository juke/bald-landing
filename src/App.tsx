import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PublicGoodSection from "@/components/PublicGoodSection";
import DistributionSection from "@/components/DistributionSection";
import ProgressTracker from "@/components/ProgressTracker";
import { useScrollSnap } from "@/hooks/useScrollSnap";
import { useActiveSection } from '@/hooks/useActiveSection';
import { useEffect } from 'react';
import SectionDivider from "@/components/SectionDivider";

function App() {
  const { setActiveSection } = useActiveSection();
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
    <div className="relative min-h-screen w-full bg-black text-white">
      <Header />
      <div className="snap-container">
        <section id="home" className="section-content relative">
          <HeroSection />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <SectionDivider />
          </div>
        </section>
        <section id="public-good" className="section-content relative">
          <PublicGoodSection />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <SectionDivider />
          </div>
        </section>
        <section id="distribution" className="section-content relative">
          <DistributionSection />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <SectionDivider />
          </div>
        </section>
        <section id="progress" className="section-content relative">
          <ProgressTracker />
        </section>
      </div>
    </div>
  );
}

export default App;