// Hooks
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Api
import { getLastSelfTestPercentage } from "../api/lastSelfTestPercentage.api";

/**
 * Loads the last self-test percentage for a given topic for the current student.
 */
export const loadLastSelfTestPercentage = async (topicName: string) => {
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
    const percentage = await getLastSelfTestPercentage({
      loginId,
      token,
      templateId,
      topicName: topicName,
    });
    return percentage;
  } catch (error) {
    console.error("Failed to load last self test percentage:", error);
    return null;
  }
};
