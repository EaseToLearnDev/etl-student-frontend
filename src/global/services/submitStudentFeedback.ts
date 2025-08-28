import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { studentFeedback } from "../api/studentFeedback.api";

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
  if (!studentData || !type || !subject || !details) return null;

  const { loginId, token } = studentData;
  if (!loginId || !token) return null;


  const data = await studentFeedback({
    type,
    subject,
    details,
    loginId,
    token,
  });
  
  return data ?? null;
};
