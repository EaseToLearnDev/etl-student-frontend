import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import cn from "../../../utils/classNames";

interface LineConfig {
  dataKey: string;
  stroke: string;
  strokeWidth?: number;
}

interface LegendItem {
  color: string;
  label: string;
  dataKey: string;
}

interface ChartDataItem {
  [key: string]: string | number;
}

export function CustomYAxisTick({ x, y, payload, prefix }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor="end" fill="#6b7280" fontSize={12}>
        {prefix}
        {payload.value}
      </text>
    </g>
  );
}

export function CustomTooltip({ active, payload, label, prefix = "" }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg">
        <p className="p-2 text-sm font-semibold text-gray-900">{label}</p>
        <div className="border-t border-gray-200 p-2 text-xs">
          {payload.map((p: any) => (
            <div key={p.dataKey} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: p.stroke }}
                />
                <span className="capitalize text-gray-700">{p.dataKey}:</span>
              </div>
              <span className="font-medium text-gray-900">
                {prefix}
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Legend Component
function Legend({
  legends,
  className,
}: {
  legends: LegendItem[];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 lg:gap-4 ${
        className || ""
      }`}
    >
      {legends.map((legend) => (
        <span key={legend.dataKey} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: legend.color }}
          />
          <span className="text-[var(--text-secondary)]">{legend.label}</span>
        </span>
      ))}
    </div>
  );
}

interface LineChartProps {
  className?: string;
  data: ChartDataItem[];
  xDataKey: string;
  lines: LineConfig[];
  legends: LegendItem[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  yAxisPrefix?: string;
  tooltipPrefix?: string;
  height?: string;
  minWidth?: number;
}

const LineChart = ({
  className,
  data,
  xDataKey,
  lines,
  legends,
  xAxisLabel,
  yAxisLabel,
  yAxisPrefix = "",
  tooltipPrefix = "",
  height = "20rem",
  minWidth = 400,
}: LineChartProps) => {
  // Generate gradients dynamically based on lines
  const generateGradients = () => {
    return lines.map((line) => {
      const gradientId = `gradient-${line.dataKey}`;

      return (
        <linearGradient
          key={gradientId}
          id={gradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="5%" stopColor={line.stroke} stopOpacity={0.1} />
          <stop offset="95%" stopColor={line.stroke} stopOpacity={0} />
        </linearGradient>
      );
    });
  };800

  return (
    <div className={cn("rounded-lg border-[var(--border-primary)]", className)}>
      <div className="scrollbar-thin -mb-3 overflow-x-auto pb-3">
        <div className="w-full pt-9" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={minWidth}>
            <AreaChart data={data} margin={{ left: -10, top: 20, bottom: xAxisLabel ? 60 : 20, right: 20 }}>
              <defs>{generateGradients()}</defs>
              <XAxis
                dataKey={xDataKey}
                axisLine={false}
                tickLine={false}
                padding={{ left: 20, right: 20 }}
                label={
                  xAxisLabel
                    ? {
                        value: xAxisLabel,
                        position: "insideBottom",
                        offset: -10,
                        style: {
                          textAnchor: "middle",
                          fill: "var(--text-secondary)",
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }
                    : undefined
                }
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={({ payload, ...rest }) => (
                  <CustomYAxisTick
                    payload={{
                      ...payload,
                      value: payload.value,
                    }}
                    prefix={yAxisPrefix}
                    {...rest}
                  />
                )}
                label={
                  yAxisLabel
                    ? {
                        value: yAxisLabel,
                        angle: -90,
                        position: "insideLeft",
                        style: {
                          textAnchor: "middle",
                          fill: "var(--text-secondary)",
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }
                    : undefined
                }
              />
              <Tooltip content={<CustomTooltip prefix={tooltipPrefix} />} />
              {lines.map((line) => (
                <Area
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  stroke={line.stroke}
                  strokeWidth={line.strokeWidth || 2}
                  fillOpacity={1}
                  fill={`url(#gradient-${line.dataKey})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Legend legends={legends} className="mt-4" />
    </div>
  );
};

export default LineChart;
