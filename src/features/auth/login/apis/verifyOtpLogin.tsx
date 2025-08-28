import { makeRequest } from "../../../../utils/http";

export const verifyOtpLogin = async (otp: string, token: string) => {
  const data = new FormData();
  data.append("otpNumber", otp);
  data.append("token", token);
  data.append("device", "web");

  try {
    const res = await makeRequest("post", "/app/verifyotp-login", data, {
      headers: {
        "Content-Type": "multipart/mixed",
      },
    });

    return res?.data?.obj ?? null;
  } catch (error) {
    console.log("Failed to Verify Otp: ", error);
    throw error;
  }
};
