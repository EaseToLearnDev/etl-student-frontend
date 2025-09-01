// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Icons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Types
import { type Topic } from "../../../shared/types";

// Store & Hooks
import useIsMobile from "../../../../hooks/useIsMobile";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";
import { useTTStore } from "../store/useTTStore";

// Utils
import { capitalizeWords } from "../../../../utils";

// Services
import { loadTopicTree } from "../services/loadTopicTree";
import { loadTopicTestList } from "../services/loadTopicTestList";
import { flattenTopics } from "../../../shared/utils/flattenTopicTree";
import { manageTestModal } from "../../../shared/services/manageTestModal";
import { handleNewTestModal } from "../../../shared/services/handleNewTestModal";
import { handleResumeTest } from "../../../study_room/smart_learning/services/handleTest";
import { handleStartTest } from "../services/handleStartTest";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TestCardList from "../../../shared/components/TestCardList";
import TopicTreeView from "../../../shared/components/TopicTreeView";
import TopicTestInstructions from "../components/TopicTestInstructions";
import { Modal } from "../../../../components/Modal";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import StartTopicTestModalContent from "../../shared/components/StartTopicTestModalContent";
import Button from "../../../../components/Button";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import { TreeViewSkeleton } from "../../../../components/TreeViewSkeleton";

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

  const prevRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);

  const testList = useTTStore((s) => s.testList);
  const selectedTest = useTTStore((s) => s.selectedTest);
  const setSelectedTest = useTTStore((s) => s.setSelectedTest);
  const showStartTestModal = useTTStore((s) => s.showStartTestModal);
  const showPreviousTestModal = useTTStore((s) => s.showPreviousTestModal);
  const setShowStartTestModal = useTTStore((s) => s.setShowStartTestModal);
  const setShowPreviousTestModal = useTTStore(
    (s) => s.setShowPreviousTestModal
  );

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
            showTestList ? (
              <TestCardList
                tests={testList || []}
                infoClickHandler={() => {
                  setHideSecondary(false);
                }}
                onClickHandler={(test) => {
                  const selectedTest =
                    testList?.find((t) => t.mockTestId === test.id) ?? null;
                  setSelectedTest(selectedTest);
                  manageTestModal({
                    previousRunningTest: prevRunningTest,
                    setPreviousRunningTest: setPrevRunningTest,
                    setShowStartTestModal,
                    setShowPreviousTestModal,
                  });
                }}
              />
            ) : loading ? (
              <TreeViewSkeleton />
            ) : (
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
            )
          }
          secondaryContent={
            showTestList ? (
              <TopicTestInstructions
                title={capitalizeWords(selectedTopic.topicName)}
              />
            ) : (
              <></>
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
            handleStartTest({
              navigate,
              testId: selectedTest?.mockTestId ?? null,
              testType: 2,
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
            handleNewTestModal(setShowStartTestModal, setShowPreviousTestModal)
          }
          onResume={() => handleResumeTest(navigate, prevRunningTest)}
          onClose={() => setShowPreviousTestModal(false)}
          testName={prevRunningTest?.testName || ""}
        />
      </Modal>
    </div>
  );
};

export default TopicTestPage;
