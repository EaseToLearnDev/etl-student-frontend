// Store
import { create } from "zustand";

// Types
import {
  type ModeType,
  type PrevRunningTest,
  type TestOption,
  type TestOptions,
  type Topic,
} from "../../../shared/types";

interface SharedLearningStore {
  // Topic data structures
  topicTree: Topic[] | null;
  topicFlatList: Topic[] | null;
  selectedTopicId: number | null;

  // Session state
  lastSelfTestPercentage: number | null;
  mode: ModeType;
  barColor: string | null;
  previousRunningTest: PrevRunningTest | null;

  // Modal visibility
  showStartTestModal: boolean;
  showPreviousTestModal: boolean;

  // Test configuration
  testOptions: TestOptions;
  selectedTestOption: TestOption;

  // Actions
  setTopicTree: (tree: Topic[] | null) => void;
  setTopicFlatList: (list: Topic[] | null) => void;
  setSelectedTopicId: (id: number | null) => void;
  setLastSelfTestPercentage: (value: number | null) => void;
  setMode: (mode: ModeType) => void;
  setPreviousRunningTest: (test: PrevRunningTest | null) => void;
  setShowStartTestModal: (show: boolean) => void;
  setShowPreviousTestModal: (show: boolean) => void;
  setTestOptions: (options: TestOptions) => void;
  setSelectedTestOption: (option: TestOption) => void;
  setBarColor: (barColor: string | null) => void;

  getSelectedTopic: () => Topic | null;
  reset: () => void;
}

export const defaultTestOptions: TestOptions = [
  {
    examType: "objective",
    totalQuestions: 20,
    totalQuestionsKwd: 5,
    duration: 60,
    marksCorrectAns: 1,
    marksIncorrectAns: -0.25,
    marksNotAnswer: 0,
    questionTypeList: [],
  },
];

/**
 * Zustand store for managing Smart Learning feature state and actions.
 */
export const useSharedLearningStore = create<SharedLearningStore>(
  (set, get) => ({
    // Initial State
    topicTree: null,
    topicFlatList: null,
    selectedTopicId: null,

    lastSelfTestPercentage: null,
    mode: "Learning Session",
    barColor: null,
    previousRunningTest: null,

    showStartTestModal: false,
    showPreviousTestModal: false,

    // Shallow copy to avoid modifying default options
    testOptions: [...defaultTestOptions],
    selectedTestOption: { ...defaultTestOptions[0] },

    setSelectedTestOption: (option) =>
      set({ selectedTestOption: { ...option } }),

    // Actions
    setTopicTree: (tree) => set({ topicTree: tree }),
    setTopicFlatList: (list) => set({ topicFlatList: list }),
    setSelectedTopicId: (id) => set({ selectedTopicId: id }),
    setLastSelfTestPercentage: (value) =>
      set({ lastSelfTestPercentage: value }),
    setMode: (mode) => set({ mode }),
    setPreviousRunningTest: (test) => set({ previousRunningTest: test }),
    setShowStartTestModal: (show) => set({ showStartTestModal: show }),
    setShowPreviousTestModal: (show) => set({ showPreviousTestModal: show }),
    setTestOptions: (options) => set({ testOptions: options }),
    setBarColor: (barColor) => set({ barColor: barColor }),
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
        mode: "Learning Session",
        barColor: null,
        previousRunningTest: null,
        showStartTestModal: false,
        showPreviousTestModal: false,
        testOptions: [...defaultTestOptions],
        selectedTestOption: { ...defaultTestOptions[0] },
      }),
  })
);
