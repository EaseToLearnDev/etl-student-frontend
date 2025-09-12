// import { useGuestStore } from "../../../global/hooks/useGuestStore";
import { useGuestStore } from "../../../global/hooks/useGuestStore";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { ToastType, type Course } from "../../shared/types";
import { addCourseToGuest } from "../api/addCourseToGuest.api";
import useTestStore from "../store/useTestStore";

export const handleAddCourseToGuest = async () => {
  const { studentData, setStudentData } = useStudentStore.getState();
  const { testData } = useTestStore.getState();
  // const { setOpenCourseCardsModal } = useGuestStore.getState();
  const { setToast } = useToastStore.getState();
  const { reset } = useGuestStore.getState();

  if (!studentData) return null;
  if (!testData) return null;

  const { loginId, token } = studentData;
  const { courseId } = testData;

  // if (!courseId) {
  //   // Courses Modal
  //   console.log("no course Id");
  //   setOpenCourseCardsModal(true);
  //   return null;
  // }
  try {
    const data = new FormData();
    data.append("courseId", String(courseId));
    const res = await addCourseToGuest({ data, loginId, token });
    if (res.responseTxt === "CourseAlreadyExists") {
      setToast({
        title: "You have already attempted free trail test",
        description: "You must Upgrade your account to give more tests",
        button: "Upgrade",
        type: ToastType.PATCH,
        duration: 10000,
      });
      reset();
      return;
    }
    if (res.responseTxt === "success") {
      const courses = res.obj.map((c: any) => {
        const tabs: Record<string, boolean> = {
          dashboard: !!c.dashboard,
          report: !!c.report,
          studyMaterial: !!c.studyMaterial,
          selfTest: !!c.selfTest,
          topicTest: !!c.topicTest,
          mockTest: !!c.mockTest,
          dynamicMockTest: !!c.dynamicMockTest,
          classTest: !!c.classTest,
          teacherHelp: !!c.teacherHelp,
          tonyHelp: !!c.tonyHelp,
          otherCourses: !!c.otherCourses,
        };
        const course: Course = {
          templateId: c.templateId,
          validityId: c.validityId,
          courseId: c.courseId,
          packTypeId: c.packTypeId,
          benchmark: c.benchmark,
          organisationName: c.organisationName,
          validTillDate: c.validTillDate,
          packTypeTitle: c.packTypeTitle,
          tabs: tabs,
        };
        return course;
      });

      setStudentData({
        ...studentData,
        courses: courses,
      });
      return res;
    }
  } catch (error) {
    console.log("Error Adding Courses: ");
    return null
  }
};
