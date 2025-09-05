import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { analytics } from "../api/analytics.api";

export interface AnalyticsResponseData {
  testSession: string;
  testName: string;
  submitDate: string;
  studentName: string;
  marksDivision: string;
  totalTimeLabel: string;
  spentTimeLabel: string;
  remainingTimeLabel: string;
  averageTimePerQuestionLabel: string;
  averageSpeedPerQuestionLabel: string;
  topicIds: string;
  percentageTime: number;
  testType: number;
  totalQuestion: number;
  averageSpeedPerQuestion: number;
  averageTimePerQuestion: number;
  totalTime: number;
  totalTimeSeconds: number;
  timeSpent: number;
  timeRemaining: number;
  rank: number;
  percentile: number;
  totalStudent: number;
  timeTakenPercent: number;
  timeRemainingPercent: number;
  fullMarks: number;
  marksObtain: number;
  correctMarks: number;
  incorrectMarks: number;
  notAnsweredMarks: number;
  timeSpentMinutes: string;
  remainingTime: string;
  correctAnswers: number;
  incorrectAnswers: number;
  notAnswers: number;
  attemptedQuestions: number;
  percentageCorrectAnswers: number;
  percentageIncorrectAnswers: number;
  percentageNotAnswers: number;
  questionWiseKnowledgeUnknown: number;
  questionWiseKnowledgeKnown: number;
  marksWiseKnowledgeUnknown: number;
  marksWiseKnowledgeKnown: number;
  percentageMarks: number;
  overallPerformanceList: OverallPerformanceList[];
  sectionPerformanceList: SectionPerformanceList[];
  sectionList: any[];
  sectionSet: any[];
  topperCompare: any[];
  helpCounter: number;
  progressBarObj: ProgressBarObject;
}

interface OverallPerformanceList {
  y: number;
  name: string;
  color: string;
}

interface SectionPerformanceList {
  name: string;
  data: any[];
  color: string;
}

interface ProgressBarObject {
  percentage: number;
  barColor: string;
}

export const LoadStudentAnalyticsData = async (testSession: string) => {
  const { studentData } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  setLoading(true);

  try {
    const data: AnalyticsResponseData = await analytics({
      loginId,
      token,
      testSession,
    });
    return data;
  } catch (error) {
    console.log("Error Loading Analytics Data: ", error);
    throw error;
  } finally {
    setLoading(false);
  }
};
