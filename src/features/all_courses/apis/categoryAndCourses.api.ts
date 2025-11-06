import { makeRequest } from "../../../utils/http";

interface CategoryAndCoursesRequest {
  deviceType: string | undefined;
  loginId: string;
  token: string;
}

export const categoryAndCourses = async ({
  deviceType,
  loginId,
  token,
}: CategoryAndCoursesRequest) => {
  const res = await makeRequest("get", "/categoryandcourses", null, {
    params: {
      deviceType: deviceType ?? "android",
    },
    headers: {
      "Content-Type": "multipart/mixed",
      loginId: loginId,
      token: token,
      device: "web",
    },
  }
);

  return res?.data?.obj ?? null;
};
