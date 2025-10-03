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
  const data = new FormData();
  data.append("studentId", String(studentId));
  data.append("token", resToken);
  data.append("tokenIdentify", String(tokenIdentify));
  if (otpForEmail) data.append("otpForEmail", String(otpForEmail));
  if (otpForMobile) data.append("otpForMobile", String(otpForMobile));

  const res = await makeRequest("post", "/student-profile/verify-otp", data, {
    headers: {
      "Content-Type": "multipart/mixed",
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data ?? null;
};
