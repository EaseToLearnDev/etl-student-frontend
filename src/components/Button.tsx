// React
import type { ReactNode } from "react";

// Utils
import cn from "../utils/classNames";

type ButtonProps = {
  children: ReactNode;
  style?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
};

/**
 * A customizable button component supporting "primary" and "secondary" styles.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {ReactNode} props.children - The content to be displayed inside the button.
 * @param {"primary" | "secondary"} [props.style="primary"] - The visual style of the button.
 * @param {string} [props.className] - Additional class names to apply to the button.
 * @param {() => void} [props.onClick] - Optional click handler for the button.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const Button = ({
  children,
  style = "primary",
  className,
  onClick,
}: ButtonProps) => {
  const styleMap = {
    primary:
      "bg-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-content-primary)] hover:bg-[var(--sb-ocean-bg-hover)] active:bg-[var(--sb-ocean-bg-active)]",
    secondary:
      "border-1 border-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-bg-active)] hover:border-[var(--sb-ocean-bg-hover)] hover:text-[var(--sb-ocean-bg-hover)] active:border-[var(--sb-ocean-bg-active)] active:text-[var(--sb-ocean-bg-active)]",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex py-2 px-5 justify-center items-center gap-3 rounded-[4px] font-medium text-nowrap",
        styleMap[style],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
