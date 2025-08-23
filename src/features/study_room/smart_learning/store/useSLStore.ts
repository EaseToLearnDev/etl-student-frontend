// Store
import { create } from "zustand";

// Types
import { type PrevRunningTest, type Topic } from "../../../shared/types";
import type { ModeType } from "../sl.types";

interface SLStore {
  // Topic data structures
  topicTree: Topic[] | null;
  topicFlatList: Topic[] | null;
  selectedTopicId: number | null;

  // Session state
  lastSelfTestPercentage: number | null;
  mode: ModeType;
  previousRunningTest: PrevRunningTest | null;

  // Modal visibility
  showStartTestModal: boolean;
  showPreviousTestModal: boolean;

  // Test configuration
  testOptions: Record<string, number>;

  // Actions
  setTopicTree: (tree: Topic[] | null) => void;
  setTopicFlatList: (list: Topic[] | null) => void;
  setSelectedTopicId: (id: number | null) => void;
  setLastSelfTestPercentage: (value: number | null) => void;
  setMode: (mode: ModeType) => void;
  setPreviousRunningTest: (test: PrevRunningTest | null) => void;
  setShowStartTestModal: (show: boolean) => void;
  setShowPreviousTestModal: (show: boolean) => void;
  setTestOptions: (options: Record<string, number>) => void;

  getSelectedTopic: () => Topic | null;
  reset: () => void;
}

/**
 * Zustand store for managing Smart Learning feature state and actions.
 */
export const useSLStore = create<SLStore>((set, get) => ({
  // Initial State
  topicTree: null,
  topicFlatList: null,
  selectedTopicId: null,

  lastSelfTestPercentage: null,
  mode: "learning",
  previousRunningTest: null,

  showStartTestModal: false,
  showPreviousTestModal: false,

  testOptions: {
    totalQuestion: 20,
    totalTime: 60,
    marksCorrectAns: 1,
    marksIncorrectAns: -1,
    marksNotAttempted: 0,
  },

  // Actions
  setTopicTree: (tree) => set({ topicTree: tree }),
  setTopicFlatList: (list) => set({ topicFlatList: list }),
  setSelectedTopicId: (id) => set({ selectedTopicId: id }),
  setLastSelfTestPercentage: (value) => set({ lastSelfTestPercentage: value }),
  setMode: (mode) => set({ mode }),
  setPreviousRunningTest: (test) => set({ previousRunningTest: test }),
  setShowStartTestModal: (show) => set({ showStartTestModal: show }),
  setShowPreviousTestModal: (show) => set({ showPreviousTestModal: show }),
  setTestOptions: (options) => set({ testOptions: options }),
  getSelectedTopic: () => {
    const { selectedTopicId, topicFlatList } = get();
    if (!selectedTopicId || !topicFlatList) return null;
    return topicFlatList.find((t) => t.topicId === selectedTopicId) ?? null;
  },
  reset: () =>
    set({
      topicTree: null,
      topicFlatList: null,
      selectedTopicId: null,
      lastSelfTestPercentage: null,
      mode: "learning",
      previousRunningTest: null,
      showStartTestModal: false,
      showPreviousTestModal: false,
      testOptions: {
        totalQuestion: 20,
        totalTime: 60,
        marksCorrectAns: 1,
        marksIncorrectAns: -1,
        marksNotAttempted: 0,
      },
    }),
}));
