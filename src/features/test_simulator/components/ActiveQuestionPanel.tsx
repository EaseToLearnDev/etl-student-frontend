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
import { QuestionStatus } from "../test_simulator.types";
import { useAiStore } from "../store/useAiStore";
import AiIcon from "../../../components/icons/ai-icon";
import { checkForTable } from "../../../utils";

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
  const questionStatusMap = useTestStore((s) => s.questionStatusMap);
  const currentQuestionStatus = currentQuestion
    ? questionStatusMap[currentQuestion.questionId]
    : null;

  const setCurrentResponse = useTestStore((state) => state.setCurrentResponse);

  // Ai Store
  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);
  const isAiFeatureEnabled = useAiStore((s) => s.isAiFeatureEnabled);

  return (
    <div
      className={cn(
        isMobile
          ? "flex flex-1 flex-col w-full h-full bg-[var(--surface-bg-primary)] rounded-[20px] p-5 justify-between"
          : "h-full flex flex-col justify-between relative"
      )}
    >
      {/* Active Question Panel */}
      <div className={cn("flex flex-col gap-5")}>
        {/* Question Title & Body  */}
        <div className="h-full flex flex-col gap-4">
          <h5 className="text-[24px]">
            {currentQuestion?.sectionName ?? "Questions"}
          </h5>
          {currentQuestion?.commonDataDescription &&
          currentQuestion?.commonDataDescription?.length > 0 ? (
            <WidgetCard className="shadow-none">
              <MathJax dynamic>
                <div
                  className="math-container text-sm"
                  dangerouslySetInnerHTML={{
                    __html: checkForTable(
                      currentQuestion?.commonDataDescription
                        .trim()
                        .replace(/[\r\n]+/g, "")
                    ),
                  }}
                />
              </MathJax>
            </WidgetCard>
          ) : null}
          <MathJax dynamic>
            <div className="flex gap-1 text-base">
              <h6>{`Q${getCurrentQuestionIndex + 1})`}</h6>
              <div
                className="math-container"
                dangerouslySetInnerHTML={{
                  __html: checkForTable(
                    currentQuestion?.questionBody ?? "",
                    "test_simulator_table".trim().replace(/[\r\n]+/g, "")
                  ),
                }}
              />
            </div>
          </MathJax>
        </div>

        {/* Response Section */}
        <div className="flex flex-col gap-5">
          {/* Case: MCQ */}
          {(currentQuestion?.questionType === "Multiple-Choice" ||
            currentQuestion?.questionType === "Multiple-Choice-(5)") &&
            currentQuestion?.responseChoice.map((response) => (
              <div
                key={response.responseId}
                className="flex items-center gap-3"
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
                  __html: checkForTable(
                    currentQuestion?.explanations.trim().replace(/[\r\n]+/g, "")
                  ),
                }}
              />
            </WidgetCard>
          </MathJax>
        ) : (
          <></>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-y-4 justify-center gap-2 items-center py-4">
        <div
          className={cn(
            "size-8 aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
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
              className="!min-w-10 px-2 sm:px-4"
              onClick={clearCurrentResponse}
            >
              Clear
            </Button>
            <Button
              style="secondary"
              className="!min-w-10 px-2 sm:px-4"
              onClick={markCurrentFoReview}
            >
              {currentQuestionStatus === QuestionStatus.MARKED_FOR_REVIEW ||
              currentQuestionStatus === QuestionStatus.ANSWERED_AND_REVIEW
                ? "Unmark Review"
                : "Mark for Review"}
            </Button>
          </>
        ) : (
          <>
            <Button
              style="secondary"
              className="!min-w-10 px-2 sm:px-4"
              onClick={() => setIsTeacherSupportModalOpen(true)}
            >
              Teacher Support
            </Button>
            <Button
              style="secondary"
              className="!min-w-10 px-2 sm:px-4"
              onClick={() => navigate(-1)}
            >
              Exit
            </Button>
          </>
        )}
        <div
          className={cn(
            "size-8 aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
            "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out"
          )}
          onClick={goToNext}
        >
          <MdChevronRight size={22} />
        </div>
      </div>

      {/* Tony AI Floating Button */}
      {isAiFeatureEnabled && (
        <div
          className={cn(
            "flex flex-col items-center gap-1",
            isMobile
              ? "fixed bottom-[120px] right-[32px]"
              : "absolute bottom-4 right-8"
          )}
          onClick={() => {
            setIsHelpModalOpen(true);
          }}
        >
          <div className="cursor-pointer size-12 aspect-square rounded-full bg-[var(--surface-bg-tertiary)] flex justify-center items-center">
            <AiIcon width={28} height={28} />
          </div>
          <span className="font-semibold !text-xs">TONY AI</span>
        </div>
      )}
    </div>
  );
};

export default ActiveQuestionPanel;
