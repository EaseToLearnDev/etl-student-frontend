import { useEffect, useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Widget } from "../components/newreports/Widget";
import Tabs from "../../../components/Tabs";
import { tintHexColor } from "../libs/reduceColorsContrast";
import {
  loadLearningAnalyticData,
  type LearningAnalyticsData,
} from "../services/loadLearningAnalyticData";
import EmptyState from "../../../components/EmptyState";
import { useNavigate, useSearchParams } from "react-router";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { LearningSessionOverviewSkeleton } from "../components/LearningSessonOverviewSkeleton";
import Button from "../../../components/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const LearningSessionOverview = () => {
  const params = useSearchParams();
  const testSession = params[0].get("testSession");
  const loading = useLoadingStore((s) => s.loading);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState<LearningAnalyticsData | null>(null);

  const navigate = useNavigate();

  if (!testSession) {
    return (
      <EmptyState
        title="No Test Selected"
        description="Please go back and choose a test session."
      />
    );
  }

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
  }, []);

  if (loading) return <LearningSessionOverviewSkeleton />;

  if (!data) return <EmptyState title="No Data Available" />;

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

  const renderPieChart = (data: any[], total: number, label: string) => (
    <div className="relative mx-auto w-[290px] h-[290px] sm:w-[340px] sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%" className="relative z-10">
        <RechartsPieChart>
          <Pie
            cx="50%"
            cy="50%"
            dataKey="value"
            innerRadius="42%"
            outerRadius="70%"
            paddingAngle={4}
            data={data}
            cornerRadius={6}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={tintHexColor(entry.color, 0.4)}
                stroke={tintHexColor(entry.color, 0.1)}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] flex flex-col items-center justify-center rounded-full shadow-[0px_4px_20px_0px_#00000029] bg-[var(--surface-bg-primary)]">
          <p className="text-center text-[var(--text-secondary)] whitespace-pre-line px-4">
            {label}
          </p>
          <h5 className="text-[var(--text-primary)]">{total}</h5>
        </div>
      </div>
    </div>
  );

  const tabs = [
    {
      label: "Performance",
      content: (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Widget title="Overall" className="h-[420px]">
              <div className="flex items-center justify-center h-full">
                {renderPieChart(
                  overallPerformanceData,
                  data.totalQuestion,
                  "Total Questions"
                )}
              </div>
            </Widget>
            <Widget title="With Help" className="h-[420px]">
              <div className="flex items-center justify-center h-full">
                {renderPieChart(
                  withHelpData,
                  data.helpCounter,
                  "Help in Questions"
                )}
              </div>
            </Widget>
            <Widget title="Without Help" className="h-[420px]">
              <div className="flex items-center justify-center h-full">
                {renderPieChart(
                  withoutHelpData,
                  data.totalQuestion - data.helpCounter,
                  "Without Help"
                )}
              </div>
            </Widget>
          </div>
        </div>
      ),
    },
    {
      label: "View Answers",
      content: <></>,
    },
  ];

  return (
    <div className="container-wrapper px-10">
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
            not upto mark. Continue Learning
          </p>
        </div>
      </Widget>

      <div className="mt-6 mb-4">{tabs[selectedIndex].content}</div>
    </div>
  );
};
