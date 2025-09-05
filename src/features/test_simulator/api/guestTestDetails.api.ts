import { makeRequest } from "../../../utils/http";
import type { TestConfig } from "../test_simulator.types";

export const guestTestDetails = async ({
  testType,
  testUid,
  courseUrl,
  courseId,
  searchFlag,
  searchQuery,
  topicId,
}: TestConfig) => {
  try {
    const params: Record<string, any> = {};
    params.testType = testType !== undefined ? testType : 0;
    params.testUid = testUid !== undefined ? testUid : "learning";
    if (courseUrl !== undefined) params.courseUrl = courseUrl;
    if (courseId !== undefined) params.courseId = courseId;
    if (searchFlag !== undefined) params.searchFlag = searchFlag;
    if (searchQuery !== undefined) params.searchQuery = searchQuery;
    if (topicId !== undefined) params.topicId = topicId;

    const res = await makeRequest("get", "/app/guest-testdetails", null, {
      params,
      headers: {
        device: "web",
        "Content-Type": "multipart/mixed",
      },
    });
    return res?.data?.obj?.list?.[0] ?? null;
  } catch (error) {
    console.log("Failed to call guest test api: ", error);
    return null;
  }
};

export default guestTestDetails;
