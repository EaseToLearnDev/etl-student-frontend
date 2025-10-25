import useTestStore from "../store/useTestStore";
import {
  subjectiveTypes,
  type TestSubmitRequest,
  type TestSubmitResponse,
} from "../test_simulator.types";
import { testSubmit } from "../api/testSubmit.api";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import type { NavigateFunction } from "react-router";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { ToastType } from "../../shared/types";
import useTestTimerStore from "../store/useTestTimerStore";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { serializeStudentSubjectiveResponse } from "./studentResponseHandler";

/**
 * Handles the submission of a test by collecting relevant test, student, and course data,
 */
export const handleTestSubmit = async (navigate: NavigateFunction) => {
  const {
    testData,
    testConfig,
    questionResponseMap,
    questionTimeMap,
    helpCount,
  } = useTestStore.getState();
  const { setToast } = useToastStore.getState();
  const { timeSpent } = useTestTimerStore.getState();
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  if (!studentData || !activeCourse) return;

  const { loginId, token } = studentData;
  const { templateId } = activeCourse;

  if (!loginId || !templateId || !token) return;

  let testMode = "";

  setLoading(true);

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
    remainingTime: (testData?.remainingTime ?? 0) - timeSpent,
    totalQuestion: testData?.questionSet?.length ?? 0,
    testTitle: testData?.testName,
    bloom: testData?.bloom,
    modelTestId: testData?.modelTestId,
    questionSet:
      testData?.questionSet.map((item) => {
        const currentResponse = questionResponseMap[item.questionId];
        const baseObj: Record<string, any> = {
          itemId: item.itemId,
          questionId: item.questionId,
          topicId: item.topicId,
          timeSpent: questionTimeMap[item.questionId] || 0,
          correctAnswerMarks: item.correctAnswerMarks,
          incorrectAnswerMarks: item.incorrectAnswerMarks,
          notAnswerMarks: item.notAnswerMarks,
          bloomId: item?.bloomId ?? 0,
          noQuestionAttempt: item.noQuestionAttempt ?? 0,
          studentResponse: subjectiveTypes.includes(item?.questionType || "")
            ? serializeStudentSubjectiveResponse(currentResponse)
            : currentResponse.text.join("~") || "",
        };

        if (testData?.testType === 3) {
          baseObj.sectionId = item.sectionId;
          baseObj.sectionName = item.sectionName;
        }

        return baseObj;
      }) ?? [],
    noQuestionAttempt: testData?.noQuestionAttempt,
    helpCounter: helpCount,
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
    setToast({
      title: "Something Went Wrong!",
      description: "Failed to submit test.",
      type: ToastType.DANGER,
    });
    setLoading(false);
    return;
  }
  setLoading(false);

  // navigate to testview for subjective test
  if (testData?.testType === 1 && testConfig?.examType === "subjective") {
    navigate(`/testview?testSession=st${resData?.obj?.testSession}`);
    setToast({
      title: "Test Submit Successfully",
      type: ToastType.SUCCESS,
    });
  } else if (
    testData?.testType === 1 &&
    testConfig?.assessmentMode === "beginner" &&
    testConfig?.examType === "objective"
  ) {
    navigate(
      `/learning-testanalytics?testSession=${resData?.obj?.testSession}&testType=${testData.testType}`,
    );
    setToast({
      title: "Test Submit Successfully",
      type: ToastType.SUCCESS,
    });
  } else {
    navigate(`/testanalytics?testSession=${resData?.obj?.testSession}&testType=${testData?.testType}`);
    setToast({
      title: "Test Submit Successfully",
      type: ToastType.SUCCESS,
    });
  }
};
