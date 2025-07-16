import {
  Bar,
  ComposedChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { questions: '0 - 10', time: 20 },
  { questions: '11 - 20', time: 24 },
  { questions: '21 - 30', time: 26 },
  { questions: '31 - 40', time: 19 },
  { questions: '41 - 50', time: 21 },
  { questions: '51 - 60', time: 23 },
  { questions: '61 - 70', time: 22 },
  { questions: '71 - 80', time: 24 },
  { questions: '81 - 90', time: 19 },
  { questions: '91 - 100', time: 25 },
];

const COLORS = "var(--sb-ocean-bg-active)";

// Defined formatNumber function locally
export function formatNumber(
  value: number,
  fractionDigits: number = 0,
  notation: 'standard' | 'scientific' | 'engineering' | 'compact' = 'standard'
) {
  return new Intl.NumberFormat('en-US', {
    notation,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

// Defined CustomTooltip component locally
export function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="overflow-hidden rounded-md border border-gray-300 bg-gray-0 shadow-2xl dark:bg-gray-100 dark:border-gray-200">
        <p className="label p-2 text-sm font-semibold text-gray-900 dark:text-gray-900">{`${label}`}</p>
        <div className="p-2 text-xs">
          {payload.map((p: any) => (
            <div
              key={p.dataKey}
              className="flex items-center justify-between gap-x-1"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: p.fill }}
                />
                <span className="text-gray-700 dark:text-gray-700">
                  {p.name}:
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-900">
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

function CustomizedLabel(props: any) {
  const { x, y, width, value } = props;
  const radius = 8;

  return (
    <g>
      <rect
        x={x + 3}
        y={y + 3}
        width={width - 6}
        height={20}
        rx={radius}
        fill="var(--text-primary)"
      />
      <text
        x={x + width / 2}
        y={y + 14}
        fill="currentColor"
        className="text-xs font-medium text-black"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(value)}
      </text>
    </g>
  );
}

export default function TimeManagement({ className }: { className?: string }) {


  const timeStats = [
    { label: 'Total Time', value: '180min' },
    { label: 'Time Spent', value: '150min' },
    { label: 'Time Remaining', value: '30min' },
    { label: 'Average Per Question', value: '2min' },
  ];

  return (

    <div
      className={`custom-scrollbar -mb-3 overflow-x-auto pb-3 ${className || ''
        }`}
    >
      <h6 className=''> Time Taken in Question Attempts</h6>
      <div className="h-[18rem] w-full pt-1 flex">
        <ResponsiveContainer width="100%" height="100%" minWidth={800}>
          <ComposedChart
            barGap={8}
            data={data}
            margin={{
              left: -5,
              top: 20,
            }}
            className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
          >
            <XAxis dataKey="questions" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(time) => `${time} min`}
            />
            <Bar
              dataKey="time"
              fill={COLORS}
              stroke={COLORS}
              barSize={40}
              radius={10}
            >
              <LabelList
                dataKey="time"
                content={<CustomizedLabel />}
              />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-around">
          {timeStats?.map((stat) => (
            <div key={stat.label}>
              <div className="text-md text-[var(--text-)]">
                {stat.label}
              </div>
              <div className="text-2xl text-[var(--text-primary)]">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

  );
}