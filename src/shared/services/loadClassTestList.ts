
// Types
import type { ClassTestType } from "../types/classTest.types";

// Store
import { useStudentStore } from "../../features/shared/store/useStudentStore";
import { useCTStore } from "../hooks/useCTStore";

// Apis
import { getClassTestList } from "../api/classTestList.api";


/**
 * Loads the list of class tests for the active student and course.
 */
export const loadClassTestList = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setTestList } = useCTStore.getState();

  if (!studentData || !activeCourse) {
    setTestList(null);
    return;
  }

  const { loginId, token } = studentData;
  const courseId = activeCourse?.courseId;

  if (!loginId || !token || !courseId) {
    setTestList(null);
    return;
  }

  try {
    const list = (await getClassTestList({
      courseId,
      loginId,
      token,
    })) as ClassTestType[];

    if (!list) {
      setTestList(null);
      return;
    }
    setTestList(list);
  } catch (error) {
    console.log("Failed to load class tests: ", error);
    setTestList(null);
  }
};
