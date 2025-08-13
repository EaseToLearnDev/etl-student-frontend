// Types
import type { TopicType } from "../../../shared/types";

// Store
import { useStudentStore } from "../../../shared/store/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

/**
 * Loads the smart learning topic tree for the current student.
 */
export const loadSmartLearningTopictree = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) {
    return null;
  }

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) {
    return null;
  }

  try {
    const data = (await getTopicTreeView({
      type: "learning",
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
