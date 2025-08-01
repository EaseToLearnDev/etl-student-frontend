import { create } from "zustand";
import type { TopicType } from "../../../shared/types";
import type { TopicContentType } from "../sm.types";

export interface SMStore {
  topicTree: TopicType[] | null;
  topicContentList: TopicContentType[] | null;
  selectedTopic: TopicType | null;
  lastSelfTestPercentage: number | null;

  setTopicTree: (topicTree: TopicType[] | null) => void;
  setTopicContentList: (topicContentList: TopicContentType[] | null) => void;
  setSelectedTopic: (topic: TopicType | null) => void;
  setLastSelfTestPercentage: (percentage: number | null) => void;

  reset: () => void;
}

export const useSMStore = create<SMStore>((set) => ({
  topicTree: null,
  topicContentList: null,
  selectedTopic: null,
  lastSelfTestPercentage: null,

  setTopicTree: (topicTree) => set({ topicTree }),
  setTopicContentList: (topicContentList) => set({ topicContentList }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setLastSelfTestPercentage: (percentage) =>
    set({ lastSelfTestPercentage: percentage }),

  reset: () => {
    set({
      topicTree: null,
      topicContentList: null,
      selectedTopic: null,
      lastSelfTestPercentage: null,
    });
  },
}));
