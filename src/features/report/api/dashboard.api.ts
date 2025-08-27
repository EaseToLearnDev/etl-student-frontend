import { makeRequest } from "../../../utils/http";

interface DashboardParams {
  courseId: number;
  loginId: string;
  token: string;
}

export const dashboard = async ({
  courseId,
  loginId,
  token,
}: DashboardParams) => {
  try {
    const res = await makeRequest("get", "/dashboard", null, {
      params: { courseId },
      headers: { loginId, token, device: "web" },
    });
    return res?.data?.obj ?? null;
  } catch (error) {
    console.log("Failed to get dashboard data:", error);
    return null;
  }
};
