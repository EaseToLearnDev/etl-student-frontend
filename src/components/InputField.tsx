import cn from "../utils/classNames";
import { colors } from "../utils/colors";

interface InputFieldProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  info?: { msg: string; type: "info" | "warning" | "error" | "success" };
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  pattern?: string;
  maxLength?: number;
}
const InputField = ({
  label,
  value,
  onChange,
  info = { msg: "", type: "info" },
  type = "text",
  required = false,
  disabled = false,
  placeholder = "",
  maxLength,
  pattern = "",
}: InputFieldProps) => {
  const colorMap = {
    info: colors.neutral.bg.active,
    warning: colors.pumpkin.bg.active,
    error: colors.valencia.bg.active,
    success: colors.greenHaze.bg.active,
  };
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={label?.split(" ").join("-")}
        className="!font-medium text-[var(--text-secondary)]"
      >
        {label}
      </label>
      {info?.msg && (
        <span style={{ color: colorMap[info?.type] }}>{info?.msg}</span>
      )}
      <input
        name={label?.split(" ").join("-")}
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
          "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
        )}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        pattern={pattern}
      />
    </div>
  );
};

export default InputField;
