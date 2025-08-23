import { makeRequest } from "../../../utils/http";

interface DeleteStudentAccountParams {
  loginId: string;
  token: string;
}

export const deleteStudentSendOtp = async ({
  loginId,
  token,
}: DeleteStudentAccountParams) => {
  const data = new FormData();
  const res = await makeRequest("post", "/delete-student-send-otp", data, {
    headers: {
      "Content-Type": "multipart/mixed",
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data ?? null;
};
