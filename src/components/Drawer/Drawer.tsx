// React
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Types
import type { DrawerPlacements } from "../../store/useDrawerStore";

// Utils
import cn from "../../utils/classNames";
import {
  getDrawerSizeClass,
  getHiddenTransformClass,
  getPlacementClass,
} from "./drawer.utils";

// Interfaces
interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement: DrawerPlacements | undefined;
  overlayClassName?: string;
  containerClassName?: string;
}

/**
 * Drawer component for displaying a sliding panel from a specified edge of the screen.
 */
const Drawer = ({
  children,
  isOpen,
  onClose,
  placement,
  overlayClassName,
  containerClassName,
}: DrawerProps) => {
  const [show, setShow] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Wait for next tick to trigger animation
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
      // Wait for animation to finish before unmounting
      timeoutRef.current = setTimeout(() => setShow(false), 300);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  if (!show) return null;

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[999] backdrop-blur-md bg-black/40 dark:bg-black/60",
          overlayClassName
        )}
      />
      <div
        className={cn(
          "fixed z-[9999] transition-transform duration-300 ease-in-out",
          getPlacementClass(placement),
          getDrawerSizeClass(placement),
          animateIn
            ? "translate-x-0 translate-y-0"
            : getHiddenTransformClass(placement),
          containerClassName
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
