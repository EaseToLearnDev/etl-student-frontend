// Types
import type { TopicType } from "../../../shared/types";

// Store
import { useSMStore } from "../store/useSMStore";
import { useStudentStore } from "../../../shared/store/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";


export const loadStudyMaterialTopicTree = async () => {
  const { studentData } = useStudentStore.getState();
  const { setTopicTree } = useSMStore.getState();

  if (!studentData) {
    setTopicTree(null);
    return;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

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