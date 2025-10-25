// Types
import {
  type Question,
  QuestionStatus,
  subjectiveTypes,
} from "../test_simulator.types";

// Store
import useTestStore from "../store/useTestStore";

// Utils
import cn from "../../../utils/classNames";
import { colors, getActiveBg, Theme } from "../../../utils/colors";
import useDrawerStore from "../../../store/useDrawerStore";
import { handleUpdateMarksTest } from "../services/handleUpdateMarksTest";

/* ---------------------------- Theme Mappings ---------------------------- */
const statusThemeMap: Record<string, Theme> = {
  [QuestionStatus.NOT_VISITED]: Theme.Neutral,
  [QuestionStatus.VISITED]: Theme.Neutral,
  [QuestionStatus.NOT_ATTEMPTED]: Theme.Valencia,
  [QuestionStatus.ATTEMPTED]: Theme.GreenHaze,
  [QuestionStatus.MARKED_FOR_REVIEW]: Theme.Amethyst,
  [QuestionStatus.ANSWERED_AND_REVIEW]: Theme.Amethyst,
};

const reviewThemeMap: Record<string, Theme> = {
  Correct: Theme.GreenHaze,
  Incorrect: Theme.Valencia,
  NotAnswer: Theme.Neutral,
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
const QuestionCard = ({
  question,
  questionNumber,
  className,
}: QuestionProps) => {
  const { correctResponseEnabled } = useTestStore((s) => s.features);
  const jumpToQuestion = useTestStore((s) => s.jumpToQuestion);
  const activeQuestion = useTestStore((s) => s.getCurrentQuestion());
  const questionStatus = useTestStore((s) =>
    s.getStatusByQuestionId(question?.questionId),
  );
  const features = useTestStore((s) => s.features);
  const testMode = useTestStore((s) => s.testMode);
  const closeDrawer = useDrawerStore((s) => s.closeDrawer);

  const isActive = question.questionId === activeQuestion?.questionId;

  // Determine theme
  const theme: Theme = correctResponseEnabled
    ? reviewThemeMap[question.answerStatus ?? "NotAnswer"]
    : statusThemeMap[questionStatus ?? QuestionStatus.NOT_VISITED];

  const activeTheme =
    subjectiveTypes.includes(question?.questionType) && testMode === "review"
      ? colors[Theme.Neutral]
      : colors[theme];

  return (
    <button
      onClick={() => {
        if (features.subjectiveMarksEditEnabled) {
          handleUpdateMarksTest()?.then(() => jumpToQuestion(question));
        } else jumpToQuestion(question);
        closeDrawer();
      }}
      className={cn(
        "relative cursor-pointer min-w-[50px] min-h-[50px] max-w-[60px] max-h-[60px] rounded-[16px] flex justify-center items-center",
        "hover:bg-[var(--surface-bg-secondary)] focus:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] border",
        className,
      )}
      style={{
        borderColor: getActiveBg(activeTheme.bg.active, 0.8),
        backgroundColor: isActive
          ? activeTheme.bg.active
          : getActiveBg(activeTheme.bg.active),
        color: isActive ? activeTheme.content.primary : "var(--text-primary)",
      }}
    >
      <span>Q{questionNumber}</span>
      {!correctResponseEnabled &&
        questionStatus === QuestionStatus.ANSWERED_AND_REVIEW && (
          <div className="absolute -top-0.5 -right-0.5 size-3 aspect-square rounded-full bg-[var(--sb-green-haze-bg-active)]" />
        )}
    </button>
  );
};

export default QuestionCard;
