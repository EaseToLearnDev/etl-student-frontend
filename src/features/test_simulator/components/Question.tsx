// Types
import { type Question } from "../test_simulator.types";

// Store
import useTestStore from "../store/useTestStore";

// Utils
import cn from "../../../utils/classNames";

interface QuestionProps {
  question: Question;
  questionNumber: number;
  className?: string;
}

/**
 * Renders a button for a single question in the test simulator.
 * Handles setting the current question when clicked.
 */
const QuestionCard = ({ question, questionNumber, className = "" }: QuestionProps) => {
  const setCurrentQuestion = useTestStore((state) => state.setCurrentQuestion);
  const activeQuestion = useTestStore((state) => state.getCurrentQuestion());

  return (
    <button
      onClick={() => setCurrentQuestion(question)}
      className={cn(
        "cursor-pointer min-w-[50px] min-h-[50px] max-w-[60px] max-h-[60px] rounded-[16px] flex justify-center items-center border-1",
        className,
        question?.questionId === activeQuestion?.questionId
          ? "border-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-bg-active)]"
          : "border-[var(--border-primary)] hover:bg-[var(--surface-bg-secondary)] focus:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)]"
      )}
    >
      <span>Q{questionNumber}</span>
    </button>
  );
};

export default QuestionCard;
