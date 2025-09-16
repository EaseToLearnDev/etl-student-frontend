// React
import type { ReactNode } from "react";

// Constants
import { MAX_HEIGHT, MIN_HEIGHT } from "./constants";

// Hooks
import useIsMobile from "../../hooks/useIsMobile";
import { useChildLayout } from "./hooks/useChildLayout";

// Components
import MobileChildLayout from "./components/MobileChildLayout";
import DesktopChildLayout from "./components/DesktopChildLayout";

type ChildLayoutProps = {
  primaryContent?: ReactNode;
  secondaryContent?: ReactNode;
  hideSecondary?: boolean;
  onSecondaryHide?: () => void;
  secondaryInitialHeight?: number;
  primaryClassName?: string;
  secondaryClassName?: string;
};

/**
 * ChildLayout component
 * - Renders a two-panel layout on desktop (primary + optional secondary)
 * - Renders a draggable bottom sheet for secondary content on mobile
 * - Handles drag-to-resize and snap-to-breakpoints for the sheet
 */
const ChildLayout = ({
  primaryContent,
  secondaryContent,
  hideSecondary = false,
  onSecondaryHide,
  secondaryInitialHeight = 0.6,
  primaryClassName = "",
  secondaryClassName = "",
}: ChildLayoutProps) => {
  const isMobile = useIsMobile();

  // Custom hook manages sheet state, drag logic, and visibility
  const {
    isSecondaryHidden,
    sheetHeight,
    dragging,
    onDragStart,
    handleSecondaryHide,
  } = useChildLayout(hideSecondary, onSecondaryHide, secondaryInitialHeight);

  // Desktop layout: side-by-side panels
  return isMobile ? (
    // Mobile layout: bottom sheet for secondary content
    <MobileChildLayout
      primaryClassName={primaryClassName}
      secondaryClassName={secondaryClassName}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
      isSecondaryHidden={isSecondaryHidden}
      sheetHeight={sheetHeight}
      dragging={dragging}
      onDragStart={onDragStart}
      handleSecondaryHide={handleSecondaryHide}
      MAX_HEIGHT={MAX_HEIGHT}
      MIN_HEIGHT={MIN_HEIGHT}
    />
  ) : (
    <DesktopChildLayout
      primaryClassName={primaryClassName}
      secondaryClassName={secondaryClassName}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
      isSecondaryHidden={isSecondaryHidden}
    />
  );
};

export default ChildLayout;
