import { makeRequest } from "../../../../utils/http";

interface getTestCurrentRunningParams {
  loginId: string;
  token: string;
  templateId: number;
}
export const getTestCurrentRunning = async ({
  loginId,
  token,
  templateId,
}: getTestCurrentRunningParams) => {
  const res = await makeRequest("get", "/testcurrentrunning", null, {
    params: { templateId },
    headers: { loginId, token, device: "web" },
  });
  
  return res?.data ?? null;
};
