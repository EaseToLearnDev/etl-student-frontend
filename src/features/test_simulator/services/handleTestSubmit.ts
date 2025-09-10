import useTestStore from "../store/useTestStore";
import type {
  TestSubmitRequest,
  TestSubmitResponse,
} from "../test_simulator.types";
import { testSubmit } from "../api/testSubmit.api";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import type { NavigateFunction } from "react-router";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { ToastType } from "../../shared/types";

/**
 * Handles the submission of a test by collecting relevant test, student, and course data,
 */
export const handleTestSubmit = async (navigate: NavigateFunction) => {
  const { testData, testConfig, questionResponseMap } = useTestStore.getState();
  const { setToast } = useToastStore.getState();
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) return;

  const { loginId, token } = studentData;
  const { templateId } = activeCourse;

  if (!loginId || !templateId || !token) return;

  let testMode = "";

  if (testConfig?.assessmentMode && testConfig?.assessmentMode === "beginner") {
    testMode = "Learning Session";
  } else if (
    testConfig?.assessmentMode &&
    testConfig?.assessmentMode === "advance"
  ) {
    testMode = "Competitive Session";
  }
  const obj: Record<string, any> = {
    courseId: activeCourse?.courseId,
    templateId: activeCourse?.templateId,
    packTypeId: activeCourse?.packTypeId,
    packTypeTitle: activeCourse?.packTypeTitle,
    testId: testData?.testId,
    testType: testData?.testType,
    testOption: testData?.testOption,
    testMode: testMode,
    totalTime: testData?.totalTime,
    remainingTime: testData?.remainingTime,
    totalQuestion: testConfig?.totalQuestion ?? 0,
    testTitle: testData?.testName,
    bloom: testData?.bloom,
    questionSet:
      testData?.questionSet.map((item) => {
        const baseObj: any = {
          questionId: item.questionId,
          topicId: item.topicId,
          timeSpent: item.timeSpent,
          correctAnswerMarks: item.correctAnswerMarks,
          incorrectAnswerMarks: item.incorrectAnswerMarks,
          notAnswerMarks: item.notAnswerMarks,
          bloomId: 0,
          noQuestionAttempt: testData?.noQuestionAttempt ?? 0,
        };

        if (testData?.testType === 3) {
          baseObj.sectionId = item.sectionId;
          baseObj.sectionName = item.sectionName;
        } else {
          baseObj.studentResponse = questionResponseMap[item.questionId] || "";
        }

        return baseObj;
      }) ?? [],
    noQuestionAttempt: testData?.noQuestionAttempt ?? 0,
    helpCounter: 0,
  };
  const { schools } = studentData;
  if (schools && schools.length > 0) {
    if (
      schools[0] &&
      schools[0].admissionNumber &&
      schools[0].admissionNumber.length > 0
    ) {
      obj.admissionNumber = schools[0].admissionNumber;
    }
    if (schools[0] && schools[0].schoolId && schools[0].schoolId > 0) {
      obj.schoolId = schools[0].schoolId;
    }
    if (schools[0].schoolName != null && schools[0].schoolName.length > 0) {
      obj.schoolName = schools[0].schoolName;
    }
    if (schools[0].className != null && schools[0].className.length > 0) {
      obj.className = schools[0].className;
    }
  }
  if (testData?.scheduleId && testData?.scheduleId?.length > 0) {
    obj.scheduleId = testData.scheduleId;
  }
  if (testData?.subject && testData?.subject?.length > 0) {
    obj.subject = testData.subject;
  }

  const data = new FormData();
  data.append("ansdetails", JSON.stringify(obj as TestSubmitRequest));
  if (testConfig?.utmSource) {
    data.append("source", "guest");
  }

  const resData = (await testSubmit({
    data,
    loginId,
    token,
  })) as TestSubmitResponse;

  if (!resData || resData?.responseTxt !== "success") {
    console.log("Failed to submit test");
    setToast({
      title: "Something Went Wrong!",
      description: "Failed to submit test.",
      type: ToastType.DANGER,
    });
    return;
  }

  if (testData?.testType === 1) {
    navigate(
      `/learning-testanalytics?testSession=${resData?.obj?.testSession}`
    );
  } else {
    navigate(`/testanalytics?testSession=${resData?.obj?.testSession}`);
  }
};
