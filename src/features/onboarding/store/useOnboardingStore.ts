import { create } from "zustand";
import { OnboardingPhase } from "../onboarding.types";

export interface OnboardingStore {
  currentPhase: OnboardingPhase;
  setCurrentPhase: (phase: OnboardingPhase) => void;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  currentPhase: OnboardingPhase.CourseCategory,
  setCurrentPhase: (phase) => set({ currentPhase: phase }),
}));

export default useOnboardingStore;