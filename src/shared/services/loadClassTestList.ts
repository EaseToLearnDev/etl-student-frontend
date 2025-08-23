
// Types
import type { ClassTest } from "../types/classTest.types";

// Store
import { useStudentStore } from "../../features/store/useStudentStore";

// Apis
import { getClassTestList } from "../api/classTestList.api";

/**
 * Loads the list of class tests for the active student and course.
 */
export const loadClassTestList = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const courseId = activeCourse?.courseId;

  if (!loginId || !token || !courseId) return null;

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
  }
};
