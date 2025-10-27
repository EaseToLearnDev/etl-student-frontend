import { useStudentStore } from "../../features/shared/hooks/useStudentStore";

export const handleFetchMyCourses = async () => {
  try {
    const { studentData } = useStudentStore.getState();
    if (!studentData) return;

    const { loginId, token } = studentData;
  } catch (error) {}
};
