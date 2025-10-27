import { makeRequest } from "../../utils/http";
interface StudentSelectedCoursesParams {
  loginId: string;
  token: string;
}
export const studentSelectedCourses = async ({
  loginId,
  token,
}: StudentSelectedCoursesParams) => {
  if (!loginId || !token) return;

  const res = await makeRequest("get", "/student-selected-courses", null, {
    headers: { loginId, token, device: "web" },
  });

  return res?.data ?? null;
};
