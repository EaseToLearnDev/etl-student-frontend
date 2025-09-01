import { Skeleton } from "./SkeletonLoader"


export const ReportOverviewSkeleton = () => {
  return (
    <div className="px-5 pb-5 h-full flex flex-col flex-grow scrollbar-hide overflow-y-auto">
      {Array.from({ length: 2 }).map((_, idx) => (
        <div key={idx} className="mt-7">
          <Skeleton variant="text" width="200px" height="24px" />

          <div className="mt-4 w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="min-h-[400px] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col gap-4">
              <Skeleton variant="text" width="60%" height="20px" />
              <div className="flex-1 flex items-center justify-center">
                <Skeleton variant="rounded" width="90%" height="250px" />
              </div>
            </div>

            <div className="min-h-[400px] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col gap-4">
              <Skeleton variant="text" width="40%" height="20px" />
              <Skeleton variant="text" width="70%" height="16px" />
              <div className="flex-1 flex items-center justify-center">
                <Skeleton variant="circular" width="180px" height="180px" />
              </div>
            </div>

            <div className="min-h-[400px] border border-[var(--border-primary)] rounded-lg p-4 flex flex-col gap-4">
              <Skeleton variant="text" width="80%" height="20px" />
              <Skeleton variant="text" width="60%" height="16px" />
              <div className="flex-1 flex items-center justify-center">
                <Skeleton variant="circular" width="180px" height="180px" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

