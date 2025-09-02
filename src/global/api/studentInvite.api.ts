import { makeRequest } from "../../utils/http";

interface StudentInviteParams {
  loginId: string;
  token: string;
  teacherLoginId: string;
}

export const studentInvite = async ({
  loginId,
  token,
  teacherLoginId,
}: StudentInviteParams) => {
  const data = new FormData();
  data.append("invitedTo", "Teacher");
  data.append("invitedToUserId", teacherLoginId);
  data.append("actionById", loginId);

  try {
    const res = await makeRequest("post", "/student-invite", data, {
      headers: {
        "Content-Type": "multipart/mixed",
        loginId,
        token,
        device: "web",
      },
    });

    return res?.data ?? null;
  } catch (error) {
    console.log("Failed to send teacher invite: ", error);
    return null;
  }
};
