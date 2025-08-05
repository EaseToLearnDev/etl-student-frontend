import { useState } from "react"
import { type TopicType } from "../../../shared/types";
import type { ModeType } from "../sl.types";

const useSmartLearning = () => {
  const [topicTree, setTopicTree] = useState<TopicType[] | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicType | null>(null);
  const [lastSelfTestPercentage, setLastSelfTestPercentage] = useState<number | null>(null);
  const [mode, setMode] = useState<ModeType>('learning');
  const [showModal, setShowModal] = useState<boolean>(false);
  
const reset = () => {
    setTopicTree(null);
    setSelectedTopic(null);
    setLastSelfTestPercentage(null);
    setMode('learning');
    setShowModal(false);
};

return {
    topicTree,
    setTopicTree,
    selectedTopic,
    setSelectedTopic,
    lastSelfTestPercentage,
    setLastSelfTestPercentage,
    mode,
    setMode,
    showModal,
    setShowModal,
    reset,
};
}

export default useSmartLearning;