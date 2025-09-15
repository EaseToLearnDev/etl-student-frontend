import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
  type Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";
import useDarkModeStore from "../../../../../store/useDarkModeStore";

ChartJS.register(ArcElement, Tooltip, Legend);

type TopicProgressChartProps = {
  progress: number; // 0 to 100
};

const TopicProgressChart = ({ progress }: TopicProgressChartProps) => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const remainingColor = darkMode ? "#18181b" : "#f4f4f5";

  // Get CSS variable value
  const progressColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--sb-ocean-bg-active")
    .trim() || "#007BFF";

  // Custom plugin to draw the progress text in center
  const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerText",
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = progressColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${progress}%`, width / 2, height / 1.15);
      ctx.restore();
    },
  };

  const data: ChartData<"doughnut", number[], string> = useMemo(
    () => ({
      labels: ["Progress", "Remaining"],
      datasets: [
        {
          data: [progress, 100 - progress],
          backgroundColor: [progressColor, remainingColor],
          borderWidth: 0,
        },
      ],
    }),
    [progress, progressColor, remainingColor]
  );

  const options: ChartOptions<"doughnut"> = {
    rotation: -90,
    circumference: 180,
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-[290px]  md:max-w-[200px] mx-auto aspect-[2/1] relative">
      <Doughnut key={progress} data={data} options={options} plugins={[centerTextPlugin]} />
    </div>
  );
};

export default TopicProgressChart;
