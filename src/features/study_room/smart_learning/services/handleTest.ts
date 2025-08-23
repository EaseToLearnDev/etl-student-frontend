// Types
import type { NavigateFunction } from "react-router-dom";
import type { Topic } from "../../../shared/types";
import type { ModeType } from "../sl.types";
import { type PrevRunningTest } from "../../../shared/types";

// Utils
import { toQueryString } from "../../../../utils";

/**
 * Starts a new test session and navigates to the test simulator.
 */
export const handleStartTest = async (
  navigate: NavigateFunction,
  mode: ModeType,
  selectedTopic: Topic | null,
  testOptions: Record<string, number>
) => {
  if (selectedTopic) {
    let params = {
      testId: "0",
      testType: "1",
      questionType: "Multiple Choice",
      totalQuestion: String(testOptions.totalQuestion),
      totalTime: String(testOptions.totalTime),
      marksCorrectAnswer: String(testOptions.marksCorrectAns),
      marksIncorrectAnswer: String(testOptions.marksIncorrectAns),
      marksNotAttempted: String(testOptions.marksNotAttempted),
      searchFlag: "Topic",
      searchQuery: selectedTopic.topicName,
      topicId: String(selectedTopic.topicId),
      examType: "objective",
      assessmentMode: mode === "learning" ? "beginner" : "advance",
    };

    const queryString = toQueryString(params);
    navigate(`/test-simulator?${queryString}`);
  }
};

/**
 * Resumes a previous test session and navigates to the test simulator.
 */
export const handleResumeTest = async (
  navigate: NavigateFunction,
  previousRunningTest: PrevRunningTest | null
) => {
  if (previousRunningTest) {
    let params = {
      testSession: String(previousRunningTest.testSession),
      testType: String(previousRunningTest.testType),
      assessmentMode:
        previousRunningTest.testMode === "Learning Session"
          ? "beginner"
          : "advance",
    };

    const queryString = toQueryString(params);
    navigate(`/test-simulator?${queryString}`);
  }
};
