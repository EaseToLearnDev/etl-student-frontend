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
  try {
    const res = await makeRequest("post", "/teacher-support-question", data, {
      headers: {
        "Content-Type": "multipart/mixed",
        loginId,
        token,
        device: "web",
      },
    });

    return res?.data ?? null;
  } catch (error) {
    console.log("Failed to call teacher support question api: ", error);
    return null;
  }
};
