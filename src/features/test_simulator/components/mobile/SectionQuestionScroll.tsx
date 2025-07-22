// Store
import useTestStore from "../../store/useTestStore";

// Components
import Question from "../Question";

/**
 * Renders a scrollable list of questions for the current section in the test simulator (mobile view).
 */
const SectionQuestionScroll = () => {
  const currentQuestion = useTestStore((state) => state.getCurrentQuestion());
  const currentSection = useTestStore((state) =>
    state.sectionsUI.find((s) => s.sectionName === currentQuestion?.sectionName)
  );

  if (!currentSection?.questionList) return null;

  return (
    <div className="w-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5">
      <div className="flex flex-col justify-center gap-3 items-center">
        <h3 className="text-center">{currentQuestion?.sectionName}</h3>
        <div className="flex gap-2 justify-center overflow-x-auto">
          {currentSection?.questionList?.length > 0 ? (
            currentSection?.questionList?.map((q, i: number) => (
              <Question
                key={q.questionId}
                question={q}
                questionNumber={i + 1}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionQuestionScroll;
