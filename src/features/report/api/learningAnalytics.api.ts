import { makeRequest } from "../../../utils/http";

interface LearningAnalyticsRequest {
  testSession: string;
  loginId: string;
  token: string;
}

export const learningAnalytics = async ({
  testSession,
  loginId,
  token,
}: LearningAnalyticsRequest) => {
  const res = await makeRequest("get", "/learning-analytics", null, {
    params: {
      testSession: testSession,
    },
    headers: {
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data?.obj ?? null;
};
