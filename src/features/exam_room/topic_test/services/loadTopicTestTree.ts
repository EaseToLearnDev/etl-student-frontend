// Types
import type { TopicType } from "../../../shared/types";

// Store
import { useTTStore } from "../store/useTTStore";
import { useStudentStore } from "../../../shared/store/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

export const loadTopicTestTree = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setTopicTree } = useTTStore.getState();

  if (!studentData || !activeCourse) {
    setTopicTree(null);
    return;
  }

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) {
    setTopicTree(null);
    return;
  }

  try {
    const data = (await getTopicTreeView({
      type: "topic",
      mode: 0,
      loginId,
      token,
      templateId,
    })) as TopicType[];

    if (!data) {
      setTopicTree(null);
      return;
    }

    setTopicTree(data);
  } catch (error) {
    console.error("Failed to load topic tree:", error);
    setTopicTree(null);
  }
};
