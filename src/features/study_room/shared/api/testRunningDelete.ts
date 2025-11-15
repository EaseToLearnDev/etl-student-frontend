import { makeRequest } from "../../../../utils/http";

interface TestRunningDeleteParams {
  loginId: string;
  token: string;
  templateId: number;
}

export const testRunningDelete = async ({
  loginId,
  token,
  templateId,
}: TestRunningDeleteParams) => {
  const res = await makeRequest("get", "/testrunningdelete", null, {
    params: { templateId },
    headers: { loginId, token, device: "web" },
  });
  
  return res?.data ?? null;
};
