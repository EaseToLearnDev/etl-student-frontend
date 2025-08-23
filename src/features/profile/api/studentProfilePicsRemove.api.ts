import { makeRequest } from "../../../utils/http";

interface StudentProfilePicRemoveRequest {
  data: FormData;
  loginId: string;
  token: string;
}

export const studentProfilePicsRemove = async ({
  data,
  loginId,
  token,
}: StudentProfilePicRemoveRequest) => {
  const res = await makeRequest("post", "/student-profile-pics-remove", data, {
    headers: {
      "Content-Type": "multipart/mixed",
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data ?? null;
};
