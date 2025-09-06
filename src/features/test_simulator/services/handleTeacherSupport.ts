import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { teacherSupportQuestion } from "../api/teacherSupportQuestion.api";

interface HandleTeacherSupportParams {
  questionId?: number;
  feedback?: string;
}
export const handleTeacherSupport = async ({
  questionId,
  feedback,
}: HandleTeacherSupportParams) => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) return false;

  const { loginId, token } = studentData;

  const { organisationName } = activeCourse;

  if (!questionId || !feedback || !loginId || !token) return false;

  const formData = new FormData();
  formData.append("questionId", String(questionId));
  formData.append("feedback", feedback);
  if (organisationName) {
    formData.append("courseName", organisationName);
  }

  const data = await teacherSupportQuestion({ data: formData, loginId, token });

  if (data && data?.responseTxt === "success") {
    return true;
  }
  return false;
};
