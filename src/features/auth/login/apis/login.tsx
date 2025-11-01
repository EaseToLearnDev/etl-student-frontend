import { makeRequest } from "../../../../utils/http";

export const login = async (data: FormData) => {
  const headers = {
    "Content-Type": "multipart/mixed",
  };

  const res = await makeRequest("post", "/app/login", data, { headers });
    return res?.data?.obj ?? null;
};
