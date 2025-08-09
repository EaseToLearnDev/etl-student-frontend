import type { PopoverPlacement } from "../../store/usePopoverStore";

const getOppositePlacement = (
  placement: PopoverPlacement
): PopoverPlacement => {
  const map: Record<string, PopoverPlacement> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
    "top-start": "bottom-start",
    "top-end": "bottom-end",
    "bottom-start": "top-start",
    "bottom-end": "top-end",
    "left-start": "right-start",
    "left-end": "right-end",
    "right-start": "left-start",
    "right-end": "left-end",
  };
  return map[placement] ?? placement;
};
type Position = { top: number; left: number };
export function getPopoverPosition(
  triggerRect: DOMRect,
  contentRect: DOMRect,
  placement: PopoverPlacement,
  gap: number
): React.CSSProperties {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let finalPlacement = placement;

  // Check available space
  const spaceAbove = triggerRect.top;
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = viewportWidth - triggerRect.right;

  // Flip if needed
  if (placement.startsWith("top") && contentRect.height + gap > spaceAbove) {
    finalPlacement = getOppositePlacement(placement);
  }
  if (placement.startsWith("bottom") && contentRect.height + gap > spaceBelow) {
    finalPlacement = getOppositePlacement(placement);
  }
  if (placement.startsWith("left") && contentRect.width + gap > spaceLeft) {
    finalPlacement = getOppositePlacement(placement);
  }
  if (placement.startsWith("right") && contentRect.width + gap > spaceRight) {
    finalPlacement = getOppositePlacement(placement);
  }

  // Base positions
  const positions: Record<PopoverPlacement, () => React.CSSProperties> = {
    top: () => ({
      top: triggerRect.top - contentRect.height - gap,
      left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
    }),
    bottom: () => ({
      top: triggerRect.bottom + gap,
      left: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,
    }),
    left: () => ({
      top: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2,
      left: triggerRect.left - contentRect.width - gap,
    }),
    right: () => ({
      top: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2,
      left: triggerRect.right + gap,
    }),
    "top-start": () => ({
      top: triggerRect.top - contentRect.height - gap,
      left: triggerRect.left,
    }),
    "top-end": () => ({
      top: triggerRect.top - contentRect.height - gap,
      left: triggerRect.right - contentRect.width,
    }),
    "bottom-start": () => ({
      top: triggerRect.bottom + gap,
      left: triggerRect.left,
    }),
    "bottom-end": () => ({
      top: triggerRect.bottom + gap,
      left: triggerRect.right - contentRect.width,
    }),
    "left-start": () => ({
      top: triggerRect.top,
      left: triggerRect.left - contentRect.width - gap,
    }),
    "left-end": () => ({
      top: triggerRect.bottom - contentRect.height,
      left: triggerRect.left - contentRect.width - gap,
    }),
    "right-start": () => ({
      top: triggerRect.top,
      left: triggerRect.right + gap,
    }),
    "right-end": () => ({
      top: triggerRect.bottom - contentRect.height,
      left: triggerRect.right + gap,
    }),
  };

  // Calculate initial position
  let pos: Position = positions[finalPlacement]() as Position;
  // Clamp inside viewport
  pos.left = Math.max(
    gap,
    Math.min(pos.left, viewportWidth - contentRect.width - gap)
  );
  pos.top = Math.max(
    gap,
    Math.min(pos.top, viewportHeight - contentRect.height - gap)
  );

  return pos;
}
