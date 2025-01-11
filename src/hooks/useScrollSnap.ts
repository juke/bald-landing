import { useEffect } from 'react';

interface UseScrollSnapProps {
  onSectionChange?: (sectionId: string) => void;
}

export const useScrollSnap = ({ onSectionChange }: UseScrollSnapProps) => {
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1280) {
      return;
    }

    let isScrolling = false;
    let lastScrollTime = Date.now();
    let accumulatedDelta = 0;
    const scrollCooldown = 800;
    const deltaThreshold = 50; // Threshold for touchpad scrolling
    const sections = Array.from(document.querySelectorAll('.section-content'));

    const getCurrentSectionIndex = () => {
      const viewportMiddle = window.innerHeight / 2;
      return sections.findIndex(section => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        return Math.abs(sectionMiddle - viewportMiddle) < rect.height / 2;
      });
    };

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sections.length || isScrolling) return;

      const now = Date.now();
      if (now - lastScrollTime < scrollCooldown) return;
      
      lastScrollTime = now;
      isScrolling = true;
      accumulatedDelta = 0; // Reset accumulated delta

      const section = sections[index];
      section.scrollIntoView({ behavior: 'smooth' });
      
      if (onSectionChange) {
        onSectionChange(section.id);
      }

      window.history.replaceState(null, '', `#${section.id}`);
      
      setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;

      // Accumulate delta values
      accumulatedDelta += Math.abs(e.deltaY);

      // Only trigger scroll after reaching threshold
      if (accumulatedDelta < deltaThreshold) return;

      const currentIndex = getCurrentSectionIndex();
      if (currentIndex === -1) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;
      
      if (nextIndex >= 0 && nextIndex < sections.length) {
        scrollToSection(nextIndex);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      const currentIndex = getCurrentSectionIndex();
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          nextIndex++;
          break;
        case 'ArrowUp':
        case 'PageUp':
          nextIndex--;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = sections.length - 1;
          break;
        default:
          return;
      }

      if (nextIndex >= 0 && nextIndex < sections.length) {
        e.preventDefault();
        scrollToSection(nextIndex);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSectionChange]);
}; 