// React
import { useEffect } from "react";
import { useLocation } from "react-router";

// Stores
import useDrawerStore from "../store/useDrawerStore";

// Utils
import cn from "../utils/classNames";

// Components
import Drawer from "./Drawer/Drawer";


/**
 * GlobalDrawer is a wrapper component that manages the global drawer state and rendering.
 *
 * It listens to route changes using `useLocation` from react-router and automatically closes the drawer
 * whenever the pathname changes. The drawer's state (open/close, view, placement, and container class)
 * is managed via a custom store (`useDrawerStore`).
 */
export default function GlobalDrawer() {
  const { isOpen, view, placement, containerClassName, closeDrawer } =
    useDrawerStore();

  const location = useLocation();
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      containerClassName={cn(containerClassName)}
    >
      {view}
    </Drawer>
  );
}