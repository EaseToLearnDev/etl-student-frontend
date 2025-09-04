// Types
import type { SimulatorMode, TestConfig, TestData } from "../test_simulator.types";

// Store
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Apis
import { testDetailExisting } from "../api/testDetailExisting.api";
import { testDetails } from "../api/testDetails.api";

interface LoadTestDetailsParams {
  testConfig: TestConfig;
  mode: SimulatorMode;
}

/**
 * Loads test details for the current student and active course.
 */
export const loadTestDetails = async ({
  testConfig,
  mode,
}: LoadTestDetailsParams): Promise<TestData | null> => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse || !testConfig) return null;

  const { loginId, token } = studentData;
  const { templateId } = activeCourse;
  const { testSession } = testConfig;

  if (!loginId || !token || !templateId) return null;

  try {
  //   switch(mode) {
  //     case "guest":

  //       break
  //     case "registered":
  //       break
  //     case "review":
  //       break
  //   }
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
