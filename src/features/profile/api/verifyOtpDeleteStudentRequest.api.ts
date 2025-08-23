import { makeRequest } from "../../../utils/http";

interface VerifyOtpDeleteStudentRequestProp {
  data: FormData;
  loginId: string;
  token: string;
}

export const verifyOtpDeleteStudentRequest = async ({
  data,
  loginId,
  token,
}: VerifyOtpDeleteStudentRequestProp) => {
  const res = await makeRequest(
    "post",
    "/verify-otp-delete-student-request",
    data,
    {
      headers: {
        "Content-Type": "multipart/mixed",
        loginId: loginId,
        token: token,
        device: "web",
      },
    }
  );

  return res?.data ?? null;
};
