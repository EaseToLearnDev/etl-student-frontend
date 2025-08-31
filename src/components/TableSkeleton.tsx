import { Skeleton } from "./SkeletonLoader"

export const TableSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="mb-4">
        <Skeleton variant="text" width="150px" height="24px" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 border-b border-[var(--border-primary)] px-4 py-2">
        <Skeleton variant="text" width="100px" height="20px" />
        <Skeleton variant="text" width="80px" height="20px" />
        <Skeleton variant="text" width="120px" height="20px" />
        <Skeleton variant="text" width="100px" height="20px" />
        <Skeleton variant="text" width="80px" height="20px" />
        <Skeleton variant="text" width="150px" height="20px" />
        <Skeleton variant="text" width="60px" height="20px" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-[var(--border-primary)]"
        >
          <Skeleton variant="text" width="250px" height="18px" />
          <Skeleton variant="text" width="100px" height="18px" />
          <Skeleton variant="text" width="120px" height="18px" />
          <Skeleton variant="text" width="80px" height="18px" />
          <Skeleton variant="text" width="60px" height="18px" />
          <Skeleton variant="text" width="100px" height="18px" />
          <Skeleton variant="rounded" width="100px" height="32px" />
        </div>
      ))}
    </div>
  )
}

