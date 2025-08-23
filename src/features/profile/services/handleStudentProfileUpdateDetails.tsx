import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { studentProfileUpdateDetails } from "../api/studentProfileUpdateDetails.api";

interface UpdateProfileProps {
  newEmailId?: string;
  newPhoneNo?: string;
}

export const handleStudentProfileUpdateDetails = async ({
  newEmailId,
  newPhoneNo,
}: UpdateProfileProps) => {
  const { studentData } = useStudentStore.getState();
  if (!studentData) return null;

  const { loginId, token, studentId, studentName } = studentData;

  try {
    const res = await studentProfileUpdateDetails({
      emailId: newEmailId ?? studentData.emailId,
      phoneNo: newPhoneNo ?? studentData.phoneNo,
      loginId,
      token,
      studentId,
      studentName,
    });

    return {
      resToken: res?.obj?.token,
      tokenIdentify: res?.obj?.tokenIdentify,
    };
  } catch (error) {
    console.error("Failed to request OTP: ", error);
    return null;
  }
};
