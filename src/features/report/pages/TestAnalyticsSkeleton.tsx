import { ChartBarIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "../../../components/SkeletonLoader";
import { Widget } from "../components/newreports/Widget";

export const TestAnalyticsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Total Score", "Correct Answers", "Incorrect Answers", "Time Spent"].map((title, idx) => (
          <Widget key={idx} title={title}>
            <div className="flex flex-col items-start gap-2 py-6">
              <Skeleton variant="text" width="50%" height={32} />
              <Skeleton variant="text" width="30%" height={24} />
            </div>
          </Widget>
        ))}
      </div>

      <Widget title="Progress" className="w-full">
        <div className="flex flex-col gap-4 px-6 py-4">
          <Skeleton variant="rounded" height={24} width="100%" />
          <Skeleton variant="text" width="60%" className="mx-auto" />
        </div>
      </Widget>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

        <Widget>
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartPieIcon className="w-5 h-5 text-[var(--sb-ocean-bg-active)]" />
            Overall Performance Breakdown
          </h5>

          <div className="grid grid-cols-1 gap-4">
            <div className="mx-auto">
              <Skeleton variant="circular" width={240} height={240} />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="rounded"
                  height={40}
                  width="100%"
                />
              ))}
            </div>
          </div>
        </Widget>

        <Widget className="h-[480px]">
          <h5 className="text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-[#5a5fd7]" />
            Result
          </h5>
          <div className="space-y-4">
            <Skeleton variant="rectangular" height={380} width="100%" />
          </div>
        </Widget>
      </div>
    </div>
  );
};
