import { create } from "zustand";
import type { TopicTest, Topic } from "../../../shared/types";

export interface TTStore {
  topicTree: Topic[] | null;
  topicFlatList: Topic[] | null;
  selectedTopicId: number | null;
  selectedTest: TopicTest | null;
  testList: TopicTest[] | null;
  showStartTestModal: boolean;
  showPreviousTestModal: boolean;

  setTopicTree: (topicTree: Topic[] | null) => void;
  setTopicFlatList: (list: Topic[] | null) => void;
  setSelectedTopicId: (id: number | null) => void;
  setSelectedTest: (test: TopicTest | null) => void;
  setTestList: (testList: TopicTest[] | null) => void;
  setShowStartTestModal: (show: boolean) => void;
  setShowPreviousTestModal: (show: boolean) => void;

  getSelectedTopic: () => Topic | null;
  reset: () => void;
  resetSelectedTopic: () => void;
}

export const useTTStore = create<TTStore>((set, get) => ({
  topicTree: null,
  topicFlatList: null,
  selectedTopicId: null,
  selectedTest: null,
  testList: null,
  showStartTestModal: false,
  showPreviousTestModal: false,

  setTopicTree: (topicTree) => set({ topicTree }),
  setTopicFlatList: (list) => set({ topicFlatList: list }),
  setSelectedTopicId: (id) => set({ selectedTopicId: id }),
  setSelectedTest: (test) => set({ selectedTest: test }),
  setTestList: (testList) => set({ testList }),
  setShowStartTestModal: (show) => set({ showStartTestModal: show }),
  setShowPreviousTestModal: (show) => set({ showPreviousTestModal: show }),
  getSelectedTopic: () => {
    const { selectedTopicId, topicFlatList } = get();
    if (!selectedTopicId || !topicFlatList) return null;
    return topicFlatList.find((t) => t.topicId === selectedTopicId) ?? null;
  },
  reset: () => {
    set({
      topicTree: null,
      topicFlatList: null,
      selectedTopicId: null,
      selectedTest: null,
      testList: null,
      showStartTestModal: false,
      showPreviousTestModal: false,
    });
  },
  resetSelectedTopic: () => set({ selectedTopicId: null, testList: null }),
}));
