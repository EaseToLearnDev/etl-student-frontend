import { useState } from "react";
import type { Topic } from "../../../shared/types";
import type {
  FilterType,
  TextContentType,
  TopicContentType,
} from "../sm.types";

const useStudyMaterial = () => {
  const [topicTree, setTopicTree] = useState<Topic[] | null>(null);
  const [topicFlatList, setTopicFlatList] = useState<Topic[] | null>(null);
  const [topicContentList, setTopicContentList] = useState<
    TopicContentType[] | null
  >(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [contentFilterType, setContentFilterType] = useState<FilterType>("All");
  const [selectedContent, setSelectedContent] =
    useState<TopicContentType | null>(null);
  const [textContent, setTextContent] = useState<TextContentType | null>(null);

  const reset = () => {
    setTopicTree(null);
    setTopicFlatList(null);
    setSelectedTopicId(null);
    setContentFilterType("All");
    setSelectedContent(null);
    setTextContent(null);
  };

  const getSelectedTopic = () => {
    if (!selectedTopicId || !topicFlatList) return null;
    else
      return topicFlatList?.find((t) => t.topicId === selectedTopicId) ?? null;
  };

  return {
    topicTree,
    setTopicTree,
    topicFlatList,
    setTopicFlatList,
    topicContentList,
    setTopicContentList,
    getSelectedTopic,
    setSelectedTopicId,
    contentFilterType,
    setContentFilterType,
    selectedContent,
    setSelectedContent,
    textContent,
    setTextContent,
    reset,
  };
};

export default useStudyMaterial;
