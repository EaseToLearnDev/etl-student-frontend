// src/store/useDrawerStore.ts
import { create } from "zustand";

export type DrawerPlacements = "left" | "right" | "top" | "bottom";

type DrawerTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  placement?: DrawerPlacements;
  containerClassName?: string;
};

type DrawerStore = DrawerTypes & {
  openDrawer: (options: {
    view: React.ReactNode;
    placement: DrawerPlacements;
    containerClassName?: string;
  }) => void;
  closeDrawer: () => void;
};

const useDrawerStore = create<DrawerStore>((set) => ({
  isOpen: false,
  view: null,
  placement: "right",
  containerClassName: "",
  openDrawer: ({ view, placement, containerClassName }) => {
    return set({
      isOpen: true,
      view: view,
      placement: placement,
      containerClassName: containerClassName,
    });
  },
  closeDrawer: () =>
    set((state) => ({
      ...state,
      isOpen: false,
    })),
}));

export default useDrawerStore;
