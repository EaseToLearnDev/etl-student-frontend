import { makeRequest } from "../../../../utils/http";

const createForgetPasswordToken = async ({ userId }: { userId: string }) => {
  try {
    let options = {
      headers: {
        "Content-Type": "multipart/mixed",
      },
    };
    const data = new FormData();
    data.append("userId", userId);
    const res = await makeRequest(
      "post",
      "/app/create-forget-password-token",
      data,
      options
    );
    return res?.data ?? null;
  } catch (error) {
    console.log("Failed to call create-forget-password-token api: ", error);
    return null;
  }
};

export default createForgetPasswordToken;
