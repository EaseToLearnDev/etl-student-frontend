import { create } from "zustand";

interface TutorialStore {
  showTutorialModal: boolean;
  setShowTutorialModal: (value: boolean) => void;
}

export const useTutorialStore = create<TutorialStore>((set) => ({
  showTutorialModal: false,

  setShowTutorialModal: (value) => set({ showTutorialModal: value }),
}));
