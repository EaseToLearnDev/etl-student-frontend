// React
import { useEffect, useLayoutEffect, useRef, useState, type JSX } from "react";

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
import EmptyState from "../../../components/EmptyState";
import ReportTablePage from "../components/ReportTablePage";
import { useNavigate } from "react-router";
import { loadTablsForReports } from "../services/loadTabsForReports";
import { LuFileUser } from "react-icons/lu";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";
const REPORT_CATEGORY_TAB_ID = "report-category-tabs";
const report_test_detail_click = "report_test_detail_click";

const StudentReport = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [reportData, setReportData] = useState<TestReportdata[]>([]);
  const [sessionData, setSessionData] = useState<LearningSessionData[]>([]);
  const tabTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { loading } = useLoadingStore.getState();
  const navigate = useNavigate();

  const tabs = ["Overview", ...loadTablsForReports()];

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
            examType: item.examType,
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
            marksObtain: item.marksObtain,
            fullMarks: item.fullMarks,
            testType: item.testType,
            examType: item.examType,
            date: item.submitDateTime,
            totalQuestions: item.totalQuestions,
            helpCounter: item.helpCounter,
            correct: item.correctQuestions,
            incorrect: item.incorrectQuestions,
            unattempted: item.unattemptedQuestions,
            testTypeId: item.testTypeId,
            testSession: item.testSession,
            timeSpent: item.timeSpent,
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
    const { testSession, testType, examType } = reportData;

    if (examType === "subjective") {
      navigate(`/testview?testSession=st${testSession}`);
      return;
    }

    let type = 0;
    if (testType === "Learning Session" || testType === "Competitive Session") {
      type = 1;
    } else if (testType === "Topic Test") {
      type = 2;
    } else if (testType === "Mock Test") {
      type = 3;
    } else if (testType === "Class Test") {
      type = 4;
    }
    pushToDataLayer({
      event: gtmEvents.report_test_detail_click,
      testType: testType,
      id : report_test_detail_click
    })

    if (testType === "Learning Session") {
      navigate(
        `/learning-testanalytics?testSession=${testSession}&testType=${type}`
      );
    } else {
      navigate(`/testanalytics?testSession=${testSession}&testType=${type}`);
    }
  };

  if (!reportData || !sessionData)
    return (
      <EmptyState
        title="No student report data available"
        description="No student reports are available yet. Once tests, activities, or assignments are completed, reports will appear here!"
        icon={<LuFileUser className="w-24 h-24" />}
        className="max-w-md"
      />
    );

  const tabContentsMap: Record<string, JSX.Element> = {
    Overview: <ReportOverviewPage />,
    "Learning Sessions": (
      <ReportLearningSessionPage
        data={sessionData}
        onViewMore={handleViewMore}
      />
    ),
    "Competitive Sessions": (
      <ReportTablePage
        data={reportData}
        onViewMore={handleViewMore}
        testTypeId={1}
        title="Competitive Sessions"
        emptyTitle="No Competitive Session Data Available"
      />
    ),
    "Topic Tests": (
      <ReportTablePage
        data={reportData}
        onViewMore={handleViewMore}
        testTypeId={2}
        title="Topic Tests"
        emptyTitle="No Topic Test Data Available"
      />
    ),
    "Mock Tests": (
      <ReportTablePage
        data={reportData}
        onViewMore={handleViewMore}
        testTypeId={3}
        title="Mock Tests"
        emptyTitle="No Mock Test Data Available"
      />
    ),
    "Class Tests": (
      <ReportTablePage
        data={reportData}
        onViewMore={handleViewMore}
        testTypeId={4}
        title="Class Tests"
        emptyTitle="No Class Test Data Available"
      />
    ),
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
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
                // id={REPORT_CATEGORY_TAB_ID}
                key={tab}
                data-index={index}
                onClick={() => {
                  // Clear any existing timer when switching tabs
                  if (tabTimerRef.current) {
                    clearTimeout(tabTimerRef.current);
                  }
                  
                  setSelectedTabIndex(index);
                  
                  // Set new timer - only call pushToDataLayer if user stays on tab for 3 seconds
                  tabTimerRef.current = setTimeout(() => {
                    pushToDataLayer({
                      event: gtmEvents.report_category_tab_click,
                      tab: tab,
                      id: REPORT_CATEGORY_TAB_ID
                    });
                  }, 3000);
                }}
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

      {/* Content (only this scrolls) */}
      <div className="mt-5 flex-1 overflow-y-auto">
        {loading && selectedTabIndex != 0 ? (
          <TableSkeleton />
        ) : (
          tabContentsMap[tabs[selectedTabIndex]]
        )}
      </div>
    </div>
  );
};

export default StudentReport;
