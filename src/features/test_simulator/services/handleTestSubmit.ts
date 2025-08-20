import useTestStore from "../store/useTestStore";
import { useStudentStore } from "../../shared/store/useStudentStore";
import type { TestSubmitRequest } from "../test_simulator.types";
import { testSubmit } from "../api/testSubmit.api";

export const handleTestSubmit = () => {
  const { testData, testConfig, questionResponseMap } = useTestStore.getState();
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData) {
    return null;
  }

  let testMode = "";
  
  if (testConfig?.assessmentMode && testConfig?.assessmentMode === "beginner") {
    testMode = "Learning Session";
  } else if (
    testConfig?.assessmentMode &&
    testConfig?.assessmentMode === "advance"
  ) {
    testMode = "Competitive Session";
  }

  const obj = {
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
          baseObj.studentResponse =
            questionResponseMap[item.questionId]?.responseId || "";
        }

        return baseObj;
      }) ?? [],
    noQuestionAttempt: testData?.noQuestionAttempt ?? 0,
    schoolId: studentData?.schools[0].schoolId,
    schoolName: studentData?.schools[0].schoolName,
    className: studentData?.schools[0].className,
    helpCounter: 0,
  };

  const { loginId, token } = studentData;

  const data = new FormData();
  data.append("ansdetails", JSON.stringify(obj as TestSubmitRequest));

  const res = testSubmit({ data, loginId, token });
  if (!res) {
    return null;
  }

  return res;
};
