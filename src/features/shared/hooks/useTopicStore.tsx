import { create } from "zustand";
import type { Topic }  from "../../shared/types";

type TopicStore = {
  topic: Topic | null;
  setTopic: (value: Topic | null) => void;
  reset: () => void;
};


/**
 * Zustand store hook for managing the current topic state.
 *
 * Provides state and actions for setting, retrieving, and resetting the selected topic.
 *
 * @returns Zustand store with:
 * - `topic`: The currently selected topic or null.
 * - `setTopic`: Function to update the current topic.
 * - `reset`: Function to reset the topic to null.
 */
const useTopicStore = create<TopicStore>((set) => ({
  topic: null,
  setTopic: (topic) => set({ topic }),
  reset: () => set({ topic: null }),
}));

export default useTopicStore;
