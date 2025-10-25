import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { getGhActivityByDayAPI } from "../apis/getGhActivityByDay.api";

export interface IGhActivityByDayResults {
  courseId: number;
  testId: number;
  testType: number;
  testTitle: string;
  testMode: string;
  marksObtain: number;
  testSession: string;
  fullMarks: number;
  correctCount: number;
  totalQuestions: number;
  incorrectCount: number;
  notAnsweredCount: number;
}

export const getGhActivityByDay = async (
  date: string | null,
  setLoadingGhActivityByDay: any
) => {
  const { studentData, activeCourse } = useStudentStore.getState();

  if (!studentData || !activeCourse) return null;

  if (!date) return null;

  const { loginId, token } = studentData;
  const courseId = activeCourse?.courseId;
  const studentId = studentData?.studentId;

  if (!loginId || !token || !courseId || !studentId) return null;

  setLoadingGhActivityByDay(true);

  try {
    const data = (await getGhActivityByDayAPI({
      loginId,
      token,
      courseId,
      studentId,
      date,
    })) as any;

    if (data?.length === 0) return null;
    return data ?? null;
  } catch (error) {
    console.log("Failed to load gh activity list: ", error);
    return null;
  } finally {
    setLoadingGhActivityByDay(false);
  }
};
