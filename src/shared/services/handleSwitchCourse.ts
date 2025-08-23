// Types
import type { NavigateFunction } from "react-router";

// Hooks
import { useStudentStore } from "../../features/shared/hooks/useStudentStore";

// Apis
import { switchCourse } from "../api/switchCourse.api";

interface HandleSwitchCourseParams {
  navigate: NavigateFunction;
  index: number;
}

/**
 * Handles switching the active course for the student and navigates to the home page.
 */
export const handleSwitchCourse = async ({
  navigate,
  index,
}: HandleSwitchCourseParams) => {
  const { studentData, setStudentData, setActiveCourse } =
    useStudentStore.getState();

  if (!studentData) {
    return;
  }

  const { loginId, token } = studentData;

  if (!loginId || !token) {
    return;
  }

  try {
    const data = await switchCourse({
      openedCourseIndex: index,
      loginId,
      token,
    });

    if (data.responseTxt === "success") {
      setActiveCourse(index);
      setStudentData({ ...studentData, openedCourse: index });
    }
    navigate("/");
  } catch (error) {
    console.log("Failed to swtich course:", error);
  }
};
