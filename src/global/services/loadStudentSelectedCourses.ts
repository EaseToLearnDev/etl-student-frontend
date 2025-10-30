// Apis
import { studentSelectedCourses } from "../api/studentSelectedCourses.api";

// Hooks
import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { generateCoursesData } from "../../features/shared/services/generateCoursesData";

/**
 * Loads student purchased/taken courses
 */
export const loadStudentSelectedCourses = async () => {
  try {
    const { studentData, setStudentData } = useStudentStore.getState();
    if (!studentData) return;

    const { loginId, token } = studentData;
    if (!loginId || !token) return;

    const data = await studentSelectedCourses({ loginId, token });
    if (!data || !data?.obj || !data?.obj?.length) return;

    const courses = generateCoursesData(data?.obj);
    setStudentData({ ...studentData, courses });
  } catch (error: any) {
    console.log("Failed to handle student selected courses:", error.message);
  }
};
