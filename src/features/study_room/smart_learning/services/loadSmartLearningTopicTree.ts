// Types
import type { Topic } from "../../../shared/types";

// Store
import { useStudentStore } from "../../../store/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

/**
 * Loads the smart learning topic tree for the current student.
 */
export const loadSmartLearningTopictree = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) return null;

  const data = (await getTopicTreeView({
    type: "learning",
    mode: 0,
    loginId,
    token,
    templateId,
  })) as Topic[];

  return data ?? null;
};
