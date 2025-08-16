// Icons
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Store
import useTestStore from "../../store/useTestStore";

// Utils
import cn from "../../../../utils/classNames";

// Components
import Radio from "../../../../components/Radio";
import Button from "../../../../components/Button";
import { MathJax } from "better-react-mathjax";

/**
 * Mobile-only active question panel component for the test simulator.
 * Displays the current question, response choices, and navigation controls.
 */
const ActiveQuestionPanel = () => {
  const goToPrev = useTestStore((state) => state.goToPrev);
  const goToNext = useTestStore((state) => state.goToNext);
  const markCurrentFoReview = useTestStore(
    (state) => state.markCurrentForReview
  );
  const clearCurrentResponse = useTestStore(
    (state) => state.clearCurrentResponse
  );
  const currentQuestion = useTestStore((state) => state.getCurrentQuestion());
  const currentResponse = useTestStore((s) =>
    currentQuestion ? s.questionResponseMap[currentQuestion?.questionId] : null
  );
  const setCurrentResponse = useTestStore((state) => state.setCurrentResponse);

  return (
    <>
      {/* Active Question Panel */}
      <div className="flex flex-1 flex-col w-full h-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5 justify-between">
        {/* Question Title & Body */}
        <div className="flex flex-col gap-3">
          <h5>Questions</h5>
          <MathJax dynamic>
            <h4>
              <div
                className="math-container max-h-[400px] overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: (currentQuestion?.questionBody ?? "")
                    .trim()
                    .replace(/[\r\n]+/g, ""),
                }}
              />
            </h4>
          </MathJax>
          {/* Response Choices */}
          <div className="flex flex-col gap-5 p-4">
            {currentQuestion?.responseChoice?.map((response, index) => (
              <div key={index} className="flex items-center gap-4">
                <Radio
                  text={response.responseText}
                  checked={currentResponse?.responseId === response.responseId}
                  onChange={(e) => {
                    const response = currentQuestion?.responseChoice?.find(
                      (r) => r.responseText === e.target.value
                    );
                    setCurrentResponse(response ?? null);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="w-full flex justify-center items-center gap-2">
          <div
            className={cn(
              "size-[40px] aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
              "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out"
            )}
            onClick={goToPrev}
          >
            <MdChevronLeft size={22} />
          </div>
          <Button
            style="secondary"
            className="!min-w-[50px]"
            onClick={clearCurrentResponse}
          >
            Clear
          </Button>
          <Button
            style="secondary"
            className="!min-w-[50px]"
            onClick={markCurrentFoReview}
          >
            Review
          </Button>
          <Button style="secondary" className="!min-w-[50px]">
            Save
          </Button>
          <div
            className={cn(
              "size-[40px] aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
              "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out"
            )}
            onClick={goToNext}
          >
            <MdChevronRight size={22} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveQuestionPanel;
