import { useEffect } from 'react';

export const useScrollSnap = () => {
  useEffect(() => {
    const container = document.querySelector('.snap-container');
    if (!container) return;

    let isScrolling = false;
    let lastScrollTime = 0;
    let accumulatedDelta = 0;
    const SCROLL_THRESHOLD = 50;
    const SCROLL_COOLDOWN = 800; // Increased to account for animation duration
    const sections = Array.from(document.querySelectorAll('.section-content'));

    const scrollToSection = (index: number) => {
      if (index >= 0 && index < sections.length && !isScrolling) {
        isScrolling = true;
        sections[index].scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setTimeout(() => {
          isScrolling = false;
        }, SCROLL_COOLDOWN);
      }
    };

    const handleScroll = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      wheelEvent.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime < SCROLL_COOLDOWN) {
        return;
      }

      accumulatedDelta += Math.abs(wheelEvent.deltaY);
      
      if (accumulatedDelta < SCROLL_THRESHOLD) {
        return;
      }

      const currentSection = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= 100;
      });

      if (currentSection === -1) return;

      lastScrollTime = now;
      accumulatedDelta = 0;

      if (wheelEvent.deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else {
        scrollToSection(currentSection - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const now = Date.now();
        if (now - lastScrollTime < SCROLL_COOLDOWN) {
          return;
        }

        const currentSection = sections.findIndex((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 100;
        });

        if (currentSection === -1) return;

        lastScrollTime = now;

        if (e.key === 'ArrowDown') {
          scrollToSection(currentSection + 1);
        } else {
          scrollToSection(currentSection - 1);
        }
      }
    };

    container.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}; 