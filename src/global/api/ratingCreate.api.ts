import { makeRequest } from "../../utils/http";

interface RatingCreateRequest {
  data: FormData;
  loginId: string;
  token: string;
}

export const RatingCreate = async ({
  loginId,
  token,
  data,
}: RatingCreateRequest) => {
  const res = await makeRequest("post", "/rating-create", data, {
    headers: {
      loginId: loginId,
      token: token,
      device: "web",
      "Content-Type": "multipart/mixed",
    },
  });

  return res?.data ?? null;
};
