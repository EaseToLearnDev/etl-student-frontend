import { makeRequest } from "../../../utils/http";

interface UpdateMarksTestParams {
  data: FormData;
  loginId: string;
  token: string;
}
export const updateMarksTest = async ({
  data,
  loginId,
  token,
}: UpdateMarksTestParams) => {
  const res = await makeRequest("post", "/updatemarks-test", data, {
    headers: {
      loginId,
      token,
      device: "web",
      "Content-Type": "multipart/mixed",
    },
  });
  return res?.data ?? null;
};
