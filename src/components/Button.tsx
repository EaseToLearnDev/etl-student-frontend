// React
import type { ReactNode } from "react";

// Utils
import cn from "../utils/classNames";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "reset" | "submit";
  style?: "primary" | "secondary" | "neutral";
  className?: string;
  onClick?: () => void;
}

/**
 * A customizable button component supporting "primary" and "secondary" styles.
 */
const Button = ({
  children,
  type = "button",
  style = "primary",
  className,
  onClick,
}: ButtonProps) => {
  const styleMap = {
    primary:
      "bg-[var(--sb-ocean-bg-active)] text-white hover:bg-[var(--sb-ocean-bg-hover)] active:bg-[var(--sb-ocean-bg-active)]",
    secondary:
      "border-1 border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--surface-bg-secondary)] active:bg-[var(--surface-bg-tertiary)]",
    neutral:
      "bg-[var(--text-primary)] text-[var(--surface-bg-primary)] hover:bg-[var(--text-secondary)] active:bg-[var(--text-tertiary)]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "flex py-3 px-5 justify-center items-center gap-3 rounded-[4px] font-semibold text-nowrap transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out",
        styleMap[style],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
