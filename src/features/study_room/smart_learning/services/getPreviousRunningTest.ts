// Types
import type { PreviousRunningTestType } from "../sl.types";

// Store
import { useStudentStore } from "../../../shared/store/useStudentStore";

// Apis
import { getTestCurrentRunning } from "../api/testCurrentRunning.api";

/**
 * Retrieves the previous running test for the current student, or null if unavailable.
 */
export const getPreviousRunningTest = async () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) {
    return null;
  }
  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

  if (!loginId || !token || !templateId) {
    return null;
  }

  try {
    const data = (await getTestCurrentRunning({
      loginId,
      token,
      templateId,
    })) as PreviousRunningTestType;

    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Failed to load test current running:", error);
    return null;
  }
};
