import { create } from "zustand";
import type { MockTestCategoryType } from "../../../shared/types";

export interface MTStore {
  testList: MockTestCategoryType[] | null;

  setTestList: (testList: MockTestCategoryType[] | null) => void;

  reset: () => void;
}

export const useMTStore = create<MTStore>((set) => ({
  testList: null,

  setTestList: (testList) => set({ testList }),

  reset: () => {
    set({
      testList: null,
    });
  },
}));
