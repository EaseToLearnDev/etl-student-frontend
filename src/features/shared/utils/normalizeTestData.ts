import type { MockTest, TopicTest } from "../types";

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
export const normalizeTestData = (test: MockTest | TopicTest): NormalizedTest => {
  if ((test as MockTest).testName !== undefined) {
      // MockTestType
    const mockTest = (test as MockTest);
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
    const topicTest = (test as TopicTest);
    return {
      id: topicTest.mockTestId,
      title: topicTest.mockTestTitle,
      time: topicTest.patternDetails.totalTime,
      questions: topicTest.patternDetails.totalQuestion,
      marks: topicTest.patternDetails.totalMark,
    };
  }
};
