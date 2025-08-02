import { useStudentStore } from "../../../shared/store/useStudentStore";
import { getTopicContent } from "../api/topicContent.api";
import { useSMStore } from "../store/useSMStore";

export const loadTopicContent = async () => {
  const { studentData } = useStudentStore.getState();
  const { selectedTopic, setTopicContentList } = useSMStore.getState();

  if (!studentData || !selectedTopic) {
    setTopicContentList(null);
    return;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

  if (!loginId || !token || !templateId) {
    setTopicContentList(null);
    return;
  }

  try {
    const list = await getTopicContent({
      loginId,
      token,
      templateId,
      topicId: selectedTopic.topicId,
      topicName: selectedTopic.topicName,
    });

    if (!list) {
      setTopicContentList(null);
      return;
    }
    setTopicContentList(list);
  } catch (error) {
    console.error("Failed to load topic content:", error);
    setTopicContentList(null);
  }
};