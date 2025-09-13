import { makeRequest } from "../../../utils/http";

interface TestDetailExistingParams {
  testSession: string;
  templateId: number;
  loginId: string;
  token: string;
}

/**
 * Fetches existing test details for a given test session and template.
 */
export const testDetailExisting = async ({
  testSession,
  templateId,
  loginId,
  token,
}: TestDetailExistingParams) => {
  const res = await makeRequest("get", "/testdetailexisting", null, {
    params: {
      testSession,
      templateId,
    },
    headers: { loginId, token, device: "web" },
  });

  return res?.data ?? null;
};
