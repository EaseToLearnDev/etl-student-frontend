import type { Question } from "../test_simulator.types";

// ------------------Increment/Decrement Timer Handlers------------------

export interface TimeHandlerParams {
  questionId: number;
  questionTimeMap: Record<number, number>;
}

export interface TimeHandlerResult {
  newTimeMap: Record<number, number>;
}

/**
 * Function to increment question time
 */
export const incrementTimeHandler = ({
  questionId,
  questionTimeMap,
}: TimeHandlerParams): TimeHandlerResult => {
  return {
    newTimeMap: {
      ...questionTimeMap,
      [questionId]: (questionTimeMap[questionId] ?? 0) + 1,
    },
  };
};

/**
 * Function to decrement question time
 */
export const decrementTimeHandler = ({
  questionId,
  questionTimeMap,
}: TimeHandlerParams): TimeHandlerResult => {
  return {
    newTimeMap: {
      ...questionTimeMap,
      [questionId]: Math.max((questionTimeMap[questionId] ?? 0) - 1, 0),
    },
  };
};

// ------------------START TIMER HANDLER------------------

export interface StartTimerHandlerParams {
  question: Question | null;
  timerId: number | NodeJS.Timeout | null;
  questionTimeMap: Record<number, number>;
}

export interface StartTimerHandlerResult {
  intervalId: NodeJS.Timeout;
}

/**
 * Function to start question timer
 */
export const startQuestionTimerHandler = ({
  question,
  timerId,
  questionTimeMap,
}: StartTimerHandlerParams): StartTimerHandlerResult | null => {
  if (!question) return null;

  if (timerId) clearInterval(timerId);

  const interval = setInterval(() => {
    // purely local mutation logic
    questionTimeMap[question.questionId] =
      (questionTimeMap[question.questionId] ?? 0) + 1;
  }, 1000);

  return { intervalId: interval };
};

// ------------------STOP TIMER HANDLER------------------


/**
 * Function to stop question timer
 */
export interface StopTimerHandlerParams {
  timerId: number | NodeJS.Timeout | null;
}

export const stopQuestionTimerHandler = ({
  timerId,
}: StopTimerHandlerParams): null => {
  if (timerId) {
    clearInterval(timerId);
  }
  return null;
};
