import { makeRequest } from "../../../utils/http";

interface AdaptiveTestDetailsParams {
  loginId: string;
  token: string;
  testSession: string;
}
export const adaptiveTestDetails = async ({
  loginId,
  token,
  testSession,
}: AdaptiveTestDetailsParams) => {
  const res = await makeRequest("get", "adaptive-testdetails", null, {
    params: { testSession },
    headers: { loginId, token, device: "web" },
  });

  return res?.data ?? null;
};
