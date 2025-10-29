import { useState, useRef } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorMap = {
    info: colors.neutral.bg.active,
    warning: colors.pumpkin.bg.active,
    error: colors.valencia.bg.active,
    success: colors.greenHaze.bg.active,
  };

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <label
          htmlFor={label.split(" ").join("-")}
          className="!font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}

      {info?.msg && (
        <span style={{ color: colorMap[info.type] }}>{info.msg}</span>
      )}

      <div
        className={cn(
          "flex items-center border border-[var(--border-secondary)] rounded-lg relative",
          "focus-within:ring-2 focus-within:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out",
        )}
      >
        <input
          ref={inputRef}
          name={label?.split(" ").join("-")}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full focus:outline-none text-base rounded-lg px-4 py-2 !bg-transparent pr-10"
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          pattern={pattern}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {isPassword && isFocused && (
          <button
            type="button"
            className="absolute right-3 text-[var(--text-secondary)]"
            onMouseDown={(e) => e.preventDefault()} // prevents losing focus
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? (
              <RiEyeOffLine size={20} />
            ) : (
              <RiEyeLine size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
