// Store
import { create } from "zustand";

// Types
import { type PrevRunningTest, type Topic } from "../../../shared/types";

interface ALStore {
  // Topic data structures
  topicTree: Topic[] | null;
  topicFlatList: Topic[] | null;
  selectedTopicId: number | null;

  // Modal visibility
  showStartTestModal: boolean;
  showPreviousTestModal: boolean;

  // Actions
  setTopicTree: (tree: Topic[] | null) => void;
  setTopicFlatList: (list: Topic[] | null) => void;
  setSelectedTopicId: (id: number | null) => void;
  setShowStartTestModal: (show: boolean) => void;
  setShowPreviousTestModal: (show: boolean) => void;

  getSelectedTopic: () => Topic | null;
  reset: () => void;
}
/**
 * Zustand store for managing Smart Learning feature state and actions.
 */
export const useALStore = create<ALStore>((set, get) => ({
  // Initial State
  topicTree: null,
  topicFlatList: null,
  selectedTopicId: null,

  showStartTestModal: false,
  showPreviousTestModal: false,
  // Actions
  setTopicTree: (tree) => set({ topicTree: tree }),
  setTopicFlatList: (list) => set({ topicFlatList: list }),
  setSelectedTopicId: (id) => set({ selectedTopicId: id }),
  setShowStartTestModal: (show) => set({ showStartTestModal: show }),
  setShowPreviousTestModal: (show) => set({ showPreviousTestModal: show }),
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
      showStartTestModal: false,
      showPreviousTestModal: false,
    }),
}));
