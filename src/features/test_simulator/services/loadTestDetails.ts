// Types
import type {
  PackTypeTitle,
  SimulatorMode,
  TestConfig,
} from "../test_simulator.types";

// Store
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Apis
import { testDetailExisting } from "../api/testDetailExisting.api";
import { testDetails } from "../api/testDetails.api";
import guestTestDetails from "../api/guestTestDetails.api";
import { testResultView } from "../api/testResultView.api";

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
}: LoadTestDetailsParams) => {
  const { studentData, activeCourse } = useStudentStore.getState();

  try {
    switch (mode) {
      case "guest":
        const guestData = await guestTestDetails({
          ...testConfig,
        });
        return guestData ?? null;
      case "registered":
        if (!studentData || !activeCourse || !testConfig) return null;
        const packTypeTitle = activeCourse?.packTypeTitle as PackTypeTitle;
        const registeredData = testConfig?.testSession
          ? await testDetailExisting({
              testSession: testConfig?.testSession,
              templateId: activeCourse?.templateId,
              loginId: studentData?.loginId,
              token: studentData?.token,
            })
          : await testDetails({
              ...testConfig,
              templateId: activeCourse?.templateId,
              packTypeTitle,
              examType: "objective",
              loginId: studentData?.loginId,
              token: studentData?.token,
            });
        return registeredData ?? null;
      case "review":
        if (!studentData || !activeCourse || !testConfig) return null;
        const reviewData = testConfig?.testSession
          ? await testResultView({
              testSession: testConfig?.testSession,
              loginId: studentData?.loginId,
              token: studentData?.token,
            })
          : null;
        return reviewData;
    }
  } catch (error) {
    console.log("Failed to load test details:", error);
    return null;
  }
};
