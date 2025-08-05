import { makeRequest } from "../../../../utils/http";

interface GetTextContentParams {
  id: number;
  loginId: string;
  token: string;
}

export const getTextContent = async ({
  id,
  loginId,
  token,
}: GetTextContentParams) => {
  const res = await makeRequest("get", "/smartlearning-details", null, {
    params: {
      id,
    },
    headers: { loginId, token, device: "web" },
  });

  return res?.data?.obj ?? null;
};
