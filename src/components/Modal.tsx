import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import cn from "../utils/classNames";

const modalStyles = {
  root: "fixed inset-0 z-[99999999] overflow-y-auto overflow-x-hidden",
  area: "flex min-h-screen flex-col items-center justify-center",
  overlay:
    "fixed inset-0 cursor-pointer bg-black bg-opacity-60 dark:bg-opacity-80 z-10 duration-300 ease-in-out data-[closed]:opacity-0",
  panel:
    "m-auto w-full break-words bg-background shadow-xl z-20 duration-300 ease-in-out data-[closed]:scale-95 data-[closed]:opacity-0",
  size: {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-[60%]",
    full: "max-w-full min-h-screen",
  },
  rounded: {
    none: "rounded-none",
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  },
  blur: {
    none: "",
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  },
};

export type ModalSize = keyof typeof modalStyles.size;
export type ModalRounded = keyof typeof modalStyles.rounded;
export type ModalBlur = keyof typeof modalStyles.blur;

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose(): void;
  size?: ModalSize;
  noGutter?: boolean;
  rounded?: ModalRounded;
  customSize?: number;
  overlayClassName?: string;
  containerClassName?: string;
  className?: string;
  /** Controls overlay blur. */
  blur?: ModalBlur;
};

export function Modal({
  children,
  isOpen,
  onClose,
  noGutter,
  className,
  size = "md",
  rounded = "md",
  customSize,
  overlayClassName,
  containerClassName,
  blur = "sm",
}: React.PropsWithChildren<ModalProps>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalElement = (
    <div
      className={cn(
        modalStyles.root,
        "flex items-center justify-center transition-opacity duration-300",
        className,
      )}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-black/40 dark:bg-black/60 z-10",
          modalStyles.blur[blur],
          show ? "opacity-100" : "opacity-0",
          overlayClassName,
        )}
      />
      {/* Panel */}
      <div
        className={cn(
          "relative z-20 w-full bg-[var(--surface-bg-secondary)] shadow-xl transition-all overflow-y-auto",
          show ? "opacity-100 scale-100" : "opacity-0 scale-95",
          !customSize && modalStyles.size[size],
          modalStyles.rounded[rounded],
          !noGutter && "p-4 sm:p-5",
          containerClassName,
        )}
        style={customSize ? { maxWidth: `${customSize}px` } : undefined}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
}
