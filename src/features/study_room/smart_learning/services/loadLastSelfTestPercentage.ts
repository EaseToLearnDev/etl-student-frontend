import { useStudentStore } from "../../../shared/store/useStudentStore";
import { getLastSelfTestPercentage } from "../api/lastSelfTestPercentage.api";
import { useSMStore } from "../../study_material/store/useSMStore";

export const loadLastSelfTestPercentage = async () => {
  const { studentData } = useStudentStore.getState();
  const { selectedTopic, setLastSelfTestPercentage } = useSMStore.getState();

  if (!studentData || !selectedTopic) {
    setLastSelfTestPercentage(null);
    return;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

  if (!loginId || !token || !templateId) {
    setLastSelfTestPercentage(null);
    return;
  }

  try { 
    const percentage = await getLastSelfTestPercentage({
      loginId,
      token,
      templateId,
      topicName: selectedTopic.topicName,
    });
    setLastSelfTestPercentage(percentage);
  } catch (error) {
    console.error("Failed to load last self test percentage:", error);
    setLastSelfTestPercentage(null);
  }
};
