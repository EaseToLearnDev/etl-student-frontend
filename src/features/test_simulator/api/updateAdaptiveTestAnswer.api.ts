import { makeRequest } from "../../../utils/http";

interface UpdateAdaptiveTestAnswerParams {
  data: FormData;
  loginId: string;
  token: string;
}
export const updateAdaptiveTestAnswer = async ({
  data,
  loginId,
  token,
}: UpdateAdaptiveTestAnswerParams) => {
  const res = await makeRequest("post", "/app/update-adaptive-test-answer", data, {
    headers: { loginId, token, device: "web", "Content-Type": "multipart/mixed" },
  });
  return res?.data ?? null;
};
