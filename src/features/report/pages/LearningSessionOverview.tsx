import { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Widget } from "../components/newreports/Widget";
import Tabs from "../../../components/Tabs";
import { tintHexColor } from "../libs/reduceColorsContrast";
import type { LearningAnalyticsData } from "../services/loadLearningAnalyticData";
import EmptyState from "../../../components/EmptyState";

// Mock Data Response
// const mockData = {
//   correctQuestion: 4,
//   helpCounter: 2,
//   incorrectQuestion: 1,
//   overallResultList: [
//     { y: 20, name: "Correct: 4/20", color: "#46d39a" },
//     { y: 5, name: "Incorrect: 1/20", color: "#e55759" },
//     { y: 75, name: "Unattempted: 15/20", color: "#f59e0b" },
//   ],
//   progressBarObj: { percentage: 11.11, barColor: "red" },
//   resultWithHelpList: [
//     { y: 100, name: "Correct: 2/2", color: "#46d39a" },
//     { y: 0, name: "Incorrect: 0/2", color: "#e55759" },
//   ],
//   resultWithoutHelpList: [
//     { y: 66.67, name: "Correct: 2/3", color: "#46d39a" },
//     { y: 33.33, name: "Incorrect: 1/3", color: "#e55759" },
//   ],
//   submitDate: "04-08-2025",
//   testName: "KINETIC THEORY OF GASES",
//   totalQuestion: 20,
//   unattemptedQuestion: 15,
// };

interface LearningSessionOverviewProps {
  data: LearningAnalyticsData;
}

export const LearningSessionOverview = ({
  data,
}: LearningSessionOverviewProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

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

      <div className="absolute inset-[96px] sm:inset-[112px] flex flex-col items-center justify-center rounded-full shadow-[0px_4px_20px_0px_#00000029] bg-[var(--surface-bg-primary)]">
        <p className="text-center text-[var(--text-secondary)] whitespace-pre-line px-4">
          {label}
        </p>
        <h5 className="text-[var(--text-primary)]">{total}</h5>
      </div>
    </div>
  );

  const tabs = [
    {
      label: "Performance",
      content: (
        <div className="flex flex-col gap-8">
          {/* Responsive Grid for Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Widget title="Overall" className="h-[420px]">
              {renderPieChart(
                overallPerformanceData,
                data.totalQuestion,
                "Total Questions"
              )}
            </Widget>
            <Widget title="With Help" className="h-[420px]">
              {renderPieChart(
                withHelpData,
                data.helpCounter,
                "Help in Questions"
              )}
            </Widget>
            <Widget title="Without Help" className="h-[420px]">
              {renderPieChart(
                withoutHelpData,
                data.totalQuestion - data.helpCounter,
                "Without Help"
              )}
            </Widget>
          </div>
        </div>
      ),
    },
    {
      label: "View Answers",
      content: <h1>View Answers</h1>,
    },
  ];

  return (
    <div className="container-wrapper px-10 pt-8">
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
          onSelect={setSelectedIndex}
          tabClassName="rounded-lg py-3"
          activeTabClassName="rounded-lg py-3 bg-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-content-primary)]"
        />
      </div>
      <div className="mt-6 mb-4">{tabs[selectedIndex].content}</div>
    </div>
  );
};
