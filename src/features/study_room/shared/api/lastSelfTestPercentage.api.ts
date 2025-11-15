// Types
import type { ModeType } from "../../../shared/types";

// Utils
import { makeRequest } from "../../../../utils/http";

interface GetLastSelfTestPercentageParams {
  loginId: string;
  token: string;
  templateId: number;
  topicName: string;
  mode: ModeType;
}

export const getLastSelfTestPercentage = async ({
  loginId,
  token,
  templateId,
  topicName,
  mode,
}: GetLastSelfTestPercentageParams) => {
  const res = await makeRequest("get", "/last-self-test-percentage", null, {
    params: {
      templateId: templateId,
      testType: 1,
      testMode: mode,
      topicName: topicName,
    },
    headers: { loginId, token, device: "web" },
  });

  return res?.data?.obj ?? null;
};
