// Types
import {
  Severity,
  type CourseType,
  type StudentDataResponseType,
  type StudentDataType,
} from "../../shared/types";

// Store
import { useLoginStore } from "./store/useLoginStore";
import { useStudentStore } from "../../shared/store/useStudentStore";

// Apis
import { LoginApi } from "./apis/login";
import type { NavigateFunction } from "react-router";

export const HandleLogin = async (navigate: NavigateFunction) => {
  const { email, password, setError, setLoading } = useLoginStore.getState();
  const { setStudentData } = useStudentStore.getState();
  try {
    validateCredentials(email, password);

    setError("", Severity.None);
    setLoading(true);

    const data: StudentDataResponseType = await LoginApi(email, password);

    setLoading(false);

    // Map courses
    const courses = data.courses.map((c) => {
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
      const course: CourseType = {
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

    const studentData: StudentDataType = {
      openedCourse: data.openedCourse,
      firstTimeUser: data.firstTimeUser,
      websiteId: data.websiteId,
      token: data.token,
      studentId: data.studentId,
      studentName: data.studentName,
      emailId: data.emailId,
      phoneNo: data.phoneNo,
      status: data.status,
      loginId: data.loginId,
      schools: data.schools,
      courses: courses,
      profilePic: data.profilePic,
      deleteFlag: data.deleteFlag
    };

    setStudentData(studentData);
    setError("Login Successful!", Severity.None);

    // Navigate to dashboard
    navigate("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "invalid_credentials") {
        setError("Invalid email or password", Severity.Alert);
        setLoading(false);
      }
      if (error.message === "invalid_email") {
        setError("Please enter your email address", Severity.Alert);
        setLoading(false);
      }
      if (error.message === "invalid_password") {
        setError("Please enter your password", Severity.Alert);
        setLoading(false);
      }
    }
    setStudentData(null);
  }
};

const validateCredentials = (email: string, password: string) => {
  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  const emailMatch = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    cleanEmail
  );

  if (!emailMatch || !emailMatch) {
    throw new Error("invalid_email");
  }

  if (!cleanPassword) {
    throw new Error("invalid_password");
  }
};
