// Types
import { QuestionStatus, subjectiveTypes } from "../test_simulator.types";
import type {
  TestData,
  Pointer,
  Question,
  ResponseType,
} from "../test_simulator.types";

// Services
import { updateStatusOnVisit } from "./statusHandlers";
const getQuestionType = (testData: TestData, qid: number) =>
  testData.questionSet.find((q) => q.questionId === qid)?.questionType;

// ------------------GO TO NEXT------------------

interface GoToNextParams {
  testData: TestData;
  currentPointer: Pointer;
  questionResponseMap: Record<number, ResponseType>;
  questionStatusMap: Record<number, QuestionStatus>;
  subjectiveMarkEditEnabled: boolean;
}

interface GoToNextResult {
  newPointer: Pointer;
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
  subjectiveMarkEditEnabled,
}: GoToNextParams): GoToNextResult | null => {
  const { sectionPos: si, questionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;

  const section = testData.sectionSet[si];
  if (!section) return null;

  const currQId = section?.questionNumbers[qi]?.questionId;
  if (!currQId) return null;

  const newStatusMap = { ...questionStatusMap };

  // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
  if (
    newStatusMap[currQId] === QuestionStatus.VISITED &&
    (questionResponseMap[currQId].text.length === 0 ||
      (!questionResponseMap[currQId].url &&
        !questionResponseMap[currQId].fileName))
  ) {
    newStatusMap[currQId] = QuestionStatus.NOT_ATTEMPTED;
  }
  // Next question in same section
  for (let nextQ = qi + 1; nextQ < section.questionNumbers.length; nextQ++) {
    const nextQId = section.questionNumbers[qi + 1].questionId;
    const nextType = getQuestionType(testData, nextQId) || "";

    if (!subjectiveMarkEditEnabled || subjectiveTypes.includes(nextType)) {
      return {
        newPointer: { sectionPos: si, questionPos: nextQ },
        newStatusMap: updateStatusOnVisit(newStatusMap, nextQId),
        reachedEnd: false,
      };
    }
  }

  // First question of next section
  for (let s = si + 1; s < testData.sectionSet.length; s++) {
    const nextSec = testData.sectionSet[s];
    if (!nextSec?.questionNumbers.length) continue;

    for (let qIndex = 0; qIndex < nextSec?.questionNumbers?.length; qIndex++) {
      const nextQId = nextSec?.questionNumbers[qIndex].questionId;
      const nextType = getQuestionType(testData, nextQId) || "";

      if (!subjectiveMarkEditEnabled || subjectiveTypes.includes(nextType)) {
        return {
          newPointer: { sectionPos: s, questionPos: qIndex },
          newStatusMap: updateStatusOnVisit(newStatusMap, nextQId),
          reachedEnd: false,
        };
      }
    }
  }

  // End of last section
  return { newPointer: currentPointer, newStatusMap, reachedEnd: true };
};

// ------------------GO TO PREV------------------

interface GoToPrevParams {
  testData: TestData;
  subjectiveMarkEditEnabled: boolean;
  currentPointer: Pointer;
  questionResponseMap: Record<number, ResponseType>;
  questionStatusMap: Record<number, QuestionStatus>;
}

interface GoToPrevResult {
  newPointer: Pointer;
  newStatusMap: Record<number, QuestionStatus>;
  reachedStart: boolean; // true if first question reached
}

/**
 * Function for navigating to the previous question.
 */
export const goToPrevQuestionHandler = ({
  testData,
  subjectiveMarkEditEnabled,
  currentPointer,
  questionResponseMap,
  questionStatusMap,
}: GoToPrevParams): GoToPrevResult | null => {
  const { sectionPos: si, questionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;

  const section = testData.sectionSet[si];
  if (!section) return null;

  const currQId = section?.questionNumbers[qi]?.questionId;
  if (!currQId) return null;

  const newStatusMap = { ...questionStatusMap };

  const currentResponse = questionResponseMap[currQId];

  // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
  if (
    newStatusMap[currQId] === QuestionStatus.VISITED &&
    (!currentResponse.text.length ||
      (!currentResponse.url && !currentResponse.fileName))
  ) {
    newStatusMap[currQId] = QuestionStatus.NOT_ATTEMPTED;
  }

  // Previous in same section
  for (let prevQ = qi - 1; prevQ >= 0; prevQ--) {
    const prevQId = section.questionNumbers[qi - 1].questionId;
    const prevType = getQuestionType(testData, prevQId) || "";

    if (!subjectiveMarkEditEnabled || subjectiveTypes.includes(prevType)) {
      return {
        newPointer: { sectionPos: si, questionPos: prevQ },
        newStatusMap: updateStatusOnVisit(newStatusMap, prevQId),
        reachedStart: false,
      };
    }
  }

  // Last question of previous section
  for (let s = si - 1; s >= 0; s--) {
    const prevSec = testData.sectionSet[s];
    if (!prevSec?.questionNumbers?.length) continue;

    for (
      let qIndex = prevSec?.questionNumbers?.length - 1;
      qIndex >= 0;
      qIndex--
    ) {
      const prevQId =
        prevSec.questionNumbers[prevSec.questionNumbers.length - 1].questionId;
      const prevType = getQuestionType(testData, prevQId) || "";

      if (!subjectiveMarkEditEnabled || subjectiveTypes.includes(prevType)) {
        return {
          newPointer: { sectionPos: s, questionPos: qIndex },
          newStatusMap: updateStatusOnVisit(newStatusMap, prevQId),
          reachedStart: false,
        };
      }
    }
  }

  // Reached very first question
  return { newPointer: currentPointer, newStatusMap, reachedStart: true };
};

interface SetCurrentQuestionParams {
  testData: TestData;
  currentPointer: Pointer;
  questionStatusMap: Record<number, QuestionStatus>;
  questionResponseMap: Record<number, ResponseType>;
  question: Question;
}

interface SetCurrentQuestionResult {
  newPointer: Pointer;
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
  const { sectionPos: si, questionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;
  const currQId = testData?.sectionSet[si]?.questionNumbers[qi]?.questionId;
  if (!currQId) return null;
  const newStatusMap = { ...questionStatusMap };

  const currentResponse = questionResponseMap[currQId];

  // If current question is VISITED and has no response, mark as NOT_ATTEMPTED
  if (
    newStatusMap[currQId] === QuestionStatus.VISITED &&
    (!currentResponse.text.length ||
      (!currentResponse.url && !currentResponse.fileName))
  ) {
    newStatusMap[currQId] = QuestionStatus.NOT_ATTEMPTED;
  }
  let nextSectionIndex = testData.sectionSet.findIndex(
    (sec) => sec.sectionName === question.sectionName,
  );
  nextSectionIndex = nextSectionIndex > 0 ? nextSectionIndex : 0;

  const nextQuestionIndex = testData.sectionSet[
    nextSectionIndex
  ]?.questionNumbers.findIndex((q) => q.questionId === question.questionId);
  if (nextQuestionIndex < 0) return null;
  return {
    newPointer: {
      sectionPos: nextSectionIndex,
      questionPos: nextQuestionIndex,
    },
    newStatusMap: updateStatusOnVisit(newStatusMap, question.questionId),
  };
};
