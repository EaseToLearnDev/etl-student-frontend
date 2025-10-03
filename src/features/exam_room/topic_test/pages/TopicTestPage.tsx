// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Icons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Types
import { type Topic } from "../../../shared/types";

// Store & Hooks
import useIsMobile from "../../../../hooks/useIsMobile";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import { useTTStore } from "../store/useTTStore";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";

// Utils
import { capitalizeWords } from "../../../../utils";

// Services
import { loadTopicTree } from "../services/loadTopicTree";
import { loadTopicTestList } from "../services/loadTopicTestList";
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";
import { handleShowPreviousOrStartTest } from "../../../shared/services/handleShowPreviousOrStartTest";
import { handleResumeTest } from "../../../study_room/smart_learning/services/handleTest";
import { handleStartTest } from "../../shared/services/handleStartTest";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TestCardList from "../../../shared/components/TestCardList";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import TopicTestInstructions from "../components/TopicTestInstructions";
import { Modal } from "../../../../components/Modal";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import StartTopicTestModalContent from "../../shared/components/StartTopicTestModalContent";
import Button from "../../../../components/Button";
import { TreeViewSkeleton } from "../../../../components/TreeViewSkeleton";
import EmptyState from "../../../../components/EmptyState";
import { getActiveCourseAccessStatus } from "../../../../global/services/upgrade";
import useUpgradeModalStore from "../../../shared/hooks/useUpgradeModalStore";
import UpgradeModal from "../../../shared/components/UpgradeModal";
import { useToastStore } from "../../../../global/hooks/useToastStore";
import { Toast } from "../../../../components/Toast";

/**
 * page for displaying the topic test tree view, allowing users to select a topic and view related tests and instructions.
 */
