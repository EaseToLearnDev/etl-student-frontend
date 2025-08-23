import { useStudentStore } from "../../../store/useStudentStore";
import type { Topic } from "../../../shared/types";
import { getTopicContent } from "../api/topicContent.api";
import type { TopicContentType } from "../sm.types";

export const loadTopicContent = async (topic: Topic) => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse || !topic) {
    return null;
  }

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) {
    return null;
  }

  try {
    const list = (await getTopicContent({
      loginId,
      token,
      templateId,
      topicId: topic?.topicId,
      topicName: topic?.topicName,
    })) as TopicContentType[];

    if (!list) {
      return null;
    }
    return list;
  } catch (error) {
    console.error("Failed to load topic content:", error);
    return null;
  }
};
