import { makeRequest } from "../../utils/http";

interface StudentFeedbackParams {
  type: string;
  subject: string;
  details?: string;
  loginId: string;
  token: string;
}

export const studentFeedback = async ({
  type,
  subject,
  details,
  loginId,
  token,
}: StudentFeedbackParams) => {
  try {
    const data = new FormData();
    data.append("type", type);
    data.append("subject", subject);
    if (details) {
      data.append("details", details);
    }

    const res = await makeRequest("post", "/student-feedback", data, {
      headers: {
        "Content-Type": "multipart/mixed",
        loginId,
        token,
        device: "web",
      },
    });

    return res?.data ?? null;
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return null;
  }
};
