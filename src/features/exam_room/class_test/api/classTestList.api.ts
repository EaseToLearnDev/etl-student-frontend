import { makeRequest } from "../../../../utils/http";

interface GetClassTestListParams {
  courseId: number;
  loginId: string;
  token: string;
}
export const getClassTestList = async ({
  courseId,
  loginId,
  token,
}: GetClassTestListParams) => {
  const res = await makeRequest("get", "/classtestlist", null, {
    params: {
      courseId,
    },
    headers: {
      loginId,
      token,
      device: "web",
    },
  });
  return res?.data?.obj ?? null;
};
