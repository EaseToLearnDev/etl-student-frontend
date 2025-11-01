import {
  QuestionStatus,
  type Pointer,
  type Question,
  type ResponseType,
  type TestData,
} from "../test_simulator.types";

// ------------------SET CURRENT RESPONSE------------------

export interface SetCurrentResponseParams {
  question: Question | null;
  response: string;
  questionResponseMap: Record<number, ResponseType>;
  questionStatusMap: Record<number, QuestionStatus>;
  action: "push" | "pop" | "replace";
}

export interface SetCurrentResponseResult {
  newResponseMap: Record<number, ResponseType>;
  newStatusMap: Record<number, QuestionStatus>;
}

/**
 * Function to set current response
 */
export const setCurrentResponseHandler = ({
  question,
  response,
  questionResponseMap,
  questionStatusMap,
  action,
}: SetCurrentResponseParams): SetCurrentResponseResult | null => {
  if (!question) return null;

  const isAnswered =
    (response && response.length > 0) ||
    questionResponseMap[question.questionId].url !== null;
  const isMarkedForReview =
    questionStatusMap[question?.questionId] ===
    QuestionStatus.MARKED_FOR_REVIEW;
  const isAnsweredAndReview =
    questionStatusMap[question?.questionId] ===
    QuestionStatus.ANSWERED_AND_REVIEW;

  let newStatus: QuestionStatus;
  if (isAnswered) {
    newStatus =
      isMarkedForReview || isAnsweredAndReview
        ? QuestionStatus.ANSWERED_AND_REVIEW
        : QuestionStatus.ATTEMPTED;
  } else {
    newStatus = QuestionStatus.NOT_ATTEMPTED;
  }

  const newResponseMap = questionResponseMap;
  switch (action) {
    case "push": {
      const isDuplicateResponse = questionResponseMap[
        question.questionId
      ].text.find((r) => r.toLowerCase() === response.toLowerCase());
      if (!isDuplicateResponse) {
        newResponseMap[question.questionId].text.push(response);
      }
      break;
    }
    case "pop":
      newResponseMap[question.questionId].text = newResponseMap[
        question.questionId
      ].text.filter((r) => r.toLowerCase() !== response.toLowerCase());
      break;
    case "replace":
      newResponseMap[question.questionId].text[0] = response;
      break;
    default:
      break;
  }

  return {
    newResponseMap: newResponseMap,
    newStatusMap: {
      ...questionStatusMap,
      [question.questionId]: newStatus,
    },
  };
};

// ------------------CLEAR CURRENT RESPONSE------------------

export interface ClearCurrentResponseParams {
  question: Question | null;
  questionResponseMap: Record<number, ResponseType>;
  questionStatusMap: Record<number, QuestionStatus>;
}

export interface ClearCurrentResponseResult {
  newResponseMap: Record<number, ResponseType>;
  newStatusMap: Record<number, QuestionStatus>;
}

/**
 * Function to clear current response
 */
export const clearCurrentResponseHandler = ({
  question,
  questionResponseMap,
  questionStatusMap,
}: ClearCurrentResponseParams): ClearCurrentResponseResult | null => {
  if (!question) return null;

  let newStatus = QuestionStatus.NOT_ATTEMPTED;

  if (
    questionStatusMap[question.questionId] ===
    QuestionStatus.ANSWERED_AND_REVIEW
  ) {
    newStatus = QuestionStatus.MARKED_FOR_REVIEW;
  }

  return {
    newResponseMap: {
      ...questionResponseMap,
      [question.questionId]: { text: [], fileName: null, url: null },
    },
    newStatusMap: {
      ...questionStatusMap,
      [question.questionId]: newStatus,
    },
  };
};

export interface IsMaxQuestionLimitReachedParams {
  testData: TestData | null;
  currentPointer: Pointer;
  question: Question | null;
  questionStatusMap: Record<number, QuestionStatus>;
}

export type IsMaxQuestionLimitReachedResult = "NONE" | "GLOBAL" | "SECTION";

/**
 * Function to check max attempted questions
 */
