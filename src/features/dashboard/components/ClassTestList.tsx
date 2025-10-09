// Hooks
import { useCTStore } from "../../../global/hooks/useCTStore";

// Components
import ClassTestCard from "./ClassTestCard";
import EmptyState from "../../../components/EmptyState";
import { Modal } from "../../../components/Modal";
import StartTopicTestModalContent from "../../exam_room/shared/components/StartTopicTestModalContent";
import { useNavigate } from "react-router";
import type { ClassTest } from "../../../global/types/classTest.types";
import { handleStartTest } from "../../exam_room/shared/services/handleStartTest";
import { LuCalendarMinus, LuCalendarX, LuFilePenLine } from "react-icons/lu";

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
        <EmptyState
          title='No scheduled test available'
          description='There are no upcoming tests scheduled at the moment. Please check back later.'
          icon={<LuCalendarX className='w-20 h-20' />}
          className="max-w-md lg:max-w-sm"
        />
      )}

      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        <StartTopicTestModalContent
          customTitle={"Class Test"}
          testName={selectedTest?.testTitle || ""}
          onStart={() => {
            handleStartTest({
              navigate,
              testId: selectedTest?.testId ?? null,
              classTestId: selectedTest?.scheduleId,
              testType: selectedTest?.testType,
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
