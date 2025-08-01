// Zustand
import { create } from "zustand";
// Types
import { Severity, type ErrorType } from "../types";


export interface ErrorStore {
  error: ErrorType;
  isLoading: boolean;
  setErrorMessage: (message: string, severity: Severity) => void;
  setLoading: (v: boolean) => void;
}

/**
 * Zustand store for managing global error and loading state.
 * Provides methods to set error messages and loading status.
 */
export const useErrorStore = create<ErrorStore>((set) => ({
  error: {
    message: "",
    severity: Severity.None,
  },
  isLoading: false,
  setErrorMessage: (message, severity) =>
    set({
      error: {
        message: message,
        severity: severity,
      },
    }),
  setLoading: (v) => set({ isLoading: v }),
}));
