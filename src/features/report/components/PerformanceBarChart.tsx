// React
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions,
  type ChartData,
  type Plugin,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

// Hooks
import useDarkModeStore from "../../../store/useDarkModeStore";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
interface PerformanceBarChartProps {
  labels: string[];
  values: number[]; // numeric values for rendering bars
  displayValues?: string[]; // optional string labels like "56%"
  color: string;
}

const PerformanceBarChart = ({
  labels,
  values,
  displayValues,
  color,
}: PerformanceBarChartProps) => {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  // Plugin for showing labels
  const valueLabelPlugin: Plugin<"bar"> = {
    id: "valueLabels",
    afterDatasetsDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar, index) => {
          const value = dataset.data[index] as number;
          const label = displayValues?.[index] ?? value.toString();
          ctx.fillStyle = darkMode ? "#d4d4d8" : "#333";
          ctx.fillText(label, bar.x, value >= 0 ? bar.y - 4 : bar.y + 14);
        });
      });

      ctx.restore();
    },
  };

  const data: ChartData<"bar"> = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Values",
          data: values,
          backgroundColor: color,
          borderWidth: 0,
          borderRadius: 6,
          barPercentage: 0.6,
        },
      ],
    }),
    [labels, values, color]
  );

  const maxValue = Math.max(...values);
  const paddedMax = maxValue * 1.075;

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) =>
            displayValues?.[context.dataIndex] ?? context.raw?.toString(),
        },
      },
    },
    scales: {
      x: {
        grid: { color: darkMode ? "#27272a" : "#f4f4f5" },
        ticks: {
          color: darkMode ? "#d4d4d8" : "#52525b",
          callback: (_, index) => {
            const label = labels[index];
            // Truncate after 8 chars
            return label.length > 8 ? label.slice(0, 8) + "…" : label;
          },
        },
      },
      y: {
        grid: { color: darkMode ? "#27272a" : "#f4f4f5" },
        ticks: { color: darkMode ? "#d4d4d8" : "#52525b" },
        suggestedMax: paddedMax,
      },
    },
  };

  return (
    <div className="w-full max-w-[500px] h-[300px] mx-auto relative flex flex-col gap-4">
      <Bar data={data} options={options} plugins={[valueLabelPlugin]} />
    </div>
  );
};

export default PerformanceBarChart;
