// Store
import useDarkModeStore from "../../../../store/useDarkModeStore";
import useTestStore from "../../store/useTestStore";

// Components
import Button from "../../../../components/Button";
import Radio from "../../../../components/Radio";

/**
 * ActiveQuestionPanel component for desktop view.
 *
 * Renders the currently active question, its options, and navigation controls.
 * Allows users to select an answer, mark for review, clear response, and navigate between questions.
 */
const ActiveQuestionPanel = () => {
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);
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
    <div className="h-full flex flex-col justify-between">
      {/* Active Question Panel */}
      <div className="flex flex-col gap-10">
        {/* Question Title & Body  */}
        <div className="h-full flex flex-col gap-4">
          <h5 className="text-[24px]">{currentQuestion?.sectionName}</h5>
          <h5>{currentQuestion?.questionBody}</h5>
        </div>
        {/* Response Choices */}
        <div className="flex flex-col gap-5">
          {currentQuestion?.responseChoice.map((response) => (
            <div key={response.responseId} className="flex items-center gap-4">
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
      <div className="flex flex-wrap gap-y-4 justify-center lg:justify-between items-center">
        <div className="flex items-center gap-3">
          <Button style="secondary" onClick={goToPrev}>
            Previous
          </Button>
          <Button style="secondary" onClick={goToNext}>
            Next
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button style="neutral" onClick={markCurrentFoReview}>
            Mark for Review
          </Button>
          <Button style="neutral" onClick={clearCurrentResponse}>
            Clear
          </Button>
          <Button style="neutral" onClick={toggleDarkMode}>
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveQuestionPanel;
