import { makeRequest } from "../../../utils/http";

export const guestVerifyOtpSignup = async (data: FormData) => {
  const res = await makeRequest("post", "/app/guest-verifyotp-signup", data, {
    headers: {
      "Content-Type": "multipart/mixed",
    },
  });

  return res?.data ?? null
};
