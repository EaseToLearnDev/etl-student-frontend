import { makeRequest } from "../../../../utils/http";

export const verifyMobileSendOtp = async (userId: string) => {
  const data = new FormData();
  data.append("mobile", userId);

  try {
    const res = await makeRequest("post", "/app/verify-mobile-send-otp", data, {
      headers: {
        "Content-Type": "multipart/mixed",
      },
    });
    if (res?.data?.responseTxt === "sent_otp") {
      return res?.data?.obj;
    } else {
      throw new Error("invalid_number");
    }
  } catch (error) {
    console.log("Failed to send Otp: ", error);
    throw error;
  }
};
