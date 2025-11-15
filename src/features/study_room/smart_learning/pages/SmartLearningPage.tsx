import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Types
import type { Topic } from "../../../shared/types";

// Icons
import { FiTarget } from "react-icons/fi";
import { LuArchive } from "react-icons/lu";

// Hooks
import { useSharedLearningStore } from "../../shared/hooks/useSharedLearningStore";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import useUpgradeModalStore from "../../../shared/hooks/useUpgradeModalStore";
import { usePageTracking } from "../../../../hooks/usePageTracking";


// Utils
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";
import { gtmEvents } from "../../../../utils/gtm-events";
import { pushToDataLayer } from "../../../../utils/gtm";


// Services
import { loadSmartLearningTopictree } from "../../shared/services/loadSmartLearningTopicTree";
import { loadLastSelfTestPercentage } from "../../shared/services/loadLastSelfTestPercentage";
import { handleShowPreviousOrStartTest } from "../../../shared/services/handleShowPreviousOrStartTest";
import {
  handleResumeTest,
  handleStartTest,
} from "../../../shared/services/handleTest";
import { getActiveCourseAccessStatus } from "../../../../global/services/upgrade";
import { openStartTestModal } from "../../shared/services/openStartTestModal";
import loadSelfTestOptions from "../../shared/services/loadSelfTestOptions";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import { Modal } from "../../../../components/Modal";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import TopicModeSelector from "../../shared/components/TopicModeSelector";
import SLTestModalContent from "../../shared/components/SLTestModalContent";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import { Skeleton } from "../../../../components/SkeletonLoader";
import { TreeViewSkeleton } from "../../../../components/TreeViewSkeleton";
import EmptyState from "../../../../components/EmptyState";
import UpgradeModal from "../../../shared/components/UpgradeModal";
import CircleProgressBar from "../../../report/components/newreports/circularProgressBar";

/**
 * SmartLearning page component for topic selection and session management in the Smart Learning feature.
 */
