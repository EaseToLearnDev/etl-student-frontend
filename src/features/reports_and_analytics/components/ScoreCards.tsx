type ThemeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "Quaternary"
  | "default";

interface ScoreCardsProps {
  type?: ThemeType;
  title?: string;
  value?: number | string;
  description?: string;
}

const Theme = {
  primary: "sb-ocean",
  secondary: "sb-sunglow",
  tertiary: "sb-sage",
  Quaternary: "sb-valencia",
  default: "sb-neutral",
};

/**
 * ScoreCards Component
 *
 * A UI component used to display key metrics or scores in a visually distinct card format.
 * Each card can be styled using predefined theme types (e.g., primary, secondary).
 * Includes a title, a main value, and an optional description.
 *
 * Props:
 * @param {ThemeType} [type] - Theme type for the card, which affects background and border colors.
 *   Accepted values: "primary", "secondary", "tertiary", "Quaternary", "default"
 * @param {string} [title] - Title or label of the score metric being represented.
 * @param {string | number} [value] - The main value or score to display prominently.
 * @param {string} [description] - A short description or unit label for the value.
 */

const ScoreCards = ({
  type = "default",
  title,
  value,
  description,
}: ScoreCardsProps) => {
  const colorPrefix = Theme[type];
  const bgColor = `var(--${colorPrefix}-bg-disabled)`;
  const borderColor = `var(--${colorPrefix}-bg-active)`;
  return (
    <>
      <div
        className="flex flex-col items-start gap-[20px] rounded border-l-[8px] p-[20px] w-[24%] min-w-[250px] font-[Urbanist] overflow-x-hidden transition-colors"
        style={{ backgroundColor: bgColor, borderColor: borderColor }}
      >
        {/* Heading */}
        <p className=" font-semibold text-ellipsis line-clamp-2">{title}</p>

        <div className="flex items-end gap-y-[20px] w-full justify-between">
          {/* Value */}
          <h3 className="font-bold text-ellipsis line-clamp-1">{value}</h3>

          {/* Accent Value */}
          <p
            className="font-medium text-ellipsis line-clamp-1"
            style={{ color: borderColor }}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ScoreCards;
