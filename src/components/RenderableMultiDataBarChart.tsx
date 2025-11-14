import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import cn from "../utils/classNames";

interface RenderableMultiBarChartProps {
  data: Record<string, any>[];
  colors: Record<string, string>;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean; 
  className?: string;
  formatter?: (value: any, name: string) => string | [string, string];
  legendFormatter?: (key: string) => string;
}

const RenderableMultiBarChart = ({
  data,
  colors,
  height = 400,
  showGrid = true,
  showLegend = true,
  className,
  formatter,
  legendFormatter,
}: RenderableMultiBarChartProps) => {
  return (
    <div className={cn("flex flex-col w-full h-full", className)}>
      {/* Chart */}
      <div className="relative w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            barSize={28}
            margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            {showGrid && (
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
            )}

            <XAxis dataKey="title" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />

            <Tooltip
              formatter={
                formatter ||
                ((value: any, name: string) => {
                  if (name === "TimeSpent")
                    return [`${Number(value).toFixed(2)} min`, name];
                  return [value, name];
                })
              }
              contentStyle={{
                backgroundColor: "var(--surface-bg-secondary)",
                border: "none",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
              wrapperStyle={{ outline: "none" }}
            />

            {/* Bars */}
            {Object.keys(colors).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[key]}
                stackId={key === "TimeSpent" ? undefined : "a"}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* External Legend */}
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {Object.entries(colors).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-md"
                style={{ backgroundColor: color }}
              />
              <span className="text-[var(--text-primary)]">
                {legendFormatter ? legendFormatter(key) : key}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderableMultiBarChart;
