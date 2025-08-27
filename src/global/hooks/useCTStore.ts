import { create } from "zustand";
import type { ClassTest } from "../types/classTest.types";

export interface CTStore {
  testList: ClassTest[] | null;
  selectedTest: ClassTest | null;
  showStartTestModal: boolean;

  setTestList: (testList: ClassTest[] | null) => void;
  setSelectedTest: (test: ClassTest | null) => void;
  setShowStartTestModal: (show: boolean) => void;
  reset: () => void;
}

/**
 * Zustand store for managing class test list state.
 */
export const useCTStore = create<CTStore>((set) => ({
  testList: null,
  selectedTest: null,
  showStartTestModal: false,

  setTestList: (testList) => set({ testList }),
  setSelectedTest: (test) => set({ selectedTest: test }),
  setShowStartTestModal: (show) => set({ showStartTestModal: show }),

  reset: () => {
    set({
      testList: null,
      selectedTest: null,
      showStartTestModal: false,
    });
  },
}));
