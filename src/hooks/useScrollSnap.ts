import { useEffect } from 'react';

interface UseScrollSnapProps {
  onSectionChange?: (sectionId: string) => void;
}

export const useScrollSnap = ({ onSectionChange }: UseScrollSnapProps) => {
  useEffect(() => {
    // Only apply scroll snap on desktop
    if (window.innerWidth < 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && onSectionChange) {
            onSectionChange(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px',
        threshold: 0,
      }
    );

    document.querySelectorAll('.section-content').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [onSectionChange]);
}; 