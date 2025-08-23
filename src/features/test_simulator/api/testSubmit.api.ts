import { makeRequest } from "../../../utils/http";

interface TestSubmitRequest {
  data: FormData;
  loginId: string;
  token: string;
}

export const testSubmit = async ({
  data,
  loginId,
  token,
}: TestSubmitRequest) => {
  try {
    const res = await makeRequest("post", "/testsubmit", data, {
      headers: {
        "Content-Type": "multipart/form-data",
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
