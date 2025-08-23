import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { verifyOtpDeleteStudentRequest } from "../api/verifyOtpDeleteStudentRequest.api";

interface HandleVerifyOtpACcountDeleteRequestProps {
   deleteAccountToken: string;
   otp: string;
}

export const handleVerifyOtpAccountDeleteRequest =  ({
  deleteAccountToken,
  otp,
}: HandleVerifyOtpACcountDeleteRequestProps) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  try {
    const data = new FormData();
    data.append("token", deleteAccountToken);
    data.append("otpNumber", otp);

    const res = verifyOtpDeleteStudentRequest({ data, loginId, token });
    return res;
  } catch (error) {
    console.log("Failed to Delete Account: ", error);
    return null;
  }
};
