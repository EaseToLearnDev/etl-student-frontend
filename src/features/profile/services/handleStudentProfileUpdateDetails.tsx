import { useToastStore } from "../../../global/hooks/useToastStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { ToastType } from "../../shared/types";
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
  const { setToast } = useToastStore.getState();
  if (!studentData) return null;

  const { loginId, token, studentId, studentName } = studentData;

  try {
    const res = await studentProfileUpdateDetails({
      emailId: newEmailId,
      phoneNo: newPhoneNo,
      loginId,
      token,
      studentId,
      studentName,
    });

    return {
      resToken: res?.obj?.token,
      tokenIdentify: res?.obj?.tokenIdentify,
    };
  } catch (error: any) {
    if (error.status === 409) {
      const type = newEmailId ? 'Email' : 'Number';
      setToast({
        title: `${type} already exists. Try another ${type}`,
        type: ToastType.WARNING,
      });
    } else {
      setToast({
        title: "Somethings wrong. Try again Later",
        type: ToastType.DANGER,
      });
    }
    return null;
  }
};
