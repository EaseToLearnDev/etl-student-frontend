import { useProfileStore } from "../hooks/useProfileStore";
import { handleStudentProfileVerifyOtp } from "./handleStudentProfileVerifyOtp";

export const handleVerifyOtp = async (otp: string) => {
    const {resToken, tokenIdentify, otpType, setIsVerified, setShowOtpModal, setOtpError} = useProfileStore.getState()

  if (!resToken || !tokenIdentify) return;
  try {
    const verification = await handleStudentProfileVerifyOtp({
      otpForMobile: otpType === "Mobile" ? Number(otp) : undefined,
      otpForEmail: otpType === "Email" ? Number(otp) : undefined,
      resToken,
      tokenIdentify,
    });
    if (verification) {
      setIsVerified(true);
      setShowOtpModal(false);
      setOtpError(null);
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  } catch (err) {
    console.error("OTP verification failed:", err);
    setOtpError("Something went wrong. Please try again later.");
  }
};
