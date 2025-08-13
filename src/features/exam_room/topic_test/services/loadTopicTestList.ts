import { useStudentStore } from "../../../shared/store/useStudentStore";
import type { TopicTestType, TopicType } from "../../../shared/types";
import { getTopicTestList } from "../api/topicTestList.api";
import { useTTStore } from "../store/useTTStore";

export const loadTopicTestList = async (topic: TopicType) => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setTestList } = useTTStore.getState();

  if (!studentData || !activeCourse) {
    setTestList(null);
    return;
  }

  const { loginId, token  } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) {
    setTestList(null);
    return;
  }

  try {
    const list = (await getTopicTestList({
      topicId: topic.topicId,
      topicName: topic.topicName,
      loginId,
      token,
      templateId,
    })) as TopicTestType[];

    if (!list) {
      setTestList(null);
      return;
    }

    setTestList(list);
  } catch (error) {
    console.log("Failed to load topic test list: ", error);
    setTestList(null);
  }
};
