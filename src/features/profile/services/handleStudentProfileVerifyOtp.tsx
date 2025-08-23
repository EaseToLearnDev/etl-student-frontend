import { useStudentStore } from "../../shared/store/useStudentStore";
import { studentProfileVerifyOtp } from "../api/studentProfileVerifyOtp.api";

interface HandleStudentProfileVerifyOtpProps {
  otpForMobile?: number;
  otpForEmail?: number;
  resToken: string;
  tokenIdentify: number;
}

export const handleStudentProfileVerifyOtp = async ({
  otpForMobile,
  otpForEmail,
  resToken,
  tokenIdentify,
}: HandleStudentProfileVerifyOtpProps) => {
  const { studentData } = useStudentStore.getState();
  if (!studentData) return null;

  const { loginId, token, studentId } = studentData;

  try {
    const verification = await studentProfileVerifyOtp({
      resToken,
      tokenIdentify,
      otpForEmail,
      otpForMobile,
      studentId,
      loginId,
      token,
    });

    return verification.responseTxt === "success";
  } catch (error) {
    console.error("Failed to verify OTP: ", error);
    return null;
  }
};
