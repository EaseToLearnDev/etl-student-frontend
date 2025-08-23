import { makeRequest } from "../../../utils/http";

interface StudentProfileVerifyOtpRequest {
  resToken: string;
  tokenIdentify: number;
  otpForEmail?: number;
  otpForMobile?: number;
  studentId: number;
  loginId: string;
  token: string;
}

export const studentProfileVerifyOtp = async ({
  resToken,
  tokenIdentify,
  otpForEmail,
  otpForMobile,
  studentId,
  loginId,
  token,
}: StudentProfileVerifyOtpRequest) => {
  const res = await makeRequest("post", "/student-profile/verify-otp", null, {
    params: {
      token: resToken,
      tokenIdentify: tokenIdentify,
      otpForEmail: otpForEmail,
      otpForMobile: otpForMobile,
      studentId: studentId,
    },
    header: {
      "Content-Type": "multipart/mixed",
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data ?? null;
};
