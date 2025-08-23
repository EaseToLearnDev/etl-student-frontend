import { makeRequest } from "../../../utils/http";

interface StudentProfileUpdateDetailsRequest {
  emailId: string;
  phoneNo: string;
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
  const res = await makeRequest(
    "post",
    "/student-profile/update-details",
    null,
    {
      params: {
        emailId: emailId,
        mobile: phoneNo,
        studentName: studentName,
        studentId: studentId,
        userId: loginId,
      },
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
