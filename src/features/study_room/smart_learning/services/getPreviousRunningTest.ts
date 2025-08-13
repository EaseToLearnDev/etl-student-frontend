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
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) {
    return null;
  }
  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

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
