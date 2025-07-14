import type { ReactNode } from "react";

// Utils
import cn from "../utils/classNames";
import { colors, Theme } from "../utils/colors";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  theme: Theme;
  onClickHandler?: () => void;
}

/**
 * Renders a stylized badge component with customizable theme and click handler.
 */
const Badge = ({ children, className, onClickHandler, theme = Theme.Ocean }: BadgeProps) => {
  const currentTheme = colors[theme];

  return (
    <div
      className={cn(
        "cursor-pointer flex justify-center items-center py-2 px-4 gap-1 border-1 rounded-full",
        className
      )}
      style={{
        borderColor: currentTheme.bg.active,
        color: currentTheme.bg.active,
      }}
      onClick={onClickHandler ? onClickHandler : undefined}
    >
      {children}
    </div>
  );
};

export default Badge;
