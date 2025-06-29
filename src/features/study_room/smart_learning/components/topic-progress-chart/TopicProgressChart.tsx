// React
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// Constants
import { COLORS } from "./constants";

// Service imports
import renderHandle from "./renderHandle";

type TopicProgressChartProps = {
  progress: number; // percentage 0-100
};

/**
 * TopicProgressChart
 * Renders a semicircular progress chart using Recharts to visualize topic progress.
 *
 * Props:
 * - progress: number (percentage from 0 to 100)
 *
 * The chart consists of:
 * - A gray background arc representing the total (100%)
 * - A colored arc representing the current progress
 * - A percentage label in the center
 */
const TopicProgressChart = ({ progress }: TopicProgressChartProps) => {
  const progressData = [{ name: "Progress", value: progress }];
  const bgData = [{ name: "Remaining", value: 100 }];

  return (
    <div className="mx-auto size-[290px] @sm:size-[340px] flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Gray background arc */}
          <Pie
            data={bgData}
            cx="50%"
            cy="50%"
            dataKey="value"
            innerRadius="54%"
            outerRadius="60%"
            startAngle={180}
            endAngle={0}
            fill={COLORS[1]}
            isAnimationActive={false}
            stroke="none"
          >
            <Cell fill={COLORS[1]} stroke={COLORS[1]} />
          </Pie>
          {/* Blue progress arc */}
          <Pie
            data={progressData}
            cx="50%"
            cy="50%"
            dataKey="value"
            innerRadius="42%"
            outerRadius="70%"
            startAngle={180}
            endAngle={180 - (progress / 100) * 180}
            fill={COLORS[0]}
            cornerRadius={0}
            stroke="none"
            labelLine={false}
            label={renderHandle}
            isAnimationActive={false}
          >
            <Cell fill={COLORS[0]} stroke={COLORS[0]} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-[-175px] flex flex-col items-center justify-center rounded-full">
        <h3 className="!font-bold text-[var(--sb-ocean-bg-active)]">
          {progress}%
        </h3>
      </div>
    </div>
  );
};

export default TopicProgressChart;
