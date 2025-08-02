import { makeRequest } from "../../../../utils/http";

interface GetLastSelfTestPercentageParams {
  loginId: string;
  token: string;
  templateId: number;
  topicName: string;
}

export const getLastSelfTestPercentage = async ({
  loginId,
  token,
  templateId,
  topicName,
}: GetLastSelfTestPercentageParams) => {
  const res = await makeRequest("get", "/last-self-test-percentage", null, {
    params: {
      templateId: templateId,
      testType: 1,
      testMode: "Learning Session",
      topicName: topicName,
    },
    headers: { loginId, token, device: "web" },
  });

  return res?.data?.obj?.percentage ?? null;
};
