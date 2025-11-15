// Hooks
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Apis
import { testRunningDelete } from "../../study_room/shared/api/testRunningDelete";

/**
 * Deletes the previous running test for the current student, if available.
 */
export const deletePreviousRunningTest = async () => {
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
    const data = await testRunningDelete({
      loginId,
      token,
      templateId,
    });
    return data;
  } catch (error) {
    console.error("Failed to load test current running:", error);
    return null;
  }
};
