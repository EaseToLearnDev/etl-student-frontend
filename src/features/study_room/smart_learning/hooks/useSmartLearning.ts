import { useState } from "react";
import { type TopicType } from "../../../shared/types";
import type { ModeType } from "../sl.types";

const useSmartLearning = () => {
  const [topicTree, setTopicTree] = useState<TopicType[] | null>(null);
  const [topicFlatList, setTopicFlatList] = useState<TopicType[] | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [lastSelfTestPercentage, setLastSelfTestPercentage] = useState<
    number | null
  >(null);
  const [mode, setMode] = useState<ModeType>("competitive");
  const [showModal, setShowModal] = useState<boolean>(false);

  const reset = () => {
    setTopicTree(null);
    setTopicFlatList(null);
    setSelectedTopicId(null);
    setLastSelfTestPercentage(null);
    setMode("competitive");
    setShowModal(false);
  };

  const getSelectedTopic = () => {
    if (!selectedTopicId || !topicFlatList) return null;
    else return topicFlatList?.find((t) => t.topicId === selectedTopicId) ?? null;
  };

  return {
    topicTree,
    setTopicTree,
    topicFlatList,
    setTopicFlatList,
    getSelectedTopic,
    setSelectedTopicId,
    lastSelfTestPercentage,
    setLastSelfTestPercentage,
    mode,
    setMode,
    showModal,
    setShowModal,
    reset,
  };
};

export default useSmartLearning;
