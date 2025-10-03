import { makeRequest } from "../../../utils/http";

export interface StudentProfileUpdateDetailsRequest {
  emailId?: string;
  phoneNo?: string;
  studentName: string;
  studentId: number;
  loginId: string;
  token: string;
}

export const studentProfileUpdateDetails = async ({
  emailId,
  phoneNo,
  studentName,
  studentId,
  loginId,
  token,
}: StudentProfileUpdateDetailsRequest) => {
  const data = new FormData();
  data.append("studentId", String(studentId));
  data.append("studentName", studentName);
  data.append("userId", loginId);

  if (emailId) data.append("emailId", emailId);
  if (phoneNo) data.append("mobile", phoneNo);

  const res = await makeRequest(
    "post",
    "/student-profile/update-details",
    data,
    {
      headers: {
        "Content-Type": "multipart/mixed",
        loginId: loginId,
        token: token,
        device: "web",
      },
    }
  );

  return res?.data ?? null;
};
