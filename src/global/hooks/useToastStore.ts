import { create } from "zustand";
import type { ToastData } from "../../features/shared/types";


interface ToastState {
  showToast: boolean;
  toastData: ToastData | null;
  setToast: (data: ToastData) => void;
  resetToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  showToast: false,
  toastData: null,
  setToast: (data) => set({ showToast: true, toastData: data }),
  resetToast: () => set({ showToast: false, toastData: null }),
}));
