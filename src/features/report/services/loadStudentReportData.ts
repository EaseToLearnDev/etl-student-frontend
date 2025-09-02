import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { reportAnalytics } from "../api/reportAnalytics.api";

export interface ReportAnalyticsData {
  bloom: number;
  correctQuestions: number;
  examType: string;
  fullMarks: number;
  helpCounter: number;
  id: number;
  incorrectQuestions: number;
  marksObtain: number;
  mockTestName: string;
  submitDateTime: string;
  testSession: string;
  testType: string;
  testTypeId: number;
  timeSpent: string;
  totalQuestions: number;
  unattemptedQuestions: number;
}

export const loadStudentReportData = async () => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const {setLoading} = useLoadingStore.getState()

  if (!studentData || !activeCourse) return null;

  const { loginId, token } = studentData;
  const { courseId } = activeCourse;

  setLoading(true);
  try {
    const data : ReportAnalyticsData[] = await reportAnalytics({ loginId, token, courseId });
    return data ?? null;
  } catch (error) {
    console.log("Error loading Student Report Data: ", error);
    throw error;
  } finally {
    setLoading(false);
  }
};
