import { makeRequest } from "../../../utils/http";
import type { TestConfig } from "../test_simulator.types";

interface TestDetailsParams extends TestConfig {
  loginId: string;
  token: string;
}

export const testDetails = async ({
  templateId,
  classTestId,
  loginId,
  token,
  testId,
  testType,
  testSession,
  testUid,
  questionType,
  totalQuestion,
  totalTime,
  marksCorrectAnswer,
  marksIncorrectAnswer,
  marksNotAttempted,
  searchFlag,
  searchQuery,
  topicId,
  examType,
  packTypeTitle,
}: TestDetailsParams) => {
  try {
    const params: Record<string, any> = {};
    params.templateId = templateId;

    if (testId !== undefined) params.testId = testId;
    if (classTestId !== undefined) params.classTestId = classTestId;
    if (testType !== undefined) params.testType = testType;
    if (testSession !== undefined) params.testSession = testSession;
    if (testUid !== undefined) params.testUid = testUid;
    if (questionType !== undefined) params.questionType = questionType;
    if (totalQuestion !== undefined) params.totalQuestion = totalQuestion;
    if (totalTime !== undefined) params.totalTime = totalTime;
    if (marksCorrectAnswer !== undefined)
      params.marksCorrectAnswer = marksCorrectAnswer;
    if (marksIncorrectAnswer !== undefined)
      params.marksIncorrectAnswer = marksIncorrectAnswer;
    if (marksNotAttempted !== undefined)
      params.marksNotAttempted = marksNotAttempted;
    if (searchFlag !== undefined) params.searchFlag = searchFlag;
    if (searchQuery !== undefined) params.searchQuery = searchQuery;
    if (topicId !== undefined) params.topicId = topicId;
    if (examType !== undefined) params.examType = examType;
    if (packTypeTitle !== undefined) params.packTypeTitle = packTypeTitle;

    const res = await makeRequest("get", "/testdetails", null, {
      params,
      headers: {
        loginId,
        token,
        device: "web",
        "Content-Type": "multipart/mixed",
      },
    });

    return res?.data?.obj?.[0] ?? null;
  } catch (error) {
    console.log("Failed to call test api: ", error);
    return null;
  }
};

export default testDetails;
