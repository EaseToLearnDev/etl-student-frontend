import { makeRequest } from "../../../../utils/http";

interface SelfTestFormOptionsParams {
  loginId: string;
  token: string;
  templateId: number;
}
const selfTestFormOptions = async ({
  loginId,
  token,
  templateId,
}: SelfTestFormOptionsParams) => {
  try {
    const res = await makeRequest("get", "selftestformoptions", null, {
      params: {
        templateId,
      },
      headers: { loginId, token, device: "web" },
    });

    return res?.data?.obj ?? null;
  } catch (error) {
    console.log("Failed to call test options api:", error);
    return null;
  }
};

export default selfTestFormOptions;
