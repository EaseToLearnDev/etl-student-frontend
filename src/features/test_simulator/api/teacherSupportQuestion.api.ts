import { makeRequest } from "../../../utils/http";

interface TeacherSupportQuestionParams {
  data: FormData;
  loginId: string;
  token: string;
}
export const teacherSupportQuestion = async ({
  data,
  loginId,
  token,
}: TeacherSupportQuestionParams) => {
  const res = await makeRequest("post", "/teacher-support-question", data, {
    headers: {
      "Content-Type": "multipart/mixed",
      loginId,
      token,
      device: "web",
    },
  });
};
