// React
import type { ReactNode } from "react";

// Types
import type { DrawerPlacements } from "../../store/useDrawerStore";

// Utils
import cn from "../../utils/classNames";
import { getDrawerSizeClass, getPlacementClass } from "./drawer.utils";

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
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className={cn("fixed inset-0 z-[999] backdrop-blur-md bg-black/40 dark:bg-black/60", overlayClassName)}
      />
      <div
        className={cn(
          "fixed z-[9999]",
          getPlacementClass(placement),
          getDrawerSizeClass(placement),
          containerClassName
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
