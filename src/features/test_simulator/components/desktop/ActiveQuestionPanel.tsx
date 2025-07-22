import Button from "../../../../components/Button";
import useDarkModeStore from "../../../../store/useDarkModeStore";
import cn from "../../../../utils/classNames";
import useTestStore from "../../store/useTestStore";

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
      <div className="flex flex-col gap-10">
        <div className="h-full flex flex-col gap-4">
          <h5 className="text-[24px]">{currentQuestion?.sectionName}</h5>
          <h5>{currentQuestion?.questionBody}</h5>
        </div>
        <div className="flex flex-col gap-5">
          {currentQuestion?.responseChoice.map((option) => (
            <div key={option.responseId} className="flex items-center gap-4">
              <label className="flex items-center gap-4 cursor-pointer w-full">
                <input
                  name="option"
                  type="radio"
                  value={option.responseText}
                  checked={currentResponse?.responseId === option.responseId}
                  onChange={(e) => {
                    const response = currentQuestion?.responseChoice?.find(
                      (r) => r.responseText === e.target.value
                    );
                    setCurrentResponse(response ?? null);
                  }}
                  className={cn(
                    "appearance-none w-[14px] h-[14px] border-1 border-[var(--border-primary)] rounded-full outline-none transition-all duration-200 ease-in-out",
                    "checked:bg-[var(--sb-ocean-bg-active)] checked:border-none checked:w-[16px] checked:h-[16px]"
                  )}
                />
                <h6 className="select-none">{option.responseText}</h6>
              </label>
            </div>
          ))}
        </div>
      </div>
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
