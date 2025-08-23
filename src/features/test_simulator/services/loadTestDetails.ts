// Types
import type { TestConfig, TestData } from "../test_simulator.types";

// Store
import { useStudentStore } from "../../store/useStudentStore";

// Apis
import { testDetailExisting } from "../api/testDetailExisting.api";
import { testDetails } from "../api/testDetails.api";

interface LoadTestDetailsParams {
  testConfig: TestConfig;
}
export const loadTestDetails = async ({
  testConfig,
}: LoadTestDetailsParams): Promise<TestData | null> => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse || !testConfig) return null;

  const { loginId, token } = studentData;
  const { templateId } = activeCourse;
  const { testSession } = testConfig;

  if (!loginId || !token || !templateId) return null;

  try {
    const data: TestData[] = testSession
      ? await testDetailExisting({ testSession, templateId, loginId, token })
      : await testDetails({
          testConfig: { ...testConfig, assessmentMode: undefined },
          templateId,
          loginId,
          token,
        });

    return data?.[0] ?? null;
  } catch (error) {
    console.log("Failed to load test details:", error);
    return null;
  }
};
