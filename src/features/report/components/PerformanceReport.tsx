import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import Button from "../../../components/Button";
import { Link } from "react-router";

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
      <div className="flex flex-col justify-start p-5 gap-5">
        {/* Title */}
        <h5 className="text-2xl font-semibold text-center md:text-left">Overall Performance Report</h5>

        <div className="flex flex-col lg:flex-row gap-10">
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
                      <stop offset="0%" stopColor="#0d6fec" stopOpacity={1} />
                      <stop
                        offset="50%"
                        stopColor="#0d6fec"
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
              <h4 className="absolute inset-0 flex items-center justify-center !font-bold text-blue-600">
                {percentage}%
              </h4>
            </div>
          </div>

          {/* Description and button section */}
          <div className="flex flex-col justify-center items-center lg:items-start gap-6">
            {/* Description text or fallback */}
            <h6 className="text-[var(--text-tertiary)]">{description}</h6>
            {/* Show button only if percentage is greater than 0 */}
            {percentage > 0 && (
              <Button><Link to="/report/overview/performance">View in Detail</Link></Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceReport;
