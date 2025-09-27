import { MathJax } from "better-react-mathjax";
import cn from "../utils/classNames";
import { CgCheck } from "react-icons/cg";

interface CheckboxProps {
  value: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
}

const Checkbox = ({
  value,
  label,
  onChange,
  checked = false,
  disabled = false,
  ...props
}: CheckboxProps) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer">
      <span className="relative inline-block w-[14px] h-[14px]">
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
          className={cn(
            "appearance-none w-[14px] h-[14px] aspect-square border-1 border-[var(--border-primary)] rounded-sm outline-none transition-all duration-200 ease-in-out",
            "checked:bg-[var(--sb-ocean-bg-active)] checked:border-none",
            disabled &&
              "bg-[var(--surface-bg-tertiary)] cursor-not-allowed opacity-70"
          )}
          disabled={disabled}
          {...props}
        />
        {checked && (
          <CgCheck className="absolute left-0 top-0 w-[14px] h-[14px] pointer-events-none" />
        )}
      </span>
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

export default Checkbox;
