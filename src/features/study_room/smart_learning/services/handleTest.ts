// React
import type { NavigateFunction } from "react-router-dom";

// Types
import type { TopicType } from "../../../shared/types";
import type { ModeType, PreviousRunningTestType } from "../sl.types";

/**
 * Starts a new test session and navigates to the test simulator.
 */
export const handleStartTest = async (
  navigate: NavigateFunction,
  mode: ModeType,
  selectedTopic: TopicType | null,
  testOptions: Record<string, number>
) => {
  if (selectedTopic) {
    let params = {
      testId: "0",
      testType: "1",
      questionType: "Multiple Choice",
      totalQuestion: String(testOptions.totalQuestion),
      totalTime: String(testOptions.totalTime),
      marksCorrectAnswer: String(testOptions.marksCorrectAnswer),
      marksIncorrectAnswer: String(testOptions.markIncorrectAns),
      marksNotAttempted: String(testOptions.markNotAttempted),
      searchFlag: "Topic",
      searchQuery: selectedTopic.topicName,
      topicId: String(selectedTopic.topicId),
      examType: "objective",
      assessmentMode: mode === "learning" ? "beginner" : "advance",
    };

    const queryString = new URLSearchParams(params).toString();

    navigate(`/test-simulator?${queryString}`);
  }
};

/**
 * Resumes a previous test session and navigates to the test simulator.
 */
export const handleResumeTest = async (
  navigate: NavigateFunction,
  previousRunningTest: PreviousRunningTestType | null
) => {
  console.log("inside handle resume session");
  if (previousRunningTest) {
    console.log("inside previousRunningTest");
    let params = {
      testSession: String(previousRunningTest.testSession),
      testType: String(previousRunningTest.testType),
      assessmentMode:
        previousRunningTest.testMode === "Learning Session"
          ? "beginner"
          : "advance",
    };

    const queryString = new URLSearchParams(params).toString();
    console.log("string:", queryString);

    navigate(`/test-simulator?${queryString}`);
  }
};
