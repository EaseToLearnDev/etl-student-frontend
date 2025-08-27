import { create } from "zustand";
import type { PrevRunningTest } from "../../shared/types";

interface PrevTestStore {
  prevRunningTest: PrevRunningTest | null;
  setPrevRunningTest: (prevTest: PrevRunningTest | null) => void;
}

export const usePrevTestStore = create<PrevTestStore>((set) => ({
  prevRunningTest: null,
  setPrevRunningTest: (prevTest) => set({ prevRunningTest: prevTest }),
}));
