import { create } from "zustand";
import type { TopicType } from "../../../types";

type TopicStore = {
  topic: TopicType | null;
  setTopic: (value: TopicType | null) => void;
  reset: () => void;
};

const useTopicStore = create<TopicStore>((set) => ({
  topic: null,
  setTopic: (topic) => set({ topic }),
  reset: () => set({ topic: null }),
}));

export default useTopicStore;
