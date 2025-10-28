import { makeRequest } from "../../../utils/http";

interface GetWeekClassesRequest {
  loginId: string;
  token: string;
  classId: number;
}

export const getWeekClasses = async ({
  loginId,
  token,
  classId,
}: GetWeekClassesRequest) => {
  const res = await makeRequest("get", "/get-week-classes", null, {
    params: {
      classId: classId,
    },
    headers: {
      loginId: loginId,
      token: token,
      device: "web"
    },
  });


  return res?.data ?? null;
};
