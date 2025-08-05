// Reset
import { useEffect } from "react";

// Store
import { useSLStore } from "../store/useSLStore";

// Services
import { loadSmartLearningTopictree } from "../services/loadSmartLearningTopicTree";
import { loadLastSelfTestPercentage } from "../services/loadLastSelfTestPercentage";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicModeSelector from "../components/TopicModeSelector";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import { Modal } from "../../../../components/Modal";

const SmartLearningLocal = () => {
  const reset = useSLStore((state) => state.reset);
  const resetSelectedTopic = useSLStore((state) => state.resetSelectedTopic);
  const topicTree = useSLStore((state) => state.topicTree);
  const selectedTopic = useSLStore((state) => state.selectedTopic);
  const setSelectedTopic = useSLStore((state) => state.setSelectedTopic);
  const lastSelfTestPercentage = useSLStore(
    (state) => state.lastSelfTestPercentage
  );
  const mode = useSLStore((state) => state.mode);
  const showModal = useSLStore((state) => state.showModal);
  const setShowModal = useSLStore((state) => state.setShowModal);

  useEffect(() => {
    loadSmartLearningTopictree();
    return reset;
  }, []);

  useEffect(() => {
    if (selectedTopic?.topicId) {
      loadLastSelfTestPercentage();
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
              onClickHandler={setSelectedTopic}
              getId={(t) => t.topicId}
              getLabel={(t) => t.topicName}
              getChildren={(t) => t.children}
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
          secondaryContent={<TopicModeSelector />}
          hideSecondary={!selectedTopic}
          onSecondaryHide={resetSelectedTopic}
          secondaryInitialHeight={1}
        />
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <h5>Hello</h5>
      </Modal>
    </div>
  );
};

export default SmartLearningLocal;
