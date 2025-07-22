import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import MarksScored from './MarksScored';

const dailyData = [
  { question: 'Q1 - 20', you: 24, topper: 9, average: 0 },
  { question: 'Q21 - 40', you: 13, topper: 6, average: 5 },
  { question: 'Q41 - 60', you: 10, topper: 11, average: 20 },
  { question: 'Q61 - 80', you: 5, topper: 26, average: 22 },
  { question: 'Q81 - 100', you: 11, topper: 21, average: 27 },
]

// A simple number formatting utility
export function formatNumber(
  value: number,
  fractionDigits = 0,
  notation: 'standard' | 'compact' = 'standard'
) {
  return new Intl.NumberFormat('en-US', {
    notation,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}


// Custom Y-Axis Tick
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

// Custom Tooltip
export function CustomTooltip({ active, payload, label, prefix = '' }: any) {
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
                {formatNumber(p.value)}
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
function Legend({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 lg:gap-4 ${
        className || ''
      }`}
    >
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#00D1FF]" />
        <span className="text-[var(--text-secondary)]">You</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
        <span className="text-[var(--text-secondary)]">Topper</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#07dd00]" />
        <span className="text-[var(--text-secondary)]">Average</span>
      </span>
    </div>
  );
}

// --- Main Chart Component ---
export default function Comparison({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-lg border-[var(--border-primary)] grid grid-cols-1 lg:grid-cols-3  ${
        className || ''
      }`}
    >
      <div className="lg:col-span-2">
        <div className="custom-scrollbar -mb-3 overflow-x-auto pb-3">
          <div className="h-96 w-full pt-9">
            <ResponsiveContainer width="100%" height="100%" minWidth={500}>
              <AreaChart
                data={dailyData}
                className="[&_.recharts-cartesian-axis-tick-value]:fill-[var(--text-tertiary)] [&_.recharts-cartesian-grid-vertical]:opacity-0"
                margin={{ left: -10 }}
              >
                <defs>
                  <linearGradient id="you" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="topper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="average" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#07dd00" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#07dd00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="question"
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={({ payload, ...rest }) => (
                    <CustomYAxisTick
                      payload={{
                        ...payload,
                        value: formatNumber(Number(payload.value)),
                      }}
                      {...rest}
                    />
                  )}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="you"
                  stroke="#00D1FF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#topper)"
                />
                <Area
                  type="monotone"
                  dataKey="topper"
                  stroke="#eab308"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#you)"
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#07dd00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#average)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <Legend className="mt-4" />
      </div>
      <div className="lg:col-span-1">
        <MarksScored yourScore={76} topperScore={92} averageScore={70} />
      </div>
    </div>
  );
}