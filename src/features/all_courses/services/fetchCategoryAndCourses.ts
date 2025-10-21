import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { categoryAndCourses } from "../apis/categoryAndCourses.api";

export const fetchCategoryAndCourses = () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  try {
    const data = categoryAndCourses({ loginId, token });
    return data ?? null;  
  } catch (error) {
    return null;
  }
};
