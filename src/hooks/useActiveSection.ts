import { create } from 'zustand';

interface ActiveSectionStore {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isScrolling: boolean;
  setIsScrolling: (scrolling: boolean) => void;
}

const getInitialSection = () => {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash;
  return hash ? hash.split('?')[0].slice(1) : 'home';
};

export const useActiveSection = create<ActiveSectionStore>((set) => ({
  activeSection: getInitialSection(),
  setActiveSection: (section) => set({ activeSection: section }),
  isScrolling: false,
  setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),
})); 