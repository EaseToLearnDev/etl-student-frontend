import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { learningAnalytics } from "../api/learningAnalytics.api";

export interface LearningAnalyticsData {
  correctQuestion: number;
  helpCounter: number;
  incorrectQuestion: number;
  overallResultList: OverallResultList[];
  progressBarObj: ProgressBarObject;
  resultWithHelpList: ResultWithHelpList[];
  resultWithoutHelpList: ResultWithoutHelpList[];
  submitDate: string;
  testName: string;
  totalQuestion: number;
  unattemptedQuestion: number;
}

interface OverallResultList {
  y: number;
  name: string;
  color: string;
}

interface ProgressBarObject {
  percentage: number;
  barColor: string;
}

interface ResultWithHelpList {
  y: number;
  name: string;
  color: string;
}

interface ResultWithoutHelpList {
  y: number;
  name: string;
  color: string;
}

export const loadLearningAnalyticData = async (testSession: string) => {
  const { studentData } = useStudentStore.getState();
  const {setLoading} = useLoadingStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  setLoading(true);
  try {
    const data : LearningAnalyticsData = await learningAnalytics({ testSession, loginId, token });
    return data ?? null;
  } catch (error) {
    console.log("Failed to Load Learning Session Analytic Data: ", error);
    throw error;
  } finally {
    setLoading(false);
  }
};
