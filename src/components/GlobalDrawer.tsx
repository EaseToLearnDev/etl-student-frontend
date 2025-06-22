import { useEffect } from "react";
import { Drawer } from "rizzui";
import { useLocation } from "react-router";
import cn from "../utils/classNames";
import useDrawerStore from "../store/useDrawerStore";

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
      overlayClassName="bg-black/40 dark:bg-black/60 backdrop-blur-md"
      containerClassName={cn(
        "min-w-[320px] max-w-[420px] bg-[var(--app-bg)]",
        containerClassName
      )}
      className="z-[9999]"
    >
      {view}
    </Drawer>
  );
}
