import type { ReactNode } from "react";

// Utils
import cn from "../utils/classNames";
import { colors, Theme } from "../utils/colors";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  theme: Theme;
  style?: "filled" | "outline";
  onClickHandler?: () => void;
}

/**
 * Renders a stylized badge component with customizable theme and click handler.
 */
const Badge = ({
  children,
  className,
  onClickHandler,
  theme = Theme.Ocean,
  style = "outline",
}: BadgeProps) => {
  const currentTheme = colors[theme];

  return (
    <div
      className={cn(
        "cursor-pointer flex justify-center items-center py-2 px-4 gap-1 rounded-full",
        className
      )}
      style={{
        color: currentTheme.bg.active,
        background: style === "filled" ? currentTheme.bg.disabled : "transparent",
        border:
          style === "outline"
            ? `1px solid ${currentTheme.bg.active}`
            : "none",
      }}
      onClick={onClickHandler ? onClickHandler : undefined}
    >
      {children}
    </div>
  );
};

export default Badge;
