// Store
import { useStudentStore } from "../../../shared/store/useStudentStore";

// Apis
import { testRunningDelete } from "../api/testRunningDelete";

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
