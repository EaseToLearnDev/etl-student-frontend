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
  const sections = useTestStore((state) => state.getActiveSectionsUI());
  const currentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentQuestion]);

  if (!sections || sections?.length === 0) return null;
  return (
    <div className="w-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5">
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 max-w-max px-2">
          {sections?.map((section) =>
            section?.questionList.map((q, i: number) => {
              const isCurrent = q.questionId === currentQuestion?.questionId;
              return (
                <div key={q.questionId} ref={isCurrent ? currentRef : null}>
                  <QuestionCard question={q} questionNumber={i + 1} />
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionQuestionScroll;
