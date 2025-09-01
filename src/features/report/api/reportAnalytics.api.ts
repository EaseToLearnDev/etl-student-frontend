import { makeRequest } from "../../../utils/http";

interface ReportAnalyticsResponse {
  courseId: number;
  loginId: string;
  token: string;
}

export const reportAnalytics = async ({
  courseId,
  loginId,
  token,
}: ReportAnalyticsResponse) => {
  const res = await makeRequest("get", "/reportanalytics", null, {
    params: {
      panel: "student",
      courseId: courseId,
    },
    headers: {
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data?.obj ?? null
};
