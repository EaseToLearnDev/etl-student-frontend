import { create } from "zustand";
import type { TopicType } from "../../../shared/types";

export interface SLStore {
  topicTree: TopicType[] | null;
  selectedTopic: TopicType | null;
  lastSelfTestPercentage: number | null;

  setTopicTree: (topicTree: TopicType[] | null) => void;
  setSelectedTopic: (topic: TopicType | null) => void;
  setLastSelfTestPercentage: (percentage: number | null) => void;

  reset: () => void;
  resetSelectedTopic: () => void;
}

export const useSLStore = create<SLStore>((set) => ({
  topicTree: null,
  selectedTopic: null,
  lastSelfTestPercentage: null,

  setTopicTree: (topicTree) => set({ topicTree }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setLastSelfTestPercentage: (percentage) =>
    set({ lastSelfTestPercentage: percentage }),

  reset: () => {
    set({
      topicTree: null,
      selectedTopic: null,
      lastSelfTestPercentage: null,
    });
  },
  resetSelectedTopic: () =>
    set({ selectedTopic: null, lastSelfTestPercentage: null }),
}));
