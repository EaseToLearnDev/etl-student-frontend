import { create } from "zustand";
import type { ToastType } from "../../components/Toast";

interface ToastData {
  type?: ToastType;
  title: string;
  description?: string;
  button?: string;
  duration?: number;
  redirect?: string;
}

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
