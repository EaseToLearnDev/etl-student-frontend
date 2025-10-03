// Hooks
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import useTestStore from "../store/useTestStore";

// Apis
import { testStop } from "../api/testStop.api";
import type { NavigateFunction } from "react-router";
import useTestTimerStore from "../store/useTestTimerStore";
import { QuestionStatusReverseMap } from "../test_simulator.types";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { ToastType } from "../../shared/types";

/**
 * Handles the logic for continuing the test session later by saving the current test state.
 */
export const handleContinueLater = async (navigate: NavigateFunction) => {
  const {
    testData,
    questionResponseMap,
    questionStatusMap,
    testConfig,
    questionTimeMap,
    helpCount,
  } = useTestStore.getState();
  const { studentData, activeCourse } = useStudentStore.getState();
  const { timeSpent } = useTestTimerStore.getState();
  const { setToast } = useToastStore.getState();
  const currentQuestionIndex = useTestStore
    .getState()
    .getCurrentQuestionIndex();

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
      remainingTime: (testData?.remainingTime ?? 0) - timeSpent,
      lastQuestionIndex: currentQuestionIndex,
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
            timeSpent: questionTimeMap[item.questionId] || 0,
            studentResponse: questionResponseMap[item.questionId].join("~"),
            correctAnswerMarks: item.correctAnswerMarks,
            incorrectAnswerMarks: item.incorrectAnswerMarks,
            notAnswerMarks: item.notAnswerMarks,
            backgroundImg:
              QuestionStatusReverseMap[questionStatusMap[item.questionId]] ??
              item.backgroundImg,
            cssName: item.cssName,
          };

          if (testData?.testType === 3) {
            baseObj.sectionId = item.sectionId;
            baseObj.sectionName = item.sectionName;
            baseObj.sectionOrder = item.sectionOrder;
            baseObj.sectionTime = item.sectionTime;
            baseObj.commonDataDescription = "";
            baseObj.questionBody = "";
            baseObj.columns = [];
            baseObj.responseChoice = [];
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
  data.append("helpCounter", String(helpCount));
  data.append("testMode", testMode);

  const res = await testStop({ data, loginId, token });
  if (!res) {
    console.log("Failed to submit test");
    setToast({
      title: "Failed to Submit Continue Test",
      type: ToastType.DANGER,
    });
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

  setToast({
    title: "Saved your progress",
    description: "Pick up where you left off anytime.",
    type: ToastType.PRIMARY,
  });
  navigate(returnPage);
};
