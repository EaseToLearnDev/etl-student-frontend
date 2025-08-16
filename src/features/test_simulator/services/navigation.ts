// Types
import { QuestionStatus } from "../test_simulator.types";
import type {
  TestData,
  CurrentPointer,
  Response,
  Question,
} from "../test_simulator.types";

// Services
import { updateStatusOnVisit } from "./statusHandlers";

// ------------------GO TO NEXT------------------

interface GoToNextParams {
  testData: TestData;
  currentPointer: CurrentPointer;
  questionResponseMap: Record<number, Response | null | undefined>;
  questionStatusMap: Record<number, QuestionStatus>;
}

interface GoToNextResult {
  newPointer: CurrentPointer;
  newStatusMap: Record<number, QuestionStatus>;
  reachedEnd: boolean; // true if last question reached
}

/**
 * Function for navigating to the next question.
 */
export const goToNextQuestionHandler = ({
  testData,
  currentPointer,
  questionResponseMap,
  questionStatusMap,
}: GoToNextParams): GoToNextResult | null => {
  const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;

  const section = testData.sectionSet[si];
  if (!section) return null;

  const currQId = section?.questionNumbers[qi]?.questionId;
  if (!currQId) return null;

  const newStatusMap = { ...questionStatusMap };

  // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
  if (
    newStatusMap[currQId] === QuestionStatus.VISITED &&
    !questionResponseMap[currQId]
  ) {
    newStatusMap[currQId] = QuestionStatus.NOT_ATTEMPTED;
  }

  // Next question in same section
  if (qi + 1 < section.questionNumbers.length) {
    const nextQId = section.questionNumbers[qi + 1].questionId;
    return {
      newPointer: { currentSectionPos: si, currentQuestionPos: qi + 1 },
      newStatusMap: updateStatusOnVisit(newStatusMap, nextQId),
      reachedEnd: false,
    };
  }

  // First question of next section
  for (let s = si + 1; s < testData.sectionSet.length; s++) {
    const nextSec = testData.sectionSet[s];
    if (nextSec?.questionNumbers.length > 0) {
      const nextQId = nextSec.questionNumbers[0].questionId;
      return {
        newPointer: { currentSectionPos: s, currentQuestionPos: 0 },
        newStatusMap: updateStatusOnVisit(newStatusMap, nextQId),
        reachedEnd: false,
      };
    }
  }

  // End of last section
  return { newPointer: currentPointer, newStatusMap, reachedEnd: true };
};

// ------------------GO TO PREV------------------

interface GoToPrevParams {
  testData: TestData;
  currentPointer: CurrentPointer;
  questionResponseMap: Record<number, Response | null | undefined>;
  questionStatusMap: Record<number, QuestionStatus>;
}

interface GoToPrevResult {
  newPointer: CurrentPointer;
  newStatusMap: Record<number, QuestionStatus>;
  reachedStart: boolean; // true if first question reached
}

/**
 * Function for navigating to the previous question.
 */
export const goToPrevQuestionHandler = ({
  testData,
  currentPointer,
  questionResponseMap,
  questionStatusMap,
}: GoToPrevParams): GoToPrevResult | null => {
  const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;

  const section = testData.sectionSet[si];
  if (!section) return null;

  const currQId = section?.questionNumbers[qi]?.questionId;
  if (!currQId) return null;

  const newStatusMap = { ...questionStatusMap };

  // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
  if (
    newStatusMap[currQId] === QuestionStatus.VISITED &&
    !questionResponseMap[currQId]
  ) {
    newStatusMap[currQId] = QuestionStatus.NOT_ATTEMPTED;
  }

  // Previous in same section
  if (qi > 0) {
    const prevQId = section.questionNumbers[qi - 1].questionId;
    return {
      newPointer: { currentSectionPos: si, currentQuestionPos: qi - 1 },
      newStatusMap: updateStatusOnVisit(newStatusMap, prevQId),
      reachedStart: false,
    };
  }

  // Last question of previous section
  for (let s = si - 1; s >= 0; s--) {
    const prevSec = testData.sectionSet[s];
    if (prevSec?.questionNumbers.length > 0) {
      const prevQId =
        prevSec.questionNumbers[prevSec.questionNumbers.length - 1].questionId;
      return {
        newPointer: {
          currentSectionPos: s,
          currentQuestionPos: prevSec.questionNumbers.length - 1,
        },
        newStatusMap: updateStatusOnVisit(newStatusMap, prevQId),
        reachedStart: false,
      };
    }
  }

  // Reached very first question
  return { newPointer: currentPointer, newStatusMap, reachedStart: true };
};

interface SetCurrentQuestionParams {
  testData: TestData;
  currentPointer: CurrentPointer;
  questionStatusMap: Record<number, QuestionStatus>;
  questionResponseMap: Record<number, Response | null | undefined>;
  question: Question;
}

interface SetCurrentQuestionResult {
  newPointer: CurrentPointer;
  newStatusMap: Record<number, QuestionStatus>;
}

/**
 * Pure logic for jumping directly to a given question.
 */
export const setCurrentQuestionHandler = ({
  testData,
  currentPointer,
  questionStatusMap,
  questionResponseMap,
  question,
}: SetCurrentQuestionParams): SetCurrentQuestionResult | null => {
  const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;

  const currQId = testData?.sectionSet[si]?.questionNumbers[qi]?.questionId;
  if (!currQId) return null;

  const newStatusMap = { ...questionStatusMap };

  // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
  if (
    newStatusMap[currQId] === QuestionStatus.VISITED &&
    !questionResponseMap[currQId]
  ) {
    newStatusMap[currQId] = QuestionStatus.NOT_ATTEMPTED;
  }

  const nextSectionIndex = testData.sectionSet.findIndex(
    (sec) => sec.sectionName === question.sectionName
  );
  if (nextSectionIndex < 0) return null;

  const nextQuestionIndex = testData.sectionSet[
    nextSectionIndex
  ]?.questionNumbers.findIndex((q) => q.questionId === question.questionId);
  if (nextQuestionIndex < 0) return null;

  return {
    newPointer: {
      currentSectionPos: nextSectionIndex,
      currentQuestionPos: nextQuestionIndex,
    },
    newStatusMap: updateStatusOnVisit(newStatusMap, question.questionId),
  };
};
