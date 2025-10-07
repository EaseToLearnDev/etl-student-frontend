import { makeRequest } from "../../../../utils/http";

interface GetTopicContentParams {
  loginId: string;
  token: string;
  templateId: number;
  topicId: number | string;
  topicName: string;
}

export const getTopicContent = async ({
  loginId,
  token,
  templateId,
  topicId,
  topicName,
}: GetTopicContentParams) => {
  const res = await makeRequest("get", "/syllabus/v2", null, {
    params: {
      templateId,
      searchFlag: "Topic",
      topicId,
      searchQuery: topicName,
    },
    headers: { loginId, token, device: "web" },
  });

  return res?.data?.obj ?? null;
};
