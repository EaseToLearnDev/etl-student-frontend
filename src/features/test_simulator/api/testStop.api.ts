import { makeRequest } from "../../../utils/http";

interface TestStopRequest {
  data: FormData;
  loginId: string;
  token: string;
}

export const testStop = async ({ data, loginId, token }: TestStopRequest) => {
  try {
    const res = await makeRequest("post", "/teststop", data, {
      headers: {
        "Content-Type": "text/html",
        loginId: loginId,
        token: token,
        device: "web",
      },
    });

    return res?.data ?? null;
  } catch (error) {
    console.error("Error submitting test:", error);
    return null;
  }
};
