import { QuestionStatus, type Question } from "../test_simulator.types";

// ------------------SET CURRENT RESPONSE------------------

export interface SetCurrentResponseParams {
  question: Question | null;
  response: string;
  questionResponseMap: Record<number, Array<string>>;
  questionStatusMap: Record<number, QuestionStatus>;
  action: "push" | "pop" | "replace";
}

export interface SetCurrentResponseResult {
  newResponseMap: Record<number, Array<string>>;
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

  const isMarkedForReview =
    questionStatusMap[question?.questionId] ===
    QuestionStatus.MARKED_FOR_REVIEW;
  const isAnsweredAndReview =
    questionStatusMap[question?.questionId] ===
    QuestionStatus.ANSWERED_AND_REVIEW;

  let newStatus: QuestionStatus;
  if (response) {
    newStatus =
      isMarkedForReview || isAnsweredAndReview
        ? QuestionStatus.ANSWERED_AND_REVIEW
        : QuestionStatus.ATTEMPTED;
  } else {
    newStatus = QuestionStatus.NOT_ATTEMPTED;
  }

  let newResponseMap = questionResponseMap;
  switch (action) {
    case "push":
      const isDuplicateResponse = questionResponseMap[question.questionId].find(
        (r) => r.toLowerCase() === response.toLowerCase()
      );
      if (!isDuplicateResponse) {
        newResponseMap[question.questionId].push(response);
      }
      break;
    case "pop":
      newResponseMap[question.questionId] = newResponseMap[question.questionId].filter(
        r => r.toLowerCase() !== response.toLowerCase()
      );
      break;
    case "replace":
      newResponseMap[question.questionId] = [response];
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
  questionResponseMap: Record<number, Array<string>>;
  questionStatusMap: Record<number, QuestionStatus>;
}

export interface ClearCurrentResponseResult {
  newResponseMap: Record<number, Array<string>>;
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
      [question.questionId]: [],
    },
    newStatusMap: {
      ...questionStatusMap,
      [question.questionId]: newStatus,
    },
  };
};
