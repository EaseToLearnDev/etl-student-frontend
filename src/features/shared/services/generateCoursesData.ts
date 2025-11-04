import type { Course, CourseResponse, Option } from "../types";

export const generateCoursesData = (
  courseResponseArr: Option<CourseResponse[]>
): Course[] => {
  let formattedCourses: Course[] = [];
  if (courseResponseArr && courseResponseArr?.length > 0) {
    formattedCourses = courseResponseArr?.map((c) => {
      const tabs: Record<string, boolean> = {
        dashboard: !!c.dashboard,
        report: !!c.report,
        studyMaterial: !!c.studyMaterial,
        selfTest: !!c.selfTest,
        topicTest: !!c.topicTest,
        adaptiveLearning: !!c.adaptiveLearning,
        adaptiveAssess: !!c.adaptiveAssess,
        mockTest: !!c.mockTest,
        dynamicMockTest: !!c.dynamicMockTest,
        classTest: !!c.classTest,
        teacherHelp: !!c.teacherHelpcourse,
        tonyHelp: !!c.tonyHelp,
        otherCourses: !!c.otherCourses,
      };
      const course: Course = {
        ...c,
        tabs: tabs,
      };
      return course;
    });
  }
  return formattedCourses;
};
