// stores/useAppStore.ts
import { create } from 'zustand';

interface AppState {
  customImageUrl: string;
  setCustomImage: (url: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  customImageUrl: '',
  setCustomImage: (url: string) => set({ customImageUrl: url }),
}));
