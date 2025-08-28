import { makeRequest } from "../../utils/http";

interface FeedbackTypesParams {
  loginId: string;
  token: string;
}

export const feedbackTypes = async ({
  loginId,
  token,
}: FeedbackTypesParams) => {
  try {
    const res = await makeRequest("get", "/feedbacktypes", null, {
      headers: { loginId, token, device: "web" },
    });
    return res?.data?.obj ?? null;
  } catch (error) {
    console.log("failed to get feedback types: ", error);
    return null;
  }
};

export default feedbackTypes;
