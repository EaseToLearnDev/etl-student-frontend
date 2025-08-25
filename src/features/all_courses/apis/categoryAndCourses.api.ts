import { makeRequest } from "../../../utils/http";

interface CategoryAndCoursesRequest {
  loginId: string;
  token: string;
}

export const categoryAndCourses = async ({
  loginId,
  token,
}: CategoryAndCoursesRequest) => {
  const res = await makeRequest("get", "/categoryandcourses", null, {
    params: {
      deviceType: "android",
    },
    headers: {
      "Content-Type": "multipart/mixed",
      loginId: loginId,
      token: token,
      device: "web",
    },
  }
);

  return res?.data ?? null;
};
