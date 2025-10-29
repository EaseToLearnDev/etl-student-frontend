import { create } from "zustand";
import type { Course, StudentData } from "../types";
import { persist } from "zustand/middleware";

export interface StudentStore {
  studentData: StudentData | null;
  activeCourse: Course | null;
  showFtuModal: boolean;

  setStudentData: (data: StudentData | null) => void;
  setActiveCourse: (index: number) => void;
  setShowFtuModal: (v: boolean) => void;
  reset: () => void;
}

/**
 * Zustand store for managing student data, active course, and permitted tabs.
 */
export const useStudentStore = create<StudentStore>()(
  persist(
    (set, get) => ({
      studentData: null,
      activeCourse: null,
      showFtuModal: false,

      setStudentData: (data) => {
        const activeCourse = data?.courses
          ? data?.courses[data?.openedCourse]
          : null;
        set({ studentData: data, activeCourse });
      },

      setActiveCourse: (index) => {
        const { studentData } = get();
        const courses = studentData?.courses;
        set({ activeCourse: courses ? courses[index] : null });
      },

      setShowFtuModal: (v) => set({ showFtuModal: v }),

      reset: () => {
        set({ studentData: null, activeCourse: null, showFtuModal: false });
        localStorage.removeItem("student-storage");
      },
    }),
    {
      name: "student-storage",
    },
  ),
);
