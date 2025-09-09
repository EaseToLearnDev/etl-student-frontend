// React
import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

// Hooks
import { useSLStore } from "../hooks/useSLStore";

// Utils
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";

// Services
import { loadSmartLearningTopictree } from "../services/loadSmartLearningTopicTree";
import { loadLastSelfTestPercentage } from "../services/loadLastSelfTestPercentage";
import { handleShowPreviousOrStartTest } from "../../../shared/services/handleShowPreviousOrStartTest";
import { handleResumeTest, handleStartTest } from "../services/handleTest";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import { Modal } from "../../../../components/Modal";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import TopicModeSelector from "../components/TopicModeSelector";
import SLTestModalContent from "../components/SLTestModalContent";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";
import type { Topic } from "../../../shared/types";
import { Skeleton } from "../../../../components/SkeletonLoader";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import { TreeViewSkeleton } from "../../../../components/TreeViewSkeleton";
import EmptyState from "../../../../components/EmptyState";

/**
 * SmartLearning page component for topic selection and session management in the Smart Learning feature.
 */
const SmartLearningPage = () => {
  // Hooks
  const navigate = useNavigate();
  const reset = useSLStore((s) => s.reset);
  const getSelectedTopic = useSLStore((s) => s.getSelectedTopic);

  const topicTree = useSLStore((s) => s.topicTree);
  const setTopicTree = useSLStore((s) => s.setTopicTree);

  const selectedTopicId = useSLStore((s) => s.selectedTopicId);
  const setTopicFlatList = useSLStore((s) => s.setTopicFlatList);
  const setSelectedTopicId = useSLStore((s) => s.setSelectedTopicId);

  const mode = useSLStore((s) => s.mode);
  const setMode = useSLStore((s) => s.setMode);

  const lastSelfTestPercentage = useSLStore((s) => s.lastSelfTestPercentage);
  const setLastSelfTestPercentage = useSLStore(
    (s) => s.setLastSelfTestPercentage
  );

  const previousRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPreviousRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);

  const showPreviousTestModal = useSLStore((s) => s.showPreviousTestModal);
  const setShowPreviousTestModal = useSLStore(
    (s) => s.setShowPreviousTestModal
  );

  const showStartTestModal = useSLStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useSLStore((s) => s.setShowStartTestModal);

  const testOptions = useSLStore((s) => s.testOptions);
  const setTestOptions = useSLStore((s) => s.setTestOptions);

  const loading = useLoadingStore((s) => s.loading);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

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

  useEffect(() => {
    setSelectedTopic(getSelectedTopic());
  }, [selectedTopicId]);

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
        <h5 className="!font-semibold pl-2 items-end">Select Your Topic</h5>
      </div>
      {/* Main Layout */}
      <div className="mt-4 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            loading && (!topicTree || topicTree.length === 0) ? (
              <>
                <TreeViewSkeleton />
              </>
            ) : (
              <TopicTreeView
                topics={topicTree || []}
                selectedTopic={selectedTopic}
                onClickHandler={(t) =>
                  setSelectedTopicId(t ? t?.topicId : null)
                }
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
            )
          }
          secondaryContent={
            loading ? (
              <>
                <div className="space-y-3 p-4">
                  <Skeleton height={300} variant="rounded" />
                  <Skeleton height={70} variant="text" />
                  <Skeleton height={70} variant="text" />
                </div>
              </>
            ) : selectedTopic ? (
              <TopicModeSelector
                selectedTopic={selectedTopic}
                mode={mode}
                setMode={setMode}
                lastSelfTestPercentage={lastSelfTestPercentage ?? 0}
                onClickHandler={() => setShowStartTestModal(true)}
              />
            ) : (
              <EmptyState title="No Data Available" />
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
            handleShowPreviousOrStartTest({
              previousRunningTest,
              setPreviousRunningTest,
              setShowPreviousTestModal,
              startTestCallback: () =>
                handleStartTest(navigate, mode, selectedTopic, testOptions),
            })
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
        <PreviousTestModalContent
          onStart={() =>
            handleStartTest(navigate, mode, selectedTopic, testOptions)
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

export default SmartLearningPage;
