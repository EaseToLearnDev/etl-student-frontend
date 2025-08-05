import { useStudentStore } from "../../../shared/store/useStudentStore";
import type { TopicType } from "../../../shared/types";
import { getTopicContent } from "../api/topicContent.api";
import type { TopicContentType } from "../sm.types";

export const loadTopicContent = async (topic: TopicType) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData || !topic) {
    return null;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

  if (!loginId || !token || !templateId) {
    return null;
  }

  try {
    const list = await getTopicContent({
      loginId,
      token,
      templateId,
      topicId: topic?.topicId,
      topicName: topic?.topicName,
    }) as TopicContentType[];

    if (!list) {
      return null;
    }
    return list;
  } catch (error) {
    console.error("Failed to load topic content:", error);
    return null;
  }
};