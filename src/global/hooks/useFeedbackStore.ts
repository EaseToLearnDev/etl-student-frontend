import { create } from "zustand";
import type { FeedbackType } from "../types/feedback.types";

interface FeedbackStore {
  showFeedbackModal: boolean;
  feedbackData: FeedbackType | null;

  setShowFeedbackModal: (v: boolean) => void;
  setFeedbackData: (data: FeedbackType | null) => void;

  reset: () => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  showFeedbackModal: false,
  feedbackData: null,

  setShowFeedbackModal: (v) => set({ showFeedbackModal: v }),
  setFeedbackData: (data) => set({ feedbackData: data }),

  reset: () => set({ showFeedbackModal: false, feedbackData: null }),
}));
