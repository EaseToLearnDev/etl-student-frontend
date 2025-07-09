type ThemeType = "primary" | "success" | "error" | "neutral" | "default";
interface ThemeValueType {
  bg: string;
  color: string;
}
interface ScoreCardsProps {
  type?: ThemeType;
  title?: string;
  value?: number | string;
  description?: string;
}

/**
 * ScoreCards Component
 *
 * A UI component used to display key metrics or scores in a visually distinct card format.
 * Each card can be styled using predefined theme types: "primary", "success", "error", or "neutral".
 * Includes a title, a main value, and an optional description.
 */
const ScoreCards = ({
  type = "neutral",
  title,
  value,
  description,
}: ScoreCardsProps) => {
  
  const themeMap: Record<ThemeType, ThemeValueType> = {
    primary: {
      bg: "--sb-ocean-bg-disabled",
      color: "--sb-ocean-bg-active",
    },
    success: {
      bg: "--sb-green-haze-bg-disabled",
      color: "--sb-green-haze-bg-active",
    },
    error: {
      bg: "--sb-valencia-bg-disabled",
      color: "--sb-valencia-bg-active",
    },
    neutral: {
      bg: "--sb-neutral-bg-disabled",
      color: "--sb-neutral-bg-active",
    },
    default: {
      bg: "--surface-bg-primary",
      color: "--sb-ocean-bg-active",
    },
  };

  const theme: ThemeValueType = themeMap[type];

  return (
    <>
      <div
        className="flex flex-col items-start gap-5 rounded border-l-[8px] p-5 w-[24%] min-w-[250px] overflow-x-hidden transition-colors"
        style={{
          backgroundColor: `var(${theme.bg})`,
          borderColor: `var(${theme.color})`,
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
            style={{ color: `var(${theme.color})` }}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ScoreCards;
