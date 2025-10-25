import { create } from "zustand";
import { AIModalView } from "../test_simulator.types";
import type { Content } from "../../study_room/study_material/sm.types";

interface AiStore {
  isAiFeatureEnabled: boolean;
  setIsAiFeatureEnabled: (v: boolean) => void;
  currentModalView: AIModalView;
  setCurrentModalView: (modalView: AIModalView) => void;
  solution: string;
  setSolution: (solution: string) => void;
  studyMaterial: Content[] | null;
  setStudyMaterial: (contentList: Content[] | null) => void;

  selectedContent: Content | null;
  setSelectedContent: (content: Content | null) => void;

  textContent: Content | null;
  setTextContent: (text: Content | null) => void;

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

  selectedContent: null,
  setSelectedContent: (content) => set({ selectedContent: content }),

  textContent: null,
  setTextContent: (text) => set({ textContent: text }),

  isHelpModalOpen: false,
  setIsHelpModalOpen: (v) => set({ isHelpModalOpen: v }),

  reset: () =>
    set({
      currentModalView: AIModalView.Main,
      solution: "",
      isHelpModalOpen: false,
      isAiFeatureEnabled: false,
      selectedContent: null,
      textContent: null,
    }),
}));
