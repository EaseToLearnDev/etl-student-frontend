// Types
import { Severity, type Error } from "../../shared/types";
import type {
  AssessmentMode,
  ExamType,
  PackTypeTitle,
  QuestionType,
  SearchFlag,
  TestConfig,
} from "../test_simulator.types";

// Interfaces
interface HandleTestConfigSetupParams {
  params: URLSearchParams;
}
interface HandleTestConfigSetupResponse {
  testConfig: TestConfig | null;
  error: Error | null;
}

/**
 * Sets up the test configuration from provided parameters.
 */
export const handleTestConfigSetup = ({
  params,
}: HandleTestConfigSetupParams): HandleTestConfigSetupResponse => {
  const testId = params.get("testId");
  const testType = params.get("testType");

  if (!testId || !testType) {
    return {
      testConfig: null,
      error: {
        message: "Internal Server Error",
        severity: Severity.Alert,
        id: "not_found",
      },
    };
  }

  return {
    testConfig: {
      testId: Number(testId),
      testType: Number(testType),
      testSession: params.get("testSession") ?? undefined,
      questionType: params.get("questionType") as QuestionType,
      totalQuestion: params.get("totalQuestion")
        ? Number(params.get("totalQuestion"))
        : undefined,
      totalTime: params.get("totalTime")
        ? Number(params.get("totalTime"))
        : undefined,
      marksCorrectAnswer: params.get("marksCorrectAnswer")
        ? Number(params.get("marksCorrectAnswer"))
        : undefined,
      marksIncorrectAnswer: params.get("marksIncorrectAnswer")
        ? Number(params.get("marksIncorrectAnswer"))
        : undefined,
      marksNotAttempted: params.get("marksNotAttempted")
        ? Number(params.get("marksNotAttempted"))
        : undefined,
      searchFlag: params.get("searchFlag") as SearchFlag,
      searchQuery: params.get("searchQuery") ?? undefined,
      topicId: params.get("topicId")
        ? Number(params.get("topicId"))
        : undefined,
      examType: params.get("examType") as ExamType,
      assessmentMode: params.get("assessmentMode") as AssessmentMode,
      packTypeTitle: params.get("packTypeTitle") as PackTypeTitle,
    },
    error: null,
  };
};
