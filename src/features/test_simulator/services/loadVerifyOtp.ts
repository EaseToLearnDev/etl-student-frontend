import { useGuestStore } from "../../../global/hooks/useGuestStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import type {
  Course,
  StudentData,
  StudentDataResponse,
} from "../../shared/types";
import { guestVerifyOtpSignup } from "../api/guestVerifyOtpSignup.api";

interface LoadVerifyOtpProps {
  courseUrl: string;
  utmSource: string;
  otp: string;
}

export const loadVerifyOtp = async ({
  courseUrl,
  utmSource,
  otp,
}: LoadVerifyOtpProps) => {
  const { token, name, email, setError } = useGuestStore.getState();
  const { setStudentData, setShowFtuModal } = useStudentStore.getState();

  try {
    const data = new FormData();
    data.append("otpNumber", otp);
    data.append("token", token);
    data.append("studentName", name);
    data.append("email", email);
    data.append("courseUrl", courseUrl ?? "");
    if (utmSource) {
      data.append("source", utmSource);
    } else {
      data.append("source", "Guest Mock Test");
    }
    data.append("device", "web");

    const res = await guestVerifyOtpSignup(data);

    if (res.responseTxt === "invalid_otp") {
      setError("Invalid Otp");
      return res;
    }

    const courses: Course[] = res.obj.courses.map((c: any) => {
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

    const responseData: StudentDataResponse = res.obj;
    const studentData: StudentData = {
      openedCourse: responseData?.openedCourse,
      firstTimeUser: responseData?.firstTimeUser,
      websiteId: responseData?.websiteId,
      token: responseData?.token,
      studentId: responseData?.studentId,
      studentName: responseData?.studentName,
      emailId: responseData?.emailId,
      phoneNo: responseData?.phoneNo,
      status: responseData?.status,
      loginId: responseData?.loginId,
      schools: responseData?.schools || [],
      courses: courses,
      profilePic: responseData?.profilePic,
      deleteFlag: responseData?.deleteFlag,
    };

    setStudentData(studentData);
    setShowFtuModal(responseData?.firstTimeUser === 1);

    return res;
  } catch (error) {
    console.log("Error Submitting Test: ", error);
    return null;
  }
};
