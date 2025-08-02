import { makeRequest } from "../../../../utils/http";
import type { TopicTestType } from "../../../shared/types";

interface GetTopicTestListParams {
  topicName: string;
  topicId: number;
  loginId: string;
  token: string;
  templateId: number;
}
export const getTopicTestList = async ({
  templateId,
  topicName,
  topicId,
  loginId,
  token,
}: GetTopicTestListParams): Promise<TopicTestType[] | null> => {
  const res = await makeRequest("get", "/topictestlist", null, {
    params: {
      templateId,
      topicName,
      topicId,
    },
    headers: {
      loginId,
      token,
      device: "web",
    },
  });

  return res?.data?.obj ?? null;
};
