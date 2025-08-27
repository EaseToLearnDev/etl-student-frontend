import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import { studentInvite } from "../api/studentInvite.api";

interface HandleStudentInviteParams {
  teacherLoginId: string;
}

export const handleStudentInvite = async ({
  teacherLoginId,
}: HandleStudentInviteParams) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData || !teacherLoginId) return;

  const { loginId, token } = studentData;

  if (!loginId || !token) return;

  const data = await studentInvite({ loginId, token, teacherLoginId });
  if (!data) return;

  console.log(data?.responseTxt);
};
