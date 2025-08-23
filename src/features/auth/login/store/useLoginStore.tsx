import { create } from "zustand";
import { Severity, type Error } from "../../../shared/types";

export interface LoginStore {
  email: string;
  password: string;
  error: Error;
  loading: boolean;

  setLoading: (v: boolean) => void;
  setError: (message: string, severity: Severity) => void;

  setCredentials: (email: string, password: string) => void;
}

// TODO: REPLACE ERROR WITH ERROR STORE LATER
export const useLoginStore = create<LoginStore>((set) => ({
  email: "",
  password: "",
  error: {
    severity: Severity.None,
    message: "",
  },
  loading: false,

  setLoading: (v) => set({ loading: v }),
  setError: (message, severity) => set({ error: { severity, message } }),
  setCredentials: (email, password) => set({ email, password }),
}));
