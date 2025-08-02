// Types
import type { MockTestCategoryType } from "../../../shared/types";

// Store
import { useStudentStore } from "../../../shared/store/useStudentStore";
import { useMTStore } from "../store/useMTStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";

export const loadMockTestList = async () => {
  const { studentData } = useStudentStore.getState();
  const { setTestList } = useMTStore.getState();

  if (!studentData) {
    setTestList(null);
    return;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const templateId = courses?.[openedCourse]?.templateId;

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
    })) as MockTestCategoryType[];
    
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
