import { makeRequest } from "../../../utils/http";

interface StudentProfilePicUploadRequest {
  data: FormData;
  loginId: string;
  token: string;
}

export const studentProfilePicsUpload = async ({
  data,
  loginId,
  token,
}: StudentProfilePicUploadRequest) => {
  const res = await makeRequest("post", "/student-profile-pics-upload", data, {
    headers: {
      "Content-Type": "multipart/mixed",
      loginId: loginId,
      token: token,
      device: "web",
    },
  });

  return res?.data?.obj ?? null;
};
