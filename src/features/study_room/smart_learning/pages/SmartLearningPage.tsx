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
import { getActiveCourseAccessStatus } from "../../../../global/services/upgrade";
import useUpgradeModalStore from "../../../shared/hooks/useUpgradeModalStore";
import UpgradeModal from "../../../shared/components/UpgradeModal";
import loadSelfTestOptions from "../services/loadSelfTestOptions";
import { LuArchive } from "react-icons/lu";
import { FiTarget } from "react-icons/fi";
import CircleProgressBar from "../../../report/components/newreports/circularProgressBar";
import { pushToDataLayer } from "../../../../utils/gtm";
import { openStartTestModal } from "../services/openStartTestModal";
import { usePageTracking } from "../../../../hooks/usePageTracking";
import { gtmEvents } from "../../../../utils/gtm-events";

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

  const barColor = useSLStore((s) => s.barColor);
  const setBarColor = useSLStore((s) => s.setBarColor);

  const showStartTestModal = useSLStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useSLStore((s) => s.setShowStartTestModal);

  const isUpgradeModalOpen = useUpgradeModalStore((s) => s.isUpgradeModalOpen);
  const setIsUpgradeModalOpen = useUpgradeModalStore(
    (s) => s.setIsUpgradeModalOpen
  );
  const testOptions = useSLStore((s) => s.testOptions);
  const selectedTestOption = useSLStore((s) => s.selectedTestOption);

  const loading = useLoadingStore((s) => s.loading);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  usePageTracking(gtmEvents.smart_learning_page_visit, 5000)

  const eventType = mode == "Learning Session" ? "learning_session" : "competitive_session";
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
            })
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
          }} topicName={selectedTopic?.topicName || ""}
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
