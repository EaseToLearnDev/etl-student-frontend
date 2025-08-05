import { create } from "zustand";
import type { TopicType } from "../../../shared/types";

export interface SLStore {
  topicTree: TopicType[] | null;
  selectedTopic: TopicType | null;
  lastSelfTestPercentage: number | null;
  mode: "learning" | "competitive";
  showModal: boolean;

  setTopicTree: (topicTree: TopicType[] | null) => void;
  setSelectedTopic: (topic: TopicType | null) => void;
  setLastSelfTestPercentage: (percentage: number | null) => void;
  setMode: (mode: "learning" | "competitive") => void;
  setShowModal: (v: boolean) => void;

  reset: () => void;
  resetSelectedTopic: () => void;
}

export const useSLStore = create<SLStore>((set) => ({
  topicTree: null,
  selectedTopic: null,
  lastSelfTestPercentage: null,
  showModal: false,
  mode: "learning",

  setTopicTree: (topicTree) => set({ topicTree }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setLastSelfTestPercentage: (percentage) =>
    set({ lastSelfTestPercentage: percentage }),
  setMode: (mode) => set({ mode }),
  setShowModal: (v) => set({ showModal: v }),
  reset: () => {
    set({
      topicTree: null,
      selectedTopic: null,
      lastSelfTestPercentage: null,
      mode: 'learning',
      showModal: false,
    });
  },
  resetSelectedTopic: () =>
    set({ selectedTopic: null, lastSelfTestPercentage: null }),
}));
