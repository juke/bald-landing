import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PublicGoodSection from "@/components/PublicGoodSection";
import DistributionSection from "@/components/DistributionSection";
import ProgressTracker from "@/components/ProgressTracker";
import { useActiveSection } from '@/hooks/useActiveSection';
import { useEffect, useRef } from 'react';
import SectionDivider from "@/components/SectionDivider";

function App() {
  const { setActiveSection, lastInteractionTime } = useActiveSection();
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle initial hash on page load
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Set initial section with smooth scroll
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(hash);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && 
              entry.intersectionRatio >= 0.3 && 
              Date.now() - lastInteractionTime > 500) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
            window.history.replaceState(null, '', `#${sectionId}`);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20px 0px -20px 0px'
      }
    );

    const sections = document.querySelectorAll('.section-content');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection, lastInteractionTime]);

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <Header />
      <div ref={sectionsRef} className="h-screen overflow-y-auto md:snap-y md:snap-mandatory scrollbar-hide">
        <section id="home" className="section-content relative min-h-screen h-screen md:snap-start">
          <HeroSection />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <SectionDivider 
              isLastSection={false}
              nextSection="public-good"
            />
          </div>
        </section>
        <section id="public-good" className="section-content relative min-h-screen h-screen md:snap-start">
          <PublicGoodSection />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <SectionDivider 
              isLastSection={false}
              nextSection="distribution"
            />
          </div>
        </section>
        <section id="distribution" className="section-content relative min-h-screen h-screen md:snap-start">
          <DistributionSection />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <SectionDivider 
              isLastSection={false}
              nextSection="progress"
            />
          </div>
        </section>
        <section id="progress" className="section-content relative min-h-screen h-screen md:snap-start">
          <ProgressTracker />
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <SectionDivider 
              isLastSection={true}
              nextSection="home"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;