import { create } from "zustand";
import type { TopicType } from "../../../shared/types";
import type {
  FilterType,
  TextContentType,
  TopicContentType,
} from "../sm.types";

export interface SMStore {
  topicTree: TopicType[] | null;
  topicContentList: TopicContentType[] | null;
  selectedTopic: TopicType | null;
  contentFilterType: FilterType;
  selectedContent: TopicContentType | null;
  textContent?: TextContentType | null;

  setTopicTree: (topicTree: TopicType[] | null) => void;
  setTopicContentList: (topicContentList: TopicContentType[] | null) => void;
  setSelectedTopic: (topic: TopicType | null) => void;
  setContentFilterType: (filter: FilterType) => void;
  setSelectedContent: (content: TopicContentType | null) => void;
  setTextContent: (textContent: TextContentType | null) => void;

  reset: () => void;
  resetSelectedTopic: () => void;
}

export const useSMStore = create<SMStore>((set) => ({
  topicTree: null,
  topicContentList: null,
  selectedTopic: null,
  contentFilterType: "All",
  selectedContent: null,
  textContent: null,

  setTopicTree: (topicTree) => set({ topicTree }),
  setTopicContentList: (topicContentList) => set({ topicContentList }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setContentFilterType: (filter) => set({ contentFilterType: filter }),
  setSelectedContent: (content) => set({ selectedContent: content }),
  setTextContent: (textContent) => set({ textContent }),
  
  reset: () => {
    set({
      topicTree: null,
      topicContentList: null,
      selectedTopic: null,
    });
  },
  resetSelectedTopic: () => set({ selectedTopic: null }),
}));
