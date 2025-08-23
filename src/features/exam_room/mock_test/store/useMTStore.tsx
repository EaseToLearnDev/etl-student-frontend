import { create } from "zustand";
import type { MockTest, MockTestCategory } from "../../../shared/types";

export interface MTStore {
  testList: MockTestCategory[] | null;
  setTestList: (testList: MockTestCategory[] | null) => void;

  selectedTest: MockTest | null;
  setSelectedTest: (test: MockTest | null) => void;

  showStartTestModal: boolean;
  showPreviousTestModal: boolean;

  setShowStartTestModal: (show: boolean) => void;
  setShowPreviousTestModal: (show: boolean) => void;

  reset: () => void;
}

export const useMTStore = create<MTStore>((set) => ({
  testList: null,
  selectedTest: null,
  showStartTestModal: false,
  showPreviousTestModal: false,

  setTestList: (testList) => set({ testList }),
  setSelectedTest: (test) => set({ selectedTest: test }),

  setShowStartTestModal: (show) => set({ showStartTestModal: show }),
  setShowPreviousTestModal: (show) => set({ showPreviousTestModal: show }),

  reset: () => {
    set({
      testList: null,
      selectedTest: null,
      showStartTestModal: false,
      showPreviousTestModal: false,
    });
  },
}));
