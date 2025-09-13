// Icons
// import { MdChevronLeft } from "react-icons/md";

// Components
import QuestionNavigator from "./QuestionNavigator";
// import AiChatPanel from "../AiChatPanel";
import Button from "../../../../components/Button";
import useTestStore from "../../store/useTestStore";
import StatusGroup from "../StatusGroup";
import { useGuestStore } from "../../../../global/hooks/useGuestStore";

/**
 * TestSidePanel component renders a side panel for the test simulator interface.
 *
 */
const TestSidePanel = () => {
  const setIsSubmissionModalOpen = useTestStore(
    (state) => state.setIsSubmissionModalOpen
  );
  const setShowGuestTestSubmitModal = useGuestStore(
    (s) => s.setShowGuestTestSubmitModal
  );
  const testMode = useTestStore((s) => s.testMode);
  const { correctResponseEnabled } = useTestStore((s) => s.features);
  return (
    <div className="relative h-full flex flex-col gap-5 overflow-y-hidden">
      <div className="flex justify-between items-center">
        {/* <h5>{isAiChatOpen ? "Assistant Tony" : "Questions"}</h5> */}
        <h5>Questions</h5>
      </div>
      {/* {isAiChatOpen ? <AiChatPanel /> : <QuestionNavigator />} */}
      <QuestionNavigator />

      {/* Submit And Status Group Container */}
      <div className="fixed bottom-0 left-0 right-0 h-[300px] max-h-[400px] flex flex-col justify-center items-center gap-5 bg-[var(--surface-bg-primary)]">
        <div className="flex flex-col gap-5 w-full max-w-[350px] p-5">
          {!correctResponseEnabled && (
            <div className="flex flex-col gap-3">
              <Button
                onClick={() =>
                  testMode === "guest"
                    ? setShowGuestTestSubmitModal(true)
                    : setIsSubmissionModalOpen(true)
                }
              >
                Submit
              </Button>
            </div>
          )}
          <StatusGroup />
        </div>
      </div>
    </div>
  );
};

export default TestSidePanel;
