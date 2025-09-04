import { makeRequest } from "../../../utils/http";

export const sendOtp = async (data: FormData) => {
  const res = await makeRequest("post", "/app/sendotp", data, {
    headers: {
      "Content-Type": "multipart/mixed",
    },
  });

  return res?.data ?? null;
};
