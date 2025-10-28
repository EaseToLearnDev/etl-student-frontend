import type { NavigateFunction } from "react-router";
import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import type { Course, CourseResponse } from "../../features/shared/types";
import { fetchMyCourses } from "../api/fetchMyCourses.api";

export const handleFetchMyCourses = async (navigate: NavigateFunction) => {
  try {
    const { studentData, setStudentData } = useStudentStore.getState();
    if (!studentData) return;

    const { loginId, token } = studentData;
    if (!loginId || !token) return;

    const data = await fetchMyCourses({ loginId, token });
    if (!data || !data?.obj || !data?.obj?.length) return;

    const courses: Course[] = data?.obj?.map((c: CourseResponse) => ({
      templateId: c.templateId,
      validityId: c.validityId,
      courseId: c.courseId,
      packTypeId: c.packTypeId,
      benchmark: c.benchmark,
      organisationName: c.organisationName,
      validTillDate: c.validTillDate,
      packTypeTitle: c.packTypeTitle,
      tabs: {
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
      },
    }));
    const openedCourse = courses?.length - 1;
    setStudentData({ ...studentData, courses, openedCourse });
    navigate("/dashboard");
  } catch (error: any) {
    console.log("Failed to handle fetch my courses:", error.message);
  }
};
