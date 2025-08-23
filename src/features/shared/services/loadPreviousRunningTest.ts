// Types
import type { PrevRunningTest } from "../types";
// Store
import { useStudentStore } from "../../store/useStudentStore";
// Apis
import { getTestCurrentRunning } from "../../study_room/smart_learning/api/testCurrentRunning.api";

/**
 * Retrieves the previous running test for the current student, or null if unavailable.
 */
export const loadPreviousRunningTest = async () => {
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
    })) as PrevRunningTest;

    return data ?? null;
  } catch (error) {
    console.error("Failed to load test current running:", error);
    return null;
  }
};
