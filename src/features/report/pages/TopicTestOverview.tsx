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
import { mockAPIRes } from "../mockAPIRes";
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

interface TabItem {
  label: string;
  count?: number;
  content: React.ReactNode;
}

const data = [
  {
    name: "Section A",
    "Full Marks": 100,
    "Obtained Marks": 69,
  },
  {
    name: "Section B",
    "Full Marks": 100,
    "Obtained Marks": 48,
  },
];

const averageTimeData = [
  {
    name: "Time Taken",
    "Time Taken": mockAPIRes.timeSpent,
    "Total Time": mockAPIRes.totalTime,
  },
  {
    name: "Time Remaning",
    "Time Remaning": mockAPIRes.timeRemaining,
    "Total Time": mockAPIRes.totalTime,
  },
];

export const TopicTestOverview = () => {
  const scorePercentage =
    mockAPIRes.marksObtain && mockAPIRes.fullMarks
      ? Math.max(0, (mockAPIRes.marksObtain / mockAPIRes.fullMarks) * 100)
      : 0;

  const correctPercentage =
    mockAPIRes.totalQuestion && mockAPIRes.correctAnswers
      ? (mockAPIRes.correctAnswers / mockAPIRes.totalQuestion) * 100
      : 0;

  const incorrectPercentage =
    mockAPIRes.totalQuestion && mockAPIRes.incorrectAnswers
      ? (mockAPIRes.incorrectAnswers / mockAPIRes.totalQuestion) * 100
      : 0;

  const timeUsedPercentage = mockAPIRes.timeTakenPercent || 0;

  // State for pie chart interactions
  const [activeIndex, setActiveIndex] = useState(0);

  // Prepare data for pie charts
  const overallPerformanceData =
    mockAPIRes.overallPerformanceList?.map((item) => ({
      name: item.name || "",
      value: item.y || 0,
      color: item.color || "#8884d8",
    })) || [];

  const timeManagement = [
    { name: "Time Taken", value: mockAPIRes.timeSpent, color: "#8884d8" },
    {
      name: "Time Remaning",
      value: mockAPIRes.timeRemaining,
      color: "#43f4d8",
    },
  ];

  const sectionPerformanceData =
    mockAPIRes.sectionPerformanceList
      ?.filter((item) => item.name && item.data)
      ?.map((item) => ({
        name: item.name || "",
        value: (item.data || []).reduce(
          (sum: number, val: number) => sum + (val || 0),
          0
        ),
        color: item.color || "#8884d8",
      })) || [];

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  // Tab content components
  const OverallPerformanceTab = () => (
    <div className="flex items-center justify-between gap-4">
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
                  onMouseEnter={onPieEnter}
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
                {mockAPIRes.totalQuestion}
              </h5>
            </div>
          </div>

          {/* Legend and Details */}
          <div className="flex flex-col justify-center space-y-4">
            {overallPerformanceData.map((item, index) => (
              <div
                key={item.name}
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
                data={data}
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
  );

  const ViewAnswersTab = () => (
    <div className="bg-[var(--surface-bg-secondary)] border border-[var(--border-secondary)] rounded-lg p-6">
      View Answers
    </div>
  );

  const PerformanceInDetailTab = () => (
    <>
      <DrillDownComponents section={mockAPIRes.sectionSet} />
    </>
  );

  const TimeManagementTab = () => (
    <div className="">
      <div className="flex items-center justify-between gap-4">
        <Widget>
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartPieIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
            Time Distribution
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
                    data={timeManagement}
                    onMouseEnter={onPieEnter}
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

              <div className="absolute inset-24 flex flex-col items-center justify-center rounded-full shadow-[0px_4px_20px_0px_#00000029] sm:inset-28 bg-[var(--surface-bg-primary)]">
                <p className="text-[var(--text-secondary)] text-xs whitespace-pre-line px-4">
                  Time Taken
                </p>
                <h5 className="text-[var(--text-primary)]">
                  {mockAPIRes.timeSpent}
                </h5>
              </div>
            </div>

            {/* Legend and Details */}
            <div className="flex flex-col justify-center space-y-4">
              {timeManagement.map((item, index) => (
                <div
                  key={item.name}
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
          <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[var(--border-primary)] border-solid bg-[var(--surface-bg-primary)]">
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
      <h6 className="text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
        <div className="p-2 bg-[var(--sb-ocean-bg-active)]/10 rounded-lg">
          <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--sb-ocean-bg-active)]" />
        </div>
        <h5>Compare yourself with Topper</h5>
      </h6>

      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {mockAPIRes.topperCompare?.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden bg-[var(--surface-bg-secondary)] border border-[var(--border-primary)] rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-[var(--sb-ocean-bg-active)]/5 rounded-full -mr-8 sm:-mr-10 -mt-8 sm:-mt-10 opacity-50"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h6 className="text-[var(--text-primary)]">{item.title}</h6>
                  <TrophyIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--sb-ocean-bg-active)]" />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-[var(--surface-bg-primary)] rounded-lg">
                    <p className="text-[var(--text-tertiary)] flex items-center gap-1 sm:gap-2">
                      <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--sb-sunglow-bg-active)]" />
                      Score
                    </p>
                    <p className="text-[var(--sb-ocean-bg-active)]">
                      {item.score} ({item.scorePercentage}%)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 sm:gap-2 p-2 bg-[var(--sb-green-haze-bg-active)]/10 rounded-lg">
                      <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--sb-green-haze-bg-active)]" />
                      <div>
                        <p className="text-[var(--sb-green-haze-bg-hover)]">
                          Correct
                        </p>
                        <p className="text-[var(--sb-green-haze-bg-on-press)]">
                          {item.correctQuestions}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 p-2 bg-[var(--sb-valencia-bg-active)]/10 rounded-lg">
                      <XCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--sb-valencia-bg-active)]" />
                      <div>
                        <p className="]text-[var(--sb-valencia-bg-hover)]\">
                          Incorrect
                        </p>
                        <p className="text-[var(--sb-valencia-bg-on-press)]">
                          {item.incorrectQuestions}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2 p-2 bg-[var(--sb-sunglow-bg-active)]/10 rounded-lg">
                    <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--sb-sunglow-bg-active)]" />
                    <div>
                      <p className="text-[var(--sb-sunglow-bg-hover)]">
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

        <div className="relative overflow-hidden bg-[var(--surface-bg-secondary)] border border-[var(--border-primary)] rounded-xl p-4 sm:p-6">
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-[var(--sb-ocean-bg-active)]/5 rounded-full -mr-10 sm:-mr-12 -mt-10 sm:-mt-12 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-[var(--sb-ocean-bg-active)]/10 rounded-full -ml-6 sm:-ml-8 -mb-6 sm:-mb-8 opacity-40"></div>

          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 bg-[var(--sb-ocean-bg-active)]/10 rounded-lg">
                <PresentationChartLineIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--sb-ocean-bg-active)]" />
              </div>
              <h5 className="text-[var(--text-primary)]">
                Your Performance Overview
              </h5>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-[var(--surface-bg-primary)] rounded-lg shadow-sm">
                <div>
                  <p className="text-[var(--text-tertiary)]">Class Rank</p>
                  <p className="text-[var(--text-primary)]">
                    #{mockAPIRes.rank}
                    <span className="text-[var(--text-tertiary)] ml-1">
                      / {mockAPIRes.totalStudent}
                    </span>
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-[var(--sb-ocean-bg-active)]/10 rounded-full">
                  <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--sb-ocean-bg-active)]" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-[var(--surface-bg-primary)] rounded-lg shadow-sm">
                <div>
                  <p className="text-[var(--text-tertiary)]">Percentile</p>
                  <p className="text-[var(--sb-green-haze-bg-active)]">
                    {mockAPIRes.percentile}%
                  </p>
                </div>
                <div className="p-2 sm:p-3 bg-[var(--sb-green-haze-bg-disabled)] rounded-full">
                  <PresentationChartLineIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--sb-green-haze-bg-active)]" />
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
    <div className="p-2 sm:p-5 md:p-10 container-wrapper">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {/* Score Widget */}
        <Widget className="bg-[var(--sb-ocean-bg-disabled)] border-[var(--border-primary)] hover:shadow-xl shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <FiTarget className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">Total Score</p>
              </div>
              <h4 className="text-[var(--text-primary)] my-6">
                {mockAPIRes.marksObtain}/{mockAPIRes.fullMarks}
              </h4>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <PresentationChartLineIcon className="w-4 h-4" />
                {mockAPIRes.percentageMarks}%
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
        <Widget className="bg-[var(--sb-green-haze-bg-disabled)] border-[var(--border-primary)] hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircleIcon className="w-5 h-5 text-[var(--sb-green-haze-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">
                  Correct Answers
                </p>
              </div>
              <h3 className="text-[var(--text-primary)] my-6">
                {mockAPIRes.correctAnswers}
              </h3>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <ChartBarIcon className="w-4 h-4" />
                out of {mockAPIRes.totalQuestion}
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
        <Widget className="bg-[var(--sb-valencia-bg-disabled)] border-[var(--border-primary)] hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <XCircleIcon className="w-5 h-5 text-[var(--sb-valencia-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">
                  Incorrect Answers
                </p>
              </div>
              <h3 className="text-[var(--text-primary)] my-6">
                {mockAPIRes.incorrectAnswers}
              </h3>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <StarIcon className="w-4 h-4" />
                {(mockAPIRes.incorrectAnswers || 0) > 0
                  ? `-${mockAPIRes.incorrectAnswers} marks`
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
        <Widget className="bg-[var(--sb-sunglow-bg-disabled)] border-[var(--border-primary)] hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <ClockIcon className="w-5 h-5 text-[var(--sb-sunglow-bg-active)]" />
                <p className="text-[var(--text-tertiary)]">
                  Time Spent
                </p>
              </div>
              <h3 className="text-[var(--text-primary)] my-6">
                {mockAPIRes.spentTimeLabel}
              </h3>
              <p className="text-[var(--text-tertiary)] flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {mockAPIRes.timeTakenPercent}% of {mockAPIRes.totalTimeLabel}
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
