import { create } from "zustand";
import type { FeedbackType } from "../types/feedback.types";

interface FeedbackStore {
  showFeedbackModal: boolean;
  typeIdx: number;
  subject: string;
  details: string;
  feedbackTypes: FeedbackType[] | null;

  setShowFeedbackModal: (v: boolean) => void;
  setTypeIdx: (typeIdx: number) => void;
  setSubject: (subject: string) => void;
  setDetails: (details: string) => void;
  setFeedbackTypes: (types: FeedbackType[] | null) => void;

  reset: () => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  showFeedbackModal: false,
  typeIdx: 0,
  subject: "",
  details: "",
  feedbackTypes: null,

  setShowFeedbackModal: (v) => set({ showFeedbackModal: v }),
  setTypeIdx: (typeIdx) => set({ typeIdx }),
  setSubject: (subject) => set({ subject }),
  setDetails: (details) => set({ details }),
  setFeedbackTypes: (types) => set({ feedbackTypes: types }),

  reset: () =>
    set({
      showFeedbackModal: false,
      typeIdx: 0,
      subject: "",
      details: "",
      feedbackTypes: null,
    }),
}));
