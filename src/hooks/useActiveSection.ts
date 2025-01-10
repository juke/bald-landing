import { create } from 'zustand';

// Get initial section from URL hash or default to 'home'
const getInitialSection = () => {
  const hash = window.location.hash;
  return hash ? hash.split('?')[0].slice(1) : 'home';
};

type ActiveSectionStore = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

export const useActiveSection = create<ActiveSectionStore>((set) => ({
  activeSection: getInitialSection(),
  setActiveSection: (section) => set({ activeSection: section }),
})); 