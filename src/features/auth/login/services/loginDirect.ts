import Cookies from "js-cookie";

// Types
import type {
  Course,
  StudentData,
  StudentDataResponse,
} from "../../../shared/types";

import type { NavigateFunction } from "react-router";

// Hooks
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Apis
import { login } from "../apis/login";

export const loginDirect = async (
  params: URLSearchParams,
  navigate: NavigateFunction,
) => {
  const { setStudentData } = useStudentStore.getState();
  try {
    const token = params.get("token");
    const loginId = params.get("loginId");
    const studentId = params.get("studentId");
    const mobile = params.get("mobile");
    const deviceType = params.get("device_type");
    const redirectTo = params.get("redirectTo");

    const formData = new FormData();
    if (token) formData.append("token", token);
    if (loginId) formData.append("loginId", loginId);
    if (studentId) formData.append("studentId", studentId);
    if (mobile) formData.append("mobile", mobile);
    formData.append("device", "web");

    const data: StudentDataResponse = await login(formData);

    Cookies.set(
      "accountDetails",
      JSON.stringify({
        sid: data?.studentId,
        studentId: data?.studentId,
        loginId: data?.loginId,
        token: data?.token,
        studentName: data?.studentName ?? "",
        mobile: data?.phoneNo ?? "",
        email: data?.emailId ?? "",
      }),
    );
    Cookies.set("token", data?.token);

    let courses: Course[] = [];
    if (data?.courses && data?.courses?.length > 0) {
      courses = data.courses.map((c) => {
        const tabs: Record<string, boolean> = {
          dashboard: !!c.dashboard,
          report: !!c.report,
          studyMaterial: !!c.studyMaterial,
          selfTest: !!c.selfTest,
          topicTest: !!c.topicTest,
          mockTest: !!c.mockTest,
          dynamicMockTest: !!c.dynamicMockTest,
          classTest: !!c.classTest,
          teacherHelp: !!c.teacherHelpcourse,
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
    }

    const studentData: StudentData = {
      openedCourse: data?.openedCourse ?? 0,
      firstTimeUser: data.firstTimeUser,
      websiteId: data.websiteId,
      token: data.token,
      studentId: data.studentId,
      studentName: data?.studentName ?? "",
      emailId: data?.emailId ?? "",
      phoneNo: data?.phoneNo ?? "",
      status: data?.status,
      loginId: data?.loginId,
      schools: data.schools,
      profilePic: data.profilePic,
      deleteFlag: data.deleteFlag,
    };
    if (deviceType && deviceType.length > 0) {
      studentData.deviceType = deviceType;
    } else {
      studentData.deviceType = "android";
    }

    if (courses.length > 0) {
      studentData.courses = courses;
      if (redirectTo && redirectTo?.length > 0) {
        navigate(decodeURIComponent(redirectTo));
      } else {
        navigate(`/dashboard?ftu=${data.firstTimeUser}`);
      }
    } else {
      navigate("/selectyourcourse");
    }

    setStudentData(studentData);
  } catch (error: any) {
    console.log("Failed to handle logindirect: ", error);
    if (error.message === "invalid_credentials") {
      navigate("/login");
    }
  }
};
