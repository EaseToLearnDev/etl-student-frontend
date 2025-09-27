import type {
  TestData,
  Pointer,
  Question,
} from "../test_simulator.types";

export interface GetCurrentQuestionParams {
  testData: TestData;
  currentPointer: Pointer;
}

/**
 * Gets the current question based on section and question pointer.
 */
export function getCurrentQuestionHandler({
  testData,
  currentPointer,
}: GetCurrentQuestionParams): Question | null {
  const { sectionPos: si, questionPos: qi } = currentPointer;
  if (si < 0 || qi < 0) return null;

  const questionId =
    testData.sectionSet[si]?.questionNumbers[qi]?.questionId ?? null;
  if (!questionId) return null;

  return testData.questionSet.find((q) => q.questionId === questionId) ?? null;
}

/**
 * Gets the response for the specified question.
 */
export function getResponseForQuestionHandler({
  questionId,
  questionResponseMap,
}: {
  questionId: number;
  questionResponseMap: Record<number, Array<string>>;
}) {
  return questionResponseMap[questionId];
}
