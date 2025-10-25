import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { selectMyCourse } from "../apis/selectMyCourse.api";

export const handleFreeCourse = (courseId: number) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  try {
    const res = selectMyCourse({ courseId, loginId, token });
    return res;
  } catch (error) {
    console.error("Failed to Fetch Selected Course: ", error);
    return null;
  }
};
