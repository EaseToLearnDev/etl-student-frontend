// Types
import type { TopicType } from "../../../shared/types";


import { useStudentStore } from "../../../shared/store/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

export const loadStudyMaterialTopicTree = async () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) {
    return null;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

  if (!loginId || !token || !templateId) {
    return null;
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
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to load topic tree:", error);
    return null;
  }
};
