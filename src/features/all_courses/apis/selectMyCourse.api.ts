import { makeRequest } from "../../../utils/http";

interface SelectMyCourseRequest {
  courseId: number;
  loginId: string;
  token: string;
}

export const selectMyCourse = async ({
  courseId,
  loginId,
  token,
}: SelectMyCourseRequest) => {
  const res = await makeRequest("get", "/selectmycourse", null, {
    params: {
      courseId: courseId,
    },
    headers: {
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data ?? null;
};
