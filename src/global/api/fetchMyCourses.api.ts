import { makeRequest } from "../../utils/http";

interface FetchMyCoursesParams {
  loginId: string;
  token: string;
}
export const fetchMyCourses = async ({
  loginId,
  token,
}: FetchMyCoursesParams) => {
  if (!loginId || !token) return;

  const res = await makeRequest("get", "/fetchmycourses", {
    headers: { loginId, token, device: "web" },
  });

  return res?.data ?? null;
};
