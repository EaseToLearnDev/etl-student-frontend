import { useState } from "react";
import AiIcon from "../../../components/icons/ai-icon";
import QuestionNavigator from "./QuestionNavigator";
import AiChatPanel from "./AiChatPanel";
import { MdArrowBack } from "react-icons/md";

const TestSidePanel = () => {
  const [isAiChatOpen, setIsAiChatOpen] = useState(true);
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h6>{isAiChatOpen ? "Assistant Tony" : "Questions"}</h6>
        <button
          onClick={() => setIsAiChatOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          {isAiChatOpen ? <MdArrowBack size={20} /> : <AiIcon />}
        </button>
      </div>
      {isAiChatOpen ? <AiChatPanel /> : <QuestionNavigator />}
    </div>
  );
};

export default TestSidePanel;
