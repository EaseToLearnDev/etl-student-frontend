// Types
import type { TopicType } from "../../../shared/types";

// Store
import { useStudentStore } from "../../../shared/store/useStudentStore";
// import { useSLStore } from "../store/useSLStore";

// Apis
import { getTopicTreeView } from "../../../shared/apis/treeview.api";


export const loadSmartLearningTopictree = async () => {
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
      type: "learning",
      mode: 0,
      loginId,
      token,
      templateId,
    })) as TopicType[];
    console.log('data from service', data);

    if (!data) {
     return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to load topic tree:", error);
    return null;
  }
};