// Types
import type { MockTestCategory } from "../../../shared/types";

// Store
import { useStudentStore } from "../../../store/useStudentStore";
import { useMTStore } from "../store/useMTStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

export const loadMockTestList = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setTestList } = useMTStore.getState();

  if (!studentData || !activeCourse) {
    setTestList(null);
    return;
  }

  const { loginId, token } = studentData;
  const templateId = activeCourse?.templateId;

  if (!loginId || !token || !templateId) {
    setTestList(null);
    return;
  }

  try {
    const list = (await getTopicTreeView({
      type: "mock",
      mode: 1,
      loginId,
      token,
      templateId,
    })) as MockTestCategory[];

    if (!list) {
      setTestList(null);
      return;
    }

    setTestList(list);
  } catch (error) {
    console.error("Failed to load mock test list:", error);
    setTestList(null);
  }
};
