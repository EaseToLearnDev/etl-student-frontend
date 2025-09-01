import { create } from "zustand";
import { AIModalView } from "../test_simulator.types";

interface AiStore {
  currentModalView: AIModalView;
  setCurrentModalView: (modalView: AIModalView) => void;

  reset: () => void;
}

export const useAiStore = create<AiStore>((set) => ({
  currentModalView: AIModalView.AIContent,

  setCurrentModalView: (modalView) => set({ currentModalView: modalView }),

  reset: () =>
    set({
      currentModalView: AIModalView.AIContent,
    }),
}));
