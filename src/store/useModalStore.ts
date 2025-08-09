import { create } from "zustand";
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: number;
  size?: ModalSize;
  openModal: (params: {
    view: React.ReactNode;
    customSize?: number;
    size?: ModalSize;
  }) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalTypes>((set) => ({
  isOpen: false,
  view: null,
  customSize: 320,
  size: "sm",
  openModal: ({ view, customSize, size }) =>
    set(() => ({
      isOpen: true,
      view,
      customSize,
      size,
    })),
  closeModal: () =>
    set((state) => ({
      ...state,
      isOpen: false,
    })),
}));
