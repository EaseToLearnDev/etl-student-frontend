// Types
import type { Topic } from "../../../shared/types";

// Store
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

/**
 * Loads the topic tree for the active course and student.
 */
export const loadTopicTree = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) return null;

  const data = (await getTopicTreeView({
    type: "topic",
    mode: 0,
    loginId,
    token,
    templateId,
  })) as Topic[];

  return data ?? null;
};
