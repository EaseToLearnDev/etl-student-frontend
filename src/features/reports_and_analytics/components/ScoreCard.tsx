import type { ReactNode } from "react";
import { colors, Theme } from "../../../utils/colors";
import cn from "../../../utils/classNames";

interface ScoreCardProps {
  theme?: Theme;
  title?: string;
  value?: number | string;
  description?: string | ReactNode;
  showBgColor?: boolean;
  showBorder?: boolean;
  className?: string;
}

/**
 * ScoreCard Component
 *
 * A UI component used to display key metrics or scores in a visually distinct card format.
 * Each card can be styled using predefined theme types: "primary", "success", "error", or "neutral".
 * Includes a title, a main value, and an optional description.
 */
const ScoreCard = ({
  theme = Theme.Neutral,
  title,
  value,
  description,
  showBgColor = true,
  showBorder = true,
  className = "",
}: ScoreCardProps) => {
  const currentTheme = colors[theme];

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-start gap-5 rounded p-5 w-[24%] min-w-[250px] overflow-x-hidden transition-colors",
          !showBgColor && !showBorder
            ? "hover:bg-[var(--surface-bg-secondary)] rounded-lg"
            : "",
          className
        )}
        style={{
          backgroundColor: showBgColor ? currentTheme.bg.disabled : "  ",
          borderLeft: showBorder
            ? `8px solid ${currentTheme.bg.active}`
            : "none",
        }}
      >
        {/* Heading */}
        <p className=" font-semibold text-ellipsis line-clamp-2">{title}</p>

        <div className="flex items-end gap-y-5 w-full justify-between">
          {/* Value */}
          <h3 className="font-bold text-ellipsis line-clamp-1">{value}</h3>

          {/* Accent Value */}
          <p
            className="font-medium text-ellipsis line-clamp-1"
            style={{ color: currentTheme.bg.active }}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ScoreCard;
