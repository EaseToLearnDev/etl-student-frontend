// Store
import useTestStore from "../store/useTestStore";

// Utils
import cn from "../../../utils/classNames";

// Components
import Question from "./Question";

// React
import { useEffect, useRef } from "react";

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
  const testData = useTestStore((state) => state.testData);
  const sections = useTestStore((state) => state.sectionsUI);
  const currentQuestion = useTestStore(state => state.getCurrentQuestion());
  const activeQuestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeQuestionRef.current) {
      activeQuestionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentQuestion?.questionId]);

  return (
    <div
      className={cn(
        "flex flex-col gap-5 overflow-y-auto max-h-full",
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
                <div
                  key={q.questionId}
                  ref={currentQuestion?.questionId === q.questionId ? activeQuestionRef : null}
                >
                  <Question
                    question={q}
                    questionNumber={(testData?.sectionSet[index].questionNumbers[i].questionIndex ?? 0) + 1}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SectionWiseQuestionList;
