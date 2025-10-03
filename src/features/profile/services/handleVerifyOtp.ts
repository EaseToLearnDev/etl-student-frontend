import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { useProfileStore } from "../hooks/useProfileStore";
import { handleStudentProfileVerifyOtp } from "./handleStudentProfileVerifyOtp";

export const handleVerifyOtp = async (otp: string) => {
  const {
    resToken,
    tokenIdentify,
    otpType,
    setShowOtpModal,
    setOtpError,
    verifiedFields,
    setVerifiedFields,
    emailId,
    phoneNo,
  } = useProfileStore.getState();
  const { studentData, setStudentData } = useStudentStore.getState();

  if (!resToken || !tokenIdentify || !studentData) return;

  try {
    const success = await handleStudentProfileVerifyOtp({
      otpForMobile: otpType === "Mobile" ? Number(otp) : undefined,
      otpForEmail: otpType === "Email" ? Number(otp) : undefined,
      resToken,
      tokenIdentify,
    });
    if (success) {
     
      if (otpType === "Email") {
        setVerifiedFields({ ...verifiedFields, emailId: "verified" });
      } else {
        setVerifiedFields({ ...verifiedFields, phoneNo: "verified" });
      }
      setShowOtpModal(false);
      setOtpError(null);
      if (otpType === "Email") {
        setStudentData({ ...studentData, emailId: emailId.data });
      } else {
        setStudentData({ ...studentData, phoneNo: phoneNo.data });
      }
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  } catch (err) {
    console.error("OTP verification failed:", err);
    setOtpError("Something went wrong. Please try again later.");
  }
};
