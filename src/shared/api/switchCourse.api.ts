import { makeRequest } from "../../utils/http";

interface SwitchCourseParams {
  openedCourseIndex: number;
  loginId: string;
  token: string;
}

export const switchCourse = async ({
  openedCourseIndex,
  loginId,
  token,
}: SwitchCourseParams) => {
  const data = new FormData();
  data.append("openedCourseIndex", String(openedCourseIndex));

  const res = await makeRequest("post", "/lastopenedcourse", data, {
    headers: {
      loginId,
      token,
      device: "web",
      "Content-Type": "multipart/mixed",
    },
  });

  return res?.data ?? null;
};
