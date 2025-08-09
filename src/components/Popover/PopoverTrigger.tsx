// src/components/Popover/PopoverTrigger.tsx
import React, { cloneElement } from "react";
import { usePopoverContext } from "./Popover";

type PopoverTriggerProps = {
  children: React.ReactElement<any>;
};

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { triggerRef, setIsOpen, isOpen } = usePopoverContext();

  return cloneElement(children, {
    ref: triggerRef,
    onClick: (e: MouseEvent) => {
      children.props?.onClick?.(e);
      setIsOpen(!isOpen);
    },
  });
}