const SmartLearningPage = () => {
  // Hooks
  const navigate = useNavigate();
  const reset = useSharedLearningStore((s) => s.reset);
  const getSelectedTopic = useSharedLearningStore((s) => s.getSelectedTopic);

  const topicTree = useSharedLearningStore((s) => s.topicTree);
  const setTopicTree = useSharedLearningStore((s) => s.setTopicTree);

  const selectedTopicId = useSharedLearningStore((s) => s.selectedTopicId);
  const setTopicFlatList = useSharedLearningStore((s) => s.setTopicFlatList);
  const setSelectedTopicId = useSharedLearningStore(
    (s) => s.setSelectedTopicId
  );

  const mode = useSharedLearningStore((s) => s.mode);
  const setMode = useSharedLearningStore((s) => s.setMode);

  const lastSelfTestPercentage = useSharedLearningStore(
    (s) => s.lastSelfTestPercentage
  );
  const setLastSelfTestPercentage = useSharedLearningStore(
    (s) => s.setLastSelfTestPercentage
  );

  const previousRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPreviousRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);

  const showPreviousTestModal = useSharedLearningStore(
    (s) => s.showPreviousTestModal
  );
  const setShowPreviousTestModal = useSharedLearningStore(
    (s) => s.setShowPreviousTestModal
  );

  const barColor = useSharedLearningStore((s) => s.barColor);
  const setBarColor = useSharedLearningStore((s) => s.setBarColor);

  const showStartTestModal = useSharedLearningStore(
    (s) => s.showStartTestModal
  );
  const setShowStartTestModal = useSharedLearningStore(
    (s) => s.setShowStartTestModal
  );

  const isUpgradeModalOpen = useUpgradeModalStore((s) => s.isUpgradeModalOpen);
  const setIsUpgradeModalOpen = useUpgradeModalStore(
    (s) => s.setIsUpgradeModalOpen
  );
  const testOptions = useSharedLearningStore((s) => s.testOptions);
  const selectedTestOption = useSharedLearningStore(
    (s) => s.selectedTestOption
  );
  const loading = useLoadingStore((s) => s.loading);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  usePageTracking(gtmEvents.smart_learning_page_visit, 5000);

  const eventType = "learning_session";

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

    // Set mode as learning
    setMode("Learning Session");

    // load topic tree on page load
    fetchTopicTree();
    // Load self test form options on page load
    loadSelfTestOptions();

    return () => reset();
  }, []);

  useEffect(() => {
    setSelectedTopic(getSelectedTopic());
  }, [selectedTopicId]);

  // ========== Load Self Test Percentage on Topic-Select ==========
  useEffect(() => {
    const fetchSelfSessionPercentage = async () => {
      setLastSelfTestPercentage(null);
      setBarColor(null);
      if (selectedTopic?.topicId) {
        const { percentage, barColor } =
          (await loadLastSelfTestPercentage(selectedTopic?.topicName, mode)) ||
          {};
        if (percentage) {
          setLastSelfTestPercentage(percentage);
        }
        if (barColor) {
          setBarColor(barColor);
        }
      }
    };
    fetchSelfSessionPercentage();
  }, [mode, selectedTopic?.topicId]);

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
                onClickHandler={(t) => {
                  setSelectedTopicId(t ? t?.topicId : null);
                  pushToDataLayer({
                    event: gtmEvents.Smart_learning_topic_button_click,
                    id: `Smart_learning_topic_button_id`,
                    topic_nameopic_name: t?.topicName,
                    topic_id: t?.topicId,
                  });
                }}
                getId={(t) => t?.topicId}
                getLabel={(t) => t?.topicName}
                getChildren={(t) => t?.children}
                renderRightSection={(_, isActive) =>
                  isActive && (
                    // <div className="w-7 h-7 rounded-full p-1 overflow-hidden border-2 border-dashed border-[var(--border-primary)]">
                    //   <div className="w-full h-full bg-[var(--surface-bg-tertiary)] rounded-full overflow-hidden relative">
                    //     <div
                    //       className="h-full bg-[var(--sb-ocean-bg-active)] z-4 relative"
                    //       style={{ width: `${lastSelfTestPercentage || 0}%` }}
                    //     />
                    //   </div>
                    // </div>
                    <div className="relative">
                      <CircleProgressBar
                        percentage={lastSelfTestPercentage || 0}
                        size={30}
                        strokeWidth={2}
                        stroke="var(--border-secondary)"
                        progressColor={
                          barColor ? barColor : "var(--sb-ocean-bg-active)"
                        }
                        startAngle={90}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiTarget
                          className="w-5 h-5"
                          style={{
                            color: barColor
                              ? barColor
                              : "var(--sb-ocean-bg-active)",
                          }}
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
                topicName={selectedTopic?.topicName ?? ""}
                barColor={barColor}
                lastSelfTestPercentage={lastSelfTestPercentage ?? 0}
                onClickHandler={() => {
                  getActiveCourseAccessStatus() === "renew"
                    ? setIsUpgradeModalOpen(true)
                    : openStartTestModal();
                  pushToDataLayer({
                    event: gtmEvents[`next_${eventType}_button_click`],
                    id: `next_${eventType}_button_id`,
                  });
                }}
              />
            ) : (
              <EmptyState
                title="No data available"
                description="No data available yet. Please refresh page!"
                icon={<LuArchive className="w-24 h-24" />}
                className="max-w-md"
              />
            )
          }
          hideSecondary={
            !selectedTopic ||
            showPreviousTestModal ||
            showStartTestModal ||
            isUpgradeModalOpen
          }
          onSecondaryHide={() => setSelectedTopicId(null)}
        />
      </div>

      {/* Start Session Modal */}
      <Modal
        isOpen={showStartTestModal}
        onClose={() => {
          setShowStartTestModal(false);
          pushToDataLayer({
            event: gtmEvents[`cancel_${eventType}_button_click`],
            id: `cancel_${eventType}_button_id`,
          });
        }}
        size="lg"
        className="p-4"
      >
        <SLTestModalContent
          onStart={() => {
            handleShowPreviousOrStartTest({
              setPreviousRunningTest,
              setShowPreviousTestModal,
              startTestCallback: () =>
                handleStartTest(
                  navigate,
                  mode,
                  selectedTopic,
                  selectedTestOption
                ),
            });
            pushToDataLayer({
              event: gtmEvents[`start_${eventType}_button_click`],
              id: `start_${eventType}_button_id`,
              test_name: selectedTopic?.topicName,
              test_id: selectedTopic?.topicId,
            });
          }}
          onClose={() => {
            setShowStartTestModal(false);
            pushToDataLayer({
              event: gtmEvents[`cancel_${eventType}_button_click`],
              id: `cancel_${eventType}_button_id`,
            });
          }}
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
            handleStartTest(navigate, mode, selectedTopic, selectedTestOption)
          }
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
    </div>
  );
};

export default SmartLearningPage;
