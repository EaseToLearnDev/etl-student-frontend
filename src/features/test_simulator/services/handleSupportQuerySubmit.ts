import { handleTeacherSupport } from "./handleTeacherSupport";

export const handleSupportQuerySubmit = async (
  setFeedback: (v: string) => void,
  setIsModalOpen: (v: boolean) => void,
  feedback?: string,
  questionId?: number
) => {
  const success = await handleTeacherSupport({ questionId, feedback });

  if (success) {
    setFeedback("");
    setIsModalOpen(false);
  } else {
    console.log("Failed to submit teacher query");
    setIsModalOpen(false);
  }
};
