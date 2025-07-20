import cn from "../../../utils/classNames";
import useTestStore from "../store/useTestStore";
import { type QuestionType } from "../types";

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
}

const Question = ({ question, questionNumber }: QuestionProps) => {
  const setCurrentQuestion = useTestStore((state) => state.setCurrentQuestion);
  return (
    <button
      onClick={() => setCurrentQuestion(question)}
      key={question.questionId}
      className={cn(
        "cursor-pointer min-w-[50px] min-h-[50px] max-w-[60px] max-h-[60px] rounded-[16px] flex justify-center items-center",
        "border-1 border-[var(--border-primary)] hover:bg-[var(--surface-bg-secondary)] focus:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)]"
      )}
    >
      <span>Q{questionNumber}</span>
    </button>
  );
};

export default Question;
