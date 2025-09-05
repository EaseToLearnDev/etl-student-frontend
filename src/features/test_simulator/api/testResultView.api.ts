import { makeRequest } from "../../../utils/http";

interface TestResultViewParams {
  testSession: string;
  loginId: string;
  token: string;
}

/**
 * Fetches existing test details for a given test session and template.
 */
export const testResultView = async ({
  testSession,
  loginId,
  token,
}: TestResultViewParams) => {
  const res = await makeRequest("get", "/app/testresultview", null, {
    params: {
      testSession,
    },
    headers: { loginId, token, device: "web" },
  });

  return res?.data?.[0] ?? null;
};
