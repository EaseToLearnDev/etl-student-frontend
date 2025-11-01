// Zustand
import { create } from "zustand";
// Types
import { QuestionStatus } from "../test_simulator.types";
import type {
  TestData,
  Question,
  SectionUI,
  Pointer,
  TestConfig,
  Features,
  ResponseType,
  SimulatorMode,
  MarksType,
} from "../test_simulator.types";
import { Severity, ToastType, type Error } from "../../shared/types";

// Services
import {
  goToNextQuestionHandler,
  goToPrevQuestionHandler,
  setCurrentQuestionHandler,
} from "../services/navigation";
import {
  clearCurrentFileUrlHandler,
  clearCurrentResponseHandler,
  isMaxQuestionLimitReached,
  setCurrentFileUrlHandler,
  setCurrentResponseHandler,
} from "../services/responseHandlers";
import {
  decrementTimeHandler,
  incrementTimeHandler,
  startQuestionTimerHandler,
  stopQuestionTimerHandler,
} from "../services/timeHandlers";
import { initializeTestData } from "../services/initHandlers";
import {
  getCurrentQuestionHandler,
  getResponseForQuestionHandler,
} from "../services/getters";
import {
  countQuestionsByStatusHandler,
  getStatusByQuestionIdHandler,
  markForReviewHandler,
  updateStatusHandler,
} from "../services/statusHandlers";
import { useToastStore } from "../../../global/hooks/useToastStore";

export interface TestStore {
  testData: TestData | null;
  sectionsUI: SectionUI[];
  subjectiveSectionsUI: SectionUI[];
  setTestData: (data: TestData | null) => void;

  getActiveSectionsUI: () => SectionUI[];

  isSubjectiveTest: boolean;

  features: Features;
  setFeatures: (features: Features) => void;

  testConfig: TestConfig | null;
  setTestConfig: (config: TestConfig | null) => void;

  testError: Error | null;
  setTestError: (error: Error | null) => void;

  currentPointer: Pointer;

  testMode: SimulatorMode | null;
  setMode: (mode: SimulatorMode) => void;

  pendingQuestion: Question | null;
  setPendingQuestion: (question: Question | null) => void;

  goToNext: () => void;
  goToPrev: () => void;

  getCurrentQuestion: () => Question | null;
  setCurrentQuestion: (question: Question | null) => void;
  getCurrentQuestionIndex: () => number;

  jumpToQuestion: (question: Question | null) => void;

  questionHelpMap: Record<number, boolean>;
  setCurrentHelpStatus: (value: boolean) => void;

  questionResponseMap: Record<number, ResponseType>;
  getCurrentResponse: () => ResponseType | null;
  setCurrentResponse: (
    response: string,
    action: "push" | "pop" | "replace",
  ) => void;
  setCurrentFileUrl: (fileName: string, url: string) => void;
  clearCurrentResponse: () => void;
  clearCurrentFileUrl: () => void;

  questionMarksMap: Record<number, MarksType>;
  updateCurrentTotalMarks: (marks: number) => void;
  updateCurrentMarksObj: (resIdx: number, isChecked: boolean) => void;

  questionTimeMap: Record<number, number>;
  getTimeByQuestionId: (questionId: number) => number;
  incrementTimeByQuestionId: (questionId: number) => void;
  decrementTimeByQuestionId: (questionId: number) => void;

  questionStatusMap: Record<number, QuestionStatus>;
  getStatusByQuestionId: (questionId: number) => QuestionStatus | null;

  changeStatusByQuestionId: (
    questionId: number,
    status: QuestionStatus,
  ) => void;
  getQuestionCountByStatus: (status: QuestionStatus) => number;

  markCurrentForReview: () => void;

  _questionTimerId: ReturnType<typeof setInterval> | null;
  startQuestionTimer: () => void;
  stopQuestionTimer: () => void;

  isSubmissionModalOpen: boolean;
  setIsSubmissionModalOpen: (v: boolean) => void;

  isSwitchSectionModalOpen: boolean;
  setIsSwitchSectionModalOpen: (v: boolean) => void;

  isSubjectiveMediaModalOpen: boolean;
  setIsSubjectiveMediaModalOpen: (v: boolean) => void;

