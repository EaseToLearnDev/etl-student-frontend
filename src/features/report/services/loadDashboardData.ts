// Hooks
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Apis
import { dashboard } from "../api/dashboard.api";
import type { TestData } from "../report.types";

export const loadDashboardData = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const courseId = activeCourse?.courseId;

  if (!loginId || !token || !courseId) return null;

  setLoading(true);
  try {
    const list = (await dashboard({ courseId, loginId, token })) as TestData[];
    return list ?? null;
  } catch (error) {
    return null;
  } finally {
    setLoading(false);
  }
};
