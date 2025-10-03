import { studentProfileVerifyOtp } from "../api/studentProfileVerifyOtp.api";
import { useStudentStore } from "../../shared/hooks/useStudentStore";

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
    const result = await studentProfileVerifyOtp({
      resToken,
      tokenIdentify,
      otpForEmail,
      otpForMobile,
      studentId,
      loginId,
      token,
    });

    return result.responseTxt === "success";
  } catch (error) {
    console.error("Failed to verify OTP: ", error);
    return null;
  }
};
