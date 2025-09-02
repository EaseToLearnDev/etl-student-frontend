import React from "react";
import cn from "../utils/classNames";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

interface EmptyStateProps {
  title?: string;
  icon?: React.ReactNode;
  className?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  icon = <ArchiveBoxIcon width={100} height={100} className="text-[var(--text-tertiary)]" />,
  className
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-center text-center text-[var(--text-tertiary)]", className)}>
      <div className="mb-3">{icon}</div>
      <h5 className="text-[var(--text-tertiary)]">{title}</h5>
    </div>
  );
};

export default EmptyState;
