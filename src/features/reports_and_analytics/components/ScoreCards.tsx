import { colors, Theme } from "../../../utils/colors";

interface ScoreCardsProps {
  theme?: Theme;
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
  theme = Theme.Neutral,
  title,
  value,
  description,
}: ScoreCardsProps) => {

  const currentTheme = colors[theme];

  return (
    <>
      <div
        className="flex flex-col items-start gap-5 rounded border-l-[8px] p-5 w-[24%] min-w-[250px] overflow-x-hidden transition-colors"
        style={{
          backgroundColor: `var(${currentTheme.bg.disabled})`,
          borderColor: `var(${currentTheme.bg.active})`,
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
            style={{ color: `var(${currentTheme.bg.active})` }}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ScoreCards;
