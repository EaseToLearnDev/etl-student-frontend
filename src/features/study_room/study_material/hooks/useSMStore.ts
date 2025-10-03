// React
import { create } from "zustand";

// Types
import type { Topic } from "../../../shared/types";
import type { FilterType, Content } from "../sm.types";

interface SMStore {
  // States
  topicTree: Topic[] | null;
  topicFlatList: Topic[] | null;
  topicContentList: Content[] | null;
  selectedTopicId: number | null;
  contentFilterType: FilterType;
  selectedContent: Content | null;
  textContent: Content | null;

  // Actions
  setTopicTree: (topics: Topic[] | null) => void;
  setTopicFlatList: (topics: Topic[] | null) => void;
  setTopicContentList: (contents: Content[] | null) => void;
  setSelectedTopicId: (id: number | null) => void;
  setContentFilterType: (filter: FilterType) => void;
  setSelectedContent: (content: Content | null) => void;
  setTextContent: (text: Content | null) => void;
  getSelectedTopic: () => Topic | null;
  reset: () => void;
}

/**
 * Zustand store hook for managing study material state and actions.
 * Provides topic, content, selection, and filter management for study rooms.
 */
export const useSMStore = create<SMStore>((set, get) => ({
  // Initial state
  topicTree: null,
  topicFlatList: null,
  topicContentList: null,
  selectedTopicId: null,
  contentFilterType: "All",
  selectedContent: null,
  textContent: null,

  // Actions
  setTopicTree: (topics) => set({ topicTree: topics }),
  setTopicFlatList: (topics) => set({ topicFlatList: topics }),
  setTopicContentList: (contents) => set({ topicContentList: contents }),
  setSelectedTopicId: (id) => set({ selectedTopicId: id }),
  setContentFilterType: (filter) => set({ contentFilterType: filter }),
  setSelectedContent: (content) => set({ selectedContent: content }),
  setTextContent: (text) => set({ textContent: text }),

  getSelectedTopic: () => {
    const { topicFlatList, selectedTopicId } = get();
    if (!selectedTopicId || !topicFlatList) return null;
    return topicFlatList.find((t) => t.topicId === selectedTopicId) ?? null;
  },

  reset: () =>
    set({
      topicTree: null,
      topicFlatList: null,
      topicContentList: null,
      selectedTopicId: null,
      contentFilterType: "All",
      selectedContent: null,
      textContent: null,
    }),
}));
