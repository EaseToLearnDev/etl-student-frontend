import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { categoryAndCourses } from "../apis/categoryAndCourses.api";

export const fetchCategoryAndCourses = () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token, deviceType } = studentData;

  try {
    const data = categoryAndCourses({ loginId, token, deviceType });
    return data ?? null;  
  } catch (error) {
    return null;
  }
};
