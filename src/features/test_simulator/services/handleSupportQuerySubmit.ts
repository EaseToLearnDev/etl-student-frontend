import { useToastStore } from "../../../global/hooks/useToastStore";
import { ToastType } from "../../shared/types";
import { handleTeacherSupport } from "./handleTeacherSupport";

export const handleSupportQuerySubmit = async (
  setFeedback: (v: string) => void,
  setIsModalOpen: (v: boolean) => void,
  feedback?: string,
  questionId?: number
) => {
  const { setToast } = useToastStore.getState();

  const success = await handleTeacherSupport({ questionId, feedback });

  if (success) {
    setToast({
      title: "Invite Sent to Teacher Successfully!",
      type: ToastType.SUCCESS,
      duration: 5000,
    });
    setFeedback("");
    setIsModalOpen(false);
  } else {
    setToast({
      title: "Failed to send invite to teacher. Please try again later.",
      type: ToastType.DANGER,
      duration: 5000,
    });
    setIsModalOpen(false);
  }
};
