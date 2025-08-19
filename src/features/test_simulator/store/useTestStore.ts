// Zustand
import { create } from "zustand";
// Types
import { QuestionStatus } from "../test_simulator.types";
import type {
  TestData,
  Question,
  Response,
  SectionUI,
  CurrentPointer,
  TestConfig,
} from "../test_simulator.types";
import type { ErrorType } from "../../shared/types";

// Services
import {
  goToNextQuestionHandler,
  goToPrevQuestionHandler,
  setCurrentQuestionHandler,
} from "../services/navigation";
import {
  clearCurrentResponseHandler,
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

export interface TestStore {
  testData: TestData | null;
  sectionsUI: SectionUI[];
  setTestData: (data: TestData | null) => void;

  testConfig: TestConfig | null;
  setTestConfig: (config: TestConfig | null) => void;

  testError: ErrorType | null;
  setTestError: (error: ErrorType) => void;

  currentPointer: CurrentPointer;

  goToNext: () => void;
  goToPrev: () => void;

  getCurrentQuestion: () => Question | null;
  setCurrentQuestion: (question: Question | null) => void;

  questionResponseMap: Record<number, Response | null>;
  getCurrentResponse: () => Response | null;
  setCurrentResponse: (response: Response | null) => void;
  clearCurrentResponse: () => void;

  questionTimeMap: Record<number, number>;
  getTimeByQuestionId: (questionId: number) => number;
  incrementTimeByQuestionId: (questionId: number) => void;
  decrementTimeByQuestionId: (questionId: number) => void;

  questionStatusMap: Record<number, QuestionStatus>;
  getStatusByQuestionId: (questionId: number) => QuestionStatus | null;
  changeStatusByQuestionId: (
    questionId: number,
    status: QuestionStatus
  ) => void;
  getQuestionCountByStatus: (status: QuestionStatus) => number;

  markCurrentForReview: () => void;

  _questionTimerId: ReturnType<typeof setInterval> | null;
  startQuestionTimer: () => void;
  stopQuestionTimer: () => void;

  isSubmissionModalOpen: boolean;
  isContinueLaterModalOpen: boolean;
  setIsSubmissionModalOpen: (v: boolean) => void;
  setIsContinueLaterModalOpen: (v: boolean) => void;

  reset: () => void;
}

/**
 * Zustand store for managing test simulation state.
 */
const useTestStore = create<TestStore>((set, get) => ({
  testData: null,
  sectionsUI: [],
  testConfig: null,
  testError: null,
  currentPointer: {
    currentSectionPos: -1,
    currentQuestionPos: -1,
  },
  questionResponseMap: {},
  questionTimeMap: {},
  questionStatusMap: {},
  _questionTimerId: null,
  isSubmissionModalOpen: false,
  isContinueLaterModalOpen: false,

  // Initialize test data
  setTestData: (data) =>
    set(() => {
      if (!data) {
        return {
          testData: null,
          sectionsUI: [],
          questionStatusMap: {},
          questionResponseMap: {},
          questionTimeMap: {},
          currentPointer: { currentSectionPos: -1, currentQuestionPos: -1 },
        };
      }

      const { statusMap, responseMap, timeMap, sectionsUI, initialPointer } =
        initializeTestData({ testData: data });

      return {
        testData: data,
        sectionsUI,
        questionStatusMap: statusMap,
        questionResponseMap: responseMap,
        questionTimeMap: timeMap,
        currentPointer: initialPointer,
      };
    }),

  setTestError: (error) => set({ testError: error }),

  setTestConfig: (config) => set({ testConfig: config }),

  // Next Handler
  goToNext: () => {
    const {
      testData,
      currentPointer,
      questionResponseMap,
      questionStatusMap,
      startQuestionTimer,
      stopQuestionTimer,
    } = get();
    if (!testData) return;

    stopQuestionTimer();

    const result = goToNextQuestionHandler({
      testData,
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
      currentPointer,
      questionResponseMap,
      questionStatusMap,
      startQuestionTimer,
      stopQuestionTimer,
    } = get();
    if (!testData) return;

    stopQuestionTimer();

    const result = goToPrevQuestionHandler({
      testData,
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
    } else {
      // TODO: disable "Prev" button
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
  setCurrentResponse: (response) => {
    const { getCurrentQuestion } = get();
    const question = getCurrentQuestion();
    if (!question) return null;

    const { questionResponseMap, questionStatusMap } = get();

    const result = setCurrentResponseHandler({
      question,
      response,
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

  setIsSubmissionModalOpen: (v) => set({ isSubmissionModalOpen: v }),
  setIsContinueLaterModalOpen: (v) => set({ isContinueLaterModalOpen: v }),

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
        currentSectionPos: -1,
        currentQuestionPos: -1,
      },
      questionStatusMap: {},
      questionResponseMap: {},
      questionTimeMap: {},
    });
  },
}));

export default useTestStore;
