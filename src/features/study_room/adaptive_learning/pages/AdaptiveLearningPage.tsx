import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Types
import type { Topic } from "../../../shared/types";

// Icons
import { LuArchive } from "react-icons/lu";

// Utils
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";

// Hooks
import { useALStore } from "../hooks/useALStore";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import useUpgradeModalStore from "../../../shared/hooks/useUpgradeModalStore";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";

// Services
import { getActiveCourseAccessStatus } from "../../../../global/services/upgrade";
import { handleResumeTest } from "../../../shared/services/handleTest";
import { loadAdaptiveLearningTree } from "../services/loadAdaptiveLearningTree";

// Components
import { TreeViewSkeleton } from "../../../../components/TreeViewSkeleton";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import { Skeleton } from "../../../../components/SkeletonLoader";
import EmptyState from "../../../../components/EmptyState";
import UpgradeModal from "../../../shared/components/UpgradeModal";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import { Modal } from "../../../../components/Modal";
import AdaptiveSecondary from "../components/AdaptiveSecondary";
import StartALModal from "../components/StartALModal";
import { handleShowPreviousOrStartTest } from "../../../shared/services/handleShowPreviousOrStartTest";
import { handleStartAdaptiveTest } from "../services/handleStartAdaptiveTest";
import { useToastStore } from "../../../../global/hooks/useToastStore";
import { Toast } from "../../../../components/Toast";

const AdaptiveLearningPage = () => {
  const navigate = useNavigate();
  const reset = useALStore((s) => s.reset);
  const topicTree = useALStore((s) => s.topicTree);
  const setTopicTree = useALStore((s) => s.setTopicTree);
  const setSelectedTopicId = useALStore((s) => s.setSelectedTopicId);

  const getSelectedTopic = useALStore((s) => s.getSelectedTopic);

  const setTopicFlatList = useALStore((s) => s.setTopicFlatList);

  const previousRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPreviousRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);

  const setShowStartTestModal = useALStore((s) => s.setShowStartTestModal);

  const showPreviousTestModal = useALStore((s) => s.showPreviousTestModal);
  const setShowPreviousTestModal = useALStore(
    (s) => s.setShowPreviousTestModal
  );

  const isUpgradeModalOpen = useUpgradeModalStore((s) => s.isUpgradeModalOpen);
  const setIsUpgradeModalOpen = useUpgradeModalStore(
    (s) => s.setIsUpgradeModalOpen
  );

  const showToast = useToastStore((s) => s.showToast);
  const toastData = useToastStore((s) => s.toastData);

  const loading = useLoadingStore((s) => s.loading);

  const selectedTopic = getSelectedTopic();

  useEffect(() => {
    const fetchTopicTree = async () => {
      const data = await loadAdaptiveLearningTree();
      if (data) {
        setTopicTree(data);
        const flatList = flattenTopics(data);
        setTopicFlatList(flatList);
      }
    };
    // load topic tree on page load
    fetchTopicTree();

    return () => reset();
  }, []);

  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h5 className="!font-semibold pl-2 items-end">Select Your Topic</h5>
      </div>
      <div className="mt-4 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            loading && (!topicTree || topicTree.length === 0) ? (
              <TreeViewSkeleton />
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
              <AdaptiveSecondary
                selectedTopic={selectedTopic}
                onClickHandler={() => {
                  getActiveCourseAccessStatus() === "renew"
                    ? setIsUpgradeModalOpen(true)
                    : setShowStartTestModal(true);
                }}
              />
            ) : (
              <EmptyState
                title="No data available"
                description="No data available yet. Please refresh page!"
                icon={<LuArchive className="size-24 aspect-square" />}
                className="max-w-md"
              />
            )
          }
          hideSecondary={!selectedTopic || isUpgradeModalOpen}
          onSecondaryHide={() => setSelectedTopicId(null)}
        />
      </div>

      {/* Previous Session Modal */}
      <Modal
        isOpen={showPreviousTestModal}
        onClose={() => setShowPreviousTestModal(false)}
        size="lg"
        className="p-4"
      >
        <PreviousTestModalContent
          onStart={() => handleStartAdaptiveTest(navigate)}
          onResume={() => {
            handleResumeTest(navigate, previousRunningTest);
          }}
          onClose={() => setShowPreviousTestModal(false)}
          testName={previousRunningTest?.testName || ""}
        />
      </Modal>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      <StartALModal
        onStart={() =>
          handleShowPreviousOrStartTest({
            setPreviousRunningTest,
            setShowPreviousTestModal,
            startTestCallback: () => handleStartAdaptiveTest(navigate),
          })
        }
      />

      {/* Toast */}
      {showToast && toastData && (
        <Toast
          {...toastData}
          key={toastData.title}
          duration={toastData.duration}
        />
      )}
    </div>
  );
};

export default AdaptiveLearningPage;
