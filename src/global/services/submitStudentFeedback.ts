import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { ToastType } from "../../features/shared/types";
import { studentFeedback } from "../api/studentFeedback.api";
import { useToastStore } from "../hooks/useToastStore";

interface SubmitStudentFeedbackParams {
  type: string;
  subject: string;
  details: string;
}

export const submitStudentFeedback = async ({
  type,
  subject,
  details,
}: SubmitStudentFeedbackParams) => {
  const { studentData } = useStudentStore.getState();
  const { setToast } = useToastStore.getState();
  if (!studentData || !type || !subject) return null;

  const { loginId, token } = studentData;
  if (!loginId || !token) return null;

  const res = await studentFeedback({
    type,
    subject,
    details,
    loginId,
    token,
  });

  if (res.responseTxt === "success") {
    return setToast({
      title: "Thanks for your Feedback!",
      type: ToastType.SUCCESS,
      duration: 5000,
    });
  } else {
    return setToast({
      title: "Failed to submit your Feedback!",
      type: ToastType.DANGER,
      duration: 5000,
    });
  }
};
