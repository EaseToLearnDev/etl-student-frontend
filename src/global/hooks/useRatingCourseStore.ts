import { create } from "zustand";

interface RatingCourseStore {
  rating: number;
  remarks: string;
  error: string | null;
  showStudentRatingModal: boolean;

  setRating: (rating: number) => void;
  setRemarks: (remarks: string) => void;
  setError: (error: string | null) => void;
  setShowStudentRatingModal: (show: boolean) => void;

  reset: () => void;
}

export const useRatingCourseStore = create<RatingCourseStore>((set) => ({
  rating: 0,
  remarks: "",
  error: null,
  showStudentRatingModal: false,

  setRating: (rating) => set({ rating }),
  setRemarks: (remarks) => set({ remarks }),
  setError: (error) => set({ error }),
  setShowStudentRatingModal: (show) => set({ showStudentRatingModal: show }),

  reset: () =>
    set({
      rating: 0,
      remarks: "",
      showStudentRatingModal: false,
    }),
}));
