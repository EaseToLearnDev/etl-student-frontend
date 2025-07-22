// Zustand
import { create } from "zustand";
// Types
import { QuestionStatus } from "../types";
import type {
  TestDataType,
  QuestionType,
  ResponseType,
  SectionUIType,
  CurrentPointerType,
} from "../types";

// Services
import {
  convertDataToSections,
  updateStatusOnVisit,
} from "../services/TestSimulator.services";

export interface TestStore {
  testData: TestDataType | null | undefined;
  sectionsUI: SectionUIType[];
  setTestData: (data: TestDataType | null | undefined) => void;

  currentPointer: CurrentPointerType;

  goToNext: () => void;
  goToPrev: () => void;

  getCurrentQuestion: () => QuestionType | null | undefined;
  setCurrentQuestion: (question: QuestionType | null | undefined) => void;

  questionResponseMap: Record<number, ResponseType | null | undefined>;
  getCurrentResponse: () => ResponseType | null | undefined;
  setCurrentResponse: (response: ResponseType | null | undefined) => void;
  clearCurrentResponse: () => void;

  questionTimeMap: Record<number, number>;
  getTimeByQuestionId: (questionId: number) => number;
  incrementTimeByQuestionId: (questionId: number) => void;
  decrementTimeByQuestionId: (questionId: number) => void;

  questionStatusMap: Record<number, QuestionStatus>;
  getStatusByQuestionId: (questionId: number) => QuestionStatus;
  changeStatusByQuestionId: (
    questionId: number,
    status: QuestionStatus
  ) => void;
  getQuestionCountByStatus: (status: QuestionStatus) => number;

  markCurrentForReview: () => void;

  __timerId: any;
  startTimer: () => void;
  stopTimer: () => void;

  reset: () => void;
}

/**
 * Zustand store for managing test simulation state.
 */
