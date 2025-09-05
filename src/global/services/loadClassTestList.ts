
// Types
import type { ClassTest } from "../types/classTest.types";

// Store
import { useStudentStore } from "../../features/shared/hooks/useStudentStore";

// Apis
import { getClassTestList } from "../api/classTestList.api";
import { useLoadingStore } from "../../hooks/useLoadingStore";

/**
 * Loads the list of class tests for the active student and course.
 */
export const loadClassTestList = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const {setLoading} = useLoadingStore.getState();

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const courseId = activeCourse?.courseId;

  if (!loginId || !token || !courseId) return null;

  setLoading(true);
  try {
    const list = (await getClassTestList({
      courseId,
      loginId,
      token,
    })) as ClassTest[];

    return list ?? null;
  } catch (error) {
    console.log("Failed to load class tests: ", error);
    return null;
  } finally {
    setLoading(false);
  }
};
