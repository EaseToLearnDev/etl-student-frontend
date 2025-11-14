import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { tintHexColor } from "../features/report/libs/reduceColorsContrast";
import cn from "../utils/classNames";

interface BarSeries {
  dataKey: string;
  color: string;
}

interface RenderableBarChartProps {
  data: any[];
  bars: BarSeries[];
  showTooltip?: boolean;
  height?: number;
  showLegend?: boolean;
  className?: string;
  formatter?: (value: number | string) => string | [string, string];
}

const RenderableBarChart = ({
  data,
  bars,
  showTooltip = true,
  height = 400,
  showLegend = true,
  className,
  formatter,
}: RenderableBarChartProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full",
          `h-[${height}px]`,
          "mt-5 lg:mt-7 flex items-center justify-center"
        )}
        style={{ height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
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

            {showTooltip && (
              <Tooltip
                formatter={formatter}
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
            )}
            {showLegend && <Legend />}
            {bars.map((bar, i) => (
              <Bar
                key={i}
                dataKey={bar.dataKey}
                fill={tintHexColor(bar.color, 0.3)}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RenderableBarChart;