const TopicTestPage = () => {
  // Hooks
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const reset = useTTStore((s) => s.reset);
  const resetSelectedTopic = useTTStore((s) => s.resetSelectedTopic);

  const topicTree = useTTStore((s) => s.topicTree);
  const setTopicTree = useTTStore((s) => s.setTopicTree);

  const selectedTopicId = useTTStore((s) => s.selectedTopicId);
  const setTopicFlatList = useTTStore((s) => s.setTopicFlatList);
  const getSelectedTopic = useTTStore((s) => s.getSelectedTopic);
  const setSelectedTopicId = useTTStore((s) => s.setSelectedTopicId);
  const setTestList = useTTStore((s) => s.setTestList);

  const previousRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPreviousRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);

  const testList = useTTStore((s) => s.testList);
  const selectedTest = useTTStore((s) => s.selectedTest);
  const setSelectedTest = useTTStore((s) => s.setSelectedTest);
  const showStartTestModal = useTTStore((s) => s.showStartTestModal);
  const showPreviousTestModal = useTTStore((s) => s.showPreviousTestModal);
  const setShowStartTestModal = useTTStore((s) => s.setShowStartTestModal);
  const setShowPreviousTestModal = useTTStore(
    (s) => s.setShowPreviousTestModal
  );

  const isUpgradeModalOpen = useUpgradeModalStore((s) => s.isUpgradeModalOpen);
  const setIsUpgradeModalOpen = useUpgradeModalStore(
    (s) => s.setIsUpgradeModalOpen
  );

  const toastData = useToastStore(s => s.toastData)
  const showToast = useToastStore(s => s.showToast)

  const loading = useLoadingStore((s) => s.loading);

  // States
  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // useEffects
  useEffect(() => {
    const fetchTopicTree = async () => {
      const data = await loadTopicTree();
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
    const fetchTestList = async (selectedTopic: Topic | null) => {
      if (selectedTopic) {
        const list = await loadTopicTestList(selectedTopic);
        if (list) {
          setTestList(list);
        }
      }
    };
    const selectedTopic = getSelectedTopic();
    setSelectedTopic(selectedTopic);
    fetchTestList(selectedTopic);
  }, [selectedTopicId]);

  const showTestList = selectedTopic && testList && testList?.length > 0;

  // Render
  return (
    <div className="h-full flex flex-col flex-grow">
      <div className="flex items-center gap-2">
        {selectedTopic && testList && testList?.length > 0 && (
          <Button
            onClick={resetSelectedTopic}
            style="secondary"
            className="text-[var(--sb-ocean-bg-active)] hover:text-[var(--sb-ocean-bg-hover)] border-none"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <p>Go Back</p>
          </Button>
        )}
        <h5 className="!font-semibold pl-2 items-end text-ellipsis line-clamp-2">
          {selectedTopic && testList && testList?.length > 0
            ? capitalizeWords(selectedTopic?.topicName)
            : "Select Your Topic"}
        </h5>
      </div>
      <div className="mt-4 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            loading ? (
              <TreeViewSkeleton />
            ) : showTestList ? (
              <TestCardList
                tests={testList || []}
                infoClickHandler={() => {
                  setHideSecondary(false);
                }}
                onClickHandler={(test) => {
                  const selectedTest =
                    testList?.find((t) => t.mockTestId === test.id) ?? null;
                  setSelectedTest(selectedTest);
                  getActiveCourseAccessStatus() === "renew"
                    ? setIsUpgradeModalOpen(true)
                    : setShowStartTestModal(true);
                }}
              />
            ) : topicTree && topicTree.length > 0 ? (
              <TopicTreeView
                topics={topicTree || []}
                selectedTopic={selectedTopic}
                onClickHandler={(t) =>
                  setSelectedTopicId(t ? t?.topicId : null)
                }
                getId={(t) => t.topicId}
                getLabel={(t) => t.topicName}
                getChildren={(t) => t.children}
                renderRightSection={(_, isActive) =>
                  isActive && (
                    <div className="mr-4">
                      <p className="text-[var(--text-tertiary)]">
                        {testList?.length && testList?.length > 0
                          ? `${testList?.length} Tests Available`
                          : "0 Test Available"}
                      </p>
                    </div>
                  )
                }
              />
            ) : (
              <EmptyState title="No Tests Available" />
            )
          }
          secondaryContent={
            showTestList ? (
              <TopicTestInstructions
                title={capitalizeWords(selectedTopic.topicName)}
              />
            ) : (
              <EmptyState title="No Instructions Available" />
            )
          }
          hideSecondary={!showTestList || hideSecondary}
          onSecondaryHide={
            showTestList ? () => setHideSecondary(true) : undefined
          }
        />
      </div>{" "}
      {/* Start Test Modal */}
      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        <StartTopicTestModalContent
          testName={selectedTest?.mockTestTitle || ""}
          onStart={() =>
            handleShowPreviousOrStartTest({
              setPreviousRunningTest,
              setShowPreviousTestModal,
              startTestCallback: () =>
                handleStartTest({
                  navigate,
                  testId: selectedTest?.mockTestId ?? null,
                  testType: 2,
                }),
            })
          }
          onClose={() => setShowStartTestModal(false)}
          details={{
            marksCorrect: selectedTest?.patternDetails?.markCorrectAns,
            marksIncorrect: selectedTest?.patternDetails?.markIncorrectAns,
            marksUnattempted: selectedTest?.patternDetails?.markNotAttempt,
            questionType: selectedTest?.patternDetails?.questionType,
            totalMarks: selectedTest?.patternDetails?.totalMark,
            totalQuestions: selectedTest?.patternDetails?.totalQuestion,
            totalTime: selectedTest?.patternDetails?.totalTime,
          }}
        />
      </Modal>
      {/* Previous Test Modal */}
      <Modal
        isOpen={showPreviousTestModal}
        onClose={() => setShowPreviousTestModal(false)}
        size="lg"
        className="p-4"
      >
        <PreviousTestModalContent
          onStart={() =>
            handleStartTest({
              navigate,
              testId: selectedTest?.mockTestId ?? null,
              testType: 2,
            })
          }
          onResume={() => handleResumeTest(navigate, previousRunningTest)}
          onClose={() => setShowPreviousTestModal(false)}
          testName={previousRunningTest?.testName || ""}
        />
      </Modal>
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
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

export default TopicTestPage;
