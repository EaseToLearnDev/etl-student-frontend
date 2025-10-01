import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Bar,
  Legend,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { useEffect, useState } from "react";
import { Widget } from "../components/newreports/Widget";
import {
  ArrowLeftIcon,
  BoltIcon,
  ChartBarIcon,
  ChartPieIcon,
  CheckCircleIcon,
  ClockIcon,
  NoSymbolIcon,
  PresentationChartLineIcon,
  StarIcon,
  // TrophyIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { tintHexColor } from "../libs/reduceColorsContrast";
import { FiTarget } from "react-icons/fi";
import CircleProgressBar from "../components/newreports/circularProgressBar";
import Tabs from "../../../components/Tabs";
import DrillDownComponents from "../components/newreports/DrillDownComponents";
import {
  LoadStudentAnalyticsData,
  type AnalyticsResponseData,
} from "../services/loadStudentAnalyticsData";
import EmptyState from "../../../components/EmptyState";
import { useNavigate, useSearchParams } from "react-router";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { TestAnalyticsSkeleton } from "./TestAnalyticsSkeleton";
import Button from "../../../components/Button";
import { formatMinutesToHHMMSS, parseTimeString } from "../libs/utils";

interface TabItem {
  label: string;
  count?: number;
  content: React.ReactNode;
}

export const TestAnalyticsOverview = () => {
  const params = useSearchParams();
  const testSession = params[0].get("testSession");
  const testType = params[0].get("testType")
    ? Number(params[0]?.get("testType"))
    : null;
  const loading = useLoadingStore((s) => s.loading);
  const [data, setData] = useState<AnalyticsResponseData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

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
  }, []);

  if (loading) return <TestAnalyticsSkeleton />;

  if (!data) return <EmptyState title="No Report Data Available" />;

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
      // "Time Remaning": data.timeRemaining,
      "Available Time": data.totalTime,
    },
    {
      name: "Time Taken on Attempted Questions",
      "Time Taken": parseTimeString(data.timeSpentMinutes),
      // "Total Time": data.totalTime,
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

  // Prepare data for pie charts
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

  const colors = {
    Correct: "#282ECA",
    Incorrect: "#4052F6",
    Unattempted: "#96C0FF",
    TimeSpent: "#2CDDC7",
  };

  // Tab content components
  const OverallPerformanceTab = () => (
    <>
      <div className="mb-3">
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
              icon={<NoSymbolIcon width={80} height={80} />}
              title="Progress Not Available"
              className="mb-2"
            />
          )}
        </Widget>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Widget className="p-5">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartPieIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
            Overall Performance Breakdown
          </h5>

          <div className="grid grid-cols-1 gap-4">
            {/* Pie Chart */}
            <div className="relative mx-auto size-[290px] sm:size-[340px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="relative z-10"
              >
                <RechartsPieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    innerRadius="42%"
                    outerRadius="70%"
                    fill="#8884d8"
                    paddingAngle={4}
                    data={overallPerformanceData}
                    cornerRadius={6}
                    label
                  >
                    {overallPerformanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={tintHexColor(entry.color, 0.4)}
                        stroke={tintHexColor(entry.color, 0.1)}
                      />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>

              <div className="absolute inset-24 flex flex-col items-center justify-center rounded-full shadow-[0px_4px_20px_0px_#00000029] sm:inset-28 bg-[var(--surface-bg-primary)]">
                <span className="text-center text-[var(--text-secondary)] whitespace-pre-line px-4">
                  Total Questions
                </span>
                <h5 className="text-[var(--text-primary)]">
                  {data.totalQuestion}
                </h5>
              </div>
            </div>

            {/* Legend and Details */}
            <div className="flex flex-col justify-center space-y-4">
              {overallPerformanceData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[var(--surface-bg-tertiary)] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <p
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-[var(--text-secondary)]">{item.name}</p>
                  </div>
                  <p className="text-[var(--text-primary)]">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </Widget>

        {/* Section Performance Bar Chart */}
        <Widget className="p-5">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#5a5fd7]" />
            Result
          </h5>
          {sectionPerformanceData.length > 0 && (
            <div className="mt-5 aspect-[1060/1000] h-full w-full lg:mt-7">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={SectionGraphData}
                  barSize={24}
                  margin={{
                    left: -10,
                  }}
                  className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    fill="transparent"
                    stroke="var(--border-secondary)"
                  />
                  <XAxis tickLine={false} dataKey="name" />
                  <YAxis tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--surface-bg-secondary)",
                      border: "1px solid var(--border-secondary)",
                      color: "var(--text-primary)",
                      borderRadius: 8,
                      boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                    }}
                    cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
                    wrapperStyle={{
                      outline: "none",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="Full Marks"
                    fill={tintHexColor("#5a5fd7", 0.3)}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Obtained Marks"
                    fill={tintHexColor("#10b981)", 0.3)}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Widget>
      </div>
    </>
  );

  // const ViewAnswersTab = () => (
  //   <div className="bg-[var(--surface-bg-secondary)] border border-[var(--border-secondary)] rounded-lg p-6">
  //     View Answers
  //   </div>
  // );

  const PerformanceInDetailTab = () => (
    <>
      <DrillDownComponents section={data.sectionSet} />
    </>
  );

  const TimeManagementTab = () => (
    <div>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
        <Widget className="p-5 flex-1 h-[560px]">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartPieIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
            Time Distribution
          </h5>

          <div className="grid grid-cols-1 gap-4">
            {/* Pie Chart */}
            {/* Pie Chart Wrapper */}
            <div className="relative mx-auto size-[290px] sm:size-[340px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="relative z-10"
              >
                <RechartsPieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    innerRadius="42%"
                    outerRadius="70%"
                    fill="#8884d8"
                    paddingAngle={4}
                    data={timeManagement}
                    cornerRadius={6}
                    label={false}
                  >
                    {timeManagement.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={tintHexColor(entry.color, 0.4)}
                        stroke={tintHexColor(entry.color, 0.1)}
                      />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>

              {/* Center Label */}
              <div className="absolute inset-[96px] sm:inset-[112px] flex flex-col items-center justify-center rounded-full shadow-[0px_4px_20px_0px_#00000029] bg-[var(--surface-bg-primary)]">
                <p className="text-[var(--text-secondary)] text-center whitespace-pre-line px-4">
                  Time Taken
                </p>
                <h5 className="text-[var(--text-primary)]">
                  {data.timeTakenPercent}%
                </h5>
              </div>
            </div>

            {/* Legend and Details */}
            <div className="flex flex-col justify-center space-y-4">
              {timeManagement.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[var(--surface-bg-tertiary)] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <p
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="text-[var(--text-secondary)]">{item.name}</p>
                  </div>
                  <p className="text-[var(--text-primary)]">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </Widget>

        <Widget className="p-5 flex-1 h-[560px] flex flex-col">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#5a5fd7]" />
            Average Time Analysis
          </h5>

          <div className="flex-1 flex items-center justify-center">
            <div className="mt-5 h-[400px] w-full lg:mt-7">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={averageTimeData}
                  barSize={24}
                  margin={{ left: -10 }}
                  className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    fill="transparent"
                    stroke="var(--border-primary)"
                  />
                  <XAxis tickLine={false} dataKey="name" />
                  <YAxis tickLine={false} />
                  <Tooltip
                    formatter={(value) =>
                      typeof value === "number"
                        ? `${value.toFixed(2)} min`
                        : `${value} min`
                    }
                    contentStyle={{
                      backgroundColor: "var(--surface-bg-secondary)",
                      border: "1px solid var(--border-secondary)",
                      color: "var(--text-primary)",
                      borderRadius: 8,
                      boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                    }}
                    cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
                    wrapperStyle={{ outline: "none" }}
                  />
                  <Legend />
                  <Bar
                    dataKey="Available Time"
                    fill={tintHexColor("#5a5fd7", 0.3)}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Time Taken"
                    fill={tintHexColor("#10b981", 0.3)}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Widget>
      </div>

      {/* Cards */}
      <div className="w-full mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Time Card */}
          <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[var(--sb-ocean-bg-disabled)]">
                  <ClockIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
                </div>
                <h6 className="text-[var(--text-secondary)]">Total Time</h6>
              </div>
            </div>
            <h4 className="mb-2 text-[var(--sb-ocean-bg-active)]">
              {formatMinutesToHHMMSS(data.totalTime)}
            </h4>
            <p className="text-[var(--text-tertiary)]">Session duration</p>
          </div>

          {/* Time Taken Card */}
          <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out p-6 border border-[var(--border-primary)] bg-[var(--surface-bg-primary)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[var(--sb-sakura-bg-disabled)]">
                  <ClockIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
                </div>
                <h6 className="text-[var(--text-secondary)]">Time Taken</h6>
              </div>
            </div>
            <h4 className="mb-2 text-[var(--sb-ocean-bg-active)]">
              {data.timeSpentMinutes
                ? formatMinutesToHHMMSS(parseTimeString(data.timeSpentMinutes))
                : "00:00:00"}
            </h4>
            <p className="text-[var(--text-tertiary)]">Elapsed time</p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full rounded-full h-2 bg-[var(--border-tertiary)]">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-[var(--sb-ocean-bg-active)]"
                  style={{ width: `${data.timeTakenPercent ?? 0}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 text-[var(--text-tertiary)]">
                {data.timeTakenPercent ?? 0}% Complete
              </p>
            </div>
          </div>

          {/* Remaining Time Card */}
          <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[var(--sb-pumpkin-bg-disabled)]">
                  <PresentationChartLineIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
                </div>
                <h6 className="text-[var(--text-secondary)]">Remaining Time</h6>
              </div>
            </div>
            <h4 className="mb-2 text-[var(--sb-green-haze-bg-active)]">
              {data.timeRemaining
                ? formatMinutesToHHMMSS(data.timeRemaining)
                : "00:00:00"}
            </h4>
            <p className="text-[var(--text-tertiary)]">Time left</p>

            {/* Countdown Visual */}
            <div className="mt-4">
              <div className="w-full rounded-full h-2 bg-[var(--border-tertiary)]">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-[var(--sb-green-haze-bg-active)]"
                  style={{ width: `${data.timeRemainingPercent ?? 0}%` }}
                ></div>
              </div>
              <p className="mt-1 text-[var(--text-tertiary)]">
                {data.timeRemainingPercent ?? 0}% Remaining
              </p>
            </div>
          </div>

          {/* Average Speed Card */}
          <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[var(--sb-valencia-bg-disabled)]">
                  <BoltIcon className="w-5 h-5 text-[var(--text-tertiary)]" />
                </div>
                <h6 className="text-[var(--text-secondary)]">
                  Avg. Speed/Question
                </h6>
              </div>
            </div>
            <h3 className="mb-2 text-[var(--sb-valencia-bg-active)]">
              {data.averageSpeedPerQuestionLabel}
            </h3>
            <p className="text-[var(--text-tertiary)]">Per question</p>

            {/* Speed Indicator */}
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-6 rounded bg-[var(--border-tertiary)]"
                  ></div>
                ))}
              </div>
              <p className="text-[var(--text-tertiary)]">Just started</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        {/* <div className="mt-8 rounded-xl shadow-lg p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
          <h5 className="font-bold mb-4 text-[var(--text-secondary)]">
            Session Summary
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg border border-solid border-[var(--border-primary)] bg-[var(--surface-bg-secondary)]">
              <h4 className="mb-1 text-[var(--sb-ocean-bg-active)]">
                {data.totalTime} min
              </h4>
              <p className="text-[var(--text-tertiary)]">Total Duration</p>
            </div>
            <div className="text-center p-4 rounded-lg border border-solid border-[var(--border-primary)] bg-[var(--surface-bg-secondary)]">
              <h4 className="mb-1 text-[var(--sb-sunglow-bg-active)]">
                {data.timeSpentMinutes} min
              </h4>
              <p className="text-[var(--text-tertiary)]">Time Used</p>
            </div>
            <div className="text-center p-4 rounded-lg border border-solid border-[var(--border-primary)] bg-[var(--surface-bg-secondary)]">
              <h4 className="mb-1 text-[var(--sb-green-haze-bg-active)]">
                {data.timeRemainingPercent}%
              </h4>
              <p className="text-[var(--text-tertiary)]">Progress Left</p>
            </div>
          </div>
        </div> */}
      </div>
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

            <div className="h-[400px]">
              {groupedData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={groupedData}
                    barSize={28}
                    margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="8 10"
                      strokeOpacity={0.435}
                    />
                    <XAxis dataKey="title" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--surface-bg-secondary)",
                        border: "none",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                      cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
                      wrapperStyle={{ outline: "none" }}
                    />

                    {Object.keys(colors).map((key) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        fill={colors[key as keyof typeof colors]}
                        stackId={key === "TimeSpent" ? undefined : "a"}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No Data Available" />
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {groupedData.length > 0 &&
                Object.entries(colors).map(([key, color]) => (
                  <div key={key} className="flex items-center gap-2">
                    <p
                      className="w-3 h-3 rounded-md"
                      style={{ backgroundColor: color }}
                    />
                    {key === "TimeSpent" ? "Time Spent (min)" : key}
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
            <h6 className="text-[var(--text-primary)] mb-4">
              Scores Comparison
            </h6>
            <div className="h-[400px]">
              {scoreLevels.length > 0 ? (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className="[&_.recharts-default-legend]:flex [&_.recharts-default-legend]:justify-center"
                >
                  <RadialBarChart
                    innerRadius="40%"
                    outerRadius="80%"
                    barSize={20}
                    data={scoreLevels}
                  >
                    <RadialBar
                      dataKey="value"
                      background
                      cornerRadius={20}
                      label={{
                        fill: "#fff",
                        position: "insideStart",
                        formatter: (entry) =>
                          `${entry?.toString()} out of ${data.fullMarks}`,
                      }}
                      className="[&_.recharts-radial-bar-background-sector]:fill-[var(--surface-bg-tertiary)]"
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No Data Available" />
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {scoreLevels.map((entry, idx) => (
                <div
                  key={`answer-legend-${idx}`}
                  className="flex items-center gap-2"
                >
                  <p
                    style={{ backgroundColor: entry.fill }}
                    className="w-4 h-4 rounded-full inline-block"
                  />
                  <p className="text-[var(--text-primary)] font-medium">
                    {entry.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your Performance Overview */}
        <div className="relative overflow-hidden bg-[var(--surface-bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--sb-ocean-bg-active)]/5 rounded-full translate-x-1/3 -translate-y-1/3 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-[var(--sb-ocean-bg-active)]/10 rounded-full -translate-x-1/3 translate-y-1/3 opacity-40"></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[var(--sb-ocean-bg-active)]/10 rounded-lg">
                <PresentationChartLineIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
              </div>
              <h5 className="text-[var(--text-primary)]">
                Your Performance Overview
              </h5>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rank */}
              <div className="flex items-center justify-between p-4 bg-[var(--surface-bg-primary)] rounded-lg shadow-sm">
                <div>
                  <p className="text-[var(--text-tertiary)]">Class Rank</p>
                  <p className="text-[var(--text-primary)]">
                    #{data.rank}
                    <span className="text-[var(--text-tertiary)] ml-1">
                      / {data.totalStudent}
                    </span>
                  </p>
                </div>
                <div className="p-3 bg-[var(--sb-ocean-bg-active)]/10 rounded-full">
                  <StarIcon className="w-6 h-6 text-[var(--sb-ocean-bg-active)]" />
                </div>
              </div>

              {/* Percentile */}
              <div className="flex items-center justify-between p-4 bg-[var(--surface-bg-primary)] rounded-lg shadow-sm">
                <div>
                  <p className="text-[var(--text-tertiary)]">Percentile</p>
                  <p className="text-[var(--sb-green-haze-bg-active)]">
                    {data.percentile}%
                  </p>
                </div>
                <div className="p-3 bg-[var(--sb-green-haze-bg-disabled)] rounded-full">
                  <PresentationChartLineIcon className="w-6 h-6 text-[var(--sb-green-haze-bg-active)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
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
    },
    {
      label: "TIME MANAGEMENT",
      content: <TimeManagementTab />,
    },
    {
      label: "COMPARATIVE STUDY",
      content: <ComparativeStudyTab />,
    },
  ];

  //   const handleTabChange = (index: number) => {
  //     console.log(`Switched to tab: ${tabs[index].label}`);
  //   };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Score Widget */}
        <Widget className="bg-[var(--sb-ocean-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <FiTarget className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">Total Score</p>
              </div>
              <h4 className="text-[var(--text-primary)] mt-4 mb-6">
                {data.marksObtain}/{data.fullMarks}
              </h4>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <PresentationChartLineIcon className="w-4 h-4" />
                {data.percentageMarks ?? 0}%
              </p>
            </div>
            <div className="relative">
              <CircleProgressBar
                percentage={scorePercentage}
                size={70}
                strokeWidth={6}
                stroke="var(--border-secondary)"
                progressColor="var(--sb-ocean-bg-active)"
                startAngle={90}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FiTarget className="w-7 h-7 text-[var(--sb-ocean-bg-active)]" />
              </div>
            </div>
          </div>
        </Widget>

        {/* Correct Widget */}
        <Widget className="bg-[var(--sb-green-haze-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircleIcon className="w-5 h-5 text-[var(--sb-green-haze-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">Correct Answers</p>
              </div>
              <h3 className="text-[var(--text-primary)] mt-4 mb-6">
                {data.correctAnswers}
              </h3>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <ChartBarIcon className="w-4 h-4" />
                out of {data.totalQuestion}
              </p>
            </div>
            <div className="relative">
              <CircleProgressBar
                percentage={correctPercentage}
                size={70}
                strokeWidth={6}
                stroke="var(--border-secondary)"
                progressColor="var(--sb-green-haze-bg-active)"
                startAngle={90}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircleIcon className="w-7 h-7 text-[var(--sb-green-haze-bg-active)]" />
              </div>
            </div>
          </div>
        </Widget>

        {/* Incorrect Widget */}
        <Widget className="bg-[var(--sb-valencia-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <XCircleIcon className="w-5 h-5 text-[var(--sb-valencia-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">Incorrect Answers</p>
              </div>
              <h3 className="text-[var(--text-primary)] mt-4 mb-6">
                {data.incorrectAnswers ?? "N/A"}
              </h3>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <StarIcon className="w-4 h-4" />
                {(data.incorrectAnswers || 0) > 0
                  ? `-${data.incorrectAnswers} marks`
                  : "0 marks"}
              </p>
            </div>
            <div className="relative">
              <CircleProgressBar
                percentage={incorrectPercentage}
                size={70}
                strokeWidth={6}
                stroke="var(--border-secondary)"
                progressColor="var(--sb-valencia-bg-active)"
                startAngle={90}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <XCircleIcon className="w-7 h-7 text-[var(--sb-valencia-bg-active)]" />
              </div>
            </div>
          </div>
        </Widget>

        {/* Time Used Widget */}
        <Widget className="bg-[var(--sb-sunglow-bg-disabled)] border border-[var(--border-primary)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <ClockIcon className="w-5 h-5 text-[var(--sb-sunglow-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">Time Spent</p>
              </div>
              <h3 className="text-[var(--text-primary)] mt-4 mb-6">
                {data.spentTimeLabel ?? "N/A"}
              </h3>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {data.timeTakenPercent}% of {data.totalTimeLabel}
              </p>
            </div>
            <div className="relative">
              <CircleProgressBar
                percentage={timeUsedPercentage}
                size={70}
                strokeWidth={6}
                stroke="var(--border-secondary)"
                progressColor="var(--sb-sunglow-bg-active)"
                startAngle={90}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ClockIcon className="w-7 h-7 text-[var(--sb-sunglow-bg-active)]" />
              </div>
            </div>
          </div>
        </Widget>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto">
        <Tabs
          tabs={tabs.map((t) => t.label)}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
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
      <div className="mt-10">{tabs[selectedIndex]?.content}</div>
    </div>
  );
};
