// React
import type { ReactNode, HTMLAttributes } from "react";

// Utils
import cn from "../utils/classNames";

interface BorderedCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A card component with a border and hover effects.
 */
const BorderedCard = ({
  title,
  children,
  className = "",
  ...props
}: BorderedCardProps) => {
  return (
    <div
      className={cn(
        "w-full border-1 border-[var(--border-tertiary)] p-4 rounded-lg shadow-sm",
        className
      )}
      {...props}
    >
      {title ? <h5>{title}</h5> : <></>}
      {children}
    </div>
  );
};

export default BorderedCard;
