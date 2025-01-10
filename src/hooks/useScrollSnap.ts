import { useEffect } from 'react';

interface UseScrollSnapProps {
  onSectionChange?: (sectionId: string) => void;
}

export const useScrollSnap = ({ onSectionChange }: UseScrollSnapProps) => {
  useEffect(() => {
    // Only apply scroll snap on larger desktop screens (1280px and above)
    if (typeof window === 'undefined' || window.innerWidth < 1280) {
      return;
    }

    // Add resize listener to disable scroll snap when window is resized below 1280px
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('resize', handleResize);

    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let lastScrollTime = Date.now();
    const scrollCooldown = 100; // ms between scroll events

    const sections = Array.from(document.querySelectorAll('.section-content'));
    let currentSectionIndex = sections.findIndex(section => 
      section.getBoundingClientRect().top >= -100
    );

    const scrollToSection = (index: number) => {
      if (index >= 0 && index < sections.length) {
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;
        
        lastScrollTime = now;
        isScrolling = true;
        
        const section = sections[index];
        section.scrollIntoView({ behavior: 'smooth' });
        
        if (onSectionChange) {
          onSectionChange(section.id);
        }

        // Update URL without adding to history
        window.history.replaceState(null, '', `#${section.id}`);
        
        // Reset scrolling flag after animation
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentSectionIndex + direction;
      
      if (nextIndex >= 0 && nextIndex < sections.length) {
        e.preventDefault();
        scrollToSection(nextIndex);
        currentSectionIndex = nextIndex;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      let direction = 0;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        direction = 1;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        direction = -1;
      } else if (e.key === 'Home') {
        currentSectionIndex = 0;
        scrollToSection(0);
        return;
      } else if (e.key === 'End') {
        currentSectionIndex = sections.length - 1;
        scrollToSection(sections.length - 1);
        return;
      }

      if (direction !== 0) {
        e.preventDefault();
        const nextIndex = currentSectionIndex + direction;
        scrollToSection(nextIndex);
        currentSectionIndex = nextIndex;
      }
    };

    // Update current section on scroll
    const handleScroll = () => {
      if (!isScrolling) {
        const newIndex = sections.findIndex(section => {
          const rect = section.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 100;
        });
        
        if (newIndex !== -1) {
          currentSectionIndex = newIndex;
          if (onSectionChange) {
            onSectionChange(sections[newIndex].id);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
    };
  }, [onSectionChange]);
}; 