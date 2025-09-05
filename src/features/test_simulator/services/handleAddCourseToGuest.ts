import { useGuestStore } from "../../../global/hooks/useGuestStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { addCourseToGuest } from "../api/addCourseToguest.api";
import useTestStore from "../store/useTestStore";

export const handleAddCourseToGuest = async () => {
  const { studentData, setStudentData } = useStudentStore.getState();
  const { testConfig } = useTestStore.getState();
  const { setOpenCourseCardsModal } = useGuestStore.getState();

  if (!studentData) return null;
  if (!testConfig) return null;

  const { loginId, token } = studentData;
  const { courseId } = testConfig;

  if (!courseId) {
    // Courses Modal
    setOpenCourseCardsModal(true);
    return null;
  }
  try {
    const data = new FormData();
    data.append("courseId", String(courseId));
    const res = await addCourseToGuest({ data, loginId, token });
    if (res.responseTxt === "CourseAlreadyExists") {
      // Show Toast Here
      console.log("Course Already Exists");
    }
    setStudentData({
      ...studentData,
      courses: res.obj,
    });
    return res;
  } catch (error) {
    console.log("Error Adding Courses: ");
  }
};
