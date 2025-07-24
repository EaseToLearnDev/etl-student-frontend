import type { MockTestType, TopicTestType } from "../types";

export interface NormalizedTest {
  id: number;
  title: string;
  time: number;
  questions: number;
  marks: number;
  difficulty?: string;
  progress?: "not_started" | "in_progress";
  score?: number;
}

/**
 * Normalizes test data from either a `MockTestType` or `TopicTestType` into a unified `NormalizedTest` format.
 */
export const normalizeTestData = (test: MockTestType | TopicTestType): NormalizedTest => {
  if ((test as MockTestType).testName !== undefined) {
      // MockTestType
    const mockTest = (test as MockTestType);
    return {
      id: mockTest.mocktestId,
      title: mockTest.testName,
      time: mockTest.testTotalTime,
      questions: mockTest.totalQuestions,
      marks: mockTest.totalMarks,
      difficulty: mockTest.difficulty,
      progress: mockTest.progress,
      score: mockTest.marks,
    };
  } else {
    // TopicTestType
    const topicTest = (test as TopicTestType);
    return {
      id: topicTest.mockTestId,
      title: topicTest.mockTestTitle,
      time: topicTest.patternDetails.totalTime,
      questions: topicTest.patternDetails.totalQuestion,
      marks: topicTest.patternDetails.totalMark,
    };
  }
};
