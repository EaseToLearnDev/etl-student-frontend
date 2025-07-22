// React
import { useState } from "react";

// Icons
import { MdChevronLeft } from "react-icons/md";

// Utils
import cn from "../../../../utils/classNames";

// Components
import AiIcon from "../../../../components/icons/ai-icon";
import QuestionNavigator from "./QuestionNavigator";
import AiChatPanel from "../AiChatPanel";

const TestSidePanel = () => {
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  return (
    <div className="relative h-full flex flex-col gap-5 overflow-y-hidden">
      <div className="flex justify-between items-center">
        <h5>{isAiChatOpen ? "Assistant Tony" : "Questions"}</h5>
        <button
          onClick={() => setIsAiChatOpen((prev) => !prev)}
          className={cn(
            "cursor-pointer rounded-full hover:bg-[var(--surface-bg-secondary)]",
            "w-[32px] h-[32px] flex justify-center items-center"
          )}
        >
          {isAiChatOpen ? (
            <MdChevronLeft size={20} />
          ) : (
            <AiIcon fontSize={18} />
          )}
        </button>
      </div>
      {isAiChatOpen ? <AiChatPanel /> : <QuestionNavigator />}
    </div>
  );
};

export default TestSidePanel;
