import { makeRequest } from "../../../../utils/http";
import type { TopicTest } from "../../../shared/types";

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
}: GetTopicTestListParams): Promise<TopicTest[] | null> => {
  const res = await makeRequest("get", "/topictestlist/v3", null, {
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
