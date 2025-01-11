import { useEffect } from 'react';

interface UseScrollSnapProps {
  onSectionChange?: (sectionId: string) => void;
}

export const useScrollSnap = ({ onSectionChange }: UseScrollSnapProps) => {
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1280) {
      return;
    }

    const sections = Array.from(document.querySelectorAll('.section-content'));
    
    const handleScroll = () => {
      // Use Intersection Observer instead of scroll events
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            if (onSectionChange) {
              onSectionChange(sectionId);
            }
          }
        });
      }, {
        threshold: 0.5,
        rootMargin: '0px'
      });

      sections.forEach(section => observer.observe(section));

      return () => observer.disconnect();
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onSectionChange]);
}; 