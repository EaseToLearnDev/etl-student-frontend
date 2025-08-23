// Types
import type { TopicTest, Topic } from "../../../shared/types";

// Store
import { useStudentStore } from "../../../store/useStudentStore";

// Apis
import { getTopicTestList } from "../api/topicTestList.api";

export const loadTopicTestList = async (topic: Topic) => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) return null;

  try {
    const list = (await getTopicTestList({
      topicId: topic.topicId,
      topicName: topic.topicName,
      loginId,
      token,
      templateId,
    })) as TopicTest[];

    return list ?? null;
  } catch (error) {
    console.log("Failed to load topic test list: ", error);
    return null;
  }
};
