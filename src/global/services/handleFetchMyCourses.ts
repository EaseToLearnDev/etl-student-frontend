// Types
import type { NavigateFunction } from "react-router";

// Apis
import { fetchMyCourses } from "../api/fetchMyCourses.api";

// Hooks
import { useStudentStore } from "../../features/shared/hooks/useStudentStore";

// Services
import { generateCoursesData } from "../../features/shared/services/generateCoursesData";

export const handleFetchMyCourses = async (navigate: NavigateFunction) => {
  try {
    const { studentData, setStudentData } = useStudentStore.getState();
    if (!studentData) return;

    const { loginId, token } = studentData;
    if (!loginId || !token) return;

    const data = await fetchMyCourses({ loginId, token });
    if (!data || !data?.obj || !data?.obj?.length) return;

    const courses = generateCoursesData(data?.obj);
    const openedCourse = courses?.length - 1;
    setStudentData({ ...studentData, courses, openedCourse });
    navigate("/dashboard");
  } catch (error: any) {
    console.log("Failed to handle fetch my courses:", error.message);
  }
};
