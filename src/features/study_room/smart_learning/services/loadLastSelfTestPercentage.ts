// Hooks
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Api
import { getLastSelfTestPercentage } from "../api/lastSelfTestPercentage.api";
import type { ModeType } from "../sl.types";

/**
 * Loads the last self-test percentage for a given topic for the current student.
 */
export const loadLastSelfTestPercentage = async (
  topicName: string,
  mode: ModeType
) => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  if (!studentData || !activeCourse) {
    return null;
  }

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) {
    return null;
  }

  setLoading(true);
  try {
    const data = await getLastSelfTestPercentage({
      loginId,
      token,
      templateId,
      topicName,
      mode,
    });

    if (!data) {
      return null;
    }
    return { percentage: data.percentage, barColor: data.barColor };
  } catch (error) {
    console.error("Failed to load last self test percentage:", error);
    return null;
  } finally {
    setLoading(false);
  }
};