const useTestStore = create<TestStore>((set, get) => ({
  testData: null,
  sectionsUI: [],
  // Question Pointer
  currentPointer: {
    currentSectionPos: -1,
    currentQuestionPos: -1,
  },
  questionResponseMap: {},

  questionTimeMap: {},
  questionStatusMap: {},
  __timerId: null,

  // Initialize test data
  setTestData: (data) =>
    set(() => {
      if (!data)
        return {
          testData: null,
          sectionsUI: [],
          questionStatusMap: {},
          questionResponseMap: {},
          questionTimeMap: {},
          currentPointer: {
            currentSectionPos: -1,
            currentQuestionPos: -1,
          },
        };

      const statusMap: Record<number, QuestionStatus> = {};
      const responseMap: Record<number, ResponseType | null> = {};
      const timeMap: Record<number, number> = {};

      data.questionSet.forEach((q) => {
        statusMap[q.questionId] = QuestionStatus.NOT_VISITED;
        responseMap[q.questionId] = q.studentResponse ?? null;
        timeMap[q.questionId] = q.timeSpent ?? 0;
      });

      const sectionsUI = convertDataToSections(data);

      // Mark first question as visited by default
      const firstSection = data.sectionSet.find(
        (sec) => sec.questionNumbers.length > 0
      );
      if (firstSection) {
        const firstQId = firstSection.questionNumbers[0].questionId;
        statusMap[firstQId] = QuestionStatus.VISITED;
      }

      return {
        testData: data,
        sectionsUI: sectionsUI,
        questionStatusMap: statusMap,
        questionResponseMap: responseMap,
        questionTimeMap: timeMap,
        currentPointer: {
          currentSectionPos: 0,
          currentQuestionPos: 0,
        },
      };
    }),

  // Next Handler
  goToNext: () => {
    const { testData, currentPointer, questionResponseMap, questionStatusMap, startTimer, stopTimer } =
      get();
    if (!testData) return;

    
    const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
    if (si < 0 || qi < 0) return;
    
    const sectionSet = testData?.sectionSet;
    const section = sectionSet[si];
    if (!section) return;

    const currQId = section?.questionNumbers[qi]?.questionId;
    if (!currQId) return;
    
    stopTimer();
    // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
    if (
      questionStatusMap[currQId] === QuestionStatus.VISITED &&
      !questionResponseMap[currQId]
    ) {
      set((state) => ({
        questionStatusMap: {
          ...state.questionStatusMap,
          [currQId]: QuestionStatus.NOT_ATTEMPTED,
        },
      }));
    }

    // next question in same section?
    if (qi + 1 < section.questionNumbers.length) {
      const nextQId = section?.questionNumbers[qi + 1].questionId;
      set((state) => ({
        currentPointer: {
          currentSectionPos: si,
          currentQuestionPos: qi + 1,
        },
        questionStatusMap: updateStatusOnVisit(
          state.questionStatusMap,
          nextQId
        ),
      }));
      startTimer();
      return;
    }

    // move to first question of next section if exists
    for (let s = si + 1; s < sectionSet.length; s++) {
      const nextSec = sectionSet[s];
      if (nextSec?.questionNumbers.length > 0) {
        const nextQId = nextSec?.questionNumbers[0].questionId;

        set((state) => ({
          currentPointer: {
            currentSectionPos: s,
            currentQuestionPos: 0,
          },
          questionStatusMap: updateStatusOnVisit(
            state.questionStatusMap,
            nextQId
          ),
        }));
        startTimer();
        return;
      }
    }

    // TODO
    // Handle last question of last section condition (open submit modal)
  },

  // Prev Handler
  goToPrev: () => {
    const { testData, currentPointer, questionStatusMap, questionResponseMap, startTimer, stopTimer } =
      get();
    if (!testData) return;

    const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
    if (si < 0 || qi < 0) return;

    const sectionSet = testData?.sectionSet;
    const section = sectionSet[si];
    if (!section) return;

    const currQId = section?.questionNumbers[qi]?.questionId;
    if (!currQId) return;

    stopTimer();

    // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
    if (
      questionStatusMap[currQId] === QuestionStatus.VISITED &&
      !questionResponseMap[currQId]
    ) {
      set((state) => ({
        questionStatusMap: {
          ...state.questionStatusMap,
          [currQId]: QuestionStatus.NOT_ATTEMPTED,
        },
      }));
    }

    // Prev question in same section?
    if (qi > 0) {
      const prevQId = section.questionNumbers[qi - 1].questionId;
      set((state) => ({
        currentPointer: {
          currentSectionPos: si,
          currentQuestionPos: qi - 1,
        },
        questionStatusMap: updateStatusOnVisit(
          state.questionStatusMap,
          prevQId
        ),
      }));
      startTimer();
      return;
    }

    // move to last question of previous section
    for (let s = si - 1; s >= 0; s--) {
      const prevSec = sectionSet[s];
      if (prevSec?.questionNumbers?.length > 0) {
        const prevQId =
          prevSec.questionNumbers[prevSec.questionNumbers.length - 1]
            .questionId;
        set((state) => ({
          currentPointer: {
            currentSectionPos: s,
            currentQuestionPos: prevSec.questionNumbers.length - 1,
          },
          questionStatusMap: updateStatusOnVisit(
            state.questionStatusMap,
            prevQId
          ),
        }));
        startTimer();
        return;
      }
    }

    // TODO
    // Handle first question in first section (set a flag to disable button)
  },

  getCurrentQuestion: () => {
    const { testData, currentPointer } = get();
    if (!testData) return null;

    const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
    if (si < 0 || qi < 0) return null;

    const questionId =
      testData.sectionSet[si]?.questionNumbers[qi]?.questionId ?? null;
    if (!questionId) return null;

    return (
      testData?.questionSet?.find((q) => q.questionId === questionId) ?? null
    );
  },

  setCurrentQuestion: (question) => {
    const { testData, currentPointer, questionStatusMap, questionResponseMap, startTimer, stopTimer } =
      get();
    if (!testData || !question) return;

    const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
    if (si < 0 || qi < 0) return;

    const currQId = testData?.sectionSet[si]?.questionNumbers[qi]?.questionId;
    if (!currQId) return;

    stopTimer();

    if (
      questionStatusMap[currQId] === QuestionStatus.VISITED &&
      !questionResponseMap[currQId]
    ) {
      set((state) => ({
        questionStatusMap: {
          ...state.questionStatusMap,
          [currQId]: QuestionStatus.NOT_ATTEMPTED,
        },
      }));
    }

    const nextSectionIndex = testData.sectionSet?.findIndex(
      (sec) => sec.sectionName === question.sectionName
    );
    if (nextSectionIndex < 0) return;

    const nextQuestionIndex = testData.sectionSet[
      nextSectionIndex
    ]?.questionNumbers?.findIndex((q) => q.questionId === question.questionId);
    if (nextQuestionIndex < 0) return;

    set((state) => ({
      currentPointer: {
        currentSectionPos: nextSectionIndex,
        currentQuestionPos: nextQuestionIndex,
      },
      questionStatusMap: updateStatusOnVisit(
        state.questionStatusMap,
        question.questionId
      ),
    }));
    startTimer();
  },

  // Responses
  getCurrentResponse: () => {
    const { getCurrentQuestion, questionResponseMap } = get();
    const question = getCurrentQuestion();
    if (!question) return null;

    return questionResponseMap[question.questionId] ?? null;
  },

  setCurrentResponse: (response) => {
    const { getCurrentQuestion } = get();
    const question = getCurrentQuestion();
    if (!question) return null;

    set((state) => {
      const newStatus = response
        ? QuestionStatus.ATTEMPTED
        : QuestionStatus.NOT_ATTEMPTED;
      return {
        questionResponseMap: {
          ...state.questionResponseMap,
          [question.questionId]: response,
        },
        questionStatusMap: {
          ...state.questionStatusMap,
          [question.questionId]: newStatus,
        },
      };
    });
  },

  clearCurrentResponse: () => {
    const { getCurrentQuestion } = get();
    const question = getCurrentQuestion();
    if (!question) return null;

    set((state) => ({
      questionResponseMap: {
        ...state.questionResponseMap,
        [question.questionId]: null,
      },
      questionStatusMap: {
        ...state.questionStatusMap,
        [question.questionId]: QuestionStatus.NOT_ATTEMPTED,
      },
    }));
  },

  // Time tracking
  getTimeByQuestionId: (questionId) => get().questionTimeMap[questionId] ?? 0,

  incrementTimeByQuestionId: (questionId) =>
    set((state) => ({
      questionTimeMap: {
        ...state.questionTimeMap,
        [questionId]: (state.questionTimeMap[questionId] ?? 0) + 1,
      },
    })),

  decrementTimeByQuestionId: (questionId) =>
    set((state) => ({
      questionTimeMap: {
        ...state.questionTimeMap,
        [questionId]: Math.max((state.questionTimeMap[questionId] ?? 0) - 1, 0),
      },
    })),

  // Question status
  getStatusByQuestionId: (questionId) =>
    get().questionStatusMap[questionId] ?? QuestionStatus.NOT_VISITED,
  changeStatusByQuestionId: (questionId, status) =>
    set((state) => ({
      questionStatusMap: {
        ...state.questionStatusMap,
        [questionId]: status,
      },
    })),

  getQuestionCountByStatus: (status: QuestionStatus) => {
    const { testData, questionStatusMap } = get();
    if (!testData) return 0;
    return (
      testData.questionSet.filter(
        (q) => questionStatusMap[q.questionId] === status
      ).length ?? 0
    );
  },

  // Status Related
  markCurrentForReview: () => {
    const { testData, currentPointer } = get();
    if (!testData) return;

    const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
    if (si < 0 || qi < 0) return;

    const currQId = testData.sectionSet[si]?.questionNumbers[qi]?.questionId;
    if (!currQId) return;

    set((state) => ({
      questionStatusMap: {
        ...state.questionStatusMap,
        [currQId]: QuestionStatus.MARKED_FOR_REVIEW,
      },
    }));
  },

  startTimer: () => {
    const { __timerId, getCurrentQuestion } = get();
    const question = getCurrentQuestion();
    if (!question) return;

    if (__timerId) clearInterval(__timerId);

    const interval = setInterval(() => {
      set((state) => ({
        questionTimeMap: {
          ...state.questionTimeMap,
          [question.questionId]:
            (state.questionTimeMap[question.questionId] ?? 0) + 1,
        },
      }));
    }, 1000);

    set({ __timerId: interval });
  },
  stopTimer: () => {
    const { __timerId } = get();
    if (__timerId) {
      clearTimeout(__timerId);
      set({ __timerId: null });
    }
  },

  // Reset state
  reset: () => {
    const { stopTimer } = get();
    stopTimer();
    set({
      testData: null,
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
