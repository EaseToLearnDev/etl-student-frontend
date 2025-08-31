import { useState, useEffect } from "react";
import Tabs from "../../../components/Tabs";
import ReportCompetitiveSessionPage from "./ReportCompetitiveSessionPage";
import ReportTopicTestPage from "./ReportTopicTestPage";
import ReportMockTestPage from "./ReportMockTestPage";
import ReportClassTestPage from "./ReportClassTestPage";
import ReportLearningSessionPage, {
  type LearningSessionData,
} from "./ReportLearningSessionPage";
import { loadStudentReportData } from "../services/loadStudentReportData";
import type { TestReportdata } from "./ReportMockTestPage";
import {
  LoadStudentAnalyticsData,
  type AnalyticsResponseData,
} from "../services/loadStudentAnalyticsData";
import { TopicTestOverview } from "./TopicTestOverview";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/Button";
import {
  loadLearningAnalyticData,
  type LearningAnalyticsData,
} from "../services/loadLearningAnalyticData";
import { LearningSessionOverview } from "./LearningSessionOverview";

const StudentReport = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [reportData, setReportData] = useState<TestReportdata[]>([]);
  const [sessionData, setSessionData] = useState<LearningSessionData[]>([]);
  const [analyticsData, setAnalyticsData] =
    useState<AnalyticsResponseData | null>(null);
  const [learningSessionAnalyticsData, setLearningSessionAnalyticsData] =
    useState<LearningAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const data = await loadStudentReportData();
        if (data) {
          const mappedData: TestReportdata[] = data.map((item) => ({
            testTitle: item.mockTestName,
            testType: item.testType,
            date: item.submitDateTime,
            totalQuestions: item.totalQuestions,
            fullMarks: item.fullMarks,
            marksObtain: item.marksObtain,
            timeSpent: item.timeSpent,
            testSession: item.testSession,
            testTypeId: item.testTypeId,
          }));
          const mappedSessionData: LearningSessionData[] = data.map((item) => ({
            testTitle: item.mockTestName,
            testType: item.testType,
            date: item.submitDateTime,
            totalQuestions: item.totalQuestions,
            helpCounter: item.helpCounter,
            correct: item.correctQuestions,
            incorrect: item.incorrectQuestions,
            unattempted: item.unattemptedQuestions,
            testSession: item.testSession,
          }));
          setReportData(mappedData);
          setSessionData(mappedSessionData);
        }
      } catch (err) {
        console.error("Error loading report:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleViewMore = async (
    reportData: TestReportdata | LearningSessionData
  ) => {
    const testSession = reportData.testSession;
    if (reportData.testType === "Learning Session") {
      try {
        const data = await loadLearningAnalyticData(testSession);
        console.log(data)
        if (data) {
          setLearningSessionAnalyticsData(data);
        }
      } catch (error) {
        console.log("Error Fetching Learning Analytical Data: ", error);
        throw error;
      }
    } else {
      try {
        const data = await LoadStudentAnalyticsData(testSession);
        console.log(data)
        if (data) {
          setAnalyticsData(data);
        }
      } catch (error) {
        console.log("Error Fetching Analytical data: ", error);
        throw error;
      }
    }
  };

  const tabs = [
    {
      content: (
        <ReportLearningSessionPage
          data={sessionData}
          onViewMore={handleViewMore}
        />
      ),
    },
    {
      content: (
        <ReportCompetitiveSessionPage
          data={reportData}
          onViewMore={handleViewMore}
        />
      ),
    },
    {
      content: (
        <ReportTopicTestPage data={reportData} onViewMore={handleViewMore} />
      ),
    },
    {
      content: (
        <ReportMockTestPage data={reportData} onViewMore={handleViewMore} />
      ),
    },
    {
      content: (
        <ReportClassTestPage data={reportData} onViewMore={handleViewMore} />
      ),
    },
  ];

  return (
    <div>
      {analyticsData || learningSessionAnalyticsData ? (
        <Button
          onClick={() => {
            setAnalyticsData(null);
            setLearningSessionAnalyticsData(null);
          }}
          style="secondary"
          className="text-[var(--sb-ocean-bg-active)] hover:text-[var(--sb-ocean-bg-hover)] border-none mt-3"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <p>Back to Reports</p>
        </Button>
      ) : (
        <Tabs
          tabs={[
            "Learning Session",
            "Competitive Session",
            "Topic Tests",
            "Mock Tests",
            "Class Tests",
          ]}
          selectedIndex={selectedTabIndex}
          onSelect={setSelectedTabIndex}
          tabClassName="px-5 py-2 text-[var(--text-secondary)] rounded-full hover:bg-[var(--sb-ocean-bg-disabled)] hover:text-[var(--sb-ocean-bg-active)] transition-all duration-200"
          activeTabClassName="px-5 py-2 text-white bg-[var(--sb-ocean-bg-active)] rounded-full shadow-md"
        />
      )}

      {analyticsData ? (
        <TopicTestOverview data={analyticsData} />
      ) : learningSessionAnalyticsData ? (
        <LearningSessionOverview data={learningSessionAnalyticsData} />
      ) : (
        <div className="mt-5">
          {loading ? (
            <p className="text-center text-[var(--text-tertiary)]">
              Loading...
            </p>
          ) : (
            tabs[selectedTabIndex].content
          )}
        </div>
      )}
    </div>
  );
};

export default StudentReport;
