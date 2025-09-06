// Hooks
import useTestStore from "../store/useTestStore";

// Components
import Button from "../../../components/Button";
import Radio from "../../../components/Radio";
import { MathJax } from "better-react-mathjax";
import {
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
} from "react-icons/md";
import cn from "../../../utils/classNames";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import useIsMobile from "../../../hooks/useIsMobile";
import { useNavigate } from "react-router";
import { useTeacherSupportStore } from "../store/useTeacherSupportStore";

/**
 * ActiveQuestionPanel component for desktop view.
 *
 * Renders the currently active question, its options, and navigation controls.
 * Allows users to select an answer, mark for review, clear response, and navigate between questions.
 */
const ActiveQuestionPanel = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { correctResponseEnabled } = useTestStore((s) => s.features);
  const setIsTeacherSupportModalOpen = useTeacherSupportStore(
    (s) => s.setIsTeacherSupportModalOpen
  );
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
  const getCurrentQuestionIndex = useTestStore((state) =>
    state.getCurrentQuestionIndex()
  );

  const setCurrentResponse = useTestStore((state) => state.setCurrentResponse);

  return (
    <div
      className={cn(
        isMobile
          ? "flex flex-1 flex-col w-full h-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5 justify-between"
          : "h-full flex flex-col justify-between"
      )}
    >
      {/* Active Question Panel */}
      <div className={cn("flex flex-col", isMobile ? "gap-5" : "gap-10")}>
        {/* Question Title & Body  */}
        <div className="h-full flex flex-col gap-4">
          <h5 className="text-[24px]">
            {currentQuestion?.sectionName ?? "Questions"}
          </h5>
          <MathJax dynamic>
            <div className="flex gap-1 max-w-[65ch] text-xl">
              <h5>{`Q${getCurrentQuestionIndex + 1})`}</h5>
              <div
                className="math-container max-h-[400px] overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: (currentQuestion?.questionBody ?? "")
                    .trim()
                    .replace(/[\r\n]+/g, ""),
                }}
              />
            </div>
          </MathJax>
        </div>

        {/* Response Section */}
        <div className="flex flex-col gap-5">
          {/* Case: MCQ */}
          {currentQuestion?.questionType === "Multiple-Choice" &&
            currentQuestion?.responseChoice.map((response) => (
              <div
                key={response.responseId}
                className="flex flex-wrap items-center gap-3"
              >
                <h6>{`${response?.responseId}.`}</h6>
                <Radio
                  label={response.responseText}
                  value={response?.responseId}
                  checked={currentResponse === response.responseId}
                  onChange={(e) => {
                    setCurrentResponse(e.target.value ?? "");
                  }}
                  disabled={correctResponseEnabled}
                />

                {/* Correct/Incorrect Labels */}
                {correctResponseEnabled && (
                  <>
                    {response?.responseId ===
                    currentQuestion?.correctResponse ? (
                      <div className="flex items-center gap-1 p-2 px-3 border border-[var(--sb-green-haze-bg-active)] text-[var(--sb-green-haze-bg-active)] rounded-md">
                        <MdCheck size={16} />
                        <p className="!font-semibold text-[var(--text-primary)]">
                          Correct Answer
                        </p>
                      </div>
                    ) : response?.responseId ===
                      currentQuestion?.studentResponse ? (
                      <div className="flex items-center gap-1 p-2 px-3 border border-[var(--sb-valencia-bg-active)] text-[var(--sb-valencia-bg-active)] rounded-md">
                        <MdClose size={16} />
                        <p className="!font-semibold text-[var(--text-primary)]">
                          You Selected Incorrect
                        </p>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            ))}

          {/* Case: Fill in the Blank / Integer */}
          {(currentQuestion?.questionType === "Fill-in-Blank" ||
            currentQuestion?.questionType === "Integer-Type") && (
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={currentResponse ?? ""}
                onChange={(e) => setCurrentResponse(e.target.value)}
                disabled={correctResponseEnabled}
                placeholder={"Enter Your Answer"}
                className="w-full max-w-[300px] px-3 py-2 border rounded-md text-base bg-[var(--surface-bg-primary)]"
              />
              {correctResponseEnabled && (
                <>
                  {currentQuestion?.studentResponse ===
                  currentQuestion?.correctResponse ? (
                    <div className="flex items-center gap-1 p-2 px-3 border border-[var(--sb-green-haze-bg-active)] text-[var(--sb-green-haze-bg-active)] rounded-md">
                      <MdCheck size={16} />
                      <p className="!font-semibold text-[var(--text-primary)]">
                        Correct Answer
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 p-2 px-3 border border-[var(--sb-valencia-bg-active)] text-[var(--sb-valencia-bg-active)] rounded-md">
                        <MdClose size={16} />
                        <p className="!font-semibold text-[var(--text-primary)]">
                          Incorrect Answer
                        </p>
                      </div>
                      <div className="flex items-center gap-1 p-2 px-3 border border-[var(--sb-green-haze-bg-active)] text-[var(--sb-green-haze-bg-active)] rounded-md">
                        <MdCheck size={16} />
                        <MathJax dynamic>
                          <p className="!font-semibold text-[var(--text-primary)]">
                            Correct Answer: {currentQuestion?.correctResponse}
                          </p>
                        </MathJax>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Explanation (Review Mode Only) */}
        {correctResponseEnabled && currentQuestion?.explanations ? (
          <MathJax>
            <WidgetCard title="Explanation" className="shadow-none">
              <div
                className="math-container select-none text-sm"
                dangerouslySetInnerHTML={{
                  __html: currentQuestion?.explanations
                    .trim()
                    .replace(/[\r\n]+/g, ""),
                }}
              />
            </WidgetCard>
          </MathJax>
        ) : (
          <></>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-y-4 justify-center gap-2 items-center mt-4">
        <div
          className={cn(
            "size-[40px] aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
            "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out"
          )}
          onClick={goToPrev}
        >
          <MdChevronLeft size={22} />
        </div>
        {!correctResponseEnabled ? (
          <>
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
              Mark For Review
            </Button>
          </>
        ) : (
          <>
            <Button
              style="secondary"
              className="!min-w-[50px]"
              onClick={() => setIsTeacherSupportModalOpen(true)}
            >
              Teacher Support
            </Button>
            <Button
              style="secondary"
              className="!min-w-[50px]"
              onClick={() => navigate(-1)}
            >
              Exit
            </Button>
          </>
        )}
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
  );
};

export default ActiveQuestionPanel;
