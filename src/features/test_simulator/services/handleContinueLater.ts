import { useStudentStore } from "../../shared/store/useStudentStore";
import { testStop } from "../api/testStop.api";
import useTestStore from "../store/useTestStore";

export const handleContinueLater = async () => {
  const { testData, questionResponseMap, testConfig } = useTestStore.getState();
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
    testName: testData?.testName,
    testType: testData?.testType,
    testId: testData?.testId,
    testDetail: [
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

              studentResponse:
                questionResponseMap[item.questionId]?.responseId || "",
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
    ],
    helpCounter: 0,
    testMode: testMode,
  };

  const { loginId, token } = studentData;

  const data = new FormData();
  data.append("teststop", JSON.stringify(obj));

  const res = await testStop({ data, loginId, token });
  if (!res) {
    return null;
  }

  return res;
};
