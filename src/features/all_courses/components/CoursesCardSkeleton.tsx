import { Skeleton } from "../../../components/SkeletonLoader";

const CoursesCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col border border-[var(--border-primary)] rounded-lg p-4 gap-3 shadow-sm"
        >
          <Skeleton variant="rounded" width="100%" height="160px" />
          <Skeleton variant="text" width="70%" height="20px" />
          <Skeleton variant="text" width="90%" height="16px" />
        </div>
      ))}
    </div>
  );
};

export default CoursesCardSkeleton;
