// Store
import { useStudentStore } from "../../../shared/store/useStudentStore";

// Apis
import { testRunningDelete } from "../api/testRunningDelete";

/**
 * Deletes the previous running test for the current student, if available.
 */
export const deletePreviousRunningTest = async () => {
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
