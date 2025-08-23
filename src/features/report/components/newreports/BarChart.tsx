import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import WidgetCard from "./WidgetCard";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = [
  { subject: "Analytic Reasoning", marks: 10 },
  { subject: "Verbal Ability", marks: -5 },
  { subject: "Quantitative Skills", marks: 6 },
  { subject: "Logical Thinking", marks: 10 },
  { subject: "Problem Solving", marks: -10 },
];

export default function BarChart() {
  const chartData = {
    labels: data.map((item) => item.subject),
    datasets: [
      {
        label: "Marks",
        data: data.map((item) => item.marks),
        backgroundColor: "#29CCB1",
        borderRadius: 12,
        barThickness: 20,
        borderWidth: 0,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // onClick: (_event: any, elements: any) => {
    //   if (elements.length > 0) {
    //     window.location.href = "/student/dashboard";
    //   }
    // },
    onHover: (event: any, elements: any) => {
      const target = event.native?.target as HTMLElement;
      target.style.cursor = elements.length > 0 ? "pointer" : "default";
    },
    scales: {
      y: {
        min: -15,
        max: 20,
        ticks: {
          stepSize: 5,
          color: "var(--text-primary)",
        },
        grid: {
          drawTicks: false,
          borderWidth: 1,
          borderDash: [4, 4],
          borderColor: "rgba(0,0,0,0.15)",
          color: "rgba(0,0,0,0.1)",
        },
      },
      x: {
        ticks: {
          color: "var(--text-primary)",
        },
        grid: {
          drawTicks: false,
          borderWidth: 0,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1E293B", 
        titleColor: "#fff",
        bodyColor: "#E2E8F0",
        titleFont: {
          size: 14,
          weight: 700,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false, 
        callbacks: {
          title: (tooltipItems: any) => {
            return tooltipItems[0].label; 
          },
          label: (tooltipItem: any) => {
            return `Marks: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const config = {
    type: "bar",
    data: chartData,
    options: options,
  };

  return (
    <WidgetCard rounded="lg" title="Last 2 Performance">
      <div className="custom-scrollbar overflow-x-auto scroll-smooth w-full">
        <div className="mt-6 h-72 w-full sm:mt-3 lg:mt-8">
          <Bar {...config} />
        </div>
      </div>
    </WidgetCard>
  );
}
