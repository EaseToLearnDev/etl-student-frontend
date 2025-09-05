// Hooks
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import useTestStore from "../store/useTestStore";

// Apis
import { testStop } from "../api/testStop.api";
import type { NavigateFunction } from "react-router";

/**
 * Handles the logic for continuing the test session later by saving the current test state.
 */
export const handleContinueLater = async (navigate: NavigateFunction) => {
  const { testData, questionResponseMap, testConfig } = useTestStore.getState();
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData) return;

  let testMode = "";

  if (testConfig?.assessmentMode && testConfig?.assessmentMode === "beginner") {
    testMode = "Learning Session";
  } else if (
    testConfig?.assessmentMode &&
    testConfig?.assessmentMode === "advance"
  ) {
    testMode = "Competitive Session";
  }

  const testDetail = [
    {
      testId: testData?.testId,
      testName: testData?.testName,
      testType: testData?.testType,
      testOption: testData?.testOption,
      totalTime: testData?.totalTime,
      ...(testData?.testType === 3 && {
        noQuestionAttempt: testData?.noQuestionAttempt ?? 0,
      }),
      remainingTime: testData?.remainingTime,
      lastQuestionIndex: testData?.lastQuestionIndex,
      sectionLock: testData?.sectionLock,
      bloom: testData?.bloom,
      sectionSet: testData?.sectionSet.map((item) => ({
        questionNumbers: item.questionNumbers.map((i) => ({
          questionIndex: i.questionIndex,
          questionId: i.questionId,
        })),
        ...(testData?.testType === 3 && {
          sectionName: item.sectionName ?? "",
        }),
      })),
      questionSet:
        testData?.questionSet.map((item) => {
          const baseObj: any = {
            questionId: item.questionId,
            questionDisplayId: item.questionDisplayId,
            questionType: item.questionType,
            questionTypeLabel: item.questionTypeLabel,
            topicId: item.topicId,
            timeSpent: item.timeSpent,
            correctAnswerMarks: item.correctAnswerMarks,
            incorrectAnswerMarks: item.incorrectAnswerMarks,
            notAnswerMarks: item.notAnswerMarks,
            questionBody: item.questionBody,
            responseChoice: item.responseChoice.map((i) => ({
              responseId: i.responseId,
              responseText: i.responseText,
            })),
            backgroundImg: item.backgroundImg,
            cssName: item.cssName,
            studentResponse: questionResponseMap[item.questionId] || "",
          };

          if (testData?.testType === 3) {
            baseObj.sectionId = item.sectionId;
            baseObj.sectionName = item.sectionName;
            baseObj.sectionOrder = item.sectionOrder;
          } else {
            baseObj.bloomId = 0;
          }

          return baseObj;
        }) ?? [],
    },
  ];

  const { loginId, token } = studentData;

  const data = new FormData();
  data.append("courseId", String(activeCourse?.courseId));
  data.append("templateId", String(activeCourse?.templateId));
  data.append("testName", testData?.testName ?? "");
  data.append("testType", String(testData?.testType));
  data.append("testId", String(testData?.testId));
  data.append("testDetail", JSON.stringify(testDetail));
  data.append("helpCounter", "0");
  data.append("testMode", testMode);

  const res = await testStop({ data, loginId, token });
  if (!res) {
    console.log("Failed to submit test");
    return;
  }

  let returnPage = "";
  switch (testData?.testType) {
    case 1:
      returnPage = "/study-room/smart-learning";
      break;
    case 2:
      returnPage = "/exam-room/topic-test";
      break;
    case 3:
      returnPage = "/exam-room/mock-test";
      break;
    case 4:
      returnPage = "/exam-room/class-test";
      break;
  }

  navigate(returnPage);
};
