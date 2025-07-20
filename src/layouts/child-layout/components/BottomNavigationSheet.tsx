import React from "react";
import cn from "../../../utils/classNames";

export interface BottomNavigationSheetProps {
  sheetContent?: React.ReactNode;
  isSheetHidden: boolean;
  sheetHeight: number;
  dragging: boolean;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
  handleSheetHidden: () => void;
  MAX_HEIGHT: number;
  MIN_HEIGHT: number;
}

const BottomNavigationSheet = ({
  sheetContent,
  isSheetHidden,
  sheetHeight,
  dragging,
  onDragStart,
  handleSheetHidden,
  MAX_HEIGHT,
  MIN_HEIGHT,
}: BottomNavigationSheetProps) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full flex flex-col justify-end items-center transition-all duration-100 ease-linear  z-[9999999]",
        isSheetHidden
          ? "pointer-events-none opacity-0"
          : "pointer-events-auto opacity-100"
      )}
    >
      {/* Overlay: clicking it hides the sheet */}
      <div
        onClick={handleSheetHidden}
        className="fixed top-0 left-0 w-full h-full bg-[var(--surface-bg-secondary)] opacity-70 z-[99999]"
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
          bottom: isSheetHidden ? `-${sheetHeight}px` : 0,
        }}
        className="bg-[var(--surface-bg-primary)] py-6 px-7 w-full rounded-t-[20px] z-[999999] transition-all duration-300 ease-in-out"
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
          {sheetContent}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationSheet;
