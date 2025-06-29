import cn from "../../../utils/classNames";

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
  return (
    <div className="w-full h-full">
      {/* Primary content fills the background */}
      <div className="w-full h-full overflow-y-auto p-5 rounded-[20px] bg-[var(--surface-bg-primary)]">
        {primaryContent}
      </div>
      {/* Overlay and bottom sheet */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-full flex flex-col justify-end items-center transition-all duration-100 ease-linear",
          isSecondaryHidden
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        )}
      >
        {/* Overlay: clicking it hides the sheet */}
        <div
          onClick={handleSecondaryHide}
          className="fixed top-0 left-0 w-full h-full bg-[var(--surface-bg-secondary)] opacity-70 z-[999]"
        />
        {/* Bottom sheet: draggable and resizable */}
        <div
          style={{
            height: `${sheetHeight}px`,
            maxHeight: `${window.innerHeight * MAX_HEIGHT}px`,
            minHeight: `${MIN_HEIGHT}px`,
            transition: dragging ? "none" : "height 0.3s, bottom 0.3s",
            left: 0,
            right: 0,
            position: "absolute",
            bottom: isSecondaryHidden ? `-${sheetHeight}px` : 0,
          }}
          className="bg-[var(--surface-bg-primary)] py-6 px-7 w-full rounded-t-[20px] z-[9999] transition-all duration-300 ease-in-out"
        >
          {/* Drag handle */}
          <div
            onMouseDown={onDragStart}
            onTouchStart={onDragStart}
            className="flex justify-center"
            style={{ touchAction: "none" }}
          >
            <div className="cursor-grab user-select-none p-4 mt-[-16px]">
              <span className="w-[40px] h-1 block bg-[var(--surface-bg-tertiary)] rounded-full"></span>
            </div>
          </div>
          {/* Scrollable secondary content */}
          <div className="overflow-y-auto h-full scrollbar-hide">
            {secondaryContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileChildLayout;
