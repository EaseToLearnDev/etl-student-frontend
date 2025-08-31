import { makeRequest } from "../../../utils/http";

interface AnalyticsResponse {
  testSession: string;
  loginId: string;
  token: string;
}

export const analytics = async ({
  testSession,
  loginId,
  token,
}: AnalyticsResponse) => {
  const res = await makeRequest("get", "/analytics", null, {
    params: {
      testSession: testSession,
    },
    headers: {
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data ?? null;
};
