import { create } from "zustand";
import { AIModalView, type ContentType } from "../test_simulator.types";

interface AiStore {
  isAiFeatureEnabled: boolean;
  setIsAiFeatureEnabled: (v: boolean) => void;
  currentModalView: AIModalView;
  setCurrentModalView: (modalView: AIModalView) => void;
  solution: string;
  setSolution: (solution: string) => void;
  studyMaterial: ContentType[] | null;
  setStudyMaterial: (contentList: ContentType[] | null) => void;

  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (v: boolean) => void;

  reset: () => void;
}

export const useAiStore = create<AiStore>((set) => ({
  isAiFeatureEnabled: false,
  setIsAiFeatureEnabled: (v) => set({ isAiFeatureEnabled: v }),
  currentModalView: AIModalView.Main,
  setCurrentModalView: (modalView) => set({ currentModalView: modalView }),

  solution: "",
  setSolution: (solution) => set({ solution: solution }),

  studyMaterial: null,
  setStudyMaterial: (contentList) => set({ studyMaterial: contentList }),

  isHelpModalOpen: false,
  setIsHelpModalOpen: (v) => set({ isHelpModalOpen: v }),

  reset: () =>
    set({
      currentModalView: AIModalView.Main,
      solution: "",
      isHelpModalOpen: false,
      isAiFeatureEnabled: false,
    }),
}));
