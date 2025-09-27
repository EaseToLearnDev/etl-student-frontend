// Store
import { useEffect, useRef } from "react";
import useTestStore from "../../store/useTestStore";

// Components
import QuestionCard from "../Question";

/**
 * Renders a scrollable list of questions for the current section in the test simulator (mobile view).
 */
const SectionQuestionScroll = () => {
  const currentQuestion = useTestStore((state) => state.getCurrentQuestion());
  const testData = useTestStore((s) => s.testData);
  const currentSection = useTestStore((state) =>
    state.sectionsUI.find((s) => s.sectionName === currentQuestion?.sectionName)
  );
  const currentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentQuestion]);

  if (!currentSection?.questionList) return null;
  return (
    <div className="w-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5">
      <div className="flex flex-col justify-center gap-3 items-center">
        <h3 className="text-center">{currentQuestion?.sectionName}</h3>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 max-w-max px-2">
            {currentSection.questionList.map((q, i: number) => {
              const isCurrent = q.questionId === currentQuestion?.questionId;
              return (
                <div key={q.questionId} ref={isCurrent ? currentRef : null}>
                  <QuestionCard
                    question={q}
                    questionNumber={
                      (testData?.sectionSet.find(
                        (s) => s.sectionName === currentSection.sectionName
                      )?.questionNumbers[i].questionIndex ?? 0) + 1
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionQuestionScroll;
