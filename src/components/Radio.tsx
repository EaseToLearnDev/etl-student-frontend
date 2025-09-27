import { MathJax } from "better-react-mathjax";
import cn from "../utils/classNames";

interface RadioProps {
  value: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
}

/**
 * Radio component renders a custom styled radio button with a label.
 */
const Radio = ({
  value,
  label,
  onChange,
  checked = false,
  disabled = false,
  ...props
}: RadioProps) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer">
      <input
        name="option"
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className={cn(
          "appearance-none w-[14px] h-[14px] aspect-square border-1 border-[var(--border-primary)] rounded-full outline-none transition-all duration-200 ease-in-out",
          "checked:bg-[var(--sb-ocean-bg-active)] checked:border-none checked:w-[14px] checked:h-[14px]",
          disabled &&
            "bg-[var(--surface-bg-tertiary)] cursor-not-allowed opacity-70"
        )}
        disabled={disabled}
        {...props}
      />
      <MathJax dynamic>
        <div
          className="math-container text-base"
          dangerouslySetInnerHTML={{
            __html: label.trim().replace(/[\r\n]+/g, ""),
          }}
        />
      </MathJax>
    </label>
  );
};

export default Radio;
