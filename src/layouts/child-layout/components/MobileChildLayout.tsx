// React
import { createPortal } from "react-dom";

// Components
import BottomNavigationSheet from "./BottomNavigationSheet";

type MobileChildLayoutProps = {
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
  isSecondaryHidden: boolean;
  sheetHeight: number;
  dragging: boolean;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  handleSecondaryHide: () => void;
  MAX_HEIGHT: number;
  MIN_HEIGHT: number;
};

const MobileChildLayout = ({
  primaryContent,
  secondaryContent,
  isSecondaryHidden,
  sheetHeight,
  dragging,
  onDragStart,
  handleSecondaryHide,
  MAX_HEIGHT,
  MIN_HEIGHT,
}: MobileChildLayoutProps) => {
  // Overlay and bottom sheet

  return (
    <div className="w-full h-full">
      {/* Primary content fills the background */}
      <div className="w-full h-full overflow-y-auto p-5 rounded-[20px] bg-[var(--surface-bg-primary)]">
        {primaryContent}
      </div>
      {createPortal(
        <BottomNavigationSheet
          sheetContent={secondaryContent}
          isSheetHidden={isSecondaryHidden}
          sheetHeight={sheetHeight}
          dragging={dragging}
          onDragStart={onDragStart}
          handleSheetHidden={handleSecondaryHide}
          MAX_HEIGHT={MAX_HEIGHT}
          MIN_HEIGHT={MIN_HEIGHT}
        />,
        document.body
      )}
    </div>
  );
};

export default MobileChildLayout;
