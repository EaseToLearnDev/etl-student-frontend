import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { tintHexColor } from "../features/report/libs/reduceColorsContrast";
import cn from "../utils/classNames";

interface RenderablePieData {
  name: string;
  value: number;
  color: string;
}

interface RenderablePieChartProps {
  data: RenderablePieData[];
  total: number;
  label: string;
  showLegend?: boolean;
  showPercentage?: boolean;
  className?: string;
}

const RenderablePieChart = ({
  data,
  total,
  label,
  showLegend = true,
  showPercentage,
  className,
}: RenderablePieChartProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className={cn(
          "relative w-full max-w-[340px] aspect-square mx-auto",
          className
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
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

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-full shadow-[0px_4px_20px_0px_#00000029] bg-[var(--surface-bg-primary)] w-[30%] aspect-square min-w-[80px]">
            <span className="text-center text-[var(--text-secondary)] text-sm whitespace-pre-line px-2">
              {label}
            </span>
            <h5 className="text-[var(--text-primary)] text-base font-medium">
              {total}
              {showPercentage && "%"}
            </h5>
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-col justify-center space-y-3 w-full mt-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-3 bg-[var(--surface-bg-tertiary)] rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-[var(--text-secondary)] text-sm">
                  {item.name}
                </p>
              </div>
              <p className="text-[var(--text-primary)] text-sm">
                {item.value}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderablePieChart;
