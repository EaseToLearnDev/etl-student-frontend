import { makeRequest } from "../../../../utils/http";

interface AdaptiveCreateTestParams {
  loginId: string;
  token: string;
  templateId: number;
  courseId: number;
  topicId: number;
}
export const adaptiveCreateTest = async ({
  loginId,
  token,
  templateId,
  courseId,
  topicId,
}: AdaptiveCreateTestParams) => {
  const res = await makeRequest("get", "adaptive-create-test", null, {
    params: { templateId, courseId, topicId },
    headers: { loginId, token, device: "web" },
  });

  return res?.data ?? null;
};
