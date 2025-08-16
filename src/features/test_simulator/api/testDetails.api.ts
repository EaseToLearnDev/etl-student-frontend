import type { TestConfig } from "../test_simulator.types";
import { makeRequest } from "../../../utils/http";

interface TestDetailsParams {
  testConfig: TestConfig;
  templateId: number;
  loginId: string;
  token: string;
}

/**
 * Fetches test details from the API using the provided test configuration
 */
export const testDetails = async ({
  testConfig,
  templateId,
  loginId,
  token,
}: TestDetailsParams) => {
  const params = Object.fromEntries(
    Object.entries(testConfig).filter(([, v]) => v !== undefined)
  );
  
  params.templateId = templateId;
  const res = await makeRequest("get", "/testdetails", null, {
    params: params,
    headers: {
      loginId,
      token,
      device: "web",
      "Content-Type": "multipart/mixed",
    },
  });

  return res?.data?.obj ?? null;
};
