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
} from "recharts";
import { useState } from "react";
import { Widget } from "../components/newreports/Widget";
import {
  BoltIcon,
  ChartBarIcon,
  ChartPieIcon,
  CheckCircleIcon,
  ClockIcon,
  PresentationChartLineIcon,
  StarIcon,
  TrophyIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { tintHexColor } from "../libs/reduceColorsContrast";
import { FiTarget } from "react-icons/fi";
import CircleProgressBar from "../components/newreports/circularProgressBar";
import Tabs from "../../../components/Tabs";
import DrillDownComponents from "../components/newreports/DrillDownComponents";
import type { AnalyticsResponseData } from "../services/loadStudentAnalyticsData";
import EmptyState from "../../../components/EmptyState";

interface TabItem {
  label: string;
  count?: number;
  content: React.ReactNode;
}

interface TopicTestOverviewProps {
  data: AnalyticsResponseData;
}

export const TopicTestOverview = ({ data }: TopicTestOverviewProps) => {
  if(!data) return <EmptyState title="No Report Data Available" />;

  const SectionGraphData = [
    {
      name: "Section A",
      "Full Marks": data.fullMarks,
      "Obtained Marks": data.marksObtain,
    },
    {
      name: "Section B",
      "Full Marks": 100,
      "Obtained Marks": 48,
    },
  ];

  const averageTimeData = [
    {
      name: "Time Remaning",
      "Time Remaning": data.timeRemaining,
      "Total Time": data.totalTime,
    },
    {
      name: "Time Taken",
      "Time Taken": data.timeSpent,
      "Total Time": data.totalTime,
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
    { name: "Time Taken", value: data.timeSpent, color: "#8884d8" },
    {
      name: "Time Remaning",
      value: data.timeRemaining,
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

  // Tab content components
  const OverallPerformanceTab = () => (
    <>
      <div className="mb-3">
        <Widget title="Progress" className="w-full">
          <div className="flex flex-col gap-4 px-6 py-4">
            <div className="w-full bg-[var(--surface-bg-tertiary)] rounded-full h-6 overflow-hidden relative">
              <div
                className="h-6 rounded-full transition-all duration-500 flex items-center justify-center text-white text-sm font-medium"
                style={{
                  width: `${data.progressBarObj.percentage}%`,
                  backgroundColor: data.progressBarObj.barColor,
                }}
              >
                {data.progressBarObj.percentage}%
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-center">
              not upto mark. Continue Learning
            </p>
          </div>
        </Widget>
      </div>
      <div className="flex sm:flex-col lg:flex-row items-center justify-between gap-4">
        <Widget>
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
        {sectionPerformanceData.length > 0 && (
          <Widget>
            <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-[#5a5fd7]" />
              Section Performance Analysis
            </h5>

            <div className="mt-5 aspect-[1060/860] w-full lg:mt-7">
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
          </Widget>
        )}
      </div>
    </>
  );

  const ViewAnswersTab = () => (
    <div className="bg-[var(--surface-bg-secondary)] border border-[var(--border-secondary)] rounded-lg p-6">
      View Answers
    </div>
  );

  const PerformanceInDetailTab = () => (
    <>
      <DrillDownComponents section={data.sectionSet} />
    </>
  );

  const TimeManagementTab = () => (
    <div>
      <div className="flex sm:flex-col lg:flex-row items-center justify-between gap-4">
        <Widget>
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartPieIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
            Time Distribution
          </h5>

          <div className="grid grid-cols-1 gap-4">
            {/* Pie Chart */}
            {/* Pie Chart Wrapper */}
            <div className="relative mx-auto w-[290px] h-[290px] sm:w-[340px] sm:h-[340px]">
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
                    label
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
                <p className="text-[var(--text-secondary)] text-xs whitespace-pre-line px-4">
                  Time Taken
                </p>
                <h5 className="text-[var(--text-primary)]">{data.timeSpent}</h5>
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

        <Widget>
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#5a5fd7]" />
            Section Performance Analysis
          </h5>

          <div className="mt-5 aspect-[1060/780] w-full lg:mt-7">
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
                  dataKey="Time Taken"
                  fill={tintHexColor("#5a5fd7", 0.3)}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Time Remaning"
                  fill={tintHexColor("#10b981", 0.3)}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Widget>
      </div>

      {/* Cards */}
      <div className="w-full mx-auto mt-16">
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
            <h4 className="mb-2 text-[var(--sb-ocean-bg-active)]">00:50:00</h4>
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
            <h4 className="mb-2 text-[var(--sb-ocean-bg-active)]">00:00:06</h4>
            <p className="text-[var(--text-tertiary)]">Elapsed time</p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full rounded-full h-2 bg-[var(--border-tertiary)]">
                <div className="h-2 rounded-full transition-all duration-500 w-[0.2%] bg-[var(--sb-ocean-bg-active)]"></div>
              </div>
              <p className="text-xs mt-1 text-[var(--text-tertiary)]">
                0.2% Complete
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
              00:49:54
            </h4>
            <p className="text-[var(--text-tertiary)]">Time left</p>

            {/* Countdown Visual */}
            <div className="mt-4">
              <div className="w-full rounded-full h-2 bg-[var(--border-tertiary)]">
                <div className="h-2 rounded-full transition-all duration-500 w-[99.8%] bg-[var(--sb-green-haze-bg-active)]"></div>
              </div>
              <p className="mt-1 text-[var(--text-tertiary)]">
                99.8% Remaining
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
              00:00:00
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
        <div className="mt-8 rounded-xl shadow-lg p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
          <h5 className="font-bold mb-4 text-[var(--text-secondary)]">
            Session Summary
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg border border-solid border-[var(--border-primary)] bg-[var(--surface-bg-secondary)]">
              <h4 className="mb-1 text-[var(--sb-ocean-bg-active)]">50 min</h4>
              <p className="text-[var(--text-tertiary)]">Total Duration</p>
            </div>
            <div className="text-center p-4 rounded-lg border border-solid border-[var(--border-primary)] bg-[var(--surface-bg-secondary)]">
              <h4 className="mb-1 text-[var(--sb-sunglow-bg-active)]">6 sec</h4>
              <p className="text-[var(--text-tertiary)]">Time Used</p>
            </div>
            <div className="text-center p-4 rounded-lg border border-solid border-[var(--border-primary)] bg-[var(--surface-bg-secondary)]">
              <h4 className="mb-1 text-[var(--sb-green-haze-bg-active)]">
                99.8%
              </h4>
              <p className="text-[var(--text-tertiary)]">Progress Left</p>
            </div>
          </div>
        </div>
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
        {/* Topper Compare Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.topperCompare?.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-[var(--surface-bg-primary)] border border-[var(--border-primary)] rounded-xl p-5 hover:shadow-md transition-shadow duration-200"
            >
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--sb-ocean-bg-active)]/5 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h6 className="text-[var(--text-primary)]">{item.title}</h6>
                  <TrophyIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
                </div>

                <div className="space-y-3">
                  {/* Score */}
                  <div className="flex items-center justify-between p-3 bg-[var(--surface-bg-primary)] rounded-lg">
                    <p className="text-[var(--text-tertiary)] flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-[var(--sb-sunglow-bg-active)]" />
                      Score
                    </p>
                    <p className="text-[var(--sb-ocean-bg-active)]">
                      {item.score} ({item.scorePercentage}%)
                    </p>
                  </div>

                  {/* Correct / Incorrect */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-[var(--sb-green-haze-bg-active)]/10 rounded-lg">
                      <CheckCircleIcon className="w-4 h-4 text-[var(--sb-green-haze-bg-active)]" />
                      <div>
                        <p className="text-[var(--sb-green-haze-bg-active)]">
                          Correct
                        </p>
                        <p className="text-[var(--sb-green-haze-bg-on-press)]">
                          {item.correctQuestions}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-[var(--sb-valencia-bg-active)]/10 rounded-lg">
                      <XCircleIcon className="w-4 h-4 text-[var(--sb-valencia-bg-active)]" />
                      <div>
                        <p className="text-[var(--sb-valencia-bg-active)]">
                          Incorrect
                        </p>
                        <p className="text-[var(--sb-valencia-bg-on-press)]">
                          {item.incorrectQuestions}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Time Spent */}
                  <div className="flex items-center gap-2 p-3 bg-[var(--sb-sunglow-bg-active)]/10 rounded-lg">
                    <ClockIcon className="w-4 h-4 text-[var(--sb-sunglow-bg-active)]" />
                    <div>
                      <p className="text-[var(--sb-sunglow-bg-active)]">
                        Time Spent
                      </p>
                      <p className="text-[var(--sb-sunglow-bg-on-press)]">
                        {item.timeSpent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
      content: <ViewAnswersTab />,
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

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="p-2 sm:p-5 md:p-8 container-wrapper">
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
                {data.percentageMarks}%
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
                {data.incorrectAnswers}
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
                {data.spentTimeLabel}
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

      <Tabs
        tabs={tabs.map((t) => t.label)}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        tabClassName="rounded-lg py-3"
        activeTabClassName="rounded-lg py-3 bg-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-content-primary)]"
      />
      <div className="mt-10">{tabs[selectedIndex]?.content}</div>
    </div>
  );
};
