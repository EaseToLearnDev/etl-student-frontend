import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import feedbackTypes from "../api/feedbackTypes.api";
import type { FeedbackType } from "../types/feedback.types";

export const getFeedbackTypes = async () => {
  const { studentData } = useStudentStore.getState();
  if (!studentData) return null;

  const { loginId, token } = studentData;
  if (!loginId || !token) return null;

  const data = (await feedbackTypes({ loginId, token })) as FeedbackType[];

  return data ?? null;
};
