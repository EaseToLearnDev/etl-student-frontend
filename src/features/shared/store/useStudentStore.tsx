import { create } from "zustand";
import type { StudentDataType } from "../types";
import { persist } from "zustand/middleware";

export interface StudentStore {
  studentData: StudentDataType | null;
  setStudentData: (data: StudentDataType | null) => void;
  reset: () => void;
}

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      studentData: null,
      setStudentData: (data) => set({ studentData: data }),
      reset: () => {
        set({ studentData: null });
        localStorage.removeItem("student-storage");
      },
    }),
    {
      name: "student-storage", // name of the item in the storage (must be unique)
    }
  )
);
