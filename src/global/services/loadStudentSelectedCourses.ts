import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { studentSelectedCourses } from "../api/studentSelectedCourses.api";
import type { Course, CourseResponse } from "../../features/shared/types";

export const loadStudentSelectedCourses = async () => {
  try {
    const { studentData, setStudentData } = useStudentStore.getState();
    if (!studentData) return;

    const { loginId, token } = studentData;
    if (!loginId || !token) return;

    const data = await studentSelectedCourses({ loginId, token });
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
    setStudentData({ ...studentData, courses });
  } catch (error: any) {
    console.log("Failed to handle student selected courses:", error.message);
  }
};
