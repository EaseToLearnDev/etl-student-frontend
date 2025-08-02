import { create } from "zustand";
import type { TopicTestType, TopicType } from "../../../shared/types";

export interface TTStore {
  topicTree: TopicType[] | null;
  selectedTopic: TopicType | null;
  testList: TopicTestType[] | null;

  setTopicTree: (topicTree: TopicType[] | null) => void;
  setSelectedTopic: (topic: TopicType | null) => void;
  setTestList: (testList: TopicTestType[] | null) => void;

  getTopicById: (tree: TopicType[] | null, topicId: number) => TopicType | null;

  reset: () => void;
  resetSelectedTopic: () => void;
}

export const useTTStore = create<TTStore>((set, get) => ({
  topicTree: null,
  selectedTopic: null,
  testList: null,

  setTopicTree: (topicTree) => set({ topicTree }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setTestList: (testList) => set({testList}),

  getTopicById: (tree, topicId) => {
    if(!tree) return null;
    for (const topic of tree) {
      if (topic.topicId === topicId) {
        return topic;
      }
      if (topic.children?.length) {
        const found = get().getTopicById(topic.children, topicId);
        if (found) return found;
      }
    }
    return null;
  },

  reset: () => {
    set({
      topicTree: null,
      selectedTopic: null,
      testList: null,
    });
  },
  resetSelectedTopic: () => set({ selectedTopic: null, testList: null }),
}));
