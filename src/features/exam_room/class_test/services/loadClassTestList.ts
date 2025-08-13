import { useStudentStore } from "../../../shared/store/useStudentStore";
import { getClassTestList } from "../api/classTestList.api";
import type { ClassTestType } from "../classTest.types";
import { useCTStore } from "../store/useCTStore";

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
