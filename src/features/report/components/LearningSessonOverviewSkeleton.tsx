import { Skeleton } from "../../../components/SkeletonLoader";

export const LearningSessionOverviewSkeleton = () => {
  return (
    <div className="container-wrapper px-10 pt-8 space-y-8">
      <div className="rounded-xl border border-[var(--border-tertiary)] p-6 bg-[var(--surface-bg-primary)]">
        <Skeleton variant="text" width="60%" height={24} className="mb-2" />
        <Skeleton variant="text" width="30%" height={18} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 min-w-[150px] h-24 rounded-lg bg-[var(--surface-bg-tertiary)] flex flex-col justify-center items-center gap-2"
          >
            <Skeleton variant="text" width="70%" height={16} />
            <Skeleton variant="text" width="40%" height={20} />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <Skeleton variant="rounded" width={120} height={40} />
        <Skeleton variant="rounded" width={140} height={40} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[420px] rounded-xl border border-[var(--border-tertiary)] p-6 bg-[var(--surface-bg-primary)] flex items-center justify-center"
          >
            <Skeleton variant="circular" width={200} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
};
