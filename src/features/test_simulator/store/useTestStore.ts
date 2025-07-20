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
  getResponseByQuestionId: (
    questionId: number
  ) => ResponseType | null | undefined;
  setResponseByQuestionId: (
    questionId: number,
    response: ResponseType | null | undefined
  ) => void;
  clearResponseByQuestionId: (questionId: number) => void;

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
  getQuestionsByStatus: (status: QuestionStatus) => QuestionType[];

  markForReview: (questionId: number) => void;

  reset: () => void;
}

/**
 * Zustand store for managing test simulation state.
 */
const useTestStore = create<TestStore>((set, get) => ({
  testData: null,
  sectionsUI: [],

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

  // Question Pointer
  currentPointer: {
    currentSectionPos: -1,
    currentQuestionPos: -1,
  },

  // Next Handler
  goToNext: () => {
    const { testData, currentPointer } = get();
    if (!testData) return;

    const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
    if (si < 0 || qi < 0) return;

    const sectionSet = testData?.sectionSet;
    const section = sectionSet[si];
    if (!section) return;

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
        return;
      }
    }

    // TODO
    // Handle last question of last section condition (open submit modal)
  },

  // Prev Handler
  goToPrev: () => {
    const { testData, currentPointer } = get();
    if (!testData) return;

    const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
    if (si < 0 || qi < 0) return;

    const sectionSet = testData?.sectionSet;
    const section = sectionSet[si];
    if (!section) return;

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
    const { testData } = get();
    if (!testData || !question) return;

    const si = testData.sectionSet?.findIndex(
      (sec) => sec.sectionName === question.sectionName
    );
    if (si < 0) return;

    const qi = testData.sectionSet[si]?.questionNumbers?.findIndex(
      (q) => q.questionId === question.questionId
    );
    if (qi < 0) return;

    set((state) => ({
      currentPointer: {
        currentSectionPos: si,
        currentQuestionPos: qi,
      },
      questionStatusMap: updateStatusOnVisit(
        state.questionStatusMap,
        question.questionId
      ),
    }));
  },

  // Responses
  questionResponseMap: {},
  getResponseByQuestionId: (questionId) =>
    get().questionResponseMap[questionId],
  setResponseByQuestionId: (questionId, response) =>
    set((state) => {
      const newStatus = response
        ? QuestionStatus.ATTEMPTED
        : QuestionStatus.NOT_ATTEMPTED;
      return {
        questionResponseMap: {
          ...state.questionResponseMap,
          [questionId]: response,
        },
        questionStatusMap: {
          ...state.questionStatusMap,
          [questionId]: newStatus,
        },
      };
    }),
  clearResponseByQuestionId: (questionId) => {
    set((state) => ({
      questionResponseMap: {
        ...state.questionResponseMap,
        [questionId]: null,
      },
      questionStatusMap: {
        ...state.questionStatusMap,
        [questionId]: QuestionStatus.NOT_ATTEMPTED,
      },
    }));
  },

  // Time tracking
  questionTimeMap: {},
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
  questionStatusMap: {},
  getStatusByQuestionId: (questionId) =>
    get().questionStatusMap[questionId] ?? QuestionStatus.NOT_VISITED,
  changeStatusByQuestionId: (questionId, status) =>
    set((state) => ({
      questionStatusMap: {
        ...state.questionStatusMap,
        [questionId]: status,
      },
    })),

  getQuestionsByStatus: (status: QuestionStatus) => {
    const { testData, questionStatusMap } = get();
    if (!testData) return [];
    return testData.questionSet.filter(
      (q) => questionStatusMap[q.questionId] === status
    );
  },

  // Status Related
  markForReview: (questionId) => {
    set((state) => ({
      questionStatusMap: {
        ...state.questionStatusMap,
        [questionId]: QuestionStatus.MARKED_FOR_REVIEW,
      },
    }));
  },

  // Reset state
  reset: () =>
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
    }),
}));

export default useTestStore;
