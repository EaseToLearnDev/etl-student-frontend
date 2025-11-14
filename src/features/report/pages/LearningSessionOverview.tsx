// Reacts
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

// Components
import { Widget } from "../components/newreports/Widget";
import Tabs from "../../../components/Tabs";
import { LearningSessionOverviewSkeleton } from "../components/LearningSessonOverviewSkeleton";
import EmptyState from "../../../components/EmptyState";
import Button from "../../../components/Button";
import { Toast } from "../../../components/Toast";
import RenderablePieChart from "../../../components/RenderablePieChart";

// Services
import {
  loadLearningAnalyticData,
  type LearningAnalyticsData,
} from "../services/loadLearningAnalyticData";

// Hooks & Utils
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { usePageTracking } from "../../../hooks/usePageTracking";
import { gtmEvents } from "../../../utils/gtm-events";

// Icons
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { LuFileChartColumn } from "react-icons/lu";


export const LearningSessionOverview = () => {
  const params = useSearchParams();
  const testSession = params[0].get("testSession");
  const loading = useLoadingStore((s) => s.loading);
  const toastData = useToastStore((s) => s.toastData);
  const showToast = useToastStore((s) => s.showToast);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState<LearningAnalyticsData | null>(null);

  const navigate = useNavigate();

  // Track viewing the learning session overview page
  usePageTracking(gtmEvents.detail_report_learning_session_page_visit);


  useEffect(() => {
    if (!testSession) return;
    const fetchAnalyticData = async () => {
      try {
        const data = await loadLearningAnalyticData(testSession);
        if (data) setData(data);
      } catch (error) {
        console.log("Error Fetching Learning Analytical Data: ", error);
      }
    };
    fetchAnalyticData();
  }, [testSession]);

  if (loading) return <LearningSessionOverviewSkeleton />;

  if (!testSession || !data) {
    return (
      <EmptyState
        title="No analytics data available"
        description="No learning analytics data is available yet. Start engaging with tests, activities, or courses to see your progress here!"
        icon={<LuFileChartColumn className="w-24 h-24" />}
        className="max-w-md"
        buttonText="Go Back"
        onClick={() => navigate("/report")}
      />
    );
  }

  const overallPerformanceData = data.overallResultList.map((d) => ({
    name: d.name,
    value: d.y,
    color: d.color,
  }));

  const withHelpData = data.resultWithHelpList.map((d) => ({
    name: d.name,
    value: d.y,
    color: d.color,
  }));

  const withoutHelpData = data.resultWithoutHelpList.map((d) => ({
    name: d.name,
    value: d.y,
    color: d.color,
  }));

  const tabs = [
    {
      label: "PERFORMANCE",
      content: (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Widget title="Overall">
              <div className="flex items-center justify-center h-full">
                <RenderablePieChart
                  data={overallPerformanceData}
                  total={data.totalQuestion}
                  label={"Total Questions"}
                />
              </div>
            </Widget>
            <Widget title="With Help">
              <div className="flex items-center justify-center h-full">
                <RenderablePieChart
                  data={withHelpData}
                  total={data.helpCounter}
                  label="Help in Questions"
                />
              </div>
            </Widget>
            <Widget title="Without Help">
              <div className="flex items-center justify-center h-full">
                <RenderablePieChart
                  data={withoutHelpData}
                  total={data.totalQuestion - data.helpCounter}
                  label="Without Help"
                />
              </div>
            </Widget>
          </div>
        </div>
      ),
    },
    {
      label: "VIEW ANSWERS",
      content: <></>,
    },
  ];

  return (
    <div>
      <Button
        onClick={() => {
          setData(null);
          navigate("/report");
        }}
        style="secondary"
        className="text-[var(--sb-ocean-bg-active)] hover:text-[var(--sb-ocean-bg-hover)] border-none mb-3 mt-1"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <p>Back to Reports</p>
      </Button>

      <Widget title={data.testName} subtitle={data.submitDate}>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <div className="flex-1 min-w-[150px] h-24 rounded-lg bg-[var(--surface-bg-tertiary)] flex flex-col justify-center items-center gap-2">
            <p>Total Questions</p>
            <h5>{data.totalQuestion}</h5>
          </div>
          <div className="flex-1 min-w-[150px] h-24 rounded-lg bg-blue-400/10 flex flex-col justify-center items-center gap-2">
            <p>Help in Questions</p>
            <h5>{data.helpCounter}</h5>
          </div>
          <div className="flex-1 min-w-[150px] h-24 rounded-lg bg-green-400/10 flex flex-col justify-center items-center gap-2">
            <p>Correct</p>
            <h5>{data.correctQuestion}</h5>
          </div>
          <div className="flex-1 min-w-[150px] h-24 rounded-lg bg-violet-400/10 flex flex-col justify-center items-center gap-2">
            <p>Incorrect</p>
            <h5>{data.incorrectQuestion}</h5>
          </div>
          <div className="flex-1 min-w-[150px] h-24 rounded-lg bg-orange-400/10 flex flex-col justify-center items-center gap-2">
            <p>Unattempted</p>
            <h5>{data.unattemptedQuestion}</h5>
          </div>
        </div>
      </Widget>

      <div className="mt-8">
        <Tabs
          tabs={tabs.map((t) => t.label)}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            if (index === 1) {
              navigate(`/testview?testSession=ls${testSession}`);
            }
            setSelectedIndex(index);
          }}
          tabClassName="rounded-lg py-3"
          activeTabClassName="rounded-lg py-3 bg-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-content-primary)]"
        />
      </div>

      <Widget title="Progress" className="w-full mt-5">
        <div className="flex flex-col gap-4 px-6 py-4">
          <div className="w-full bg-[var(--surface-bg-tertiary)] rounded-full h-6 overflow-hidden relative">
            <div
              className="h-6 rounded-full transition-all duration-500"
              style={{
                width: `${data?.progressBarObj?.percentage ?? 0}%`,
                backgroundColor: data?.progressBarObj?.barColor ?? "",
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[var(--text-primary)]">
              {data?.progressBarObj?.percentage ?? 0}%
            </span>
          </div>

          <p className="text-[var(--text-secondary)] text-center">
            Not upto mark. Continue Learning
          </p>
        </div>
      </Widget>

      <div className="mt-6 mb-4">{tabs[selectedIndex].content}</div>

      {/* Toast */}
      {showToast && toastData && (
        <Toast
          {...toastData}
          key={toastData.title}
          duration={toastData.duration}
        />
      )}
    </div>
  );
};
