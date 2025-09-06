import { create } from "zustand";

interface TeacherSupportStore {
  feedback: string;
  setFeedback: (feedback: string) => void;
  isTeacherSupportModalOpen: boolean;
  setIsTeacherSupportModalOpen: (v: boolean) => void;

  reset: () => void;
}

export const useTeacherSupportStore = create<TeacherSupportStore>((set) => ({
  feedback: "",
  setFeedback: (feedback) => set({ feedback }),

  isTeacherSupportModalOpen: false,
  setIsTeacherSupportModalOpen: (v) => set({ isTeacherSupportModalOpen: v }),

  reset: () =>
    set({
      feedback: "",
    }),
}));
