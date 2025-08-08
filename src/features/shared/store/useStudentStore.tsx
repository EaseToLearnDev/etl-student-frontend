import { create } from "zustand";
import type { CourseType, StudentDataType } from "../types";
import { persist } from "zustand/middleware";

export interface StudentStore {
  studentData: StudentDataType | null;
  setStudentData: (data: StudentDataType | null) => void;
  getActiveCourse: () => CourseType | null;
  reset: () => void;
}

/**
 * Zustand store for managing student data, active course, and permitted tabs.
 */
export const useStudentStore = create<StudentStore>()(
  persist(
    (set, get) => ({
      studentData: null,
      setStudentData: (data) => set({ studentData: data }),
      getActiveCourse: () => {
        const { studentData } = get();
        const activeCourse = studentData?.courses[studentData?.openedCourse];
        return activeCourse ?? null;
      },
      reset: () => {
        set({ studentData: null });
        localStorage.removeItem("student-storage");
      },
    }),
    {
      name: "student-storage",
    }
  )
);
