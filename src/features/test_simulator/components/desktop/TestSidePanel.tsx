// Icons
// import { MdChevronLeft } from "react-icons/md";

// Utils
import cn from "../../../../utils/classNames";

// Components
import AiIcon from "../../../../components/icons/ai-icon";
import QuestionNavigator from "./QuestionNavigator";
// import AiChatPanel from "../AiChatPanel";
import useTestStore from "../../store/useTestStore";

/**
 * TestSidePanel component renders a side panel for the test simulator interface.
 *
 */
const TestSidePanel = () => {
  const setIsHelpModalOpen = useTestStore((s) => s.setIsHelpModalOpen);
  return (
    <div className="relative h-full flex flex-col gap-5 overflow-y-hidden">
      <div className="flex justify-between items-center">
        {/* <h5>{isAiChatOpen ? "Assistant Tony" : "Questions"}</h5> */}
        <h5>Questions</h5>
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className={cn(
            "cursor-pointer rounded-full hover:bg-[var(--surface-bg-secondary)]",
            "w-[32px] h-[32px] flex justify-center items-center"
          )}
        >
          {/* {isAiChatOpen ? (
            <MdChevronLeft size={20} />
          ) : (
            <AiIcon fontSize={18} />
          )} */}
          <AiIcon fontSize={18} />
        </button>
      </div>
      {/* {isAiChatOpen ? <AiChatPanel /> : <QuestionNavigator />} */}
      <QuestionNavigator />
    </div>
  );
};

export default TestSidePanel;
