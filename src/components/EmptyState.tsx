import React from "react";
import cn from "../utils/classNames";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  onClick?: () => void; 
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  icon = <ArchiveBoxIcon width={100} height={100} className="text-[var(--text-tertiary)]" />,
  description,
  buttonText,
  onClick,
  className
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col items-center justify-center text-center text-[var(--text-tertiary)]", className)}>
      <div className="mb-3">{icon}</div>
      <h5 className="text-[var(--text-tertiary)]">{title}</h5>
      {description && <p className="text-[var(--text-tertiary)]">{description}</p>}
      {(buttonText && onClick) && <Button style="secondary" onClick={onClick} className="mt-4">{buttonText}</Button>}
    </div>
  );
};

export default EmptyState;
