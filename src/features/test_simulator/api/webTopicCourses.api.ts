import { makeRequest } from "../../../utils/http";

export const webTopicCourses = async (topicId: number) => {
  const res = await makeRequest("get", "/app/web-topic-courses", null, {
    params: {
      topicId: topicId,
      websiteId: 1,
    },

    headers: {
      "Content-Type": "multipart/mixed",
    },
  });

  return res?.data?.obj ?? null;
};
