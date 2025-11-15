import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import cn from "../utils/classNames";

interface RadialDataItem {
  name: string;
  value: number;
  fill: string;
}

interface RenderableMultiDataRadialChartProps {
  data: RadialDataItem[];
  maxValue: number;
  height?: number;
  showLegend?: boolean;
  legendFormatter?: (key: string) => string;
  className?: string;
}

const RenderableMultiDataRadialChart = ({
  data,
  maxValue,
  height = 400,
  showLegend = true,
  legendFormatter,
  className,
}: RenderableMultiDataRadialChartProps) => {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* Chart */}
      <div className="relative w-full" style={{ height }}>
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="[&_.recharts-default-legend]:flex [&_.recharts-default-legend]:justify-center"
        >
          <RadialBarChart
            innerRadius="40%"
            outerRadius="80%"
            barSize={20}
            data={data}
          >
            <RadialBar
              dataKey="value"
              background
              cornerRadius={20}
              label={{
                fill: "#fff",
                position: "insideStart",
                formatter: (value: any) =>
                  `${value} out of ${maxValue}`,
              }}
              className="[&_.recharts-radial-bar-background-sector]:fill-[var(--surface-bg-tertiary)]"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className="flex items-center gap-2"
            >
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-[var(--text-primary)] font-medium">
                {legendFormatter ? legendFormatter(entry.name) : entry.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderableMultiDataRadialChart;
