import { create } from 'zustand';

interface ActiveSectionStore {
  activeSection: string;
  lastInteractionTime: number;
  setActiveSection: (section: string) => void;
  setLastInteractionTime: () => void;
}

export const useActiveSection = create<ActiveSectionStore>((set) => ({
  activeSection: 'home',
  lastInteractionTime: 0,
  setActiveSection: (section) => set({ activeSection: section }),
  setLastInteractionTime: () => set({ lastInteractionTime: Date.now() }),
})); 