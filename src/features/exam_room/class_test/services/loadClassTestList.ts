import { useStudentStore } from "../../../shared/store/useStudentStore";
import { getClassTestList } from "../api/classTestList.api";
import type { ClassTestType } from "../classTest.types";
import { useCTStore } from "../store/useCTStore";

export const loadClassTestList = async () => {
  const { studentData } = useStudentStore.getState();
  const { setTestList } = useCTStore.getState();

  if (!studentData) {
    setTestList(null);
    return;
  }

  const { loginId, token, openedCourse, courses } = studentData;
  const courseId = courses?.[openedCourse]?.courseId;

  if (!loginId || !token || !courseId) {
    setTestList(null);
    return;
  }

  try {
    const list = await getClassTestList({
      courseId,
      loginId,
      token,
    }) as ClassTestType[];

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
