import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopoverStore } from "../../store/usePopoverStore";
import { getPopoverPosition } from "./utils/getPopoverPosition";

export function PopoverRoot() {
  const { isOpen, view, placement, gap, arrow, enableOverlay, closePopover } =
    usePopoverStore();

  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const contentRef = useRef<HTMLDivElement>(null);

  // Get trigger element from store
  const triggerEl = usePopoverStore(
    (s) => (s as any)._triggerEl
  ) as HTMLElement | null;

  // Save trigger rect when popover opens
  useEffect(() => {
    if (triggerEl) {
      setTriggerRect(triggerEl.getBoundingClientRect());
    }
  }, [triggerEl, isOpen]);

  // Recalculate position when open, resized, or scrolled
  useEffect(() => {
    if (isOpen && triggerRect && contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const pos = getPopoverPosition(triggerRect, contentRect, placement, gap);
      setPositionStyle(pos);
    }
  }, [isOpen, triggerRect, placement, gap]);

  // Optional: update position on window resize or scroll
  useEffect(() => {
    function updatePosition() {
      if (isOpen && triggerEl && contentRef.current) {
        const newTriggerRect = triggerEl.getBoundingClientRect();
        const newContentRect = contentRef.current.getBoundingClientRect();
        setTriggerRect(newTriggerRect);
        const pos = getPopoverPosition(
          newTriggerRect,
          newContentRect,
          placement,
          gap
        );
        setPositionStyle(pos);
      }
    }

    if (isOpen) {
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true); // true = capture phase
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, triggerEl, placement, gap]);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePopover();
    }
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closePopover]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerEl &&
        !triggerEl.contains(e.target as Node)
      ) {
        closePopover();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, closePopover, triggerEl]);

  if (!isOpen || !triggerRect) return null;

  return createPortal(
    <>
      {enableOverlay && (
        <div
          className="fixed inset-0 bg-black/30 z-[9998]"
          onClick={closePopover}
        />
      )}

      <div
        ref={contentRef}
        style={{
          position: "fixed",
          ...positionStyle,
          zIndex: 9999,
        }}
        className="rounded-md shadow-lg p-3 transition-all duration-150"
      >
        {arrow && (
          <div
            className="absolute w-2 h-2 rotate-45"
            style={{
              top:
                placement.startsWith("bottom") || placement === "top"
                  ? undefined
                  : "50%",
              bottom: placement.startsWith("top") ? "-4px" : undefined,
              left:
                placement.startsWith("right") || placement === "left"
                  ? undefined
                  : "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
            }}
          />
        )}
        {view}
      </div>
    </>,
    document.body
  );
}
