// Types
import type { Topic } from "../../../shared/types";

// Hooks
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

/**
 * Loads the study material topic tree for the active student and course.
 */
export const loadStudyMaterialTopicTree = async () => {
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
      type: "topic",
      mode: 0,
      loginId,
      token,
      templateId,
    })) as Topic[];

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to load topic tree:", error);
    return null;
  }
};
