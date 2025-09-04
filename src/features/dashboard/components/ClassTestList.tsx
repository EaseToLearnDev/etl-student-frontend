// Hooks
import { useCTStore } from "../../../global/hooks/useCTStore";

// Components
import ClassTestCard from "./ClassTestCard";
import EmptyState from "../../../components/EmptyState";
import { Modal } from "../../../components/Modal";
import StartTopicTestModalContent from "../../exam_room/shared/components/StartTopicTestModalContent";
import { useNavigate } from "react-router";
import type { ClassTest } from "../../../global/types/classTest.types";
import { handleStartTest } from "../../exam_room/topic_test/services/handleStartTest";

/**
 * Renders a list of class test cards using data from the CT store.
 */
const ClassTestList = () => {
  const testList = useCTStore((s) => s.testList);
  const selectedTest = useCTStore((s) => s.selectedTest);
  const setSelectedTest = useCTStore((s) => s.setSelectedTest);
  const showStartTestModal = useCTStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useCTStore((s) => s.setShowStartTestModal);

  const navigate = useNavigate();

  return (
    <>
      {testList && testList?.length > 0 ? (
        testList?.map((t, idx) => (
          <div className="flex flex-row 2xl:flex-col max-h-full overflow-x-auto 2xl:overflow-y-auto pt-4">
            <ClassTestCard
              key={idx}
              test={t}
              onStart={(test: ClassTest) => {
                setSelectedTest(test);
                setShowStartTestModal(true);
              }}
            />
          </div>
        ))
      ) : (
        <EmptyState title="No Class Tests Available" />
      )}

      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        <StartTopicTestModalContent
          testName={selectedTest?.testTitle || ""}
          onStart={() => {
            handleStartTest({
              navigate,
              testId: selectedTest?.scheduleId ?? null,
              testType: 4,
            });
            setShowStartTestModal(false);
          }}
          onClose={() => setShowStartTestModal(false)}
          details={{
            marksCorrect: selectedTest?.markCorrectAns,
            marksIncorrect: selectedTest?.markIncorrectAns,
            marksUnattempted: selectedTest?.markNotAttempt,
            questionType: selectedTest?.questionType,
            totalMarks: selectedTest?.totalMark,
            totalQuestions: selectedTest?.totalQuestion,
            totalTime: selectedTest?.totalTime,
          }}
        />
      </Modal>
    </>
  );
};

export default ClassTestList;
