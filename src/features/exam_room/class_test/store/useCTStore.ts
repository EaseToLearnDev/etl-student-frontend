import { create } from "zustand";
import type { ClassTestType } from "../classTest.types";

export interface CTStore {
  testList: ClassTestType[] | null;
  setTestList: (testList: ClassTestType[] | null) => void;
  reset: () => void;
}

export const useCTStore = create<CTStore>((set) => ({
  testList: null,

  setTestList: (testList) => set({ testList }),

  reset: () => {
    set({
      testList: null,
    });
  },
}));
