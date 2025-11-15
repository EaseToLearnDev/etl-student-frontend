// React
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

// Icons
import {
  ArrowLeftIcon,
  ChartBarIcon,
  ChartPieIcon,
  NoSymbolIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { LuFileChartColumn } from "react-icons/lu";

// Services
import {
  LoadStudentAnalyticsData,
  type AnalyticsResponseData,
} from "../services/loadStudentAnalyticsData";

// Hooks & Utils
import { usePageTracking } from "../../../hooks/usePageTracking";
import { gtmEvents } from "../../../utils/gtm-events";
import { pushToDataLayer } from "../../../utils/gtm";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { parseTimeString } from "../libs/utils";

// Components
import { Widget } from "../components/newreports/Widget";
import Button from "../../../components/Button";
import Tabs from "../../../components/Tabs";
import DrillDownComponents from "../components/newreports/DrillDownComponents";
import EmptyState from "../../../components/EmptyState";
import { TestAnalyticsSkeleton } from "./TestAnalyticsSkeleton";
import { Toast } from "../../../components/Toast";
import FirstTimeUserModal from "../../dashboard/components/FirstTimeUser";
import RenderablePieChart from "../../../components/RenderablePieChart";
import RenderableBarChart from "../../../components/RenderableBarChart";
import TImeManagementCards from "../components/TImeManagementCards";
import TestAnalyticsWidgets from "../components/TestAnalyticsWidgets";
import PerformanceOverview from "../components/PerformanceOverview";
import RenderableMultiBarChart from "../../../components/RenderableMultiDataBarChart";
import RenderableMultiDataRadialChart from "../../../components/RenderableMultiDataRadioChart";


interface TabItem {
  label: string;
  count?: number;
  hidden?: boolean;
  content: React.ReactNode;
}

export const TestAnalyticsOverview = () => {
  const params = useSearchParams();
  const testSession = params[0].get("testSession");
  const testType = params[0].get("testType")
    ? Number(params[0]?.get("testType"))
    : null;

  const showFtuModal = useStudentStore((s) => s.showFtuModal);
  const setShowFtuModal = useStudentStore((s) => s.setShowFtuModal);

  const loading = useLoadingStore((s) => s.loading);
  const [data, setData] = useState<AnalyticsResponseData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDelayedFtuModal, setShowDelayedFtuModal] =
    useState<boolean>(false);
  const navigate = useNavigate();

  // Fire a page-view event depending on the test type.
  // Use a switch for clarity and easier future extension.
  const _pageEvent = (() => {
    let event;

    switch (testType) {
      case 3:
        event = gtmEvents.detail_report_mock_test_page_visit;
        break;
      case 2:
        event = gtmEvents.detail_report_topic_test_page_visit;
        break;
      case 4:
        event = gtmEvents.detail_report_class_test_page_visit;
        break;
      case 5:
        event = gtmEvents.detail_report_class_mock_test_page_visit;
        break;
      case 1:
        event = gtmEvents.detail_report_competitive_session_page_visit;
        break;
      default:
        event = "null";
    }

    return event;
  })();

  usePageTracking(_pageEvent);

  if (!testSession) {
    return (
      <EmptyState
        title="No Test Selected"
        description="Please go back and choose a test session."
        buttonText="Go Back!"
        onClick={() => navigate("/report")}
      />
    );
  }

  useEffect(() => {
    const fetchAnalyticData = async () => {
      try {
        const data = await LoadStudentAnalyticsData(testSession);
        if (data) setData(data);
      } catch (error) {
        console.log("Error Fetching Analytical data: ", error);
      }
    };

    fetchAnalyticData();

    const timer = setTimeout(() => {
      if (showFtuModal) {
        setShowDelayedFtuModal(true);
      }
    }, 30_000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <TestAnalyticsSkeleton />;

  if (!data)
    return (
      <EmptyState
        icon={<NoSymbolIcon width={80} height={80} />}
        title="Progress Not Available"
        className="mb-2"
      />
    );

  const SectionGraphData = [
    {
      name: "Full Marks",
      "Full Marks": data.fullMarks,
    },
    {
      name: "Marks Obtained",
      "Obtained Marks": data.marksObtain,
    },
  ];

  const averageTimeData = [
    {
      name: "Available Time",
      "Available Time": data.totalTime,
    },
    {
      name: "Time Taken on Attempted Questions",
      "Time Taken": parseTimeString(data.timeSpentMinutes),
    },
  ];

  const scorePercentage =
    data.marksObtain && data.fullMarks
      ? Math.max(0, (data.marksObtain / data.fullMarks) * 100)
      : 0;

  const correctPercentage =
    data.totalQuestion && data.correctAnswers
      ? (data.correctAnswers / data.totalQuestion) * 100
      : 0;

  const incorrectPercentage =
    data.totalQuestion && data.incorrectAnswers
      ? (data.incorrectAnswers / data.totalQuestion) * 100
      : 0;

  const timeUsedPercentage = data.timeTakenPercent || 0;

  const overallPerformanceData =
    data.overallPerformanceList?.map((item) => ({
      name: item.name || "",
      value: item.y || 0,
      color: item.color || "#8884d8",
    })) || [];

  const timeManagement = [
    { name: "Time Taken", value: data.timeTakenPercent, color: "#8884d8" },
    {
      name: "Time Remaning",
      value: data.timeRemainingPercent,
      color: "#43f4d8",
    },
  ];

  const sectionPerformanceData =
    data.sectionPerformanceList
      ?.filter((item) => item.name && item.data)
      ?.map((item) => ({
        name: item.name || "",
        value: (item.data || []).reduce(
          (sum: number, val: number) => sum + (val || 0),
          0
        ),
        color: item.color || "#8884d8",
      })) || [];

  const TopperColors = ["#3b82f6", "#2CDDC7", "#10b981", "#ef4444", "#8b5cf6"];
  const scoreLevels = data.topperCompare.map((item, index) => ({
    name: item.title,
    value: item.score,
    fill: TopperColors[index % TopperColors.length],
  }));

  const groupedData = data.topperCompare.map((item) => {
    const [minutes, seconds] = item.timeSpent.split(":").map(Number);
    const totalMinutes = minutes + seconds / 60;
    return {
      title: item.title,
      Correct: item.correctQuestions,
      Incorrect: item.incorrectQuestions,
      Unattempted: item.unattemptedQuestions,
      TimeSpent: parseFloat(totalMinutes.toFixed(2)),
    };
  });

  // Tab content components
  const OverallPerformanceTab = () => (
    <>
      <div className="mb-3">
        {/* Progress Bar */}
        <Widget title="Progress" className="w-full">
          {data?.progressBarObj ? (
            <div className="flex flex-col gap-4 px-6 py-4">
              <div className="w-full bg-[var(--surface-bg-tertiary)] rounded-full h-6 overflow-hidden relative">
                <div
                  className="h-6 rounded-full transition-all duration-500"
                  style={{
                    width: `${data.progressBarObj.percentage}%`,
                    backgroundColor: data.progressBarObj.barColor,
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[var(--text-primary)]">
                  {data.progressBarObj.percentage}%
                </span>
              </div>

              <p className="text-[var(--text-secondary)] text-center">
                not upto mark. Continue Learning
              </p>
            </div>
          ) : (
            <EmptyState
              title="No analytics data available"
              description="No learning analytics data is available yet. Start engaging with tests, activities, or courses to see your progress here!"
              icon={<LuFileChartColumn className="w-24 h-24" />}
              className="max-w-md"
              buttonText="Go Back"
              onClick={() => navigate("/report")}
            />
          )}
        </Widget>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Overall Performance Pie Chart */}
        <Widget className="p-5">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartPieIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
            Overall Performance Breakdown
          </h5>

          <div className="grid grid-cols-1 gap-4">
            <RenderablePieChart
              data={overallPerformanceData}
              total={data.totalQuestion}
              label="Total Questions"
            />
          </div>
        </Widget>

        {/* Section Performance Bar Chart */}
        <Widget className="p-5">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#5a5fd7]" />
            Result
          </h5>
          {sectionPerformanceData.length > 0 && (
            <RenderableBarChart
              data={SectionGraphData}
              height={500}
              bars={[
                { dataKey: "Full Marks", color: "#5a5fd7" },
                { dataKey: "Obtained Marks", color: "#10b981" },
              ]}
            />
          )}
        </Widget>
      </div>
    </>
  );

  const PerformanceInDetailTab = () => (
    <>
      <DrillDownComponents section={data.sectionSet} />
    </>
  );

  const TimeManagementTab = () => (
    <div>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        {/* Time Taken Graph */}
        <Widget className="p-5  flex-1 ">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartPieIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
            Time Distribution
          </h5>

          <div className="grid grid-cols-1 gap-4">
            <RenderablePieChart
              data={timeManagement}
              total={data.timeTakenPercent}
              showPercentage={true}
              label="Time Taken"
            />
          </div>
        </Widget>

        {/* Average Time Comparison Graph */}
        <Widget className="p-5 flex-1">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#5a5fd7]" />
            Average Time Analysis
          </h5>

          <RenderableBarChart
            data={averageTimeData}
            formatter={(value) =>
              typeof value === "number"
                ? `${value.toFixed(2)} min`
                : `${value} min`
            }
            height={430}
            bars={[
              { dataKey: "Available Time", color: "#5a5fd7" },
              { dataKey: "Time Taken", color: "#10b981" },
            ]}
          />
        </Widget>
      </div>

      {/* Time Management Cards */}
      <TImeManagementCards
        data={{
          totalTime: data.totalTime,
          timeSpent: data.timeSpent,
          timeSpentMinutes: data.timeSpentMinutes,
          timeTakenPercent: data.timeTakenPercent,
          timeRemainingPercent: data.timeRemainingPercent,
          timeRemaining: data.timeRemaining,
          averageSpeedPerQuestionLabel: data.averageSpeedPerQuestionLabel,
        }}
      />
    </div>
  );

  const ComparativeStudyTab = () => (
    <div className="bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-3">
        <div className="p-2 bg-[var(--sb-ocean-bg-active)]/10 rounded-lg">
          <UserGroupIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
        </div>
        <h5>Compare yourself with Topper</h5>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
            <h6 className="text-[var(--text-primary)] mb-4">
              Correct / Incorrect / Unattempted / Time Spent Comparison
            </h6>

            {/* Multi Bar Graph */}
            {groupedData.length > 0 ? (
              <RenderableMultiBarChart
                data={groupedData}
                colors={{
                  Correct: "#282ECA",
                  Incorrect: "#4052F6",
                  Unattempted: "#96C0FF",
                  TimeSpent: "#2CDDC7",
                }}
                legendFormatter={(key) =>
                  key === "TimeSpent" ? "Time Spent (min)" : key
                }
              />
            ) : (
              <EmptyState
                title="No data available"
                description="No data available at the moment. Check back later or explore available activities to get started!"
                icon={<LuFileChartColumn className="w-24 h-24" />}
                className="max-w-md"
              />
            )}
          </div>

          <div className="bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
            <h6 className="text-[var(--text-primary)] mb-4">
              Scores Comparison
            </h6>

            {/* Multi Radial Bar Graph */}
            {scoreLevels.length > 0 ? (
              <RenderableMultiDataRadialChart
                data={scoreLevels}
                maxValue={data.fullMarks}
                showLegend={true}
                legendFormatter={(name) => name}
              />
            ) : (
              <EmptyState
                title="No data available"
                description="No data available at the moment. Check back later or explore available activities to get started!"
                icon={<LuFileChartColumn className="w-24 h-24" />}
                className="max-w-md"
              />
            )}
          </div>
        </div>

        {/* Your Performance Overview */}
        <PerformanceOverview
          data={{
            rank: data.rank,
            totalStudent: data.totalStudent,
            percentile: data.percentile,
          }}
        />
      </div>
    </div>
  );

  const tabs: TabItem[] = [
    {
      label: "OVERALL PERFORMANCE",
      content: <OverallPerformanceTab />,
    },
    {
      label: "VIEW ANSWERS",
      content: <></>,
    },
    {
      label: "PERFORMANCE IN DETAIL",
      content: <PerformanceInDetailTab />,
      hidden: testType !== 3,
    },
    {
      label: "TIME MANAGEMENT",
      content: <TimeManagementTab />,
    },
    {
      label: "COMPARATIVE STUDY",
      content: <ComparativeStudyTab />,
      hidden: testType !== 3,
    },
  ];

  const visibleTabs = tabs.filter((t) => !t.hidden);

  return (
    <div className="px-2 mb-3 container-wrapper">
      <Button
        onClick={() => {
          setData(null);
          navigate("/report");
        }}
        style="secondary"
        className="text-[var(--sb-ocean-bg-active)] hover:text-[var(--sb-ocean-bg-hover)] border-none mb-3"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <p>Back to Reports</p>
      </Button>

      <h4 className="text-[var(--text-primary)] mb-5">{data.testName}</h4>

      {/* Test Widgets */}
      <TestAnalyticsWidgets
        data={{
          marksObtain: data.marksObtain,
          fullMarks: data.fullMarks,
          percentageMarks: data.percentageMarks,
          correctAnswers: data.correctAnswers,
          totalQuestion: data.totalQuestion,
          incorrectAnswers: data.incorrectAnswers,
          spentTimeLabel: data.spentTimeLabel,
          totalTimeLabel: data.totalTimeLabel,
          timeTakenPercent: data.timeTakenPercent,
        }}
        scorePercentage={scorePercentage}
        correctPercentage={correctPercentage}
        incorrectPercentage={incorrectPercentage}
        timeUsedPercentage={timeUsedPercentage}
      />

      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <Tabs
          tabs={visibleTabs.map((t) => t.label)}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            const tabLabel = visibleTabs[index]?.label || `tab_${index}`;

            // create sanitized name for event/id
            const sanitized = tabLabel.toLowerCase().replace(/\s+/g, "_");
            const eventName = `${sanitized}_button_click`;

            // push event with id and testType (only include if not null)
            try {
              pushToDataLayer({
                event: eventName,
                id: sanitized,
                test_id: testType ?? undefined,
                test_title: tabLabel,
              });
            } catch (err) {
              console.warn("GTM pushToDataLayer failed:", err);
            }

            if (index === 1) {
              navigate(
                `/testview?testSession=${
                  testType === 3 ? "mt" : "st"
                }${testSession}`
              );
            }
            setSelectedIndex(index);
          }}
          tabClassName="rounded-lg py-3"
          activeTabClassName="rounded-lg py-3 bg-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-content-primary)]"
        />
      </div>
      <div className="mt-10">{visibleTabs[selectedIndex]?.content}</div>

      <FirstTimeUserModal
        isOpen={showDelayedFtuModal}
        onClose={() => {
          setShowDelayedFtuModal(false);
          setShowFtuModal(false);
        }}
      />

      {/* Toast */}
      {/* {showToast && toastData && (
        <Toast
          {...toastData}
          key={toastData.title}
          duration={toastData.duration}
        />
      )} */}
    </div>
  );
};
