import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// Props for the PerformanceReport component
type PerformanceReportProps = {
  percentage?: number;
  description?: string;
};

/**
 * PerformanceReport Component
 *
 * Renders a circular pie chart to visualize a percentage-based performance metric,
 * accompanied by a description and an optional button.
 *
 * ## Props:
 * @param {number} [percentage=0] - The performance percentage to display (0 to 100). Determines the filled section of the chart.
 * @param {string} [description] - Optional descriptive text displayed beside the chart. Defaults to a fallback message if not provided.
 *
 * ## Features:
 * - Responsive layout with chart and content stacked on small screens and side-by-side on medium+ screens.
 * - Uses `recharts` to render a pie chart with a vertical blue gradient for the filled section.
 * - Includes centered percentage text within the chart.
 * - Conditional rendering of description and button based on props.
 * - Graceful fallback if no description is provided.
 *
 * ## Example Usage:
 * ```tsx
 * <PerformanceReport 
 *   percentage={80}
 *   description="You have completed 80% of your objectives."
 * />
 * ```
 */

const PerformanceReport = ({
  percentage = 0,
  description = "There is No Description Available",
}: PerformanceReportProps) => {
  // Data for the Pie chart: one filled segment and one remaining segment
  const data = [
    { name: "Filled", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];
  return (
    <>
      <div className="flex flex-col justify-start p-6 gap-[20px]">
        {/* Title */}
        <h4 className="text-2xl font-semibold">Overall Performance Report</h4>

        <div className="flex flex-col md:flex-row gap-[40px]">
          {/* Chart Section */}
          <div className="flex justify-center items-center">
            {/* Round Progress Chart */}
            <div className="relative w-50 h-50">
              <ResponsiveContainer width="100%" height="100%">
                {/* Pie Chart for Progress */}
                <PieChart>
                  {/* Define a vertical blue gradient for the filled segment */}
                  <defs>
                    <linearGradient
                      id="blueVerticalGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#007bff" stopOpacity={1} />
                      <stop
                        offset="50%"
                        stopColor="#007bff"
                        stopOpacity={0.5}
                      />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={data}
                    cornerRadius={5}
                    innerRadius="40%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {/* Filled segment with gradient */}
                    <Cell fill="url(#blueVerticalGradient)" />
                    {/* Remaining segment with a light stroke */}
                    <Cell fill="none" stroke="#cce3ff" strokeWidth={1} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Percentage Text in the center of the chart */}
              <h3 className="absolute inset-0 flex items-center justify-center text-blue-600">
                {percentage}%
              </h3>
            </div>
          </div>

          {/* Description and button section */}
          <div className="w-md p-6 flex flex-col justify-center items-start gap-[20px]">
            {/* Description text or fallback */}
            <p>{description}</p>
            {/* Show button only if percentage is greater than 0 */}
            {percentage > 0 && (
              <button className="bg-blue-600 text-white px-[20px] py-[8px] rounded-md w-fit">
                View In Detail
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceReport;
