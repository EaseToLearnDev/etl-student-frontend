// Types
import type { Topic } from "../../../shared/types";
import type { TopicContentType } from "../sm.types";

// Hooks
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Apis
import { getTopicContent } from "../api/topicContent.api";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";

/**
 * Loads the content for a given topic for the active student and course.
 */
export const loadTopicContent = async (topic: Topic) => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  if (!studentData || !activeCourse || !topic) {
    return null;
  }

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) {
    return null;
  }

  setLoading(true);
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
  } finally {
    setLoading(false);
  }
};
