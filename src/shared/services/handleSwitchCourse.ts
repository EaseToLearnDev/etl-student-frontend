import type { NavigateFunction } from "react-router";
import { switchCourse } from "../api/switchCourse.api";
import { useStudentStore } from "../../features/store/useStudentStore";

export const handleSwitchCourse = async (
  navigate: NavigateFunction,
  selectedIndex: number
) => {
  const { studentData, setActiveCourse } = useStudentStore.getState();

  if (!studentData) {
    return;
  }

  const { loginId, token } = studentData;

  if (!loginId || !token) {
    return;
  }

  try {
    const data = await switchCourse({
      openedCourseIndex: selectedIndex,
      loginId,
      token,
    });

    if (data.responseTxt === "success") {
      setActiveCourse(selectedIndex);
    }
    navigate("/");
  } catch (error) {
    console.log("Failed to swtich course:", error);
  }
};
