import React from "react";
import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import cn from "../../../utils/classNames";

const DEFAULT_COLORS = "var(--sb-ocean-bg-active)";

interface ChartDataItem {
  [key: string]: string | number;
}

interface BarGraphProps {
  className?: string;
  data: ChartDataItem[];
  xDataKey: string;
  yDataKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  yAxisFormatter?: (value: any) => string;
  barColor?: string;
  barSize?: number;
  height?: string;
  minWidth?: number;
}

const BarChart = React.memo(
  ({
    className,
    data,
    xDataKey,
    yDataKey,
    xAxisLabel,
    yAxisLabel,
    yAxisFormatter,
    barColor = DEFAULT_COLORS,
    barSize = 40,
    height = "20rem",
    minWidth = 400,
  }: BarGraphProps) => {
    return (
      <div
        className={cn("scrollbar-thin -mb-3 overflow-x-auto pb-3", className)}
        style={{
          minWidth: '100%',
          width: '100%',
        }}
      >
        <div 
          className="w-full pt-9 flex flex-col"
          style={{ 
            height,
            minWidth: `${Math.max(minWidth, data.length * (barSize + 20) + 100)}px`
          }}
        >
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                barGap={8}
                data={data}
                margin={{
                  left: -10,
                  top: 20,
                  bottom: xAxisLabel ? 60 : 20,
                  right: 20,
                }}
              >
                <XAxis
                  dataKey={xDataKey}
                  axisLine={false}
                  tickLine={false}
                  label={
                    xAxisLabel
                      ? {
                          value: xAxisLabel,
                          position: "insideBottom",
                          offset: -30,
                          style: {
                            textAnchor: "middle",
                            fill: "var(--text-secondary)",
                            fontSize: "14px",
                            fontWeight: "600",
                          },
                        }
                      : undefined
                  }
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={yAxisFormatter}
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
                            fontWeight: "600",
                          },
                        }
                      : undefined
                  }
                />
                <Bar
                  dataKey={yDataKey}
                  fill={barColor}
                  stroke={barColor}
                  barSize={barSize}
                  radius={10}
                ></Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
);

export default BarChart;
