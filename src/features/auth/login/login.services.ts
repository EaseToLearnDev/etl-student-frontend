import Cookies from "js-cookie";
// Types
import {
  Severity,
  type Course,
  type StudentDataResponse,
  type StudentData,
} from "../../shared/types";

// Store
import { useLoginStore } from "./hooks/useLoginStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Apis
import { login } from "./apis/login";
import { type NavigateFunction } from "react-router-dom";
import { verifyMobileSendOtp } from "./apis/verifyMobileSendOtp";
import { verifyOtpLogin } from "./apis/verifyOtpLogin";

export const HandleLogin = async (
  navigate: NavigateFunction,
  loginWith: string,
  deviceType: string | null
) => {
  const { userId, password, setError, setLoading, setToken } =
    useLoginStore.getState();
  const { setStudentData } = useStudentStore.getState();
  if (loginWith === "password") {
    try {
      // validateCredentials(email, password);

      setError("", Severity.None);
      setLoading(true);

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("password", password);
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
        })
      );
      Cookies.set("token", `"${data?.token}"`);

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

      const studentData: StudentData = {
        openedCourse: data.openedCourse,
        firstTimeUser: data.firstTimeUser,
        websiteId: data.websiteId,
        token: data.token,
        studentId: data.studentId,
        studentName: data?.studentName ?? "",
        emailId: data?.emailId ?? "",
        phoneNo: data?.phoneNo ?? "",
        status: data?.status,
        loginId: data?.loginId,
        schools: data?.schools,
        courses: courses,
        profilePic: data?.profilePic ?? "",
        deleteFlag: data?.deleteFlag
      };

      if (deviceType && deviceType.length > 0) {
        studentData.deviceType = deviceType;
      } else {
        studentData.deviceType = "android";
      }

      setStudentData(studentData);

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
  } else {
    setError("", Severity.None);
    setLoading(true);
    try {
      const res = await verifyMobileSendOtp(userId);
      if (res?.responseTxt === "sent_otp") {
        setToken(res?.obj?.token);
      } else if (res?.responseTxt === "mobile_not_exists") {
        setError("Invalid Number", Severity.Alert);
        setStudentData(null);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.", Severity.Alert);
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  }
};

export const handleVerifyOtp = async (otp: string) => {
  const { token, setError } = useLoginStore.getState();
  const { setStudentData } = useStudentStore.getState();
  if (!token) {
    setError("Invalid Number", Severity.Alert);
    return;
  }
  try {
    const res: StudentDataResponse = await verifyOtpLogin(otp, token);

        Cookies.set(
        "accountDetails",
        JSON.stringify({
          sid: res?.studentId,
          studentId: res?.studentId,
          loginId: res?.loginId,
          token: res?.token,
          studentName: res?.studentName ?? "",
          mobile: res?.phoneNo ?? "",
          email: res?.emailId ?? "",
        })
      );
      Cookies.set("token", `"${res?.token}"`);



    const courses = res.courses.map((c) => {
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

    const studentData: StudentData = {
      openedCourse: res.openedCourse,
      firstTimeUser: res.firstTimeUser,
      websiteId: res.websiteId,
      token: res.token,
      studentId: res.studentId,
      studentName: res?.studentName ?? "",
      emailId: res?.emailId ?? "",
      phoneNo: res?.phoneNo ?? "",
      status: res.status,
      loginId: res.loginId,
      schools: res.schools,
      courses: courses,
      profilePic: res.profilePic,
      deleteFlag: res.deleteFlag,
    };

    setStudentData(studentData);
    setError("Login Successful!", Severity.None);
  } catch (error) {
    console.log("verification :", error);
    setError("Invalid Otp Number", Severity.Alert);
    setStudentData(null);
  }
};
