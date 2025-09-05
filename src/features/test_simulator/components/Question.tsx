// Types
import { type Question, QuestionStatus } from "../test_simulator.types";

// Store
import useTestStore from "../store/useTestStore";

// Utils
import cn from "../../../utils/classNames";
import { colors, Theme } from "../../../utils/colors";

/* ---------------------------- Theme Mappings ---------------------------- */
const statusThemeMap: Record<QuestionStatus, Theme> = {
  [QuestionStatus.NOT_VISITED]: Theme.Sakura,
  [QuestionStatus.NOT_ATTEMPTED]: Theme.Pumpkin,
  [QuestionStatus.ATTEMPTED]: Theme.Ocean,
  [QuestionStatus.MARKED_FOR_REVIEW]: Theme.Sunglow,
  [QuestionStatus.VISITED]: Theme.Neutral,
  [QuestionStatus.HELP]: Theme.Valencia,
};

const reviewThemeMap: Record<string, Theme> = {
  Correct: Theme.GreenHaze,
  Incorrect: Theme.Valencia,
  NotAnswer: Theme.Neutral,
};

/* --------------------------- Helper Functions --------------------------- */
const getActiveBg = (hexColor: string, opacity = 0.1): string => {
  const temp = document.createElement("div");
  temp.style.color = hexColor;
  document.body.appendChild(temp);
  const rgb = getComputedStyle(temp).color; // "rgb(r, g, b)"
  document.body.removeChild(temp);

  return rgb.replace("rgb", "rgba").replace(")", `, ${opacity})`);
};

/* ------------------------------- Component ------------------------------ */
interface QuestionProps {
  question: Question;
  questionNumber: number;
  className?: string;
}

/**
 * Renders a button for a single question in the test simulator.
 * Handles setting the current question when clicked.
 */
const QuestionCard = ({ question, questionNumber, className }: QuestionProps) => {
  const { correctResponseEnabled } = useTestStore((s) => s.features);
  const setCurrentQuestion = useTestStore((s) => s.setCurrentQuestion);
  const activeQuestion = useTestStore((s) => s.getCurrentQuestion());
  const getStatusByQuestionId = useTestStore((s) => s.getStatusByQuestionId);

  const isActive = question.questionId === activeQuestion?.questionId;

  // Determine theme
  const theme: Theme = correctResponseEnabled
    ? reviewThemeMap[question.answerStatus ?? "NotAnswer"]
    : statusThemeMap[getStatusByQuestionId(question.questionId) ?? QuestionStatus.NOT_VISITED];

  const themeColors = colors[theme];

  return (
    <button
      onClick={() => setCurrentQuestion(question)}
      className={cn(
        "cursor-pointer min-w-[50px] min-h-[50px] max-w-[60px] max-h-[60px] rounded-[16px] flex justify-center items-center border",
        isActive
          ? "font-bold bg-[var(--surface-bg-secondary)]"
          : "hover:bg-[var(--surface-bg-secondary)] focus:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)]",
        className
      )}
      style={{
        borderColor: themeColors.bg.active,
        backgroundColor: isActive ? getActiveBg(themeColors.bg.active) : undefined,
      }}
    >
      <span>Q{questionNumber}</span>
    </button>
  );
};

export default QuestionCard;
