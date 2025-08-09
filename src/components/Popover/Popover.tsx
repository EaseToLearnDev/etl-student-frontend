// src/components/Popover/Popover.tsx
import React, { createContext, useContext, useRef, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import type { PopoverPlacement } from "../../store/usePopoverStore";

type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  placement: PopoverPlacement;
  shadow?: string;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used inside <Popover>");
  return ctx;
}

type PopoverProps = {
  children: ReactNode;
  open?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  placement?: PopoverPlacement;
  shadow?: string;
};

export function Popover({
  children,
  open,
  setIsOpen,
  placement = "bottom",
  shadow = "md",
}: PopoverProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined && setIsOpen !== undefined;

  return (
    <PopoverContext.Provider
      value={{
        isOpen: isControlled ? open! : internalOpen,
        setIsOpen: isControlled ? setIsOpen! : setInternalOpen,
        triggerRef,
        placement,
        shadow,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}
