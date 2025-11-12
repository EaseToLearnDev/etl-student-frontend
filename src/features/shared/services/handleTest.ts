import type { NavigateFunction } from "react-router-dom";
// Types
import type { ModeType, TestOption, Topic } from "../types";
import { type PrevRunningTest } from "../types";

// Utils
import { toQueryString } from "../../../utils";

// Hooks
import { useStudentStore } from "../hooks/useStudentStore";

/**
 * Starts a new test session and navigates to the test simulator.
 */
export const handleStartTest = async (
  navigate: NavigateFunction,
  mode: ModeType,
  selectedTopic: Topic | null,
  selectedTestOption: TestOption
) => {
  const { studentData, activeCourse } = useStudentStore.getState();
  if (!studentData || !activeCourse) return;

  if (selectedTopic) {
    const params = {
      testId: "0",
      testType: "1",
      questionType:
        selectedTestOption.questionTypeList.join(",") ?? "Multiple Choice",
      totalQuestion: String(selectedTestOption.totalQuestions),
      totalTime: String(selectedTestOption.duration),
      marksCorrectAnswer: String(selectedTestOption.marksCorrectAns),
      marksIncorrectAnswer: String(selectedTestOption.marksIncorrectAns),
      marksNotAttempted: String(selectedTestOption.marksNotAnswer),
      searchFlag: "Topic",
      searchQuery: selectedTopic.topicName,
      topicId: String(selectedTopic.topicId),
      examType: selectedTestOption?.examType,
      assessmentMode: mode === "Learning Session" ? "beginner" : "advance",
      templateId: String(activeCourse?.templateId),
      packTypeTitle: activeCourse?.packTypeTitle,
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
    let params: Record<string, any> = {
      testSession: String(previousRunningTest.testSession),
      testType: String(previousRunningTest.testType),
    };

    if (previousRunningTest.testType == 1) {
      params.assessmentMode =
        previousRunningTest.testMode === "Learning Session"
          ? "beginner"
          : "advance";
    }

    const queryString = toQueryString(params);
    navigate(`/test-simulator?${queryString}`);
  }
};
