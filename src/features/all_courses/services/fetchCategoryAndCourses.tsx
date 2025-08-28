import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { categoryAndCourses } from "../apis/categoryAndCourses.api";

export const fetchCategoryAndCourses = () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  try {
    const res = categoryAndCourses({ loginId, token });
    return res;
  } catch (error) {
    console.log("Failed to fetch Courses: ", error);
    return null;
  }
};
