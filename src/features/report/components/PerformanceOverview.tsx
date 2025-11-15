import { PresentationChartLineIcon, StarIcon } from "@heroicons/react/24/outline";

interface PerformanceOverviewData {
    rank: number;
    totalStudent: number;
    percentile: number;
}

interface PerformanceOverviewProps {
    data: PerformanceOverviewData
}

const PerformanceOverview = ({data}: PerformanceOverviewProps) => {
  return (
    <div className="relative overflow-hidden bg-[var(--surface-bg-secondary)] border border-[var(--border-primary)] rounded-xl p-6">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--sb-ocean-bg-active)]/5 rounded-full translate-x-1/3 -translate-y-1/3 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-[var(--sb-ocean-bg-active)]/10 rounded-full -translate-x-1/3 translate-y-1/3 opacity-40"></div>

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[var(--sb-ocean-bg-active)]/10 rounded-lg">
            <PresentationChartLineIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
          </div>
          <h5 className="text-[var(--text-primary)]">
            Your Performance Overview
          </h5>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Rank */}
          <div className="flex items-center justify-between p-4 bg-[var(--surface-bg-primary)] rounded-lg shadow-sm">
            <div>
              <p className="text-[var(--text-tertiary)]">Class Rank</p>
              <p className="text-[var(--text-primary)]">
                #{data.rank}
                <span className="text-[var(--text-tertiary)] ml-1">
                  / {data.totalStudent}
                </span>
              </p>
            </div>
            <div className="p-3 bg-[var(--sb-ocean-bg-active)]/10 rounded-full">
              <StarIcon className="w-6 h-6 text-[var(--sb-ocean-bg-active)]" />
            </div>
          </div>

          {/* Percentile */}
          <div className="flex items-center justify-between p-4 bg-[var(--surface-bg-primary)] rounded-lg shadow-sm">
            <div>
              <p className="text-[var(--text-tertiary)]">Percentile</p>
              <p className="text-[var(--sb-green-haze-bg-active)]">
                {data.percentile}%
              </p>
            </div>
            <div className="p-3 bg-[var(--sb-green-haze-bg-disabled)] rounded-full">
              <PresentationChartLineIcon className="w-6 h-6 text-[var(--sb-green-haze-bg-active)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
