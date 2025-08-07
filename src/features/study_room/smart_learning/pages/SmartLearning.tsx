// React
import { useEffect } from "react";
import { useNavigate } from "react-router";

// Utils
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";

// Hooks
import useSmartLearning from "../hooks/useSmartLearning";

// Services
import { loadSmartLearningTopictree } from "../services/loadSmartLearningTopicTree";
import { loadLastSelfTestPercentage } from "../services/loadLastSelfTestPercentage";
import { handleTopicModeSelector } from "../services/handleTopicModeSelector";
import { handleResumeTest, handleStartTest } from "../services/handleTest";
import { handleNewTestModal } from "../services/handleNewTestModal";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import { Modal } from "../../../../components/Modal";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import TopicModeSelector from "../components/TopicModeSelector";
import SLPreviousTestModalContent from "../components/SLPreviousTestModalContent";
import SLTestModalContent from "../components/SLTestModalContent";

/**
 * SmartLearning page component for topic selection and session management in the Smart Learning feature.
 */
const SmartLearning = () => {
  // Hooks
  const navigate = useNavigate();
  const {
    reset,
    getSelectedTopic,
    topicTree,
    setTopicTree,
    setTopicFlatList,
    setSelectedTopicId,
    mode,
    setMode,
    lastSelfTestPercentage,
    previousRunningTest,
    setLastSelfTestPercentage,
    setPreviousRunningTest,
    setShowPreviousTestModal,
    setShowStartTestModal,
    showPreviousTestModal,
    showStartTestModal,
    testOptions,
    setTestOptions,
  } = useSmartLearning();

  // Get currently selected topic
  const selectedTopic = getSelectedTopic();

  // ========== Initial Topic Tree ==========
  useEffect(() => {
    const fetchTopicTree = async () => {
      const data = await loadSmartLearningTopictree();
      if (data) {
        setTopicTree(data);
        const flatList = flattenTopics(data);
        setTopicFlatList(flatList);
      }
    };
    fetchTopicTree();
    return () => reset();
  }, []);

  // ========== Load Self Test Percentage on Topic-Select ==========
  useEffect(() => {
    const fetchSelfSessionPercentage = async () => {
      if (selectedTopic?.topicId) {
        const percentage = await loadLastSelfTestPercentage(
          selectedTopic?.topicName
        );
        if (percentage) {
          setLastSelfTestPercentage(percentage);
        }
      }
    };
    fetchSelfSessionPercentage();
  }, [selectedTopic?.topicId]);

  // ========== Render ==========
  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h3 className="!font-bold items-end">Select Your Topic</h3>
      </div>

      {/* Main Layout */}
      <div className="mt-5 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            <TopicTreeView
              topics={topicTree || []}
              selectedTopic={selectedTopic}
              onClickHandler={(t) => setSelectedTopicId(t ? t?.topicId : null)}
              getId={(t) => t?.topicId}
              getLabel={(t) => t?.topicName}
              getChildren={(t) => t?.children}
              renderRightSection={(_, isActive) =>
                isActive && (
                  <div className="w-7 h-7 rounded-full p-1 overflow-hidden border-2 border-dashed border-[var(--border-primary)]">
                    <div className="w-full h-full bg-[var(--surface-bg-tertiary)] rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-[var(--sb-ocean-bg-active)] z-4 relative"
                        style={{ width: `${lastSelfTestPercentage || 0}%` }}
                      />
                    </div>
                  </div>
                )
              }
            />
          }
          secondaryContent={
            selectedTopic ? (
              <TopicModeSelector
                selectedTopic={selectedTopic}
                mode={mode}
                setMode={setMode}
                lastSelfTestPercentage={lastSelfTestPercentage ?? 0}
                onClickHandler={() =>
                  handleTopicModeSelector(
                    setPreviousRunningTest,
                    setShowStartTestModal,
                    setShowPreviousTestModal
                  )
                }
              />
            ) : (
              <></>
            )
          }
          hideSecondary={
            !selectedTopic || showPreviousTestModal || showStartTestModal
          }
          onSecondaryHide={() => setSelectedTopicId(null)}
          secondaryInitialHeight={1}
        />
      </div>

      {/* Start Session Modal */}
      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        <SLTestModalContent
          mode={mode}
          testOptions={testOptions}
          setTestOptions={setTestOptions}
          onStart={() =>
            handleStartTest(navigate, mode, selectedTopic, testOptions)
          }
          onClose={() => setShowStartTestModal(false)}
          topicName={selectedTopic?.topicName || ""}
        />
      </Modal>

      {/* Previous Session Modal */}
      <Modal
        isOpen={showPreviousTestModal}
        onClose={() => setShowPreviousTestModal(false)}
        size="lg"
        className="p-4"
      >
        <SLPreviousTestModalContent
          onStart={() =>
            handleNewTestModal(setShowStartTestModal, setShowPreviousTestModal)
          }
          onResume={() => {
            handleResumeTest(navigate, previousRunningTest);
          }}
          onClose={() => setShowPreviousTestModal(false)}
          testName={previousRunningTest?.testName || ""}
        />
      </Modal>
    </div>
  );
};

export default SmartLearning;
