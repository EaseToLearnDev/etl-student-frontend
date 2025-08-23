// React
import { useState } from "react";

// Types
import { type Topic } from "../../../shared/types";
import { type PreviousRunningTestType, type ModeType } from "../sl.types";

/**
 * Custom hook for managing smart learning session state in study room feature.
 */
const useSmartLearning = () => {
  // Topic data structures
  const [topicTree, setTopicTree] = useState<Topic[] | null>(null);
  const [topicFlatList, setTopicFlatList] = useState<Topic[] | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  // Session state
  const [lastSelfTestPercentage, setLastSelfTestPercentage] = useState<
    number | null
  >(null);
  const [mode, setMode] = useState<ModeType>("learning");
  const [previousRunningTest, setPreviousRunningTest] =
    useState<PreviousRunningTestType | null>(null);

  // Modal visibility
  const [showStartTestModal, setShowStartTestModal] =
    useState<boolean>(false);
  const [showPreviousTestModal, setShowPreviousTestModal] =
    useState<boolean>(false);

  // Test configuration
  const [testOptions, setTestOptions] = useState<Record<string, number>>({
    totalQuestion: 20,
    totalTime: 60,
    marksCorrectAns: 1,
    marksIncorrectAns: -1,
    marksNotAttempted: 0,
  });

  /** Reset all state to initial values */
  const reset = () => {
    setTopicTree(null);
    setTopicFlatList(null);
    setSelectedTopicId(null);
    setLastSelfTestPercentage(null);
    setMode("learning");
    setPreviousRunningTest(null);
    setShowStartTestModal(false);
    setShowPreviousTestModal(false);
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
    getSelectedTopic,
    setSelectedTopicId,
    lastSelfTestPercentage,
    setLastSelfTestPercentage,
    mode,
    setMode,
    previousRunningTest,
    setPreviousRunningTest,
    showStartTestModal,
    setShowStartTestModal,
    showPreviousTestModal,
    setShowPreviousTestModal,
    testOptions,
    setTestOptions,
    reset,
  };
};

export default useSmartLearning;
