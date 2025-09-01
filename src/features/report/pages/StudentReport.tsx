// React
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Utils
import cn from "../../../utils/classNames";

// Icons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Components
import Button from "../../../components/Button";
import ReportCompetitiveSessionPage from "./ReportCompetitiveSessionPage";
import ReportTopicTestPage from "./ReportTopicTestPage";
import ReportMockTestPage from "./ReportMockTestPage";
import ReportClassTestPage from "./ReportClassTestPage";
import ReportLearningSessionPage, {
  type LearningSessionData,
} from "./ReportLearningSessionPage";
import { TopicTestOverview } from "./TopicTestOverview";
import { LearningSessionOverview } from "./LearningSessionOverview";

// Services
import { loadStudentReportData } from "../services/loadStudentReportData";
import type { TestReportdata } from "./ReportMockTestPage";
import {
  LoadStudentAnalyticsData,
  type AnalyticsResponseData,
} from "../services/loadStudentAnalyticsData";
import {
  loadLearningAnalyticData,
  type LearningAnalyticsData,
} from "../services/loadLearningAnalyticData";
import ReportOverviewPage from "./ReportOverviewPage";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { TableSkeleton } from "../../../components/TableSkeleton";
import { ReportOverviewSkeleton } from "../../../components/ReportOverviewSkeleton";

const StudentReport = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [reportData, setReportData] = useState<TestReportdata[]>([]);
  const [sessionData, setSessionData] = useState<LearningSessionData[]>([]);
  const [analyticsData, setAnalyticsData] =
    useState<AnalyticsResponseData | null>(null);
  const [learningSessionAnalyticsData, setLearningSessionAnalyticsData] =
    useState<LearningAnalyticsData | null>(null);

  const { loading } = useLoadingStore.getState();

  const tabs = [
    "Overview",
    "Learning Session",
    "Competitive Session",
    "Topic Tests",
    "Mock Tests",
    "Class Tests",
  ];

  // Indicator logic
  const menuRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    x?: number;
    scaleX?: number;
  }>({});

  useLayoutEffect(() => {
    if (!menuRef.current) return;
    const activeElement = menuRef.current.querySelector(
      `[data-index="${selectedTabIndex}"]`
    ) as HTMLElement | null;

    if (activeElement) {
      setIndicatorStyle({
        x: activeElement.offsetLeft,
        scaleX: activeElement.offsetWidth,
      });

      // Scroll into view
      activeElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedTabIndex]);

  // Fetch Data
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
        if (data) setLearningSessionAnalyticsData(data);
      } catch (error) {
        console.log("Error Fetching Learning Analytical Data: ", error);
      }
    } else {
      try {
        const data = await LoadStudentAnalyticsData(testSession);
        if (data) setAnalyticsData(data);
      } catch (error) {
        console.log("Error Fetching Analytical data: ", error);
      }
    }
  };

  const tabContents = [
    <ReportOverviewPage />,
    <ReportLearningSessionPage
      data={sessionData}
      onViewMore={handleViewMore}
    />,
    <ReportCompetitiveSessionPage
      data={reportData}
      onViewMore={handleViewMore}
    />,
    <ReportTopicTestPage data={reportData} onViewMore={handleViewMore} />,
    <ReportMockTestPage data={reportData} onViewMore={handleViewMore} />,
    <ReportClassTestPage data={reportData} onViewMore={handleViewMore} />,
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
        // Replacing Tabs with scrollable tab bar
        <div className="relative mt-3">
          <div
            ref={menuRef}
            className="relative flex gap-3 items-center border-b border-b-[var(--border-tertiary)] overflow-x-auto scrollbar-hide"
          >
            {/* Moving indicator */}
            <div
              className="absolute bottom-0 h-[2px] bg-[var(--sb-ocean-bg-active)] transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(${indicatorStyle.x || 0}px) scaleX(${
                  (indicatorStyle.scaleX || 1) / 100
                })`,
                width: "100px",
                transformOrigin: "left",
              }}
            />
            {tabs.map((tab, index) => {
              const isActive = selectedTabIndex === index;
              return (
                <button
                  key={tab}
                  data-index={index}
                  onClick={() => setSelectedTabIndex(index)}
                  className={cn(
                    "px-5 py-2 text-[var(--text-secondary)] rounded-md transition-colors duration-200 whitespace-nowrap",
                    isActive && "text-[var(--sb-ocean-bg-active)]"
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {analyticsData ? (
        <TopicTestOverview data={analyticsData} />
      ) : learningSessionAnalyticsData ? (
        <LearningSessionOverview data={learningSessionAnalyticsData} />
      ) : (
        <div className="mt-5">
          {loading ? (
            selectedTabIndex === 0 ? (
              <ReportOverviewSkeleton />
            ) : (
              <TableSkeleton /> 
            )
          ) : (
            tabContents[selectedTabIndex]
          )}
        </div>
      )}
    </div>
  );
};

export default StudentReport;
