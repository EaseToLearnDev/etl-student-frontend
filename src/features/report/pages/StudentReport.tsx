// React
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Utils
import cn from "../../../utils/classNames";

// Components
import ReportLearningSessionPage, {
  type LearningSessionData,
} from "./ReportLearningSessionPage";

// Services
import { loadStudentReportData } from "../services/loadStudentReportData";
import type { TestReportdata } from "./ReportMockTestPage";
import ReportOverviewPage from "./ReportOverviewPage";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { TableSkeleton } from "../../../components/TableSkeleton";
import { ReportOverviewSkeleton } from "../../../components/ReportOverviewSkeleton";
import EmptyState from "../../../components/EmptyState";
import ReportTablePage from "../components/ReportTablePage";
import { useNavigate } from "react-router";

const StudentReport = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [reportData, setReportData] = useState<TestReportdata[]>([]);
  const [sessionData, setSessionData] = useState<LearningSessionData[]>([]);

  const { loading } = useLoadingStore.getState();
  const navigate = useNavigate();

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

  const handleViewMore = (reportData: TestReportdata | LearningSessionData) => {
    const { testSession, testType } = reportData;
    let type = 0;
    if(testType === 'Learning Session' || testType === "Competitive Session") {
      type = 1
    } else if(testType === "Topic Test") {
      type = 2;
    } else if(testType === "Mock Test") {
      type = 3;
    } else if(testType === "Class Test") {
      type = 4;
    }

    if (testType === "Learning Session") {
      navigate(`/learning-testanalytics?testSession=${testSession}&testType=${type}`);
    } else {
      navigate(`/testanalytics?testSession=${testSession}&testType=${type}`);
    }
  };

  if (!reportData || !sessionData)
    return <EmptyState title="No Report Data Available" />;

  const tabContents = [
    <ReportOverviewPage />,
    <ReportLearningSessionPage
      data={sessionData}
      onViewMore={handleViewMore}
    />,
    <ReportTablePage
      data={reportData}
      onViewMore={handleViewMore}
      testTypeId={1}
      title="Competitive Session"
      emptyTitle="No Competitive Session Data Available"
    />,
    <ReportTablePage
      data={reportData}
      onViewMore={handleViewMore}
      testTypeId={2}
      title="Topic Test"
      emptyTitle="No Topic Test Data Available"
    />,
    <ReportTablePage
      data={reportData}
      onViewMore={handleViewMore}
      testTypeId={3}
      title="Mock Test"
      emptyTitle="No Mock Test Data Available"
    />,
    <ReportTablePage
      data={reportData}
      onViewMore={handleViewMore}
      testTypeId={4}
      title="Class Test"
      emptyTitle="No Class Test Data Available"
    />,
  ];

  return (
    <div>
        {/* Replacing Tabs with scrollable tab bar */}
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
    </div>
  );
};

export default StudentReport;
