// Store
import useTestStore from "../store/useTestStore";

// Utils
import cn from "../../../utils/classNames";

// Components
import Question from "./Question";

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
