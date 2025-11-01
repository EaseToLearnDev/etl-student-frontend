// Types
import type { Topic } from "../../../shared/types";

// Hooks
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";

/**
 * Loads the smart learning topic tree for the current student.
 */
export const loadSmartLearningTopictree = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) return null;

  setLoading(true);
  try {
    const data = (await getTopicTreeView({
      type: "topic",
      mode: 0,
      loginId,
      token,
      templateId,
    })) as Topic[];

    return data ?? null;
  } catch (error) {
    console.error("Error loading smart learning topic tree:", error);
    return null;
  } finally {
    setLoading(false);
  }
};