export const isMaxQuestionLimitReached = ({
  testData,
  currentPointer,
  question,
  questionStatusMap,
}: IsMaxQuestionLimitReachedParams): IsMaxQuestionLimitReachedResult => {
  if (!question || !testData) return "NONE";

  const attemptedQuestionsCount = Object.values(questionStatusMap).filter(
    (status) =>
      status === QuestionStatus.ATTEMPTED ||
      status === QuestionStatus.ANSWERED_AND_REVIEW
  ).length;

  const currentQuestionStatus = questionStatusMap[question?.questionId];
  const isCurrentAttempted =
    currentQuestionStatus === QuestionStatus.ATTEMPTED ||
    currentQuestionStatus === QuestionStatus.ANSWERED_AND_REVIEW;

  if (isCurrentAttempted) return "NONE";

  if (
    question?.questionId &&
    !question?.sectionId &&
    testData?.noQuestionAttempt &&
    testData?.noQuestionAttempt > 0 &&
    attemptedQuestionsCount >= testData?.noQuestionAttempt
  ) {
    // Check for global attempted limit
    return "GLOBAL";
  }

  // Check for section attempted limit
  const currentSectionQuestionList =
    testData.sectionSet[currentPointer.sectionPos].questionNumbers;
  const currentSectionAttemptedCount = currentSectionQuestionList.filter(
    (q) =>
      questionStatusMap[q?.questionId] === QuestionStatus.ATTEMPTED ||
      questionStatusMap[q?.questionId] === QuestionStatus.ANSWERED_AND_REVIEW
  ).length;
  if (
    question?.questionId &&
    question?.sectionId &&
    question?.sectionId > 0 &&
    question?.noQuestionAttempt &&
    question?.noQuestionAttempt > 0 &&
    currentSectionAttemptedCount >= question?.noQuestionAttempt
  ) {
    return "SECTION";
  }

  return "NONE";
};

interface SetCurrentFileUrlHandlerParams {
  question: Question | null;
  fileName: string;
  url: string;
  questionResponseMap: Record<number, ResponseType>;
  questionStatusMap: Record<number, QuestionStatus>;
}

export interface SetCurrentFileUrlHandlerResult {
  newResponseMap: Record<number, ResponseType>;
  newStatusMap: Record<number, QuestionStatus>;
}

export const setCurrentFileUrlHandler = ({
  question,
  fileName,
  url,
  questionResponseMap,
  questionStatusMap,
}: SetCurrentFileUrlHandlerParams): SetCurrentFileUrlHandlerResult | null => {
  if (!question || !fileName || !url) return null;

  const isMarkedForReview =
    questionStatusMap[question?.questionId] ===
    QuestionStatus.MARKED_FOR_REVIEW;
  const isAnsweredAndReview =
    questionStatusMap[question?.questionId] ===
    QuestionStatus.ANSWERED_AND_REVIEW;

  const newStatus =
    isMarkedForReview || isAnsweredAndReview
      ? QuestionStatus.ANSWERED_AND_REVIEW
      : QuestionStatus.ATTEMPTED;

  return {
    newResponseMap: {
      ...questionResponseMap,
      [question.questionId]: {
        text: questionResponseMap[question.questionId].text,
        fileName: fileName,
        url: url,
      },
    },
    newStatusMap: {
      ...questionStatusMap,
      [question.questionId]: newStatus,
    },
  };
};

interface ClearCurrentFileUrlHandlerParams {
  question: Question | null;
  questionResponseMap: Record<number, ResponseType>;
  questionStatusMap: Record<number, QuestionStatus>;
}

export interface ClearCurrentFileUrlHandlerResult {
  newResponseMap: Record<number, ResponseType>;
  newStatusMap: Record<number, QuestionStatus>;
}

export const clearCurrentFileUrlHandler = ({
  question,
  questionResponseMap,
  questionStatusMap,
}: ClearCurrentFileUrlHandlerParams): ClearCurrentFileUrlHandlerResult | null => {
  if (!question) return null;

  const prevStatus = questionStatusMap[question.questionId];
  let newStatus: QuestionStatus;

  // Preserve review states first
  if (
    prevStatus === QuestionStatus.ANSWERED_AND_REVIEW ||
    prevStatus === QuestionStatus.MARKED_FOR_REVIEW
  ) {
    newStatus = QuestionStatus.MARKED_FOR_REVIEW;
  } else {
    // Otherwise determine based on remaining text responses
    newStatus = questionResponseMap[question.questionId].text[0]
      ? QuestionStatus.ATTEMPTED
      : QuestionStatus.NOT_ATTEMPTED;
  }

  return {
    newResponseMap: {
      ...questionResponseMap,
      [question.questionId]: {
        text: questionResponseMap[question.questionId].text,
        fileName: null,
        url: null,
      },
    },
    newStatusMap: {
      ...questionStatusMap,
      [question.questionId]: newStatus,
    },
  };
};
