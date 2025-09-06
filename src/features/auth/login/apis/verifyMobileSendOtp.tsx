import { makeRequest } from "../../../../utils/http";

export const verifyMobileSendOtp = async (userId: string) => {
  const data = new FormData();
  data.append("mobile", userId);

  const res = await makeRequest("post", "/app/verify-mobile-send-otp", data, {
    headers: {
      "Content-Type": "multipart/mixed",
    },
  });

  return res?.data ?? null;
};
