import {
  QuestionStatus,
  type Question,
} from "../test_simulator.types";

// ------------------SET CURRENT RESPONSE------------------

export interface SetCurrentResponseParams {
  question: Question | null;
  response: string;
  questionResponseMap: Record<number, string>;
  questionStatusMap: Record<number, QuestionStatus>;
}

export interface SetCurrentResponseResult {
  newResponseMap: Record<number, string>;
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
}: SetCurrentResponseParams): SetCurrentResponseResult | null => {
  if (!question) return null;

  const newStatus = response
    ? QuestionStatus.ATTEMPTED
    : QuestionStatus.NOT_ATTEMPTED;

  return {
    newResponseMap: {
      ...questionResponseMap,
      [question.questionId]: response,
    },
    newStatusMap: {
      ...questionStatusMap,
      [question.questionId]: newStatus,
    },
  };
};

// ------------------CLEAR CURRENT RESPONSE------------------

export interface ClearCurrentResponseParams {
  question: Question | null;
  questionResponseMap: Record<number, string>;
  questionStatusMap: Record<number, QuestionStatus>;
}

export interface ClearCurrentResponseResult {
  newResponseMap: Record<number, string>;
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

  return {
    newResponseMap: {
      ...questionResponseMap,
      [question.questionId]: "",
    },
    newStatusMap: {
      ...questionStatusMap,
      [question.questionId]: QuestionStatus.NOT_ATTEMPTED,
    },
  };
};
