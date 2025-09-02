// Store
import useTestStore from "../store/useTestStore";

// Utils
import cn from "../../../utils/classNames";

// Components
import Question from "./Question";
// import { QuestionStatus } from "../test_simulator.types";

interface SectionWiseQuestionListProps {
  className?: string;
}

/**
 * Renders a list of questions grouped by section.
 * Accepts an optional className for custom styling.
 */
const SectionWiseQuestionList = ({
  className,
}: SectionWiseQuestionListProps) => {
  const sections = useTestStore((state) => state.sectionsUI);
  // const getStatusByQuestionId = useTestStore(
  //   (state) => state.getStatusByQuestionId
  // );

  // const colorMap: Record<QuestionStatus, string> = {
  //   [QuestionStatus.ATTEMPTED]: "border border-[var(--sb-ocean-bg-active)]",
  //   [QuestionStatus.NOT_VISITED]: "border border-[var(--sb-border-secondary)]",
  //   [QuestionStatus.NOT_ATTEMPTED]: "border border-[var(--sb-pumpkin-bg-active)]",
  //   [QuestionStatus.MARKED_FOR_REVIEW]: "border border-[var(--sb-sunglow-bg-active)]",
  // };

  return (
    <div
      className={cn(
        "flex flex-col gap-5 overflow-y-auto scrollbar-hide",
        className
      )}
    >
      {sections?.map((section, index) => {
        return (
          <div
            className="w-full flex  flex-col gap-5"
            key={`${section.sectionName}-${index}`}
          >
            <h6 className="text-center">{section.sectionName}</h6>
            <div className="flex flex-wrap gap-3">
              {section.questionList.map((q, i: number) => (
                <Question
                  key={q.questionId}
                  question={q}
                  questionNumber={i + 1}
                  // className={
                  //   colorMap[
                  //     getStatusByQuestionId(q.questionId) ??
                  //       QuestionStatus.NOT_VISITED
                  //   ]
                  // }
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionWiseQuestionList;
