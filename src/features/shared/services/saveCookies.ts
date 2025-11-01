import Cookies from "js-cookie";
import type { Option, StudentDataResponse } from "../types";

export const saveCookies = (data: Option<StudentDataResponse>) => {
  if (!data) return;
  Cookies.set(
    "accountDetails",
    JSON.stringify({
      sid: data?.studentId,
      studentId: data?.studentId,
      loginId: data?.loginId,
      token: data?.token,
      studentName: data?.studentName ?? "",
      mobile: data?.phoneNo ?? "",
      email: data?.emailId ?? "",
    })
  );
  Cookies.set("token", `"${data?.token}"`);
};
