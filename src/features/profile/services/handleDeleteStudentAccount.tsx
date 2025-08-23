import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { deleteStudentSendOtp } from "../api/deleteStudentSendOtp.api";

export const handleDeleteStudentAccount = () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  try {
    const res = deleteStudentSendOtp({ loginId, token });
    return res;
  } catch (error) {
    console.log("Failed to delete account: ", error);
    return null;
  }
};
