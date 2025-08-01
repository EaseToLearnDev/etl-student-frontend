import { makeRequest } from "../../../../utils/http";

export const LoginApi = async (email: string, password: string) => {
  const data = new FormData();
  data.append("userId", email);
  data.append("password", password);
  data.append("device", "web");
  const headers = {
    "Content-Type": "multipart/mixed",
  };

  try {
    const res = await makeRequest("post", "/app/login", data, { headers });
    if (res?.success && res?.data?.responseTxt === "success") {
      // store user data and navigate to dashboard
      return res?.data?.obj;
    } else {
      throw new Error("invalid_credentials");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
