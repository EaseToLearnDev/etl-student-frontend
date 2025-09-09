import { makeRequest } from "../../../../utils/http";

interface VerifyForgetPasswordTokenParams {
  password: string;
  token: string;
  tokenIdentify: string;
  otp: string;
}
export const verifyForgetPasswordToken = async ({
  password,
  token,
  tokenIdentify,
  otp,
}: VerifyForgetPasswordTokenParams) => {
  try {
    let options = {
      headers: {
        "Content-Type": "multipart/mixed",
      },
    };
    const data = new FormData();
    data.append("newPassword", password);
    data.append("token", token);
    data.append("tokenIdentify", tokenIdentify);
    data.append("otp", otp);
    const res = await makeRequest(
      "post",
      "/app/verify-forget-password-token",
      data,
      options
    );

    return res?.data ?? null;
  } catch (error) {
    console.log("Failed to call verify forget password token api: ", error);
    return null;
  }
};
