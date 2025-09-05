// Icons
// import { MdChevronLeft } from "react-icons/md";

// Utils
import cn from "../../../../utils/classNames";

// Components
import AiIcon from "../../../../components/icons/ai-icon";
import QuestionNavigator from "./QuestionNavigator";
// import AiChatPanel from "../AiChatPanel";
import { useAiStore } from "../../store/useAiStore";
import Button from "../../../../components/Button";
import useTestStore from "../../store/useTestStore";
import StatusGroup from "../StatusGroup";

/**
 * TestSidePanel component renders a side panel for the test simulator interface.
 *
 */
const TestSidePanel = () => {
  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);
  const setIsSubmissionModalOpen = useTestStore(
    (state) => state.setIsSubmissionModalOpen
  );
  const {correctResponseEnabled} = useTestStore(s => s.features);

  const isAiFeatureEnabled = useAiStore((s) => s.isAiFeatureEnabled);
  return (
    <div className="relative h-full flex flex-col gap-5 overflow-y-hidden">
      <div className="flex justify-between items-center">
        {/* <h5>{isAiChatOpen ? "Assistant Tony" : "Questions"}</h5> */}
        <h5>Questions</h5>

        {isAiFeatureEnabled && (
          <button
            onClick={() => setIsHelpModalOpen(true)}
            className={cn(
              "cursor-pointer hover:bg-[var(--surface-bg-secondary)]",
              "size-10 aspect-square rounded-full flex justify-center items-center"
            )}
          >
            {/* {isAiChatOpen ? (
            <MdChevronLeft size={20} />
          ) : (
            <AiIcon fontSize={18} />
          )} */}
            <AiIcon fontSize={18} />
          </button>
        )}
      </div>
      {/* {isAiChatOpen ? <AiChatPanel /> : <QuestionNavigator />} */}
      <QuestionNavigator />

      {/* Submit And Status Group Container */}
      <div className="fixed bottom-0 left-0 right-0 h-[300px] max-h-[400px] flex flex-col justify-center items-center gap-5 bg-[var(--surface-bg-primary)]">
        <div className="flex flex-col gap-5 w-full max-w-[350px] p-5">
          {!correctResponseEnabled && <div className="flex flex-col gap-3">
            <Button onClick={() => setIsSubmissionModalOpen(true)}>
              Submit
            </Button>
          </div>}
          <StatusGroup />
        </div>
      </div>
    </div>
  );
};

export default TestSidePanel;
