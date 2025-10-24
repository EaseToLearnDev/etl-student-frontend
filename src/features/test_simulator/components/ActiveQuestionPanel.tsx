// React
import { MathJax } from "better-react-mathjax";
import { useNavigate } from "react-router";

// Types
import { QuestionStatus } from "../test_simulator.types";

// Icons
import {
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdCloudUpload,
} from "react-icons/md";

// Utils
import cn from "../../../utils/classNames";
import { checkForTable } from "../../../utils";
import { Theme } from "../../../utils/colors";

// Hooks
import useTestStore from "../store/useTestStore";
import useIsMobile from "../../../hooks/useIsMobile";
import { useTeacherSupportStore } from "../store/useTeacherSupportStore";
import { useAiStore } from "../store/useAiStore";

// Components
import Button from "../../../components/Button";
import Radio from "../../../components/Radio";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import AiIcon from "../../../components/icons/ai-icon";
import Badge from "../../../components/Badge";
import Checkbox from "../../../components/Checkbox";
import { handelFileUpload } from "../services/handleFileUpload";
import { handelFileRemove } from "../services/handleFileRemove";
import { handleUpdateMarksTest } from "../services/handleUpdateMarksTest";

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
    (s) => s.setIsTeacherSupportModalOpen,
  );
  const goToPrev = useTestStore((state) => state.goToPrev);
  const goToNext = useTestStore((state) => state.goToNext);
  const markCurrentFoReview = useTestStore(
    (state) => state.markCurrentForReview,
  );
  const clearCurrentResponse = useTestStore(
    (state) => state.clearCurrentResponse,
  );
  const currentQuestion = useTestStore((state) => state.getCurrentQuestion());
  const currentResponse = useTestStore((s) =>
    currentQuestion ? s.questionResponseMap[currentQuestion?.questionId] : null,
  );
  const getCurrentQuestionIndex = useTestStore((state) =>
    state.getCurrentQuestionIndex(),
  );
  const questionStatusMap = useTestStore((s) => s.questionStatusMap);
  const currentQuestionStatus = currentQuestion
    ? questionStatusMap[currentQuestion.questionId]
    : null;
  const setCurrentResponse = useTestStore((state) => state.setCurrentResponse);
  const setIsSubjectiveMediaModalOpen = useTestStore(
    (s) => s.setIsSubjectiveMediaModalOpen,
  );

  const mode = useTestStore((s) => s.testMode);
  const currentMarksObj = useTestStore((s) =>
    currentQuestion ? s.questionMarksMap[currentQuestion?.questionId] : null,
  );
  const updateCurrentMarksObj = useTestStore((s) => s.updateCurrentMarksObj);
  const updateCurrentTotalMarks = useTestStore(
    (s) => s.updateCurrentTotalMarks,
  );
  const isSubjectiveMarkingMode = useTestStore(
    (s) => s.isSubjectiveMarkingMode,
  );

  // Ai Store
  const setIsHelpModalOpen = useAiStore((s) => s.setIsHelpModalOpen);
  const isAiFeatureEnabled = useAiStore((s) => s.isAiFeatureEnabled);

  return (
    <div
      className={cn(
        "w-full h-full relative flex flex-col justify-between",
        isMobile
          ? "flex-1 bg-[var(--surface-bg-primary)] rounded-[20px] p-5"
          : "",
      )}
    >
      {/* Active Question Panel */}
      <div className={"flex flex-col gap-4 h-full"}>
        {/* Question Type Badge */}
        <div className="flex justify-between items-center gap-4">
          <h5 className="text-ellipsis line-clamp-2">
            {currentQuestion?.sectionName ?? "Questions"}
          </h5>
          <Badge theme={Theme.Ocean} style="filled" className="w-fit">
            <span>{currentQuestion?.questionTypeLabel}</span>
          </Badge>
        </div>

        <div className="max-h-[calc(100%-130px)] pr-2 overflow-y-auto">
          {/* Common Data Description  */}
          <div className="flex flex-col gap-4">
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
                          .replace(/[\r\n]+/g, ""),
                      ),
                    }}
                  />
                </MathJax>
              </WidgetCard>
            ) : null}

            {/* Question Index & Body */}
            <div className="flex gap-1 text-base">
              <h6>{`Q${getCurrentQuestionIndex + 1})`}</h6>
              <MathJax dynamic>
                <div
                  className="math-container text-sm"
                  dangerouslySetInnerHTML={{
                    __html: checkForTable(
                      currentQuestion?.questionBody ?? "",
                      "test_simulator_table",
                    )
                      .trim()
                      .replace(/[\r\n]+/g, ""),
                  }}
                />
              </MathJax>
            </div>

            {/* Columns */}
            {currentQuestion?.columns &&
            currentQuestion?.columns?.length > 0 ? (
              <table className="w-full">
                <tr className="w-full grid grid-cols-2 gap-4">
                  {currentQuestion?.columns?.map((row, index) => (
                    <td
                      key={index}
                      className="p-2 border-b border-b-[var(--border-primary)]"
                    >
                      {row?.columnHeader && row?.columnHeader?.length > 0 ? (
                        <MathJax dynamic>
                          <div
                            className="math-container text-[18px] font-semibold scrollbar-hide"
                            dangerouslySetInnerHTML={{
                              __html: row?.columnHeader
                                .trim()
                                .replace(/[\r\n]+/g, ""),
                            }}
                          />
                        </MathJax>
                      ) : (
                        <></>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="w-full grid grid-cols-2 gap-4">
                  {currentQuestion?.columns?.map((col, indexCol) => (
                    <td key={indexCol} className="w-full">
                      <table className="w-full">
                        {col.columnRows?.map((row, indexRow) => (
                          <tr key={indexRow}>
                            <td className="flex items-center gap-2 p-2 border-b border-b-[var(--border-primary)]">
                              <p className="min-w-[20px]">
                                {row?.rowId}.&nbsp;
                              </p>
                              {row?.rowName && row?.rowName?.length > 0 ? (
                                <MathJax dynamic>
                                  <div
                                    className="math-container text-[14px] scrollbar-hide"
                                    dangerouslySetInnerHTML={{
                                      __html: row?.rowName
                                        .trim()
                                        .replace(/[\r\n]+/g, ""),
                                    }}
                                  />
                                </MathJax>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </td>
                  ))}
                </tr>
              </table>
            ) : (
              <></>
            )}
          </div>

          {/* Response Section */}
          <div className="flex flex-col gap-5 mt-7">
            {/* Case: MCQ and Multiple Response Type Questions */}
            {[
              "Multiple-Choice",
              "Multiple-Choice-(5)",
              "MC-Assertion-Reason",
              "MC-Matching-Type",
              "Selection-Type",
              "True False",
              "Common data",
              "Common Data (5)",
              "MR-Matching-Type",
              "Multiple-Response",
            ].includes(currentQuestion?.questionType || "") &&
              currentQuestion?.responseChoice.map((response) => (
                <div
                  key={response.responseId}
                  className="flex items-center gap-3"
                >
                  <h6>{`${response?.responseId}.`}</h6>
                  {/* Case Multiple Response */}
                  {["MR-Matching-Type", "Multiple-Response"].includes(
                    currentQuestion?.questionType || "",
                  ) ? (
                    <Checkbox
                      label={response?.responseText}
                      value={response?.responseId}
                      checked={
                        !!currentResponse &&
                        currentResponse.text.includes(response.responseId)
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCurrentResponse(response?.responseId, "push");
                        } else {
                          setCurrentResponse(response?.responseId, "pop");
                        }
                      }}
                      disabled={correctResponseEnabled}
                    />
                  ) : (
                    <Radio
                      label={response.responseText}
                      value={response?.responseId}
                      checked={
                        !!currentResponse &&
                        currentResponse.text.includes(response.responseId)
                      }
                      onChange={(e) => {
                        setCurrentResponse(e.target.value, "replace");
                      }}
                      disabled={correctResponseEnabled}
                    />
                  )}

                  {/* Correct/Incorrect Labels */}
                  {correctResponseEnabled && (
                    <>
                      {currentQuestion?.correctResponse
                        ?.split("~")
                        ?.includes(response?.responseId) ? (
                        <div className="flex items-center gap-1 p-2 px-3 border border-[var(--sb-green-haze-bg-active)] text-[var(--sb-green-haze-bg-active)] rounded-md">
                          <MdCheck size={16} />
                          <p className="!font-semibold text-[var(--text-primary)]">
                            Correct Answer
                          </p>
                        </div>
                      ) : currentQuestion?.studentResponse
                          ?.split("~")
                          ?.includes(response?.responseId) ? (
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
              <div className="flex items-center gap-4 mt-7">
                <input
                  type="text"
                  value={currentResponse?.text[0]}
                  onChange={(e) =>
                    setCurrentResponse(e.target.value, "replace")
                  }
                  disabled={correctResponseEnabled}
                  placeholder={"Enter Your Answer"}
                  className="w-full max-w-[300px] px-3 py-2 border rounded-md text-base bg-[var(--surface-bg-primary)]"
                />

                {/* Correct Incorrect Labels */}
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

            {/* Case: Subjective Type Questions */}
            {[
              "Subjective-Type-Very-Short",
              "Subjective-Type-Short-Answer-I",
              "Subjective-Type-Short-Answer-II",
              "Subjective-Type-Long",
            ].includes(currentQuestion?.questionType || "") &&
            mode &&
            mode !== "review" ? (
              <div className="flex flex-col gap-2 mt-7">
                <textarea
                  onChange={(e) =>
                    setCurrentResponse(e.target.value, "replace")
                  }
                  value={currentResponse?.text[0]}
                  disabled={correctResponseEnabled}
                  placeholder={"Enter Your Answer"}
                  className={cn(
                    "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base placeholder:text-[var(--text-tertiary)]",
                    "focus:outline-none focus:ring-0 focus:border-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out resize-y",
                    "min-h-[200px] max-h-[400px]",
                  )}
                ></textarea>

                {currentResponse?.url ? (
                  <div className="flex items-center h-44 gap-2 border-2 border-dashed border-[var(--border-secondary)] bg-[var(--surface-bg-primary)] rounded-xl py-6 cursor-pointer px-5">
                    <img
                      src={currentResponse.url}
                      className="w-40 object-cover"
                      onClick={() => setIsSubjectiveMediaModalOpen(true)}
                    />
                    <div className="flex flex-1 items-center justify-end ml-10">
                      <Button
                        style="secondary"
                        className="px-3 py-1 text-xs"
                        onClick={() => {
                          if (currentResponse?.fileName) {
                            handelFileRemove(currentResponse.fileName);
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="subjective-image-upload"
                    className="flex flex-col items-center justify-center gap-2 h-44 border-2 border-dashed border-[var(--border-secondary)] bg-[var(--surface-bg-primary)] rounded-xl py-6 cursor-pointer hover:border-[var(--sb-ocean-bg-active)] transition-colors"
                  >
                    <MdCloudUpload
                      size={32}
                      className="text-[var(--text-secondary)]"
                    />
                    <div className="text-center">
                      <p className="font-semibold">Upload Images</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        PNG, JPG up to 10MB each
                      </p>
                    </div>
                    <Button style="secondary" className="px-4 py-2">
                      Choose Files
                    </Button>
                    <input
                      id="subjective-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        if (!event.target.files?.length) return;
                        handelFileUpload(event.target.files[0]);
                      }}
                    />
                  </label>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* Explanation (Review Mode Only) */}
          {correctResponseEnabled && currentQuestion?.explanations ? (
            <WidgetCard title="Explanation" className="shadow-none mt-7">
              <MathJax dynamic>
                <div
                  className="math-container select-none text-sm"
                  dangerouslySetInnerHTML={{
                    __html: checkForTable(
                      currentQuestion?.explanations
                        .trim()
                        .replace(/[\r\n]+/g, ""),
                    ),
                  }}
                />
              </MathJax>
            </WidgetCard>
          ) : (
            <></>
          )}
        </div>

        {/* TODO: REDO SUBJECTIVE UI IN REVIEW MODE (DOES NOT LOOK GOOD) */}
        {/* Subjective Review Mode */}
        {[
          "Subjective-Type-Very-Short",
          "Subjective-Type-Short-Answer-I",
          "Subjective-Type-Short-Answer-II",
          "Subjective-Type-Long",
        ].includes(currentQuestion?.questionType || "") && mode === "review" ? (
          <div className="w-full max-h-[calc(100%-300px)] border border-[var(--border-primary)] rounded-lg grid lg:grid-cols-2 overflow-y-auto">
            <div className="w-full h-full flex flex-col border-r border-r-[var(--border-secondary)]">
              <div className="w-full flex justify-center items-center gap-2 min-h-[40px] border-b border-b-[var(--border-secondary)]">
                <p className="font-semibold">Your Answer</p>
                <input
                  type="text"
                  disabled={!isSubjectiveMarkingMode}
                  value={currentMarksObj?.totalMark}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (isNaN(val)) return;
                    updateCurrentTotalMarks(val);
                  }}
                  className="text-center w-full max-w-[50px] border rounded-md text-base bg-[var(--surface-bg-primary)] disabled:bg-[var(--surface-bg-tertiary)] disabled:text-[var(--text-tertiary)]"
                />
                <p className="font-semibold">
                  /{" "}
                  {currentQuestion?.responseChoice?.reduce(
                    (sum, c) => sum + (Number(c.partMarks) || 0),
                    0,
                  )}
                </p>
              </div>
              <div className="w-full h-full flex flex-col gap-4 p-4">
                <p>{currentResponse?.text || ""}</p>
                {currentResponse?.url ? (
                  <img
                    onClick={() => setIsSubjectiveMediaModalOpen(true)}
                    src={currentResponse?.url}
                    className="w-full aspect-auto object-contain rounded-lg cursor-pointer"
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="w-full flex justify-center items-center gap-2 min-h-[40px] border-t lg:border-t-0 border-b border-[var(--border-secondary)]">
                <p className="font-semibold">Solution</p>
              </div>

              <div className="w-full h-full p-2 flex flex-col gap-2">
                {currentQuestion?.responseChoice?.map((choice, index) => (
                  <div className="w-full flex  border-b border-b-[var(--border-secondary)]">
                    <MathJax dynamic className="flex-1 p-2">
                      <div
                        className="math-container text-sm"
                        dangerouslySetInnerHTML={{
                          __html: checkForTable(
                            choice?.responseText.trim().replace(/[\r\n]+/g, ""),
                          ),
                        }}
                      />
                    </MathJax>
                    <div className="min-w-[80px] min-h-full flex justify-center items-center border-l border-l-[var(--border-secondary)]">
                      <Checkbox
                        label={choice?.partMarks || ""}
                        value={choice?.partMarks || ""}
                        disabled={!isSubjectiveMarkingMode}
                        checked={
                          currentMarksObj?.options[index] === "yes"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          updateCurrentMarksObj(index, e.target.checked)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] flex flex-wrap gap-y-4 justify-center gap-2 items-center py-4">
        <div
          className={cn(
            "size-8 aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
            "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out",
          )}
          onClick={() => {
            if (isSubjectiveMarkingMode) {
              handleUpdateMarksTest()?.then(goToPrev);
            } else goToPrev();
          }}
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
            {isSubjectiveMarkingMode && (
              <Button
                style="secondary"
                className="!min-w-10 px-2 sm:px-4"
                onClick={() =>
                  handleUpdateMarksTest(true)?.then(() => navigate("/report"))
                }
              >
                Finish Test
              </Button>
            )}

            {!isSubjectiveMarkingMode && (
              <Button
                style="secondary"
                className="!min-w-10 px-2 sm:px-4"
                onClick={() => setIsTeacherSupportModalOpen(true)}
              >
                Teacher Support
              </Button>
            )}

            <Button
              style="secondary"
              className="!min-w-10 px-2 sm:px-4"
              onClick={() =>
                isSubjectiveMarkingMode ? navigate("/report") : navigate(-1)
              }
            >
              Exit
            </Button>
          </>
        )}
        <div
          className={cn(
            "size-8 aspect-square flex justify-center items-center rounded-full border-1 border-[var(--border-primary)] cursor-pointer",
            "hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)] transition-all duration-200 ease-in-out",
          )}
          onClick={() => {
            if (isSubjectiveMarkingMode) {
              handleUpdateMarksTest()?.then(goToNext);
            } else goToNext();
          }}
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
              ? "fixed bottom-[75px] right-[32px]"
              : "absolute bottom-2 right-8",
          )}
          onClick={() => {
            setIsHelpModalOpen(true);
          }}
        >
          <div className="cursor-pointer size-10 aspect-square rounded-full bg-[var(--surface-bg-tertiary)] flex justify-center items-center">
            <AiIcon width={28} height={28} />
          </div>
          <span className="font-semibold !text-xs">ASK TONY</span>
        </div>
      )}
    </div>
  );
};

export default ActiveQuestionPanel;
