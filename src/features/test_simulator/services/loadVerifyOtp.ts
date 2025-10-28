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
  const { setStudentData } = useStudentStore.getState();

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
      return null;
    }

    const responseData: StudentDataResponse = res.obj;
    const studentData: StudentData = {
      openedCourse: responseData.openedCourse,
      firstTimeUser: responseData.firstTimeUser,
      websiteId: responseData.websiteId,
      token: responseData.token,
      studentId: responseData.studentId,
      studentName: responseData.studentName,
      emailId: responseData.emailId,
      phoneNo: responseData.phoneNo,
      status: responseData.status,
      loginId: responseData.loginId,
      schools: responseData.schools,
      courses: [],
      profilePic: responseData.profilePic,
      deleteFlag: responseData.deleteFlag,
    };

    setStudentData(studentData);
  } catch (error) {
    console.log("Error Submitting Test: ", error);
    return null;
  }
};