  reset: () => void;
}

/**
 * Zustand store for managing test simulation state.
 */
const useTestStore = create<TestStore>((set, get) => ({
  testData: null,
  sectionsUI: [],
  subjectiveSectionsUI: [],
  testConfig: null,
  testError: null,
  pendingQuestion: null,
  testMode: null,
  currentPointer: {
    sectionPos: -1,
    questionPos: -1,
  },
  questionHelpMap: {},
  questionResponseMap: {},
  questionTimeMap: {},
  questionStatusMap: {},
  questionMarksMap: {},
  _questionTimerId: null,
  isSubjectiveTest: false,
  features: {
    timerEnabled: false,
    correctResponseEnabled: false,
    showDynamicStatusEnabled: false,
    fullScreenEnabled: false,
    subjectiveMarksEditEnabled: false,
    markForReviewEnabled: false,
    supportEnabled: false,
  },
  setFeatures: (features) =>
    set({
      features: features,
    }),

  // Initialize test data
  setTestData: (data) => {
    set(() => {
      if (!data) {
        return {
          testData: null,
          sectionsUI: [],
          questionHelpMap: {},
          questionStatusMap: {},
          questionResponseMap: {},
          questionTimeMap: {},
          questionMarksMap: {},
          currentPointer: { sectionPos: -1, questionPos: -1 },
        };
      }

      const {
        statusMap,
        responseMap,
        timeMap,
        sectionsUI,
        marksMap,
        helpMap,
        subjectiveSectionsUI,
        initialPointer,
        isSubjectiveTest,
      } = initializeTestData({ testData: data });

      return {
        testData: data,
        sectionsUI,
        subjectiveSectionsUI,
        isSubjectiveTest,
        questionStatusMap: statusMap,
        questionResponseMap: responseMap,
        questionTimeMap: timeMap,
        questionMarksMap: marksMap,
        questionHelpMap: helpMap,
        currentPointer: initialPointer,
      };
    });
  },

  getActiveSectionsUI: () => {
    const { testMode, testData, sectionsUI, subjectiveSectionsUI } = get();

    // If we're in review mode of incomplete session (subjective marking)
    if (testMode === "review" && testData?.testStatus === 2) {
      return subjectiveSectionsUI;
    } else {
      return sectionsUI;
    }
  },

  setTestError: (error) => set({ testError: error }),

  setTestConfig: (config) => set({ testConfig: config }),

  setPendingQuestion: (question) => set({ pendingQuestion: question }),

  setMode: (mode) => set({ testMode: mode }),

  // Next Handler
  goToNext: () => {
    const {
      testData,
      features,
      currentPointer,
      questionResponseMap,
      questionStatusMap,
      startQuestionTimer,
      stopQuestionTimer,
    } = get();
    if (!testData) return;

    const isLastQuestionOfSection =
      currentPointer.questionPos ===
      testData.sectionSet[currentPointer.sectionPos].questionNumbers.length - 1;
    const isNotLastSection =
      currentPointer.sectionPos < testData.sectionSet.length - 1;
    const isPartiallyLock = testData?.sectionLock === "Partially_Lock";

    // If Section is Partially Locked, Ask User if They want to switch to next section (Irreversible Choice)
    if (isLastQuestionOfSection && isNotLastSection && isPartiallyLock) {
      const nextSection = testData.sectionSet[currentPointer.sectionPos + 1];
      const firstQuestion = nextSection.questionNumbers[0];
      const pendingQuestion = testData.questionSet.find(
        (q) => q.questionId === firstQuestion.questionId,
      );
      // store next question pointer
      set({
        pendingQuestion: pendingQuestion,
        isSwitchSectionModalOpen: true,
      });
      return;
    }
    stopQuestionTimer();

    const result = goToNextQuestionHandler({
      testData,
      subjectiveMarkEditEnabled: features.subjectiveMarksEditEnabled,
      currentPointer,
      questionResponseMap,
      questionStatusMap,
    });

    if (!result) return;

    set({
      currentPointer: result.newPointer,
      questionStatusMap: result.newStatusMap,
    });

    if (!result.reachedEnd) {
      startQuestionTimer();
    } else {
      // TODO: open submit modal
    }
  },

  // Prev Handler
  goToPrev: () => {
    const {
      testData,
      features,
      currentPointer,
      questionResponseMap,
      questionStatusMap,
      startQuestionTimer,
      stopQuestionTimer,
    } = get();
    if (!testData) return;

    // Check if we are at the very first question of the current section
    const isAtFirstQuestionOfSection = currentPointer.questionPos === 0;
    const isNotFirstSection = currentPointer.sectionPos > 0;
    const isPartiallyLock = testData?.sectionLock === "Partially_Lock";

    if (isAtFirstQuestionOfSection && isNotFirstSection && isPartiallyLock) {
      set({
        testError: {
          message: "You are not allowed to go back to previous section",
          severity: Severity.Warning,
          id: "not_allowed",
        },
      });
      return;
    }

    stopQuestionTimer();

    const result = goToPrevQuestionHandler({
      testData,
      subjectiveMarkEditEnabled: features.subjectiveMarksEditEnabled,
      currentPointer,
      questionResponseMap,
      questionStatusMap,
    });

    if (!result) return;

    set({
      currentPointer: result.newPointer,
      questionStatusMap: result.newStatusMap,
    });

    if (!result.reachedStart) {
      startQuestionTimer();
    }
  },

  // Current Question Handler
  getCurrentQuestion: () => {
    const { testData, currentPointer } = get();
    if (!testData) return null;

    return getCurrentQuestionHandler({ testData, currentPointer });
  },

  // Set Current Question Handler
  setCurrentQuestion: (question) => {
    const {
      testData,
      currentPointer,
      questionStatusMap,
      questionResponseMap,
      startQuestionTimer: startTimer,
      stopQuestionTimer: stopTimer,
    } = get();
    if (!testData || !question) return;

    // find section index of target question
    const targetSectionPos = testData.sectionSet.findIndex((section) =>
      section.questionNumbers.some((q) => q.questionId === question.questionId),
    );

    if (targetSectionPos === -1) return;

    stopTimer();

    const result = setCurrentQuestionHandler({
      testData,
      currentPointer,
      questionStatusMap,
      questionResponseMap,
      question,
    });

    if (!result) return;

    set({
      currentPointer: result.newPointer,
      questionStatusMap: result.newStatusMap,
    });

    startTimer();
  },

  jumpToQuestion: (question) => {
    const {
      testData,
      currentPointer,
      questionStatusMap,
      questionResponseMap,
      startQuestionTimer: startTimer,
      stopQuestionTimer: stopTimer,
    } = get();
    if (!testData || !question) return;

    const isPartiallyLock = testData?.sectionLock === "Partially_Lock";

    // find section index of target question
    const targetSectionPos = testData.sectionSet.findIndex((section) =>
      section.questionNumbers.some((q) => q.questionId === question.questionId),
    );

    if (targetSectionPos === -1) return;

    // If trying to jump to next section in partially_lock mode, then open switch modal
    if (isPartiallyLock && targetSectionPos > currentPointer.sectionPos) {
      set({
        pendingQuestion: question,
        isSwitchSectionModalOpen: true,
      });
      return;
    }
    // If trying to jump to previous section in partially_lock mode, then raise warning

    if (isPartiallyLock && targetSectionPos < currentPointer.sectionPos) {
      set({
        testError: {
          message: "You are not allowed to go back to previous section",
          severity: Severity.Warning,
          id: "not_allowed_jump",
        },
      });
      return;
    }

    stopTimer();

    const result = setCurrentQuestionHandler({
      testData,
      currentPointer,
      questionStatusMap,
      questionResponseMap,
      question,
    });

    if (!result) return;

    set({
      currentPointer: result.newPointer,
      questionStatusMap: result.newStatusMap,
    });

    startTimer();
  },

  getCurrentQuestionIndex: () => {
    const { testData, getCurrentQuestion } = get();
    if (!testData) return -1;

    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return -1;

    return testData.questionSet.findIndex(
      (q) => q.questionId === currentQuestion.questionId,
    );
  },

  // Help Handler
  setCurrentHelpStatus: (value) => {
    const { getCurrentQuestion, questionHelpMap } = get();
    const question = getCurrentQuestion();
    if (!question) return;

    set({
      questionHelpMap: {
        ...questionHelpMap,
        [question.questionId]: value,
      },
    });
  },

  // Marks Handler
  updateCurrentTotalMarks: (marks) => {
    const { questionMarksMap, getCurrentQuestion } = get();
    const question = getCurrentQuestion();
    if (!question) return;

    const totalMarks = question?.responseChoice?.reduce(
      (sum, c) => sum + (Number(c.partMarks) || 0),
      0,
    );
    const finalVal = marks > totalMarks ? totalMarks : marks;

    set({
      questionMarksMap: {
        ...questionMarksMap,
        [question?.questionId]: {
          ...questionMarksMap[question?.questionId],
          totalMark: finalVal,
        },
      },
    });
  },

  updateCurrentMarksObj: (resIdx, isChecked) => {
    const { testData, getCurrentQuestion, questionMarksMap } = get();
    const question = getCurrentQuestion();
    if (!question || !testData) return;

    const currentQuestionMarkObj = questionMarksMap[question?.questionId];
    if (!currentQuestionMarkObj) return;

    const newOptions = [...currentQuestionMarkObj.options];
    newOptions[resIdx] = isChecked ? "yes" : "no";

    const newTotalMark = newOptions.reduce((acc, opt, idx) => {
      if (opt === "yes") {
        const parsedMarks = Number(question?.responseChoice[idx]?.partMarks);
        return acc + (!isNaN(parsedMarks) ? parsedMarks : 0);
      }
      return acc;
    }, 0);

    set((state) => ({
      questionMarksMap: {
        ...state.questionMarksMap,
        [question.questionId]: {
          ...currentQuestionMarkObj,
          options: newOptions,
          totalMark: newTotalMark,
        },
      },
    }));
  },

  // Response Handler
  getCurrentResponse: () => {
    const { getCurrentQuestion, questionResponseMap } = get();
    const question = getCurrentQuestion();
    if (!question) return null;

    return getResponseForQuestionHandler({
      questionId: question.questionId,
      questionResponseMap,
    });
  },

  // Set Current Response Handler
  setCurrentResponse: (response, action) => {
    const {
      getCurrentQuestion,
      questionResponseMap,
      questionStatusMap,
      testData,
      currentPointer,
    } = get();
    const { setToast } = useToastStore.getState();
    const question = getCurrentQuestion();
    if (!question) return null;

    // Check if maximum question attempt limit has been reached
    // This prevents students from attempting more questions than allowed
    // either globally across all sections or within a specific section
    const isLimitReached = isMaxQuestionLimitReached({
      testData,
      currentPointer,
      question,
      questionStatusMap,
    });
    if (isLimitReached !== "NONE") {
      setToast({
        title: "Max question limit reached.",
        description:
          isLimitReached === "GLOBAL"
            ? `You are not allowed to attempt more than ${testData?.noQuestionAttempt} questions.`
            : `You are not allowed to attempt more than ${testData?.noQuestionAttempt} questions in this section.`,
        type: ToastType.WARNING,
      });
      return;
    }

    const result = setCurrentResponseHandler({
      question,
      response,
      questionResponseMap,
      questionStatusMap,
      action: action,
    });

    if (!result) return;

    set({
      questionResponseMap: result.newResponseMap,
      questionStatusMap: result.newStatusMap,
    });
  },

  setCurrentFileUrl: (fileName, url) => {
    const { getCurrentQuestion, questionResponseMap, questionStatusMap } =
      get();
    const question = getCurrentQuestion();
    if (!question) return null;

    const result = setCurrentFileUrlHandler({
      question,
      fileName,
      url,
      questionResponseMap,
      questionStatusMap,
    });
    if (!result) return;

    set({
      questionResponseMap: result.newResponseMap,
      questionStatusMap: result.newStatusMap,
    });
  },

  clearCurrentFileUrl: () => {
    const { getCurrentQuestion, questionResponseMap, questionStatusMap } =
      get();
    const question = getCurrentQuestion();
    if (!question) return null;

    const result = clearCurrentFileUrlHandler({
      question,
      questionResponseMap,
      questionStatusMap,
    });
    if (!result) return;

    set({
      questionResponseMap: result.newResponseMap,
      questionStatusMap: result.newStatusMap,
    });
  },

  // Clear Current Response Handler
  clearCurrentResponse: () => {
    const { getCurrentQuestion, questionResponseMap, questionStatusMap } =
      get();
    const question = getCurrentQuestion();
    if (!question) return null;

    const result = clearCurrentResponseHandler({
      question,
      questionResponseMap,
      questionStatusMap,
    });

    if (!result) return;

    set({
      questionResponseMap: result.newResponseMap,
      questionStatusMap: result.newStatusMap,
    });
  },

  // Time tracking Handlers
  getTimeByQuestionId: (questionId) => get().questionTimeMap[questionId] ?? 0,

  incrementTimeByQuestionId: (questionId) => {
    const { questionTimeMap } = get();
    const { newTimeMap } = incrementTimeHandler({
      questionId,
      questionTimeMap,
    });

    set({ questionTimeMap: newTimeMap });
  },

  decrementTimeByQuestionId: (questionId) => {
    const { questionTimeMap } = get();
    const { newTimeMap } = decrementTimeHandler({
      questionId,
      questionTimeMap,
    });

    set({ questionTimeMap: newTimeMap });
  },

  // Status Handlers
  markCurrentForReview: () => {
    const { testData, currentPointer, questionStatusMap } = get();
    if (!testData) return;

    const result = markForReviewHandler({
      testData,
      currentPointer,
      questionStatusMap,
    });

    if (result) {
      set({ questionStatusMap: result.newStatusMap });
    }
  },

  getStatusByQuestionId: (questionId) => {
    const { questionStatusMap } = get();
    return getStatusByQuestionIdHandler({ questionId, questionStatusMap });
  },

  changeStatusByQuestionId: (questionId, status) => {
    const { questionStatusMap } = get();
    const { newStatusMap } = updateStatusHandler({
      questionId,
      newStatus: status,
      questionStatusMap,
    });

    set({ questionStatusMap: newStatusMap });
  },

  getQuestionCountByStatus: (status) => {
    const { questionStatusMap } = get();
    return countQuestionsByStatusHandler({ status, questionStatusMap });
  },
  // Start Question Timer Handler
  startQuestionTimer: () => {
    const {
      _questionTimerId: timerId,
      getCurrentQuestion,
      questionTimeMap,
    } = get();
    const question = getCurrentQuestion();
    if (!question) return;

    const result = startQuestionTimerHandler({
      question,
      timerId,
      questionTimeMap,
    });

    if (!result) return;
    set({ _questionTimerId: result.intervalId });
  },

  // Stop Question Timer Handler
  stopQuestionTimer: () => {
    const { _questionTimerId: timerId } = get();
    stopQuestionTimerHandler({ timerId });
    set({ _questionTimerId: null });
  },

  isSubmissionModalOpen: false,
  setIsSubmissionModalOpen: (v) => set({ isSubmissionModalOpen: v }),

  isSwitchSectionModalOpen: false,
  setIsSwitchSectionModalOpen: (v) => set({ isSwitchSectionModalOpen: v }),

  isSubjectiveMediaModalOpen: false,
  setIsSubjectiveMediaModalOpen: (v) => set({ isSubjectiveMediaModalOpen: v }),

  // Reset state
  reset: () => {
    const { stopQuestionTimer: stopTimer } = get();
    stopTimer();
    set({
      testData: null,
      testConfig: null,
      testError: null,
      sectionsUI: [],
      currentPointer: {
        sectionPos: -1,
        questionPos: -1,
      },
      questionHelpMap: {},
      questionStatusMap: {},
      questionResponseMap: {},
      questionTimeMap: {},
      isSubmissionModalOpen: false,
      features: {
        correctResponseEnabled: false,
        showDynamicStatusEnabled: false,
        timerEnabled: false,
        fullScreenEnabled: false,
        subjectiveMarksEditEnabled: false,
        markForReviewEnabled: false,
        supportEnabled: false,
      },
    });
  },
}));

export default useTestStore;
