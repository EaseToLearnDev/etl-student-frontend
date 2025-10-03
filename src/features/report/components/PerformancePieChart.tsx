// React
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

// Hooks
import useDarkModeStore from "../../../store/useDarkModeStore";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PerformancePieChartProps {
  labels: string[];
  values: number[];
  colors: string[];
  displayValues?: string[]; // for legend values
  tooltipValues?: string[]; // ✅ new prop for tooltip-like info
}

const PerformancePieChart = ({
  labels,
  values,
  colors,
  displayValues,
  tooltipValues,
}: PerformancePieChartProps) => {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  const data: ChartData<"doughnut"> = useMemo(
    () => ({
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
          spacing: 4,
          borderRadius: 10,
          borderWidth: 0,
          rotation: -90,
        },
      ],
    }),
    [labels, values, colors]
  );

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (ctx) => {
              const index = ctx.dataIndex;
              const label = labels[index] ?? "";
              const tooltipValue = tooltipValues?.[index] ?? values[index];
              return `${label}: ${tooltipValue}`;
            },
          },
        },
      },
    }),
    [darkMode, labels, values, tooltipValues]
  );

  return (
    <div className="w-full max-w-[500px] h-[310px] mx-auto flex flex-col items-center justify-around gap-4">
      {/* Chart container */}
      <div className="flex-1 h-full max-w-[250px] max-h-[250px] mt-2">
        <Doughnut data={data} options={options} />
      </div>

      {/* Custom Legend + Tooltip Values */}
      <div className="flex flex-row justify-center gap-5 min-w-[120px]">
        {labels.map((label, v) => (
          <div key={v} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-[4px]"
              style={{ background: colors[v] }}
            />
            <div className="text-center 2xl:text-left flex flex-col items-center 2xl:items-start">
              <span className="text-[var(--text-tertiary)]">{label}</span>
              <p>{displayValues?.[v] ?? values[v]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformancePieChart;
