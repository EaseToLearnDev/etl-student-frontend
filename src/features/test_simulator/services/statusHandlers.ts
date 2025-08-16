import { QuestionStatus } from "../test_simulator.types";
import type { TestData, CurrentPointer } from "../test_simulator.types";

export interface StatusHandlerResult {
  newStatusMap: Record<number, QuestionStatus>;
}

/**
 * Marks current question as "Marked for Review".
 */
export const markForReviewHandler = ({
  testData,
  currentPointer,
  questionStatusMap,
}: {
  testData: TestData;
  currentPointer: CurrentPointer;
  questionStatusMap: Record<number, QuestionStatus>;
}): StatusHandlerResult | null => {
  const { currentSectionPos: si, currentQuestionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;

  const currQId = testData.sectionSet[si]?.questionNumbers[qi]?.questionId;
  if (!currQId) return null;

  return {
    newStatusMap: {
      ...questionStatusMap,
      [currQId]: QuestionStatus.MARKED_FOR_REVIEW,
    },
  };
};

/**
 * Updates the status of a specific question.
 */
export const updateStatusHandler = ({
  questionId,
  newStatus,
  questionStatusMap,
}: {
  questionId: number;
  newStatus: QuestionStatus;
  questionStatusMap: Record<number, QuestionStatus>;
}): StatusHandlerResult => {
  return {
    newStatusMap: {
      ...questionStatusMap,
      [questionId]: newStatus,
    },
  };
};

/**
 * Gets status of a specific question.
 */
export const getStatusByQuestionIdHandler = ({
  questionId,
  questionStatusMap,
}: {
  questionId: number;
  questionStatusMap: Record<number, QuestionStatus>;
}): QuestionStatus | null => {
  return questionStatusMap[questionId] ?? null;
};

/**
 * Counts how many questions are in a specific status.
 */
export const countQuestionsByStatusHandler = ({
  status,
  questionStatusMap,
}: {
  status: QuestionStatus;
  questionStatusMap: Record<number, QuestionStatus>;
}): number => {
  return Object.values(questionStatusMap).filter((s) => s === status).length;
};

/** Updates question status to VISITED if it was previously NOT_VISITED. */
export const updateStatusOnVisit = (
  statusMap: Record<number, QuestionStatus>,
  questionId: number
): Record<number, QuestionStatus> => {
  return statusMap[questionId] === QuestionStatus.NOT_VISITED
    ? { ...statusMap, [questionId]: QuestionStatus.VISITED }
    : statusMap;
};
