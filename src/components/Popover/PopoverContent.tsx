// src/components/Popover/PopoverContent.tsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopoverContext } from "./Popover";
import { getPopoverPosition } from "./utils/getPopoverPosition";

type PopoverContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function PopoverContent({
  children,
  className = "",
}: PopoverContentProps) {
  const { isOpen, setIsOpen, triggerRef, placement, shadow } =
    usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<React.CSSProperties>({});

  // Calculate position when open
  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect(); 
      const pos = getPopoverPosition(triggerRect, contentRect, placement, 8); 
      setPosition(pos);
    }
  }, [isOpen, placement, triggerRef]);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, setIsOpen, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        transform: position.transform,
        zIndex: 9999,
      }}
      className={`rounded-md shadow-${shadow} ${className}`}
    >
      {children}
    </div>,
    document.body
  );
}
