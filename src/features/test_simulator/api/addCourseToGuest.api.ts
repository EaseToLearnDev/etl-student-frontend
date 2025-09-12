import { makeRequest } from "../../../utils/http";

interface AddCourseToGuestRequest {
  data: FormData;
  loginId: string;
  token: string;
}

export const addCourseToGuest = async ({
  data,
  loginId,
  token,
}: AddCourseToGuestRequest) => {
  const res = await makeRequest("post", "/add-course-toguest", data, {
    headers: {
      'Content-Type': 'multipart/mixed',
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data ?? null;
};
