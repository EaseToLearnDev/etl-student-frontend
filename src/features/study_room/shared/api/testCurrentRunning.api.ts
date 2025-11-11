import { makeRequest } from "../../../../utils/http";

interface GetTestCurrentRunningParams {
  // query params
  templateId?: number;
  organisationId?: number;
  studentId?: string;

  // headers
  loginId?: string;
  token: string;
}

export const getTestCurrentRunning = async ({
  templateId,
  organisationId,
  studentId,
  loginId,
  token,
}: GetTestCurrentRunningParams) => {
  const params: Record<string, any> = {};
  if (templateId) params.templateId = templateId;
  if (organisationId) params.organisationId = organisationId;
  if (studentId) params.studentId = studentId;

  const res = await makeRequest("get", "/testcurrentrunning", null, {
    params,
    headers: { token, loginId, device: "web" },
  });

  return res?.data ?? null;
};
