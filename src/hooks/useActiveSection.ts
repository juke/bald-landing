import { useState, useEffect } from 'react';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const baseTitle = '$BALD';
    const titles: Record<string, string> = {
      'home': `${baseTitle} | A Memecoin Revolution`,
      'public-good': `${baseTitle} | Public Good`,
      'distribution': `${baseTitle} | Distribution`,
      'progress': `${baseTitle} | Progress Tracker`,
    };

    // Handle initial hash navigation
    const initialHash = window.location.hash.slice(1) || 'home';
    const targetElement = document.getElementById(initialHash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(initialHash);
      document.title = titles[initialHash] || baseTitle;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When an element becomes more than 50% visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const newSection = entry.target.id;
            setActiveSection(newSection);
            // Update URL hash without triggering a scroll
            window.history.replaceState(null, '', `#${newSection}`);
            // Update page title when section changes
            document.title = titles[newSection] || baseTitle;
          }
        });
      },
      {
        threshold: [0.5], // Only trigger when element is 50% visible
        rootMargin: '-45px 0px', // Account for header height
      }
    );

    // Observe all sections
    document.querySelectorAll('.section-content').forEach((section) => {
      observer.observe(section);
    });

    // Handle hash changes from browser navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return activeSection;
}; 