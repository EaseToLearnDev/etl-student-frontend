import { create } from "zustand";

export type PopoverPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface PopoverStore {
  isOpen: boolean;
  view: React.ReactNode;
  placement: PopoverPlacement;
  gap: number;
  arrow: boolean;
  enableOverlay: boolean;
  openPopover: (options: {
    view: React.ReactNode;
    placement?: PopoverPlacement;
    gap?: number;
    arrow?: boolean;
    enableOverlay?: boolean;
  }) => void;
  closePopover: () => void;
}

export const usePopoverStore = create<PopoverStore>((set) => ({
  isOpen: false,
  view: null,
  placement: "bottom",
  gap: 8,
  arrow: false,
  enableOverlay: false,
  openPopover: ({
    view,
    placement = "bottom",
    gap = 8,
    arrow = false,
    enableOverlay = false,
  }) =>
    set(() => ({
      isOpen: true,
      view,
      placement,
      gap,
      arrow,
      enableOverlay,
    })),
  closePopover: () =>
    set((state) => ({
      ...state,
      isOpen: false,
    })),
}));
