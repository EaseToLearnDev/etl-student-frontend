import { create } from "zustand";
import type { CourseType, StudentDataType } from "../types";
import { persist } from "zustand/middleware";

export interface StudentStore {
  studentData: StudentDataType | null;
  activeCourse: CourseType | null;

  setStudentData: (data: StudentDataType | null) => void;
  setActiveCourse: (index: number) => void;
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

      setStudentData: (data) => {
        const activeCourse = data?.courses[data?.openedCourse];
        set({ studentData: data, activeCourse });
      },

      setActiveCourse: (index) => {
        const { studentData } = get();
        const courses = studentData?.courses;
        set({ activeCourse: courses ? courses[index] : null });
      },

      reset: () => {
        set({ studentData: null, activeCourse: null });
        localStorage.removeItem("student-storage");
      },
    }),
    {
      name: "student-storage",
    }
  )
);
