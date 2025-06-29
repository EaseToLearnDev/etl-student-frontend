import cn from "../../../utils/classNames";

type DesktopChildLayoutProps = {
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  isSecondaryHidden?: boolean;
};

/**
 * DesktopChildLayout
 * - Renders a two-panel layout for desktop screens.
 * - Primary content always visible (left or main panel).
 * - Secondary content (right panel) is conditionally visible.
 * - Uses responsive widths: 75% for primary, 25% for secondary on large screens.
 */
const DesktopChildLayout = ({
  primaryContent,
  secondaryContent,
  isSecondaryHidden = false,
}: DesktopChildLayoutProps) => {
  return (
    <div className="flex w-full h-full gap-5 overflow-x-hidden">
      {/* Primary content (always visible, takes 75% width if secondary is shown) */}
      <div
        className={cn(
          "w-full overflow-y-auto p-5 rounded-[20px] bg-[var(--surface-bg-primary)]",
          !isSecondaryHidden ? "lg:w-[75%]" : ""
        )}
      >
        {primaryContent}
      </div>
      {/* Secondary content (conditionally visible, takes 25% width on large screens) */}
      <div
        className={cn(
          "overflow-y-auto rounded-[20px] bg-[var(--surface-bg-primary)] transition-all duration-300 ease-in-out lg:w-[25%]",
          isSecondaryHidden
            ? "translate-x-full opacity-0 pointer-events-none absolute right-0 top-0 h-full w-0"
            : "translate-x-0 opacity-100 relative p-5"
        )}
        style={{
          minWidth: isSecondaryHidden ? 0 : undefined,
          maxWidth: isSecondaryHidden ? 0 : undefined,
        }}
      >
        {secondaryContent}
      </div>
    </div>
  );
};

export default DesktopChildLayout;
