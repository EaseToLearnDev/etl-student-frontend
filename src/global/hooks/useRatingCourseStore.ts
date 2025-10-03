import { create } from "zustand";

interface RatingCourseStore {
  rating: number;
  remarks: string;
  showStudentRatingModal: boolean;

  setRating: (rating: number) => void;
  setRemarks: (remarks: string) => void;
  setShowStudentRatingModal: (show: boolean) => void;

  reset: () => void;
}

export const useRatingCourseStore = create<RatingCourseStore>((set) => ({
  rating: 0,
  remarks: "",
  showStudentRatingModal: false,

  setRating: (rating) => set({ rating }),
  setRemarks: (remarks) => set({ remarks }),
  setShowStudentRatingModal: (show) => set({ showStudentRatingModal: show }),

  reset: () =>
    set({
      rating: 0,
      remarks: "",
      showStudentRatingModal: false,
    }),
}));
