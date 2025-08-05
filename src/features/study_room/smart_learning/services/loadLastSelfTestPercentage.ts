import { useStudentStore } from "../../../shared/store/useStudentStore";
import { getLastSelfTestPercentage } from "../api/lastSelfTestPercentage.api";
// import { useSLStore } from "../store/useSLStore";

export const loadLastSelfTestPercentage = async (topicName: string) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData || !topicName) {
    return null;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

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
