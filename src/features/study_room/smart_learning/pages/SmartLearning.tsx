// React
import { useEffect } from "react";

// Utils
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";

// Hooks
import useSmartLearning from "../hooks/useSmartLearning";

// Services
import { loadSmartLearningTopictree } from "../services/loadSmartLearningTopicTree";
import { loadLastSelfTestPercentage } from "../services/loadLastSelfTestPercentage";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import TopicModeSelector from "../components/TopicModeSelector";
import { Modal } from "../../../../components/Modal";
import SLTestModalContent from "../components/SLTestModalContent";

const SmartLearning = () => {
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
    setLastSelfTestPercentage,
    showModal,
    setShowModal,
  } = useSmartLearning();

  const selectedTopic = getSelectedTopic();
  useEffect(() => {
    const getTopicTree = async () => {
      const data = await loadSmartLearningTopictree();
      if (data) {
        setTopicTree(data);
        const flatList = flattenTopics(data);
        setTopicFlatList(flatList);
      }
    };
    getTopicTree();
    return () => reset();
  }, []);

  useEffect(() => {
    if (selectedTopic?.topicId) {
      loadLastSelfTestPercentage(selectedTopic?.topicName).then((percentage) =>
        setLastSelfTestPercentage(percentage)
      );
    }
  }, [selectedTopic?.topicId]);

  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h3 className="!font-bold items-end">Select Your Topic</h3>
      </div>
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
                setShowModal={setShowModal}
              />
            ) : (
              <></>
            )
          }
          hideSecondary={!selectedTopic || showModal}
          onSecondaryHide={() => setSelectedTopicId(null)}
          secondaryInitialHeight={1}
        />
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
        className="p-4"
      >
        <SLTestModalContent
          mode={mode}
          onClose={() => setShowModal(false)}
          topicName={selectedTopic?.topicName || ""}
        />
      </Modal>
    </div>
  );
};

export default SmartLearning;
