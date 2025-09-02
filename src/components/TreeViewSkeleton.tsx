import { Skeleton } from "./SkeletonLoader";

export const TreeViewSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      <Skeleton height={30} variant="text" />
      <Skeleton height={30} variant="text" />
      <Skeleton height={30} variant="text" />
      <Skeleton height={30} variant="text" />
      <Skeleton height={30} variant="text" />
      <Skeleton height={30} variant="text" />
    </div>  
  );
};
