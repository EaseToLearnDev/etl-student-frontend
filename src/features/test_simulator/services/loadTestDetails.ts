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
import { adaptiveTestDetails } from "../api/adaptiveTestDetails.api";

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
        //  this is an object {courseId, list: []}
        if (guestData?.list?.[0]) {
          return {
            data: { ...guestData?.list?.[0], courseId: guestData?.courseId },
            error: null,
          };
        }
        return {
          data: null,
          error: { id: "failed", message: "Failed to load guest test" },
        };
      case "registered":
        if (!studentData || !activeCourse || !testConfig) return null;
        const packTypeTitle = activeCourse?.packTypeTitle as PackTypeTitle;
        const res = testConfig?.testSession
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
              loginId: studentData?.loginId,
              token: studentData?.token,
            });

        if (res.responseTxt.includes("Maximum number")) {
          return {
            data: null,
            error: { id: "limit_reached", message: res?.responseTxt },
          };
        }
        if (res.responseTxt.includes("No question")) {
          return {
            data: null,
            error: { id: "question_limit_reached", message: res?.responseTxt },
          };
        }
        if (res.responseTxt.includes("Internal")) {
          return {
            data: null,
            error: { id: "internal_server_error", message: res?.responseTxt },
          };
        }
        if (res?.obj?.[0]) {
          return { data: res?.obj?.[0], error: null };
        }
        return {
          data: null,
          error: { id: "failed", message: "Failed to load test" },
        };
      case "review":
        if (!studentData || !activeCourse || !testConfig) return null;
        const reviewData = testConfig?.testSession
          ? await testResultView({
              testSession: testConfig?.testSession,
              loginId: studentData?.loginId,
              token: studentData?.token,
            })
          : null;
        if (reviewData) {
          return { data: reviewData, error: null };
        }
        return {
          data: null,
          error: { id: "failed", message: "Failed to Load Reviews Data" },
        };
      case "adaptive":
        if (!studentData || !testConfig) return null;
        const adaptiveData = testConfig?.testSession
          ? await adaptiveTestDetails({
              testSession: testConfig?.testSession,
              loginId: studentData?.loginId,
              token: studentData?.token,
            })
          : null;
        if (adaptiveData) {
          return { data: adaptiveData?.obj[0], error: null };
        }
        return {
          data: null,
          error: { id: "failed", message: "Failed to load adaptive session" },
        };
    }
  } catch (error) {
    console.log("Failed to load test details:", error);
    return null;
  }
};
