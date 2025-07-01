import { useCallback, useEffect, useRef, useState } from "react";
import { MIN_HEIGHT, MAX_HEIGHT } from "../constants";

/**
 * Custom hook to manage the state and drag logic for a bottom sheet layout.
 * Handles open/close, drag-to-resize, and snapping to breakpoints.
 */
export function useChildLayout(
  hideSecondary: boolean,
  onSecondaryHide?: () => void,
  initialHeight?: number,
) {
  
  // Controls visibility of the secondary (bottom sheet) panel
  const [isSecondaryHidden, setIsSecondaryHidden] = useState(hideSecondary);

  // Current height of the bottom sheet in pixels
  const [sheetHeight, setSheetHeight] = useState<number>(
    initialHeight !== undefined ? Math.min(initialHeight, MAX_HEIGHT) : 0.6
  );

  // Whether the user is currently dragging the sheet
  const [dragging, setDragging] = useState<boolean>(false);

  // Refs to track drag start position and height
  const startY = useRef<number>(0);
  const startHeight = useRef<number>(0);

  /**
   * Set the sheet height as a percentage of viewport height,
   * clamped between MIN_HEIGHT and MAX_HEIGHT.
   */
  const updateSheet = useCallback((percent: number) => {
    const vh = window.innerHeight;
    percent = Math.max(0, Math.min(100, percent));
    let newHeight = (vh * percent) / 100;
    const maxHeight = vh * MAX_HEIGHT;
    newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, newHeight));
    setSheetHeight(newHeight);
  }, []);

  /**
   * Hide the secondary panel and call the optional callback.
   */
  const handleSecondaryHide = useCallback(() => {
    setIsSecondaryHidden(true);
    onSecondaryHide?.();
  }, [onSecondaryHide]);

  /**
   * Start dragging: record initial Y and height, lock text selection.
   */
  const onDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setDragging(true);
      startY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
      startHeight.current = sheetHeight;
      document.body.style.userSelect = "none";
    },
    [sheetHeight]
  );

  /**
   * Handle drag move and drag end events.
   * - On move: update sheet height based on pointer movement.
   * - On end: snap to nearest breakpoint or hide if collapsed.
   */
  useEffect(() => {
    if (!dragging) return;

    // Move handler: update height as user drags
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      let newHeight = startHeight.current - (clientY - startY.current);
      const maxHeight = window.innerHeight * MAX_HEIGHT;
      newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, newHeight));
      setSheetHeight(newHeight);
    };

    // Up handler: snap to nearest breakpoint or hide
    const handleUp = () => {
      setDragging(false);
      document.body.style.userSelect = "";
      const vh = window.innerHeight;
      // Define breakpoints: collapsed, half, full
      const breakpoints = [MIN_HEIGHT, vh * 0.6, vh * MAX_HEIGHT];
      // Find the nearest breakpoint to current height
      const nearest = breakpoints.reduce((prev, curr) =>
        Math.abs(curr - sheetHeight) < Math.abs(prev - sheetHeight)
          ? curr
          : prev
      );
      if (nearest === MIN_HEIGHT) handleSecondaryHide();
      else updateSheet((nearest / vh) * 100);
    };

    // Attach global listeners for drag
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp, { passive: false });

    // Cleanup listeners on unmount or drag end
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging, sheetHeight, handleSecondaryHide, updateSheet]);

  /**
   * Sync local hidden state with prop.
   */
  useEffect(() => {
    setIsSecondaryHidden(hideSecondary);
  }, [hideSecondary]);

  /**
   * When the sheet is shown, reset its height to 60% of viewport.
   */
  useEffect(() => {
    if (!isSecondaryHidden) {
      const heightPercent = initialHeight !== undefined ? Math.min(initialHeight, MAX_HEIGHT) : 0.6;
      setSheetHeight(window.innerHeight * heightPercent);
    }
  }, [isSecondaryHidden, initialHeight]);

  return {
    isSecondaryHidden,
    sheetHeight,
    dragging,
    onDragStart,
    handleSecondaryHide,
  };
}
